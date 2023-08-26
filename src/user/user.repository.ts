import { Injectable } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';

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

  async getUsers(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        include: includeRolesQuery,
        skip: offset,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);

    return { users, total };
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

  updateUser(id: User['id'], payload: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data: payload,
      include: includeRolesQuery,
    });
  }

  async toggleUserRole(userId: User['id'], roleId: Role['id']) {
    const existingRole = await this.prisma.userRole.findFirst({
      where: {
        userId,
        roleId,
      },
    });

    return existingRole ? this.removeUserRole(userId, roleId) : this.addUserRole(userId, roleId);
  }

  removeUserRole(userId: User['id'], roleId: Role['id']) {
    return this.prisma.userRole.delete({
      where: {
        userId_roleId: {
          userId,
          roleId,
        },
      },
    });
  }

  addUserRole(userId: User['id'], roleId: Role['id']) {
    return this.prisma.userRole.create({
      data: {
        user: {
          connect: { id: userId },
        },
        role: {
          connect: { id: roleId },
        },
      },
    });
  }
}
