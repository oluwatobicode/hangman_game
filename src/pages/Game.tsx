import DisplayWord from "../components/DisplayWord";
import GameBoard from "../components/GameBoard";
import Navbar from "../components/Navbar";

const Game = () => {
  return (
    <main className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A043A] via-[#151278] to-[#2b00c7]"></div>
      <div className="absolute inset-0 bg-[url('/images/background-mobile.svg')] md:bg-[url('/images/background-desktop.svg')] lg:bg-[url('/images/background-desktop.svg')] bg-cover bg-center bg-no-repeat opacity-50"></div>
      <div className="flex flex-col items-center justify-center relative z-10 w-full max-w-7xl px-2">
        <Navbar />
        <div className="flex flex-col justify-between items-center lg:gap-[120px] w-full">
          <DisplayWord />
          <GameBoard />
        </div>
      </div>
    </main>
  );
};

export default Game;
