import { motion } from "framer-motion";
import { useGame } from "../contexts/GameProviderFinal";

const DisplayWord = () => {
  const { displaySecretWord } = useGame();

  if (!displaySecretWord) return null;

  return (
    <div className="w-full px-4 flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-2 md:gap-x-3 lg:gap-x-4 max-w-[900px]">
        {displaySecretWord.split("").map((letter, index) => {
          if (letter === " ") {
            return (
              <div key={index} className="w-4 md:w-8 lg:w-10 h-1 shrink-0" />
            );
          }

          return (
            <div key={index} className="relative">
              {letter === "_" && (
                <div
                  className="
                    shadow-[inset_0_-2px_0_3px_#140E66,inset_0_1px_0_6px_#3C74FF] 
                    bg-[#2463FF] opacity-25
                    flex items-center justify-center
                    
                    /* Responsive Sizing */
                    w-[40px] h-[66px] rounded-[12px]
                    md:w-[88px] md:h-[128px] md:rounded-[32px]
                    lg:w-[112px] lg:h-[140px] lg:rounded-[40px]
                  "
                ></div>
              )}

              {letter !== "_" && (
                <motion.div
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    bounceDamping: 20,
                    duration: 0.6,
                  }}
                  className="
                    shadow-[inset_0_-2px_0_3px_#140E66,inset_0_1px_0_6px_#3C74FF] 
                    bg-[#2463FF]
                    flex items-center justify-center

                    /* Responsive Sizing (Matches underscore above) */
                    w-[40px] h-[66px] rounded-[12px]
                    md:w-[88px] md:h-[128px] md:rounded-[32px]
                    lg:w-[112px] lg:h-[140px] lg:rounded-[40px]
                  "
                >
                  <h1 className="text-white font-bold text-[32px] md:text-[64px] lg:text-[88px] leading-none">
                    {letter}
                  </h1>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayWord;
