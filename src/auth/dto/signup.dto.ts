import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LoginDto } from './login.dto';

export class SignupDto extends LoginDto {
  @ApiProperty({ example: 'John Doe', description: 'Username' })
  @IsString()
  @MinLength(3)
  username: string;
}
