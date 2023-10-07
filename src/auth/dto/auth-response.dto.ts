import { ApiProperty } from '@nestjs/swagger';

import { ReturnedUserDto } from '../../user/dto';

export class AuthResponseDto {
  @ApiProperty({ example: 'refresh.token', description: 'Generated refresh token' })
  refreshToken: string;

  @ApiProperty({ example: 'access.token', description: 'Generated access token' })
  accessToken: string;

  @ApiProperty({
    example: 'f7884b69-cdb6-4a5d-88ab-c7c080ad246b',
    description: 'Refresh token UUID',
  })
  tokenId: string;

  @ApiProperty()
  user: ReturnedUserDto;
}
