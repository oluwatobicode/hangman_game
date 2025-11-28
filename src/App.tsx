import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./contexts/AuthProvider";
import { GameProviderFinal } from "./contexts/GameProviderFinal";
import { Toaster } from "react-hot-toast";

import Start from "./pages/Start";
import Rules from "./components/Rules";
import WordCategory from "./components/WordCategory";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Play from "./components/Play";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProvider>
        <GameProviderFinal>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/category" element={<WordCategory />} />
              <Route path="/category/game/:category" element={<Play />} />

              <Route path="/rules" element={<Rules />} />
            </Routes>
          </BrowserRouter>
        </GameProviderFinal>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
