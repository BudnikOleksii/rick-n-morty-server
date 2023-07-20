import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO update types for docs
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: LoginDto })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Signup' })
  @ApiResponse({ status: 200, type: '' })
  @Post('signup')
  signup(@Body() dto: SignupDto, @Ip() ip) {
    return this.authService.signup(dto, ip);
  }
}
