import type { GetStaticProps } from 'next'
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { getAllPodcasts } from '../service/homeService'
import { convertDurationToTimeString } from '../utils/convertionDurationToTimeString';

import styles from './home.module.scss';

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
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

const Home = ({latestEpisodes, allEpisodes}: HomeProps) => {

  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Útilmos lançamentos</h2>

        <ul>
          {latestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <img
                  src={episode.thumbnail} 
                  alt={episode.title} 
                  width={192}
                  height={192}
                />

                <div className={styles.episodesDetails}>
                  <a href="#">{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        
      </section>
    </div>
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

  const latestEpisodes = episodes.slice(0, 2); // pega os dois últimos episódios;
  const allEpisodes = episodes.slice(2, episodes.length); // pega todos os episódios restantes;

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },

    revalidate: 60 * 60 * 8 // recompila a página estática a cada oito horas
  }
}
