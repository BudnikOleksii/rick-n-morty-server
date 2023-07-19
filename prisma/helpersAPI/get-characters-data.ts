import { BASE_URL, ENDPOINTS } from './constants';
import { getData } from './get-data';

export const getCharactersData = async () => {
  const speciesSet = new Set();
  const typesSet = new Set();
  const characters = [];
  const species = [];
  const types = [];
  const charactersEpisodes = [];
  let currentURL = BASE_URL + ENDPOINTS.characters;

  while (currentURL) {
    try {
      const { data } = await getData(currentURL);

      currentURL = data.info.next;

      data.results.forEach((character) => {
        const { name, status, species, type, gender, origin, location, image, episode } = character;

        speciesSet.add(species);
        typesSet.add(type);

        characters.push({
          name,
          status,
          species,
          type,
          gender,
          origin: origin.name,
          location: location.name,
          image,
        });

        charactersEpisodes.push({
          characterName: name,
          episodes: episode,
        });
      });
    } catch (error) {
      throw error;
    }
  }

  speciesSet.forEach((speciesName) => {
    species.push({ name: speciesName });
  });

  typesSet.forEach((typeName) => {
    types.push({ name: typeName });
  });

  return {
    characters,
    species,
    types,
    charactersEpisodes,
  };
};
