import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import JwtRefreshGuard from '../common/guards/jwt-refresh.guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getUser() {
    return [{ user: 'some' }];
  }
}
