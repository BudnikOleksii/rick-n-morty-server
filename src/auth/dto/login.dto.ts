import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { lowerCaseTransformer } from '../../common/transformers';

export class LoginDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Valid email' })
  @Transform(lowerCaseTransformer)
  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString()
  @Length(6, 24, { message: 'Password should be at least 6 character and less then 24' })
  password: string;
}
