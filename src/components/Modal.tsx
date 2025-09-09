import { useNavigate } from "react-router";
import { useGameContext } from "../contexts/GameProvider";

const Modal = () => {
  const navigate = useNavigate();
  const { setShowMenu, gameStatus, setGameStatus } = useGameContext();

  const quiteGame = () => {
    navigate("/");
  };

  const handleNewCategory = () => {
    navigate("/category");
  };

  const handleContinue = () => {
    console.log("continue");
    setShowMenu(false);
    setGameStatus("playing");
  };

  return (
    <div
      onClick={handleContinue}
      className="inset bg-black/50 z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="lg:w-[592px] flex items-center justify-center relative lg:h-[445px] md:w-[592px] md:h-[445px] w-[324px] h-[445px] md:rounded-[72px] rounded-[48px] bg-gradient-to-b from-[#344ABA]/100 to-[#001479]/83 shadow-[inset_0_-8px_0_4px_#140E66,inset_0_6px_0_8px_#2463ff]">
        <div className="absolute md:-top-20 -top-14 w-full text-center">
          <h1 className="text-[94px] text-center md:text-[134px] lg:text-[134px] font-medium text-transparent leading-[120%] -tracking-[0.5%] flex-1">
            <span className="bg-gradient-to-b from-[#67B6FF] to-white bg-clip-text">
              {gameStatus === "won" && "YOU WON!"}
              {gameStatus === "lost" && "YOU LOSE!"}
              {gameStatus === "paused" && "PAUSED"}
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          <button
            onClick={handleContinue}
            className="lg:w-[226px] lg:h-[62px] lg:rounded-[40px] bg-blue shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] text-white lg:text-[32px] tracking-[5%] leading-[120%] cursor-pointer md:w-[226px] md:h-[62px] md:rounded-[40px] w-[226px] h-[62px] rounded-[40px] bg-[#2463FF]"
          >
            CONTINUE
          </button>
          <button
            onClick={handleNewCategory}
            className="lg:w-[275px] lg:h-[62px] lg:rounded-[40px] bg-blue shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] text-white lg:text-[32px] tracking-[5%] leading-[120%] cursor-pointer md:w-[275px] md:h-[62px] md:rounded-[40px] w-[275px] h-[62px] rounded-[40px] bg-[#2463FF]"
          >
            NEW CATEGORY
          </button>
          <button
            onClick={quiteGame}
            className="lg:w-[235px] lg:h-[62px] md:w-[235px] md:h-[62px] w-[235px] h-[62px] rounded-[40px] bg-linear-to-r from-[#FE71FE] to-[#7199FF] shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#C642FB] text-white lg:text-[32px] tracking-[5%] leading-[120%] cursor-pointer"
          >
            QUIT GAME
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
