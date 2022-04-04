import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getEpisodeById } from "../../services/episodeService";
import { convertDurationToTimeString } from "../../utils/convertionDurationToTimeString";

import styles from './episode.module.scss';

type PodcastType = {
  id: string,
  title: string,
  thumbnail: string,
  description: string,
  members: string,
  publishedAt: string,
  duration: number,
  durationAsString: string,
  url: string
}

type EpisodeProps = {
  episode: PodcastType;
}

const Episode = ( { episode }: EpisodeProps ) => {

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title}</title>
      </Head>

      <div className={styles.thumbnailContainer}>
      <Link href="/">
        <button type="button">
          <img src="/arrow-left.svg" alt="Voltar" />
        </button>
      </Link>

        <img src={episode.thumbnail} alt={episode.title} />

        <button type="button">
          <img src="/play.svg" alt="Tocar Episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div 
        className={styles.description} 
        dangerouslySetInnerHTML={{__html: episode.description}}
      />
    </div>
  )
}

export default Episode;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ( { params } ) => {
  const { slug } = params;
  const data = await getEpisodeById(slug);
  
  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    description: data.description,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
