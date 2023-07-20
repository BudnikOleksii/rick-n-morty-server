import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  createUser(payload: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: payload });
  }

  getUserByEmail(email: User['email']) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  getUserByUsername(username: User['username']) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
