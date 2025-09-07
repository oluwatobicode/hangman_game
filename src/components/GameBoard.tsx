import { useGameContext } from "../contexts/GameProvider";

const GameBoard = () => {
  const { secretWord, guessedLetters, displaySecretWord } = useGameContext();

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
    <div className="flex flex-col justify-between items-center w-full">
      <div className="flex mb-10 gap-[20px] mt-10">
        {displaySecretWord.map((el, i) => (
          <div key={i}>
            {el === "_" ? (
              <div className="shadow-[inset_0_-2px_0_3px_#140E66,inset_0_1px_0_6px_#3C74FF]  gap-[12px] lg:w-[112px] lg:h-[128px] md:w-[86.66px] md:h-[112px] w-[40px] h-[66px] lg:rounded-[40px] md:rounded-[32px] rounded-[12px] flex items-center justify-center bg-[#2463FF] opacity-25"></div>
            ) : (
              <div className="shadow-[inset_0_-2px_0_3px_#140E66,inset_0_1px_0_6px_#3C74FF]  gap-[12px] lg:w-[112px] lg:h-[128px] md:w-[86.66px] md:h-[112px] w-[40px] h-[66px] lg:rounded-[40px] md:rounded-[32px] rounded-[12px] flex items-center justify-center bg-[#2463FF]">
                <h1 className="text-white text-[40px] md:text-[64px] lg:text-[88px] leading-[120%] tracking-[5%]">
                  {el}
                </h1>
              </div>
            )}
          </div>
        ))}
      </div>

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
