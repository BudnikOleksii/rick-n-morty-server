import { ApiProperty } from '@nestjs/swagger';

export class UnusedCountDto {
  @ApiProperty()
  unusedCount: number;
}
