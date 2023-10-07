import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { getJWTConfig } from '../../config/jwt.config';
import { TokensRepository } from './tokens.repository';
import { TokensService } from './tokens.service';

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
