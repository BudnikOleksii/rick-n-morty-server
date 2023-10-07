import type { ActivationLink } from '@prisma/client';

import { Response } from 'express';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import JwtRefreshGuard from '../common/guards/jwt-refresh.guard';
import { IRequestWithToken } from '../common/interfaces';
import { MessageResponse } from '../common/interfaces/message-response';
import { ReturnedUserDto } from '../user/dto';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, SignupDto, UserEmailDto } from './dto';

@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ status: 200, type: AuthResponseDto })
  @ApiException(() => UnauthorizedException, { description: 'Invalid password or email' })
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    const response = await this.authService.login(dto);

    return {
      ...response,
      user: new ReturnedUserDto(response.user),
    };
  }

  @ApiOperation({ summary: 'Signup' })
  @ApiOkResponse({ status: 201, type: MessageResponse })
  @ApiException(() => BadRequestException, { description: 'Username or email already in use' })
  @Post('signup')
  async signup(@Body() dto: SignupDto, @Ip() ip: string): Promise<MessageResponse> {
    return this.authService.signup(dto, ip);
  }

  @ApiOperation({ summary: 'Activate user' })
  @ApiException(() => BadRequestException, { description: 'Invalid activation link' })
  @ApiParam({ name: 'id', type: String, description: 'Activation link ID' })
  @ApiResponse({ status: 302, description: 'Redirect to the website' })
  @Get('activate/:id')
  async activate(@Param('id') id: ActivationLink['id'], @Res() res: Response) {
    const redirectUrl = await this.authService.activate(id);

    return res.redirect(redirectUrl);
  }

  @ApiOperation({ summary: 'Resend activation link' })
  @ApiOkResponse({ status: 200, type: MessageResponse })
  @ApiException(() => BadRequestException, { description: 'Username or email already in use' })
  @Get('resend-activation-link')
  async resendActivationLink(@Body() dto: UserEmailDto) {
    return this.authService.resendActivationLink(dto.email);
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
