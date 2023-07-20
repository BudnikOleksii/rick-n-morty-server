import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigType } from '@nestjs/config';

import { UserService } from '../user/user.service';
import { LoginDto, SignupDto } from './dto';
import serverConfig from '../../config/server.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(serverConfig.KEY)
    private config: ConfigType<typeof serverConfig>,
    private userService: UserService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    return { user };
  }

  async signup(dto: SignupDto, ip: string) {
    const user = await this.userService.createUser({ ...dto, ip });

    return {
      user,
    };
  }

  // private async generateToken(user: User) {
  //   const payload = { id: user.id, email: user.email, roles: user.roles };
  //
  //   return {
  //     token: this.jwtService.sign(payload),
  //   };
  // }

  private async validateUser(userDto: LoginDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const isPasswordValid = user ? await bcrypt.compare(userDto.password, user.password) : false;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password or email');
    }

    return user;
  }
}
