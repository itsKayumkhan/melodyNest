import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import 'remixicon/fonts/remixicon.css'
import "./index.css";
import { MusicListProvider } from "./store.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <MusicListProvider>
    <App />
  </MusicListProvider>
);
 