import {
  Character,
  CharacterGender,
  CharacterStatus,
  Episode,
  Location,
  Species,
  Type,
} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CharacterResponseDto implements Character {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  status: CharacterStatus;

  @ApiProperty()
  speciesId: number;

  @ApiProperty()
  typeId: number;

  @ApiProperty()
  gender: CharacterGender;

  @ApiProperty()
  originId: number;

  @ApiProperty()
  locationId: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  unused: boolean;

  // TODO create DTO for other entities
  @ApiProperty()
  species: Species;

  @ApiProperty()
  type: Type;

  @ApiProperty()
  origin: Location;

  @ApiProperty()
  location: Location;

  @ApiProperty()
  episodes: Episode[];

  @ApiProperty()
  sets: [];
}
