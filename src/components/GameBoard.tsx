import { useGameContext } from "../contexts/GameProvider";
import { motion } from "framer-motion";

const GameBoard = () => {
  const { secretWord, guessedLetters, displaySecretWord, handleAlphabetClick } =
    useGameContext();

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  console.log(secretWord);

  console.log(alphabet);

  const secretWordMap = Array.from({ length: secretWord.length }, (_, i) =>
    String(65 + i)
  );

  console.log(secretWordMap);

  console.log(guessedLetters);
  console.log(displaySecretWord);

  return (
    <div>
      <div className="grid grid-cols-9 grid-rows-3 gap-[24px] items-center w-full">
        {alphabet.map((el, i) => (
          <motion.button
            disabled={guessedLetters.some(
              (guessed) => guessed.toLowerCase() === el.toLowerCase()
            )}
            whileTap={{ scale: 0.2 }}
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
            onClick={() => handleAlphabetClick(el)}
            className="lg:w-[109px] lg:h-[84px] md:w-[64px] md:h-[84px] w-[28.89px] h-[56px] md:rounded-[24px] rounded-[8px] bg-white hover:bg-[#2463FF] hover:text-white transform transition-colors duration-300 text-[#261676] md:text-[48px] text-[24px] cursor-pointer font-normal disabled:cursor-not-allowed disabled:opacity-[25%]"
            key={i}
          >
            {el}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
