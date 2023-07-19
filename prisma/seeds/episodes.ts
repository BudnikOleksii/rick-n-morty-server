import { PrismaClient } from '@prisma/client';
import { getEpisodesData } from '../helpersAPI';

const prisma = new PrismaClient();

export const seedEpisodes = async () => {
  try {
    await prisma.episode.deleteMany();

    const { episodes } = await getEpisodesData();

    await prisma.episode.createMany({
      data: episodes,
      skipDuplicates: true, // Skip duplicates if any (assuming id is a unique identifier)
    });

    console.log('Episodes seeding completed.');
  } catch (error) {
    console.error('Error seeding episodes:', error);
  }
};
