import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Token, User } from '@prisma/client';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cron, CronExpression } from '@nestjs/schedule';

import serverConfig from '../../config/server.config';
import { ITokenPayload, ITokenWithId } from '../interfaces';
import { TokensRepository } from './tokens.repository';
import { UserWithRoles } from '../user/user.repository';

@Injectable()
export class TokensService {
  constructor(
    @Inject(serverConfig.KEY)
    private config: ConfigType<typeof serverConfig>,
    private jwt: JwtService,
    private tokensRepository: TokensRepository
  ) {}

  async generateTokens(user: UserWithRoles) {
    const roles = user.roles.map((role) => role.role.value);
    const payload: ITokenPayload = { sub: user.id, email: user.email, roles };

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return { refreshToken, accessToken };
  }

  private async generateAccessToken(payload: ITokenPayload) {
    const { accessSecret, accessExpiresIn } = this.config;

    const accessToken = await this.jwt.signAsync(payload, {
      secret: accessSecret,
      expiresIn: accessExpiresIn,
    });

    return accessToken;
  }

  private async generateRefreshToken(payload: ITokenPayload) {
    const { refreshSecret, refreshExpiresIn } = this.config;

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpiresIn,
    });

    return refreshToken;
  }

  async checkToken(tokenInfo: ITokenWithId) {
    const token = await this.tokensRepository.getToken(tokenInfo.tokenId);

    if (!token || token?.refreshToken !== tokenInfo.token || token?.userId !== tokenInfo.sub) {
      throw new UnauthorizedException('Unauthorized');
    }

    return token;
  }

  async storeToken(refreshToken: Token['refreshToken'], userId: User['id']) {
    const tokenPayload: Prisma.TokenCreateInput = this.createTokenPayload(refreshToken, userId);
    const storedToken = await this.tokensRepository.createToken(tokenPayload);

    return storedToken.id;
  }

  async updateToken(id: Token['id'], refreshToken: Token['refreshToken'], userId: User['id']) {
    const tokenPayload: Prisma.TokenCreateInput = this.createTokenPayload(refreshToken, userId);
    const updatedToken = await this.tokensRepository.updateToken(id, tokenPayload);

    return updatedToken.id;
  }

  async deleteToken(id: Token['id']) {
    return this.tokensRepository.deleteToken(id);
  }

  private createTokenPayload(refreshToken: Token['refreshToken'], userId: User['id']) {
    const tokenData = this.jwt.decode(refreshToken) as ITokenPayload;
    const tokenPayload: Prisma.TokenCreateInput = {
      refreshToken,
      expiresAt: new Date(tokenData?.exp * 1000),
      user: { connect: { id: userId } },
    };

    return tokenPayload;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async removeExpiredTokens() {
    const { count } = await this.tokensRepository.removeExpiredTokens();
    console.log(`${count} tokens were deleted`);
  }
}
