import { useGameContext } from "../contexts/GameProvider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGame } from "../contexts/GameProviderFinal";
import { useParams } from "react-router";

const createBalancedColumns = (words: string[]) => {
  // console.log("debugging here:", words);
  const totalChars = words.join(" ").length;
  // console.log("debugging here 2:", totalChars);
  const targetRows = totalChars / 2;
  // console.log("target rows", targetRows);

  let currentRowChars = 0;
  let row1: string[] = [];
  let row2: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const charsToAdd = word.length + (currentRowChars > 0 ? 1 : 0);

    if (currentRowChars > 0 && currentRowChars + charsToAdd > targetRows + 2) {
      row2 = words.slice(i);
      break;
    }

    row1.push(word);
    currentRowChars += charsToAdd;
  }

  return [row1, row2];
};

const DisplayWord = () => {
  const { secretWord, displaySecretWord, gameState } = useGameContext();
  const [screenSize, setScreenSize] = useState("lg");

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize("sm");
      else if (width < 1024) setScreenSize("md");
      else setScreenSize("lg");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // console.log("this is the game-state from the local-storage", gameState);

  const words = secretWord.split(" ");
  const [row1Words, row2Words] = createBalancedColumns(words);

  const row1Length = row1Words.join(" ").length;
  const row1Display = displaySecretWord.slice(0, row1Length);
  const row2Display = displaySecretWord.slice(row1Length + 1);

  // console.log("ROW 1 IS HERE:", row1Display);
  // console.log("ROW 2 IS HERE:", row2Display);

  const getResponsiveSizes = (rowDisplay: string[]) => {
    const letterCount = rowDisplay.filter((el) => el !== " ").length;
    const screenWidth = window.innerWidth;
    const availableWidth = screenWidth * 0.9;

    let letterWidth, letterHeight, gap, fontSize, borderRadius;

    if (screenSize === "lg") {
      letterWidth = Math.min(
        112,
        (availableWidth - (letterCount - 1) * 16) / letterCount
      );
      letterHeight = Math.min(128, letterWidth * 1.14);
      gap = 16;
      fontSize = Math.min(88, letterWidth * 0.78);
      borderRadius = Math.min(40, letterWidth * 0.36);
    } else if (screenSize === "md") {
      letterWidth = Math.min(
        86.66,
        (availableWidth - (letterCount - 1) * 12) / letterCount
      );
      letterHeight = Math.min(112, letterWidth * 1.29);
      gap = 12;
      fontSize = Math.min(64, letterWidth * 0.74);
      borderRadius = Math.min(32, letterWidth * 0.37);
    } else {
      letterWidth = Math.min(
        40,
        (availableWidth - (letterCount - 1) * 8) / letterCount
      );
      letterHeight = Math.min(66, letterWidth * 1.65);
      gap = 8;
      fontSize = Math.min(40, letterWidth * 1);
      borderRadius = Math.min(12, letterWidth * 0.3);
    }

    return {
      letterWidth: Math.max(letterWidth, 24),
      letterHeight: Math.max(letterHeight, 32),
      gap: Math.max(gap, 4),
      fontSize: Math.max(fontSize, 16),
      borderRadius: Math.max(borderRadius, 6),
    };
  };

  const { state } = useGame();

  const { category } = useParams();

  console.log(category);

  console.log("testing waters:", state);

  const renderLetters = (letterArray: string[], rowIndex: number) => {
    const sizes = getResponsiveSizes(letterArray);

    return letterArray.map((el, i) => (
      <div key={`${rowIndex}-${i}`}>
        {el === " " && " "}

        {el === "_" && (
          <div
            className="shadow-[inset_0_-2px_0_3px_#140E66,inset_0_1px_0_6px_#3C74FF] flex items-center justify-center bg-[#2463FF] opacity-25"
            style={{
              width: `${sizes.letterWidth}px`,
              height: `${sizes.letterHeight}px`,
              borderRadius: `${sizes.borderRadius}px`,
            }}
          ></div>
        )}

        {el !== "_" && el !== " " && (
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              bounceDamping: 20,
              duration: 0.6,
            }}
            className="shadow-[inset_0_-2px_0_3px_#140E66,inset_0_1px_0_6px_#3C74FF] flex items-center justify-center bg-[#2463FF]"
            style={{
              width: `${sizes.letterWidth}px`,
              height: `${sizes.letterHeight}px`,
              borderRadius: `${sizes.borderRadius}px`,
            }}
          >
            <h1
              className="text-white leading-[120%] tracking-[5%]"
              style={{ fontSize: `${sizes.fontSize}px` }}
            >
              {el}
            </h1>
          </motion.div>
        )}
      </div>
    ));
  };

  const row1Sizes = getResponsiveSizes(row1Display);
  const row2Sizes =
    row2Words.length > 0 ? getResponsiveSizes(row2Display) : row1Sizes;

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className="flex items-center justify-center"
        style={{ gap: `${row1Sizes.gap}px` }}
      >
        {renderLetters(row1Display, 0)}
      </div>

      {row2Words.length > 0 && (
        <div
          className="flex items-center justify-center"
          style={{ gap: `${row2Sizes.gap}px` }}
        >
          {renderLetters(row2Display, 1)}
        </div>
      )}
    </div>
  );
};

export default DisplayWord;
