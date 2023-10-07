import type { User } from '@prisma/client';

import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnedUserDto implements User {
  @ApiProperty({ example: 3, description: 'Uniq user id' })
  id: number;

  @ApiProperty({ example: 'Admin Admin', description: 'Username' })
  username: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Valid email' })
  email: string;

  @ApiProperty({
    example: 24,
    description: 'Rating depends on how much user have cards and bonuses from sets',
  })
  rating: number;

  @ApiProperty({ example: '::ffff:127.0.0.1', description: 'User ip address' })
  ip: string;

  @ApiProperty({ example: '2023-07-19 12:39:18.952', description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ example: '2023-07-19 12:39:18.952', description: 'Last visit date' })
  updatedAt: Date;

  @Exclude()
  activated: boolean;

  @Exclude()
  deletedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<ReturnedUserDto>) {
    Object.assign(this, partial);
  }
}
