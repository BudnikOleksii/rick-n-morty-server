import { Injectable } from '@nestjs/common';
import { ActivationLink, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivationLinksRepository {
  constructor(private prisma: PrismaService) {}

  createActivationLink(payload: Prisma.ActivationLinkCreateInput) {
    return this.prisma.activationLink.create({
      data: payload,
    });
  }

  getActivationLink(id: ActivationLink['id']) {
    return this.prisma.activationLink.findUnique({ where: { id } });
  }

  deleteActivationLink(id: ActivationLink['id']) {
    return this.prisma.activationLink.delete({ where: { id } });
  }

  removeExpiredLinks() {
    const currentDate = new Date().toISOString();

    return this.prisma.activationLink.deleteMany({
      where: {
        expiresAt: {
          lt: currentDate,
        },
      },
    });
  }
}
