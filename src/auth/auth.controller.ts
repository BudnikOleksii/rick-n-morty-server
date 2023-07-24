import { Body, Controller, Get, HttpCode, Ip, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { IRequestWithToken } from '../interfaces';
import JwtRefreshGuard from '../common/guards/jwt-refresh.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO Create docs
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ status: 200, type: '' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Signup' })
  @ApiOkResponse({ status: 201, type: '' })
  @Post('signup')
  signup(@Body() dto: SignupDto, @Ip() ip) {
    return this.authService.signup(dto, ip);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request: IRequestWithToken) {
    return this.authService.refreshTokens(request.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('logout')
  async logout(@Req() request: IRequestWithToken) {
    return this.authService.logout(request.user);
  }
}
