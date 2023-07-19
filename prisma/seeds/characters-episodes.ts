import { PrismaClient } from '@prisma/client';
import { getCharactersData, getEpisodesData } from '../helpersAPI';
import { getIdFromUrl } from '../helpersAPI/get-id-from-url';

const prisma = new PrismaClient();

export const seedCharactersEpisodes = async () => {
  try {
    await prisma.characterEpisode.deleteMany();

    const { charactersEpisodes } = await getCharactersData();
    const { episodesNamesMap } = await getEpisodesData();

    const characters = await prisma.character.findMany({
      select: { id: true, name: true },
    });

    const episodes = await prisma.episode.findMany({
      select: { id: true, name: true },
    });

    const charactersMap = new Map(characters.map((character) => [character.name, character.id]));
    const episodesMap = new Map(episodes.map((episode) => [episode.name, episode.id]));

    const charactersEpisodesData = charactersEpisodes.flatMap(({ characterName, episodes }) =>
      episodes.map((episodeUrl) => ({
        characterId: charactersMap.get(characterName),
        episodeId: episodesMap.get(episodesNamesMap.get(getIdFromUrl(episodeUrl))),
      }))
    );

    await prisma.characterEpisode.createMany({
      data: charactersEpisodesData,
      skipDuplicates: true,
    });

    console.log('Characters and Episodes seeding completed.');
  } catch (error) {
    console.error('Error seeding Characters and Episodes:', error);
  }
};
