import type { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { getAllPodcasts } from '../service/homeService'
import { convertDurationToTimeString } from '../utils/convertionDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  episodes: Episode[];
}

const Home = ({episodes}: HomeProps) => {

  return (
    <>
      {episodes.map(item => {
        return (
          <h1 key={item.id}>
            {item.title}
          </h1>
        )
      })}
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPodcasts();

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    }
  });

  return {
    props: {
      episodes
    },

    revalidate: 60 * 60 * 8
  }
}
