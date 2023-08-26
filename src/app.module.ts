import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import databaseConfig from '../config/database.config';
import serverConfig from '../config/server.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { TokensModule } from './tokens/tokens.module';
import { CharactersModule } from './characters/characters.module';
import { ActivationLinksModule } from './activation-links/activation-links.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig, databaseConfig],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    PrismaModule,
    RolesModule,
    TokensModule,
    CharactersModule,
    ActivationLinksModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
