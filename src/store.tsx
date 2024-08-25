import React, { createContext, useContext, useState, ReactNode } from "react";

export interface MusicList {
  artistName: string;
  trackName: string;
  previewUrl: string;
  artworkUrl100: string;
  releaseDate: string;
}

interface MusicListContextProps {
  musicList: MusicList[];
  setMusicList: React.Dispatch<React.SetStateAction<MusicList[]>>;
  currentSongIndex: number;
  setCurrentSongIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const MusicListContext = createContext<
  MusicListContextProps | undefined
>(undefined);

export const MusicListProvider = ({ children }: { children: ReactNode }) => {
  const [musicList, setMusicList] = useState<MusicList[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  return (
    <MusicListContext.Provider
      value={{ musicList, setMusicList, currentSongIndex, setCurrentSongIndex }}
    >
      {children}
    </MusicListContext.Provider>
  );
};

export const useMusicList = () => {
  const context = useContext(MusicListContext);
  if (!context) {
    throw new Error("useMusicList must be used within a MusicListProvider");
  }
  return context;
};
