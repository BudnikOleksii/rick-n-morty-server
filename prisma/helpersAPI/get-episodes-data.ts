import { getData } from './get-data';
import { BASE_URL, ENDPOINTS } from './constants';

export const getEpisodesData = async () => {
  const episodes = [];
  const episodesNamesMap = new Map();
  let currentURL = BASE_URL + ENDPOINTS.episodes;

  while (currentURL) {
    try {
      const { data } = await getData(currentURL);

      data.results.forEach((episodeData) => {
        const { id, name, air_date, episode } = episodeData;

        episodesNamesMap.set(id, name);

        episodes.push({
          name,
          airDate: new Date(air_date),
          episode,
          slug: name.replace(/ /g, '-').toLowerCase(),
        });
      });

      currentURL = data.info.next;
    } catch (error) {
      throw error;
    }
  }

  return {
    episodes,
    episodesNamesMap,
  };
};
