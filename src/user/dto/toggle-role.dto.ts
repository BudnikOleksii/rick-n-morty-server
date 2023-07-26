import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ToggleRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Valid email' })
  @IsString()
  role: string;
}
