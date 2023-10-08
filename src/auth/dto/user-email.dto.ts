import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { lowerCaseTransformer } from '../../common/transformers';

export class UserEmailDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Valid email' })
  @Transform(lowerCaseTransformer)
  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;
}
