import axios from "axios";

const url = 'http://localhost:3333/episodes';

type EpisodeType = {
  id: string,
  title: string,
  members: string,
  published_at: string,
  thumbnail: string,
  description: string,
  file: {
    url: string,
    type: string,
    duration: number
  }
};

export const getEpisodeById = (id: string | string[]): Promise<EpisodeType> => {
  return new Promise( async (resolve, _) => {
    const response = await axios.get(`${url}/${id}`);

    resolve(response.data);
  });
};
