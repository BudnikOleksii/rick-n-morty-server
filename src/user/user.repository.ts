import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

const includeRolesQuery = { roles: { include: { role: true } } };
const userWithRoles = Prisma.validator<Prisma.UserArgs>()({
  include: includeRolesQuery,
});

export type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>;

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  createUser(payload: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: payload,
      include: includeRolesQuery,
    });
  }

  getUserById(id: User['id']) {
    return this.prisma.user.findUnique({
      where: { id },
      include: includeRolesQuery,
    });
  }

  getUserByEmail(email: User['email']) {
    return this.prisma.user.findUnique({
      where: { email },
      include: includeRolesQuery,
    });
  }

  getUserByUsername(username: User['username']) {
    return this.prisma.user.findUnique({
      where: { username },
      include: includeRolesQuery,
    });
  }
}
