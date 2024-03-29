import type { ITokenWithId } from '../common/types';
import type { MessageResponse } from '../common/types/message-response';
import type { LoginDto, SignupDto } from './dto';
import type { ActivationLink, User } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import serverConfig from '../../config/server.config';
import { ActivationLinksService } from '../activation-links/activation-links.service';
import { MailService } from '../mail/mail.service';
import { TokensService } from '../tokens/tokens.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(serverConfig.KEY)
    private config: ConfigType<typeof serverConfig>,
    private userService: UserService,
    private tokensService: TokensService,
    private activationLinksService: ActivationLinksService,
    private mailService: MailService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.tokensService.generateTokens(user);
    const tokenId = await this.tokensService.storeToken(tokens.refreshToken, user.id);

    return {
      ...tokens,
      tokenId,
      user,
    };
  }

  async signup(dto: SignupDto, ip: string) {
    const user = await this.userService.createUser({ ...dto, ip });
    const activationLink = await this.activationLinksService.createActivationLink(user.id);

    return this.sendActivationLink(user, activationLink.id);
  }

  async activate(id: ActivationLink['id']) {
    const activationLink = await this.activationLinksService.getActivationLink(id);
    await this.userService.activateUser(activationLink.userId);

    await this.activationLinksService.deleteActivationLink(id);

    return this.config.clientUrl;
  }

  async resendActivationLink(email: User['email']) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.activated) {
      throw new BadRequestException('User has been already activated');
    }

    const activationLink = await this.activationLinksService.createActivationLink(user.id);

    return this.sendActivationLink(user, activationLink.id);
  }

  async refreshTokens(tokenInfo: ITokenWithId) {
    const token = await this.tokensService.checkToken(tokenInfo);

    const user = await this.userService.getUserById(tokenInfo.sub);
    const tokens = await this.tokensService.generateTokens(user);
    const tokenId = await this.tokensService.updateToken(token.id, tokens.refreshToken, user.id);

    return {
      ...tokens,
      tokenId,
      user,
    };
  }

  async logout(tokenInfo: ITokenWithId) {
    const token = await this.tokensService.checkToken(tokenInfo);

    return this.tokensService.deleteToken(token.id);
  }

  private async validateUser(userDto: LoginDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const isPasswordValid = user ? await bcrypt.compare(userDto.password, user.password) : false;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password or email');
    }

    if (!user.activated) {
      throw new UnauthorizedException('Account is inactive, please, activate first');
    }

    return user;
  }

  private async sendActivationLink(user: User, linkUUID: string) {
    await this.mailService.sendMail({
      to: user.email,
      subject: `Activate your account for ${this.config.clientUrl}`,
      templateName: 'activate-account',
      context: {
        username: user.username,
        activationLink: `${this.config.apiUrl}/auth/activate/${linkUUID}`,
      },
    });

    const response: MessageResponse = {
      status: 'success',
      message: `Activation link has been sent to ${user.email}`,
    };

    return response;
  }
}
