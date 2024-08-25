import { Toaster } from "react-hot-toast";
import "./App.css";
import MusicCard from "./components/MusicCard";
import SearchBox from "./components/SearchBox";
import { useState } from "react";

function App() {
  const [play, setPlay] = useState(true);

  return (
    <>
      {" "}
      <Toaster />{" "}
      <nav className="flex justify-between items-center p-5 bg-gray-800 shadow-lg">
        <div className="flex items-center space-x-3">
          <img src="../public/logo.jpeg" alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">MelodyNest</span>
        </div>
        <div className="flex space-x-4">
          <a
          target="_blank"
            href="https://kayumkhan-sayal.netlify.app/"
            className="text-lg font-semibold hover:text-gray-400"
          >
            About Me
          </a>
        </div>
      </nav>
      <div className="flex items-center justify-center bg-slate-600 flex-col lg:flex-row">
        <div className="lg:w-[50%] flex items-center justify-center h-screen ">
          <SearchBox setPlay={setPlay} />
        </div>
        <div className="lg:w-[50%] flex items-center justify-center  h-screen">
          <MusicCard play={play} setPlay={setPlay} />
        </div>
      </div>
    </>
  );
}

export default App;
