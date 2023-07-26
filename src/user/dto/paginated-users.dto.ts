import { ApiProperty } from '@nestjs/swagger';

import { IPaginatedResult } from '../../common/interfaces';
import { ReturnedUserDto } from './returned-user.dto';
import { PaginationInfoDto } from '../../common/dto';

export class PaginatedUsersDto implements IPaginatedResult<ReturnedUserDto> {
  @ApiProperty()
  info: PaginationInfoDto;

  @ApiProperty({ isArray: true, type: ReturnedUserDto })
  result: ReturnedUserDto[];
}
