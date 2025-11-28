import DisplayWord from "../components/DisplayWord";
import GameBoard from "../components/GameBoard";
import Navbar from "../components/Navbar";

const Game = () => {
  return (
    <main className="min-h-screen w-full flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A043A] via-[#151278] to-[#2b00c7] z-0"></div>
      <div className="absolute inset-0 bg-[url('/images/background-mobile.svg')] md:bg-[url('/images/background-desktop.svg')] bg-cover bg-center bg-no-repeat opacity-50 z-0"></div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col">
        <div className="pt-6 md:pt-10 shrink-0">
          <Navbar />
        </div>

        <div className="flex-1 flex flex-col items-center justify-evenly w-full pb-6 md:pb-10">
          <div className="flex-1 flex items-center justify-center w-full my-10">
            <DisplayWord />
          </div>

          <div className="shrink-0 w-full flex justify-center">
            <GameBoard />
          </div>
        </div>
        <h3 className="text-center text-white tracking-[3px] cursor-pointer mb-10">
          <a href="https://oluwatobii.xyz" target="_blank">
            Built by Coding Ninja 🥷🏾
          </a>
        </h3>
      </div>
    </main>
  );
};

export default Game;
