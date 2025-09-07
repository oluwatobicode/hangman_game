import { useGameContext } from "../contexts/GameProvider";

const GameBoard = () => {
  const { secretWord } = useGameContext();

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  console.log(secretWord);

  console.log(alphabet);

  const secretWordMap = Array.from({ length: secretWord.length }, (_, i) =>
    String(65 + i)
  );

  const displaySecretWord = secretWord.split("").map((letter) => {
    return letter;
  });

  console.log(displaySecretWord);

  console.log(secretWordMap);

  return (
    <div className="flex flex-col justify-between items-center w-full">
      <div>{secretWord}</div>

      <div className="grid grid-cols-9 grid-rows-3 gap-[24px] items-center w-full">
        {alphabet.map((el, i) => (
          <button
            // disabled={true}
            className="lg:w-[109px] lg:h-[84px] md:w-[64px] md:h-[84px] w-[28.89px] h-[56px] md:rounded-[24px] rounded-[8px] bg-white text-[#261676] md:text-[48px] text-[24px] cursor-pointer font-normal disabled:cursor-not-allowed disabled:opacity-[25%]"
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
