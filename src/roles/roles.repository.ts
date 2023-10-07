import type { Role } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesRepository {
  constructor(private prisma: PrismaService) {}

  getRoleByValue(value: Role['value']) {
    return this.prisma.role.findUnique({ where: { value } });
  }
}
