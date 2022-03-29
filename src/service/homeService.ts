import axios from 'axios';

const url = 'http://localhost:3333/episodes';

export const getAllPodcasts = () => {
  return new Promise( async (resolve, _) => {
    const response = await axios.get(url);
    resolve(response.data);
  })
}
