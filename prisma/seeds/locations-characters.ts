import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedLocationsCharacters = async () => {
  try {
    await prisma.locationCharacter.deleteMany();

    const locations = await prisma.location.findMany({
      select: { id: true, Location: { select: { id: true } } },
    });

    const locationsCharactersData = locations.flatMap((location) =>
      location.Location.map((character) => ({
        locationId: location.id,
        characterId: character.id,
      }))
    );

    await prisma.locationCharacter.createMany({
      data: locationsCharactersData,
      skipDuplicates: true,
    });

    console.log('Locations and Characters seeding completed.');
  } catch (error) {
    console.error('Error seeding Locations and Characters:', error);
  }
};
