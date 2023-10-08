import type { IPaginatedResult } from '../../common/types';

import { ApiProperty } from '@nestjs/swagger';

import { PaginationInfoDto } from '../../common/dto';
import { ReturnedUserDto } from './returned-user.dto';

export class PaginatedUsersDto implements IPaginatedResult<ReturnedUserDto> {
  @ApiProperty()
  info: PaginationInfoDto;

  @ApiProperty({ isArray: true, type: ReturnedUserDto })
  result: ReturnedUserDto[];
}
