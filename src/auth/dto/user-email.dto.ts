import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserEmailDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Valid email' })
  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;
}
