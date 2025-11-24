import { motion } from "framer-motion";
import { useGame } from "../contexts/GameProviderFinal";

const DisplayWord = () => {
  const { state, displaySecretWord } = useGame();
  const { secretWord } = state;

  console.log(secretWord);
  console.log(displaySecretWord);

  return (
    <div>
      <div>
        <div className="flex items-center justify-center lg:gap-[16px] md:gap-[12px] gap-[8px]">
          {displaySecretWord.split("").map((letter, index) => (
            <div className="" key={index}>
              {letter === " " && " "}

              {letter === "_" && (
                <div className="shadow-[inset_0_-2px_0_3px_#140E66,inset_0_1px_0_6px_#3C74FF]  w-[40px] h-[66px] rounded-[12px] md:w-[88px] lg:w-[112px] md:h-[128px] md:rounded-[32px] lg:rounded-[40px] flex items-center justify-center  bg-[#2463FF] opacity-25"></div>
              )}

              {letter !== " " && letter !== "_" && (
                <motion.div
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    bounceDamping: 20,
                    duration: 0.6,
                  }}
                  className="shadow-[inset_0_-2px_0_3px_#140E66,inset_0_1px_0_6px_#3C74FF] w-[40px] h-[66px] rounded-[12px] md:w-[88px] lg:w-[112px] md:h-[128px]  md:rounded-[32px] lg:rounded-[40px] flex items-center justify-center bg-[#2463FF]"
                >
                  <h1 className="text-white text-[40px] md:text-[64px] lg:text-[88px] leading-[120%] tracking-[5%]">
                    {letter}
                  </h1>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayWord;
