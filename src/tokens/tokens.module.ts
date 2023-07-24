import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TokensService } from './tokens.service';
import { TokensRepository } from './tokens.repository';
import { getJWTConfig } from '../../config/jwt.config';

@Module({
  providers: [TokensService, TokensRepository],
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  exports: [TokensService],
})
export class TokensModule {}
