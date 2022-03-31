import axios from 'axios';

const url = 'http://localhost:3333/episodes';

type PodcastType = {
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
}

export const getAllPodcasts = (): Promise<PodcastType[]> => {
  return new Promise( async (resolve, _) => {
    const response = await axios.get(url, {
      params: {
        _limit: 12,
        _sort: 'published_at',
        _order: 'desc'
      }
    });
    resolve(response.data);
  })
}
