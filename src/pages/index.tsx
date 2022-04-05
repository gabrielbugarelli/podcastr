import type { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import ptBR from 'date-fns/locale/pt-BR';
import { getAllPodcasts } from '../services/homeService';
import { convertDurationToTimeString } from '../utils/convertionDurationToTimeString';

import styles from './home.module.scss';
import { usePlayerContext } from '../contexts/PlayerContext';

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

  const { play } = usePlayerContext();

  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

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
                  <Link href={`/episodes/${episode.id}`}>
                    <a target="_blank">{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" onClick={() => play(episode)}>
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos os episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map(episode => {
              return (
                <tr key={episode.id}>
                  <td>
                    <img src={episode.thumbnail} alt={episode.title} width={120} />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a target="_blank">{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{width: 100}} >{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button"> 
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
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
