import { PrismaClient } from '@prisma/client';
import { getLocationsData } from '../helpersAPI';

const prisma = new PrismaClient();

export const seedLocations = async () => {
  try {
    await prisma.location.deleteMany();

    const locations = await getLocationsData();

    await prisma.location.createMany({
      data: locations,
      skipDuplicates: true,
    });

    console.log('Locations seeding completed.');
  } catch (error) {
    console.error('Error seeding locations:', error);
  }
};
