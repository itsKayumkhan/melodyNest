import { useRef, useState, useCallback, useEffect } from "react";
import { useMusicList } from "../store";

const MusicCard = ({ play, setPlay }: { play: boolean; setPlay: (flag: boolean) => void }) => {
  const currentSongRef = useRef<HTMLAudioElement>(null);
  const { musicList, currentSongIndex, setCurrentSongIndex } = useMusicList();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlay = useCallback((flag: boolean) => {
    if (currentSongRef.current) {
      if (flag) {
        currentSongRef.current.play();
      } else {
        currentSongRef.current.pause();
      }
      setPlay(flag);
    }
  }, [setPlay]);

  const handlePrevious = useCallback(() => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  }, [currentSongIndex, setCurrentSongIndex]);

  const handleNext = useCallback(() => {
    if (currentSongIndex < musicList.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  }, [currentSongIndex, musicList.length, setCurrentSongIndex]);

  const handleTimeUpdate = useCallback(() => {
    if (currentSongRef.current) {
      setCurrentTime(currentSongRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (currentSongRef.current) {
      setDuration(currentSongRef.current.duration);
    }
  }, []);

  const handleSeek = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (currentSongRef.current) {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - left;
      const newTime = (clickX / width) * duration;
      currentSongRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    if (currentSongRef.current && play) {
      currentSongRef.current.play();
    }
  }, [currentSongIndex, play]);

  return (
    <>
      <audio
        ref={currentSongRef}
        src={musicList[currentSongIndex]?.previewUrl}
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>

      <div className="w-full flex justify-center h-screen">
        <div className="mt-6 sm:mt-10 relative z-10 rounded-xl shadow-xl h-[70%]">
          <div className="bg-white border-slate-100 transition-all duration-500 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8 h-full">
            <div className="flex items-center space-x-4 flex-col">
              <img
                src="https://tailwindcss.com/_next/static/media/full-stack-radio.afb14e4e.png"
                loading="lazy"
                decoding="async"
                alt="musicPic"
                className="flex-none rounded-lg bg-slate-100"
                width={220}
              />
              <div className="min-w-0 flex-auto space-y-1 font-semibold">
                <p className="text-cyan-500 truncate transition-all duration-500 dark:text-cyan-400 text-sm leading-6 mt-12">
                  {musicList[currentSongIndex]?.artistName}
                </p>
                <p className="text-slate-900 truncate transition-all duration-500 dark:text-slate-50 text-lg">
                  {musicList[currentSongIndex]?.trackName}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative" onClick={handleSeek}>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 dark:bg-cyan-400 h-2"
                    role="progressbar"
                    aria-label="music progress"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <div
                  className="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute left-[calc(100% * (currentTime / duration))] top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
                </div>
              </div>
              <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                <div className="text-cyan-500 dark:text-slate-100">{formatTime(currentTime)}</div>
                <div className="text-slate-500 dark:text-slate-400">{formatTime(duration)}</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-200 rounded-b-xl flex items-center">
            <div className="   flex-auto flex items-center justify-evenly">
              <button type="button" aria-label="Add to favorites" className="hidden sm:block">
                <svg width={24} height={24}>
                  <path
                    d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className=""
                aria-label="Previous"
                onClick={handlePrevious}
              >
                <svg width={24} height={24} fill="none">
                  <path
                    d="m10 12 8-6v12l-8-6Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6v12"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <button
              type="button"
              className="bg-white text-slate-900 text-2xl dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
              onClick={() => handlePlay(!play)}
            >
              {play ? <i className="ri-pause-large-fill" /> : <i className="ri-play-large-fill" />}
            </button>
            <div className="flex-auto flex items-center justify-evenly">
              <button
                type="button"
                className=""
                aria-label="Next"
                onClick={handleNext}
              >
                <svg width={24} height={24} fill="none">
                  <path
                    d="M14 12 6 6v12l8-6Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 6v12"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className=" hidden sm:block rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500"
              >
                1x
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default MusicCard;
