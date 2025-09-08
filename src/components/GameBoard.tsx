import { useGameContext } from "../contexts/GameProvider";

const GameBoard = () => {
  const { secretWord, guessedLetters, displaySecretWord } = useGameContext();

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  console.log(secretWord);

  /* 
  Strategy A: Even Split

2 words → 1 word per row
3 words → 2 words first row, 1 word second row
4 words → 2 words per row
5+ words → distribute as evenly as possible

Split displaySecretWord back into words
Group words into rows using your chosen strategy
Render each row as a separate flex/grid container
Each word within a row flows naturally
  */

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
          <button
            // disabled={true}
            className="lg:w-[109px] lg:h-[84px] md:w-[64px] md:h-[84px] w-[28.89px] h-[56px] md:rounded-[24px] rounded-[8px] bg-white hover:bg-[#2463FF] hover:text-white transform transition-colors duration-300 text-[#261676] md:text-[48px] text-[24px] cursor-pointer font-normal disabled:cursor-not-allowed disabled:opacity-[25%]"
            key={i}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
