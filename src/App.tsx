import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./contexts/AuthProvider";
import { GameProviderFinal } from "./contexts/GameProviderFinal";

import Start from "./pages/Start";
import Rules from "./components/Rules";
import WordCategory from "./components/WordCategory";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Play from "./components/Play";
import ProtectedRoutes from "./ui/ProtectedRoutes";

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
              <Route path="/rules" element={<Rules />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoutes>
                    <Profile />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoutes>
                    <Leaderboard />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/category"
                element={
                  <ProtectedRoutes>
                    <WordCategory />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/category/game/:category"
                element={
                  <ProtectedRoutes>
                    <Play />
                  </ProtectedRoutes>
                }
              />
            </Routes>
          </BrowserRouter>
        </GameProviderFinal>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
