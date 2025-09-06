import { BrowserRouter, Route, Routes } from "react-router";

import Start from "./pages/Start";
import Rules from "./components/Rules";
import GameBoard from "./components/GameBoard";
import WordCategory from "./components/WordCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/category" element={<WordCategory />} />
        <Route path="/category/game" element={<GameBoard />} />

        <Route path="/rules" element={<Rules />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
