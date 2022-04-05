import { createContext, useContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

export type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

export const usePlayerContext = () => {
  const player = useContext(PlayerContext);

  return player;
}
