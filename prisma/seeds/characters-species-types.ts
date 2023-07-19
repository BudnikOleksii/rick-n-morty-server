import { Prisma, PrismaClient } from '@prisma/client';
import { getCharactersData } from '../helpersAPI';

const prisma = new PrismaClient();

export const seedCharactersSpeciesTypes = async () => {
  try {
    await prisma.species.deleteMany();
    await prisma.type.deleteMany();
    await prisma.character.deleteMany();

    const { species, types, characters } = await getCharactersData();

    await prisma.species.createMany({
      data: species,
      skipDuplicates: true, // Skip duplicates if any (assuming id is a unique identifier)
    });

    await prisma.type.createMany({
      data: types,
      skipDuplicates: true,
    });

    const locations = await prisma.location.findMany();
    const speciesData = await prisma.species.findMany();
    const typesData = await prisma.type.findMany();

    const locationsMap = new Map();
    const speciesMap = new Map();
    const typesMap = new Map();

    locations.forEach((location) => {
      locationsMap.set(location.name, location.id);
    });
    speciesData.forEach((species) => {
      speciesMap.set(species.name, species.id);
    });
    typesData.forEach((type) => {
      typesMap.set(type.name, type.id);
    });

    const charactersData: Prisma.CharacterCreateManyInput[] = characters.map((character) => ({
      name: character.name,
      status: character.status,
      speciesId: speciesMap.get(character.species),
      typeId: typesMap.get(character.type),
      gender: character.gender,
      originId: locationsMap.get(character.origin),
      locationId: locationsMap.get(character.location),
      image: character.image,
    }));

    await prisma.character.createMany({
      data: charactersData,
      skipDuplicates: true,
    });

    console.log('Characters, Species and Types seeding completed.');
  } catch (error) {
    console.error('Error seeding data Characters, Species or Types:', error);
  }
};
