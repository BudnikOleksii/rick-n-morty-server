import type { User } from '@prisma/client';

import { Request } from 'express';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { Roles } from '../common/decorators';
import { PageDto } from '../common/dto';
import { JwtAuthGuard, RolesGuard } from '../common/guards';
import { getEndpoint } from '../common/helpers';
import { MainRoles } from '../common/types';
import { PaginatedUsersDto, ReturnedUserDto, ToggleRoleDto } from './dto';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@ApiException(() => UnauthorizedException)
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get users with pagination' })
  @ApiOkResponse({ status: 200, type: PaginatedUsersDto })
  @Get()
  async getUsers(@Req() req: Request, @Query() pageDto: PageDto): Promise<PaginatedUsersDto> {
    const endpoint = getEndpoint(req);

    const response = await this.userService.getUsers(pageDto, endpoint);
    const users = response.result.map((user) => new ReturnedUserDto(user));

    return {
      ...response,
      result: users,
    };
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: String, description: 'User id' })
  @ApiOkResponse({ status: 200, type: ReturnedUserDto })
  @ApiException(() => NotFoundException, { description: 'User not found' })
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: User['id']): Promise<ReturnedUserDto> {
    const user = await this.userService.getUser(id);

    return new ReturnedUserDto(user);
  }

  @ApiOperation({ summary: 'Update user roles, only for authorized ADMINS' })
  @ApiParam({ name: 'id', type: String, description: 'User id' })
  @ApiOkResponse({ status: 200, type: ReturnedUserDto })
  @ApiException(() => NotFoundException, { description: 'User or role not found' })
  @Roles(MainRoles.admin)
  @UseGuards(RolesGuard)
  @Patch(':id/role')
  async toggleUserRole(
    @Param('id', ParseIntPipe) id: User['id'],
    @Body() roleDto: ToggleRoleDto
  ): Promise<ReturnedUserDto> {
    const updatedUser = await this.userService.toggleUserRole(id, roleDto.role);

    return new ReturnedUserDto(updatedUser);
  }
}
