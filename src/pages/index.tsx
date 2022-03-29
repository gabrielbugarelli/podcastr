import type { GetStaticProps } from 'next'
import { getAllPodcasts } from '../service/homeService'

type PodcastType = {
  episodes: [
    {
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
  ]
}

const Home = ({episodes}: PodcastType) => {

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
  
  return {
    props: {
      episodes: data
    },

    revalidate: 60 * 60 * 8
  }
}
