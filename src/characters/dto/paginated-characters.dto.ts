import type { IPaginatedResult } from '../../common/types';

import { ApiProperty } from '@nestjs/swagger';

import { PaginationInfoDto } from '../../common/dto';
import { CharacterResponseDto } from './character-response.dto';

export class PaginatedCharactersDto implements IPaginatedResult<CharacterResponseDto> {
  @ApiProperty()
  info: PaginationInfoDto;

  @ApiProperty({ isArray: true, type: CharacterResponseDto })
  result: CharacterResponseDto[];
}
