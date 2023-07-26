import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Ip,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, SignupDto } from './dto';
import { IRequestWithToken } from '../common/interfaces';
import JwtRefreshGuard from '../common/guards/jwt-refresh.guard';
import { ReturnedUserDto } from '../user/dto';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ status: 200, type: AuthResponseDto })
  @ApiException(() => UnauthorizedException, { description: 'Invalid password or email' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    const response = await this.authService.login(dto);

    return {
      ...response,
      user: new ReturnedUserDto(response.user),
    };
  }

  @ApiOperation({ summary: 'Signup' })
  @ApiOkResponse({ status: 201, type: AuthResponseDto })
  @ApiException(() => BadRequestException, { description: 'Username or email already in use' })
  @Post('signup')
  async signup(@Body() dto: SignupDto, @Ip() ip: string): Promise<AuthResponseDto> {
    const response = await this.authService.signup(dto, ip);

    return {
      ...response,
      user: new ReturnedUserDto(response.user),
    };
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBearerAuth()
  @ApiOkResponse({ status: 200, type: AuthResponseDto })
  @ApiException(() => UnauthorizedException)
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request: IRequestWithToken): Promise<AuthResponseDto> {
    const response = await this.authService.refreshTokens(request.user);

    return {
      ...response,
      user: new ReturnedUserDto(response.user),
    };
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiBearerAuth()
  @ApiOkResponse({ status: 200, description: 'User successfully logged out' })
  @ApiException(() => UnauthorizedException)
  @UseGuards(JwtRefreshGuard)
  @Get('logout')
  async logout(@Req() request: IRequestWithToken) {
    return this.authService.logout(request.user);
  }
}
