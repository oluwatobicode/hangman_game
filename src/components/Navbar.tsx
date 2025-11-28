import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import { useGame } from "../contexts/GameProviderFinal";
import { useParams } from "react-router";
import HintModal from "./HintModal";

const Navbar = () => {
  const { category } = useParams();

  const { state, showMenu, showHint } = useGame();

  console.log(state.showMenu);

  const toggleMenu = () => {
    showMenu(true);
  };

  const toggleHint = () => {
    showHint(true);
    console.log(state.showHint);
  };

  const healthPercentage =
    state.maxPlayerHealth > 0
      ? (state.playerHealth / state.maxPlayerHealth) * 100
      : 0;

  console.log(healthPercentage);

  return (
    <nav className="w-full flex items-center">
      <div className="flex mt-5 items-center justify-center mr-auto gap-[16px] md:gap-[32px] lg:gap-[57px]">
        <motion.button
          onClick={toggleMenu}
          whileHover={{ scale: 0.8 }}
          whileTap={{ scale: 0.8 }}
          className="cursor-pointer w-[40px] h-[40px] md:w-[64px] md:h-[64px] lg:w-[94px] lg:h-[94px] flex items-center justify-center rounded-full shadow-[inset_0_-6px_0_7px_rgba(157,45,245,0.25)] bg-gradient-to-b from-[#FE71FE] to-[#7199FF]"
        >
          <img
            className="w-[16.17px] h-[13.62px] md:w-[25.87px] md:h-[21.79px] lg:w-[38px] lg:h-[32px]"
            src="/images/icon-menu.svg"
            alt="menu icon"
          />
        </motion.button>

        <h1 className="lg:text-[88px] md:text-[48px] text-[40px] md:tracking-[5%] leading-[-0.5%] md:leading-[120%] text-white">
          {category?.toUpperCase().split("-").join(" ")}
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-[16px] md:gap-[40px]">
        <button
          onClick={toggleHint}
          // Disable if: 1. They used the hint OR 2. Game is not active
          disabled={state.usedHint || state.gameStatus !== "playing"}
          className="
    bg-white/20 text-white border-2 border-white
    rounded-full px-6 py-2 text-[20px] font-bold transition-all duration-200
    hover:bg-white hover:text-[#2463FF] 
    disabled:opacity-50 
    disabled:cursor-not-allowed 
    disabled:hover:bg-white/20 
    disabled:hover:text-white
  "
        >
          {state.usedHint ? "Hint Used" : "Hint?"}
        </button>

        <div className="w-[57px] relative h-[16px] md:w-[160px] md:h-[31px] lg:max-w-full lg:h-[31px]  rounded-[96px] bg-white">
          <div
            className="absolute lg:h-[13px] md:h-[13px] h-[8px] transform translate-y-1 translate-x-1 md:translate-y-2.5 md:translate-x-2.5 bg-[#261676] rounded-[96px] transition-all duration-300 ease-out"
            style={{ width: `${healthPercentage}%` }}
          ></div>
        </div>

        <div>
          <img
            className="w-[26.16px] h-[24px] md:w-[53.33px] md:h-[48.93px]"
            src="/images/icon-heart.svg"
            alt="Heart Icon"
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {(state.gameStatus === "won" ||
          state.gameStatus === "lost" ||
          state.gameStatus === "paused") && <Modal />}
      </AnimatePresence>

      <AnimatePresence>{state.showHint && <HintModal />}</AnimatePresence>
    </nav>
  );
};

export default Navbar;
