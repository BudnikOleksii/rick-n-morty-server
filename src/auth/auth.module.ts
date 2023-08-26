import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { getJWTConfig } from '../../config/jwt.config';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { TokensModule } from '../tokens/tokens.module';
import { ActivationLinksModule } from '../activation-links/activation-links.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    UserModule,
    TokensModule,
    ActivationLinksModule,
  ],
})
export class AuthModule {}
