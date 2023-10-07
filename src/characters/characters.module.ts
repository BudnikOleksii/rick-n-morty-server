import { Module } from '@nestjs/common';

import { CharactersController } from './characters.controller';
import { CharactersRepository } from './characters.repository';
import { CharactersService } from './characters.service';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService, CharactersRepository],
})
export class CharactersModule {}
