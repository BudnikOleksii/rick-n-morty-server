import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';
import { ConfigType } from '@nestjs/config';

import { CreateUserDto } from './dto';
import { RolesService } from '../roles/roles.service';
import { UserRepository } from './user.repository';
import serverConfig from '../../config/server.config';

@Injectable()
export class UserService {
  constructor(
    @Inject(serverConfig.KEY)
    private config: ConfigType<typeof serverConfig>,
    private userRepository: UserRepository,
    private rolesService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    let candidate = await this.getUserByEmail(dto.email);

    if (candidate) {
      throw new BadRequestException('Email already in use');
    }

    candidate = await this.getUserByUsername(dto.username);

    if (candidate) {
      throw new BadRequestException('Current username already in use');
    }

    const hashPassword = await bcrypt.hash(dto.password, this.config.saltRounds);
    const activationLink = uuidv4();
    const role = await this.rolesService.getRoleByValue(this.config.userRole);
    const payload = {
      ...dto,
      password: hashPassword,
      activationLink,
      roles: {
        create: [{ roleId: role.id }],
      },
    };

    return this.userRepository.createUser(payload);
  }

  async getUserByEmail(email: User['email']) {
    return this.userRepository.getUserByEmail(email);
  }

  async getUserByUsername(username: User['username']) {
    return this.userRepository.getUserByUsername(username);
  }
}
