import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Player } from '../components/Player';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [ episodeList, setEpisodeList ] = useState([]);
  const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0);

  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
