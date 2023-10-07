// import { IsEmail, IsString, Length } from 'class-validator';
import { SignupDto } from '../../auth/dto';

export class CreateUserDto extends SignupDto {
  ip: string;
}
