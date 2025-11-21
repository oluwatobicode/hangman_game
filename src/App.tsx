import { BrowserRouter, Route, Routes } from "react-router";

import Start from "./pages/Start";
import Rules from "./components/Rules";
import Games from "./pages/Game";
import WordCategory from "./components/WordCategory";
import GameProvider from "./contexts/GameProvider";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./contexts/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Leaderboard from "./pages/Leaderboard";
import GameProviderFinal from "./contexts/GameProviderFinal";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GameProviderFinal>
          <GameProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/category" element={<WordCategory />} />
                <Route path="/category/game/:category" element={<Games />} />

                <Route path="/rules" element={<Rules />} />
              </Routes>
            </BrowserRouter>
          </GameProvider>
        </GameProviderFinal>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
