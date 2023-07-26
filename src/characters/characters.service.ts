import { Injectable, NotFoundException } from '@nestjs/common';
import { Character } from '@prisma/client';

import { CharactersRepository } from './characters.repository';
import { PageDto } from '../common/dto';
import { createInfoData } from '../common/helpers';
import { IPaginatedResult } from '../common/interfaces';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/constatns';

@Injectable()
export class CharactersService {
  constructor(private charactersRepository: CharactersRepository) {}

  async getCharacters(pageDto: PageDto, endpoint: string): Promise<IPaginatedResult<Character>> {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = pageDto;
    const { characters, total } = await this.charactersRepository.getCharacters(page, limit);

    return {
      info: createInfoData(total, page, limit, endpoint),
      result: characters,
    };
  }

  async getCharacterById(id: Character['id']) {
    const character = await this.charactersRepository.getCharacterById(id);

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return character;
  }

  async countUnused() {
    const unusedCount = await this.charactersRepository.countUnused();

    return { unusedCount };
  }
}
