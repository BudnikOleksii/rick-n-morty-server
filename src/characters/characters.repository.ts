import { Injectable } from '@nestjs/common';
import { Character } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CharactersRepository {
  constructor(private prisma: PrismaService) {}

  async getCharacters(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const [characters, total] = await this.prisma.$transaction([
      this.prisma.character.findMany({
        include: {
          species: true,
          type: true,
          origin: true,
          location: true,
        },
        skip: offset,
        take: limit,
      }),
      this.prisma.character.count(),
    ]);

    return { characters, total };
  }

  getCharacterById(id: Character['id']) {
    return this.prisma.character.findUnique({
      where: { id },
      include: {
        species: true,
        type: true,
        origin: true,
        location: true,
        // @ts-ignore
        episodes: { include: { episode: true } },
        sets: { include: { set: true } },
      },
    });
  }

  countUnused() {
    return this.prisma.character.count({ where: { unused: true } });
  }

  markCharacterAsUsed(id: Character['id']) {
    return this.prisma.character.update({
      where: { id },
      data: { unused: false },
    });
  }
}
