import { BrowserRouter, Route, Routes } from "react-router";

import Start from "./pages/Start";
import Rules from "./components/Rules";
import Games from "./pages/Game";
import WordCategory from "./components/WordCategory";
import GameProvider from "./contexts/GameProvider";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />

          <Route path="/category" element={<WordCategory />} />
          <Route path="/category/game" element={<Games />} />

          <Route path="/rules" element={<Rules />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
