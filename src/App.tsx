import { BrowserRouter, Route, Routes } from "react-router";

import Start from "./pages/Start";
import Rules from "./components/Rules";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/game" element={<GameBoard />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
