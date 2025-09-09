import { useGameContext } from "../contexts/GameProvider";

/* 
  Option B: Smart Word Distribution
1 words - keep like this
2 words - break one up and below down
3 words - 2 words on top and 2 words below
5 words → 3 words top, 2 words bottom
6 words → 3 words per row
7 words → 4 words top, 3 words bottom
8 words → 4 words per row
  */

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
const createBalancedColumns = (words: string[]) => {
  console.log("debugging here:", words);
  const totalChars = words.join(" ").length;
  console.log("debugging here 2:", totalChars);
  const targetRows = totalChars / 2;
  console.log("target rows", targetRows);

  let currentRowChars = 0;
  let row1: string[] = [];
  let row2: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    //   this is for adding spaces if not first word in row
    const charsToAdd = word.length + (currentRowChars > 0 ? 1 : 0);

    // if adding this word would make row1 longer than row2,
    // put it and remaining words in row2
    if (currentRowChars > 0 && currentRowChars + charsToAdd > targetRows + 2) {
      // this puts the remaining word in row2
      row2 = words.slice(i);
      break;
    }

    row1.push(word);
    currentRowChars += charsToAdd;
  }

  return [row1, row2];
};

const DisplayWord = () => {
  const { secretWord, displaySecretWord } = useGameContext();

  const words = secretWord.split(" ");
  const [row1Words, row2Words] = createBalancedColumns(words);

  //   calculate where to split the display secret word array
  const row1Length = row1Words.join(" ").length;

  // split display secret word into tow arrays
  const row1Display = displaySecretWord.slice(0, row1Length);
  const row2Display = displaySecretWord.slice(row1Length + 1); // +1 to skip the space

  console.log("ROW 1 IS HERE:", row1Display);
  console.log("ROW 2 IS HERE:", row2Display);

  const renderLetters = (letterArray: string[]) => {
    return letterArray.map((el, i) => (
      <div key={i}>
        {el === " " && " "}

        {el === "_" && (
          <div className="shadow-[inset_0_-2px_0_3px_#140E66,inset_0_1px_0_6px_#3C74FF] lg:w-[112px] lg:h-[128px] md:w-[86.66px] md:h-[112px] w-[40px] h-[66px] lg:rounded-[40px] md:rounded-[32px] rounded-[12px] flex items-center justify-center bg-[#2463FF] opacity-25"></div>
        )}

        {el !== "_" && el !== " " && (
          <div className="shadow-[inset_0_-2px_0_3px_#140E66,inset_0_1px_0_6px_#3C74FF] lg:w-[112px] lg:h-[128px] md:w-[86.66px] md:h-[112px] w-[40px] h-[66px] lg:rounded-[40px] md:rounded-[32px] rounded-[12px] flex items-center justify-center bg-[#2463FF]">
            <h1 className="text-white text-[40px] md:text-[64px] lg:text-[88px] leading-[120%] tracking-[5%]">
              {el}
            </h1>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center md:gap-[16px] gap-[12px]">
      <div className="flex items-center justify-center lg:gap-[16px] md:gap-[12px] gap-[8px]">
        {renderLetters(row1Display)}
      </div>

      {row2Words.length > 0 && (
        <div className="flex items-center justify-center lg:gap-[16px] md:gap-[10px] gap-[8px]">
          {renderLetters(row2Display)}
        </div>
      )}
    </div>
  );
};

export default DisplayWord;
