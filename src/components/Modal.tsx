import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../contexts/GameProviderFinal";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import React from "react";

interface Achievement {
  achievementId: string;
  name: string;
  description: string;
  icon: string;
  rarity: string;
  points: number;
}

const Modal: React.FC = () => {
  const navigate = useNavigate();
  const { state, showMenu, gameReset, playAgain } = useGame();
  const { width, height } = useWindowSize();
  const { category } = useParams();

  const newAchievements: Achievement[] =
    (state.gameStatus === "won" ? state.gameEnd?.newAchievements : []) || [];

  const quiteGame = () => {
    gameReset();
    navigate("/");
  };

  const playAgainGame = () => {
    if (category) {
      playAgain({ category });
      showMenu(false);
    }
  };

  const handleNewCategory = () => {
    gameReset();
    navigate("/category");
  };

  const handleContinue = () => {
    showMenu(false);
  };

  return (
    <div
      onClick={handleContinue}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      {state.gameStatus === "won" && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
        />
      )}

      <AnimatePresence>
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { type: "spring", duration: 0.5 },
          }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative flex flex-col items-center justify-center
            w-[90%] max-w-[324px] md:max-w-[592px]
            min-h-[445px] h-auto
            py-12 md:py-16
            rounded-[48px] md:rounded-[72px]
            bg-gradient-to-b from-[#344ABA] to-[#001479]/83
            shadow-[inset_0_-8px_0_4px_#140E66,inset_0_6px_0_8px_#2463ff]
          "
        >
          <div className="absolute -top-14 md:-top-20 w-full text-center z-20">
            <h1 className="text-[80px] sm:text-[94px] md:text-[134px] font-medium leading-[100%] -tracking-[0.5%] drop-shadow-2xl">
              <span className="bg-gradient-to-b from-[#67B6FF] to-white bg-clip-text text-transparent">
                {state.gameStatus === "won" && "YOU WON!"}
                {state.gameStatus === "lost" && "YOU LOSE!"}
                {state.gameStatus === "paused" && "PAUSED"}
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-center w-full gap-8 mt-4">
            {state.gameStatus === "won" && newAchievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full px-6 flex flex-col items-center"
              >
                <div className="bg-[#140E66]/40 border border-[#3C74FF]/50 rounded-3xl p-4 w-full max-w-md backdrop-blur-md">
                  <h3 className="text-[#67B6FF] text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3">
                    Unlocked Achievements
                  </h3>

                  <div className="flex flex-wrap justify-center gap-2">
                    {newAchievements.map((ach, i) => (
                      <motion.div
                        key={ach.achievementId || i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="
                           flex items-center gap-2 
                           bg-white text-[#2463FF] 
                           px-3 py-1.5 md:px-4 md:py-2 
                           rounded-full 
                           text-xs md:text-sm font-bold 
                           shadow-md
                         "
                      >
                        <span className="text-sm md:text-base">{ach.icon}</span>
                        <span>{ach.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex flex-col items-center gap-4 w-full px-4">
              {state.gameStatus === "won" && (
                <MenuButton
                  onClick={playAgainGame}
                  text="PLAY AGAIN"
                  variant="blue"
                />
              )}

              {state.gameStatus === "paused" && (
                <MenuButton
                  onClick={handleContinue}
                  text="CONTINUE"
                  variant="blue"
                />
              )}

              <MenuButton
                onClick={handleNewCategory}
                text="NEW CATEGORY"
                variant="blue"
              />

              <MenuButton onClick={quiteGame} text="QUIT GAME" variant="pink" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

interface MenuButtonProps {
  onClick: () => void;
  text: string;
  variant: "blue" | "pink";
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick, text, variant }) => {
  const isBlue = variant === "blue";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`
        relative overflow-hidden cursor-pointer
        flex items-center justify-center
        w-full max-w-[226px] h-[56px] md:h-[62px] lg:max-w-[275px]
        rounded-[40px]
        text-[20px] md:text-[28px] lg:text-[32px] 
        text-white tracking-[5%] leading-[120%]
        ${
          isBlue
            ? "bg-[#2463FF] shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF]"
            : "bg-gradient-to-r from-[#FE71FE] to-[#7199FF] shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#C642FB]"
        }
      `}
    >
      {text}
    </motion.button>
  );
};

export default Modal;
