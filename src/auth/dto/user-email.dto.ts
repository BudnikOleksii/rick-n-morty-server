import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserEmailDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Valid email' })
  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;
}
