import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { LoginDto, SignupDto } from './dto';
import serverConfig from '../../config/server.config';
import { ITokenWithId } from '../common/interfaces';
import { TokensService } from '../tokens/tokens.service';
import { ActivationLinksService } from '../activation-links/activation-links.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(serverConfig.KEY)
    private userService: UserService,
    private tokensService: TokensService,
    private activationLinksService: ActivationLinksService
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
    const tokens = await this.tokensService.generateTokens(user);
    const tokenId = await this.tokensService.storeToken(tokens.refreshToken, user.id);

    return {
      ...tokens,
      tokenId,
      user,
    };
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

    return user;
  }
}
