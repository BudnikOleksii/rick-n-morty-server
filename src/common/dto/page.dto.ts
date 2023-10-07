import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PageDto {
  @ApiProperty({ required: false, example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, example: 20 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit?: number;
}
