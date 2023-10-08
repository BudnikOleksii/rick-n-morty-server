import { Module } from '@nestjs/common';

import { RolesModule } from '../roles/roles.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
  imports: [RolesModule],
})
export class UserModule {}
