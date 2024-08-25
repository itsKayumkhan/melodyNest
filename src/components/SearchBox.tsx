import axios from "axios";
import { useMusicList } from "../store";
import toast from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

const SearchBox = ({ setPlay }: { setPlay: (flag: boolean) => void }) => {
  const { musicList, setMusicList, setCurrentSongIndex, currentSongIndex } = useMusicList();
  const [searchQuery, setSearchQuery] = useState("Ajit Singh");

  const fetchMusic = useCallback(
    async (query: string) => {
      try {
        const {
          data: { results: songsList },
        } = await axios(`https://itunes.apple.com/search?term=${query}`);
        setMusicList(songsList || []);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching music list");
      }
    },
    [setMusicList]
  );

  const debouncedFetchMusic = useCallback(
    debounce((query: string) => fetchMusic(query), 300),
    [fetchMusic]
  );

  useEffect(() => {
    if (searchQuery) {
      debouncedFetchMusic(searchQuery);
    } else {
      setMusicList([]);
    }
  }, [searchQuery, debouncedFetchMusic, setMusicList]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="w-[80%] lg:max-w-screen-xl lg:mx-auto px-6 h-[80%]">
        <div className="w-full flex justify-center p-4 px-3 py-10 h-full overflow-hidden ">
          <div className="w-[90%] h-full">
            <div className="bg-slate-500 shadow-md rounded-lg px-3 py-2 mb-4 h-full w-full">
              <div className="block text-white text-lg font-semibold py-2 px-2">Search</div>
              <div className="flex items-center bg-gray-200 rounded-md">
                <input
                  className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                  id="search"
                  type="text"
                  placeholder="Type song name"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="pe-2 cursor-pointer">
                  <svg
                    className="fill-current text-gray-500 w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                    />
                  </svg>
                </div>
              </div>
              <div className="py-3 text-sm overflow-y-scroll h-[80%] scrollbar-hide">
                {musicList?.map((music, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setCurrentSongIndex(i);
                      setPlay(true);
                    }}
                    className={`h-12 flex justify-start cursor-pointer rounded-md py-2 my-2 w-full ${
                      currentSongIndex === i
                        ? "text-cyan-500 bg-slate-100"
                        : "text-white hover:text-cyan-500 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex-grow font-medium px-2 line-clamp-1 w-[70%] text-left">
                      {music.trackName}
                    </div>
                    <div className="text-sm font-normal text-gray-500 tracking-wide line-clamp-1 w-[30%] text-right truncate">
                      {music.artistName}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
