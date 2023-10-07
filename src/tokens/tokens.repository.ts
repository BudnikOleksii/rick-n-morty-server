import type { Prisma, Token } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TokensRepository {
  constructor(private prisma: PrismaService) {}

  createToken(payload: Prisma.TokenCreateInput) {
    return this.prisma.token.create({
      data: payload,
    });
  }

  getToken(tokenId: Token['id']) {
    return this.prisma.token.findUnique({ where: { id: tokenId } });
  }

  updateToken(tokenId: Token['id'], payload: Prisma.TokenUpdateInput) {
    return this.prisma.token.update({
      where: { id: tokenId },
      data: payload,
    });
  }

  deleteToken(id: Token['id']) {
    return this.prisma.token.delete({ where: { id } });
  }

  removeExpiredTokens() {
    const currentDate = new Date().toISOString();

    return this.prisma.token.deleteMany({
      where: {
        expiresAt: {
          lt: currentDate,
        },
      },
    });
  }
}
