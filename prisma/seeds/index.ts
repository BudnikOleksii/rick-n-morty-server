import { PrismaClient } from '@prisma/client';

import { seedEpisodes } from './episodes';
import { seedLocations } from './locations';
import { seedCharactersSpeciesTypes } from './characters-species-types';
import { seedLocationsCharacters } from './locations-characters';
import { seedCharactersEpisodes } from './characters-episodes';
import { seedRoles } from './roles';
import { seedUsers } from './users';
import { seedUsersRoles } from './users-roles';
import { seedCards } from './cards';

const prisma = new PrismaClient();

const main = async () => {
  try {
    await seedEpisodes();
    await seedLocations();
    await seedCharactersSpeciesTypes();
    await seedLocationsCharacters();
    await seedCharactersEpisodes();
    await seedRoles();
    await seedUsers();
    await seedUsersRoles();
    await seedCards();

    console.log('All tables seeding completed.');
  } catch (error) {
    console.error('Error seeding tables:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
