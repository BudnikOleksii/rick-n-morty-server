import type { Character } from '@prisma/client';

import { Request } from 'express';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../common/dto';
import { JwtAuthGuard } from '../common/guards';
import { getEndpoint } from '../common/helpers';
import { CharactersService } from './characters.service';
import { CharacterResponseDto, PaginatedCharactersDto } from './dto';
import { UnusedCountDto } from './dto/unused-count.dto';

@ApiTags('Characters')
@ApiException(() => UnauthorizedException)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @ApiOperation({ summary: 'Get users with pagination' })
  @ApiOkResponse({ status: 200, type: PaginatedCharactersDto })
  @Get()
  async getCharacters(@Req() req: Request, @Query() pageDto: PageDto) {
    const endpoint = getEndpoint(req);

    return this.charactersService.getCharacters(pageDto, endpoint);
  }

  @ApiOperation({ summary: 'Get unused count' })
  @ApiOkResponse({ status: 200, type: UnusedCountDto })
  @Get('unused-count')
  async countUnused() {
    return this.charactersService.countUnused();
  }

  @ApiOperation({ summary: 'Get users with pagination' })
  @ApiParam({ name: 'id', type: String, description: 'Activation link ID' })
  @ApiOkResponse({ status: 200, type: CharacterResponseDto })
  @Get(':id')
  async getCharacterById(@Param('id', ParseIntPipe) id: Character['id']) {
    return this.charactersService.getCharacterById(id);
  }
}
