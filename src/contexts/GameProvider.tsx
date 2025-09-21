import wordData from "../data/data.json";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";

interface GameState {
  displaySecretWord: string[];
  secretWord: string;
  setSecretWord: Dispatch<SetStateAction<string>>;
  category: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  gameStatus: "paused" | "playing" | "won" | "lost" | "setup";
  setGameStatus: Dispatch<
    SetStateAction<"playing" | "won" | "lost" | "paused" | "setup">
  >;
  guessedLetters: string[];
  setGuessedLetters: Dispatch<SetStateAction<string[]>>;
  playerHealth: number;
  setPlayerHealth: Dispatch<SetStateAction<number>>;
  maxPlayerHealth: number;
  handleAlphabetClick: (letter: string) => void;
  resetGame: () => void; // Added reset function
  gameState: {};
}

const GameContext = createContext<GameState | undefined>(undefined);

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("Hangman-game-state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state from local storage");
    return undefined;
  }
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const maxPlayerHealth = 100;
  const initialGameState = loadState();

  const [secretWord, setSecretWord] = useState<string>(
    initialGameState?.secretWord || ""
  );
  const [category, setSelectedCategory] = useState<string>(
    initialGameState?.category || ""
  );
  const [guessedLetters, setGuessedLetters] = useState<Array<string>>(
    initialGameState?.guessedLetters || []
  );
  const [showMenu, setShowMenu] = useState<boolean>(
    initialGameState?.showMenu || false
  );
  const [playerHealth, setPlayerHealth] = useState<number>(
    initialGameState?.playerHealth || maxPlayerHealth
  );
  const [gameStatus, setGameStatus] = useState<
    "playing" | "won" | "lost" | "paused" | "setup"
  >(initialGameState?.gameStatus || "setup");

  // keep everything in localStorage

  console.log(wordData);
  console.log(category);

  console.log("Navbar render - gameStatus:", gameStatus);
  console.log("Navbar render - showMenu:", showMenu);

  // Function to reset all game state
  const resetGame = () => {
    setPlayerHealth(maxPlayerHealth);
    setGuessedLetters([]);
    setSecretWord("");
    setSelectedCategory("");
    setShowMenu(false);
    setGameStatus("setup");
    localStorage.removeItem("Hangman-game-state");
  };

  // this is checking IF THE WORD IS GUESSED COMPLETELY
  const checkIsWordGuessed = (
    word: string,
    guessedLetters: string[]
  ): boolean => {
    // this is getting all unique letters in the secret word (excluding spaces)
    const wordLetters = word
      .toLowerCase()
      .split("")
      .filter((letter) => letter !== " ");

    // this is to check if every letter in the word has been guessed
    return wordLetters.every((letter) =>
      guessedLetters.some((guessed) => guessed.toLowerCase() === letter)
    );
  };

  // reducing the health points of the player
  const reduceHealthPoints = (
    points: number,
    letter: string,
    secretWord: string
  ) => {
    const isLetterInSecretWord = secretWord
      .toLowerCase()
      .includes(letter.toLowerCase());

    if (!isLetterInSecretWord) {
      setPlayerHealth((prevHealth) => Math.max(prevHealth - points, 0));
    }
  };

  // handle alphabet clicked
  const handleAlphabetClick = (letter: string) => {
    if (gameStatus !== "playing") return;

    const checkIsGuessed = guessedLetters.some(
      (guessedLetters) => guessedLetters.toLowerCase() === letter.toLowerCase()
    );

    if (checkIsGuessed) return;

    setGuessedLetters((prevLetter) => [...prevLetter, letter]);
    reduceHealthPoints(10, letter, secretWord);
  };

  useEffect(() => {
    const gameState = {
      secretWord,
      category,
      guessedLetters,
      showMenu,
      playerHealth,
      gameStatus,
    };

    try {
      localStorage.setItem("Hangman-game-state", JSON.stringify(gameState));
    } catch (error) {
      console.log("The error is here:", error);
    }
  }, [
    secretWord,
    category,
    guessedLetters,
    showMenu,
    playerHealth,
    gameStatus,
  ]);

  useEffect(() => {
    if (!category) return;

    setGuessedLetters([]);
    setPlayerHealth(maxPlayerHealth);

    const formatCategoryName = (categoryName: string) => {
      const acronyms = ["TV"];

      return categoryName
        .toLowerCase()
        .split(" ")
        .map((word) => {
          const upperWord = word.toUpperCase();
          if (acronyms.includes(upperWord)) {
            return upperWord;
          }
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    };

    // Examples:
    console.log(formatCategoryName("MOVIES")); // Movies
    console.log(formatCategoryName("TV SHOWS")); // TV Shows
    console.log(formatCategoryName("AI TOOLS")); // AI Tools

    const getRandomWordFromCategory = (categoryName: string): string | null => {
      const categoryData =
        wordData.categories[categoryName as keyof typeof wordData.categories];

      if (!categoryName || !categoryData || categoryData.length === 0) {
        return null;
      }

      const randomIndex = Math.floor(Math.random() * categoryData.length);
      return categoryData[randomIndex].name;
    };

    // format the category
    const formattedCategory = formatCategoryName(category);
    console.log("Hi i am here:", formattedCategory);

    // get a random word
    const randomWord = getRandomWordFromCategory(formattedCategory);

    if (randomWord) {
      setSecretWord(randomWord);
    }
  }, [category, maxPlayerHealth]);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    if (!secretWord || secretWord.trim() === "") return;

    if (checkIsWordGuessed(secretWord, guessedLetters)) {
      setGameStatus("won");
    }
  }, [guessedLetters, secretWord, gameStatus]);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    if (playerHealth <= 0) {
      setGameStatus("lost");
    }
  }, [playerHealth, gameStatus]);

  // Simplified setup effect - only reset when explicitly needed
  useEffect(() => {
    if (gameStatus === "setup") {
      // Only reset if we're not coming from a category selection
      if (!category) {
        setPlayerHealth(maxPlayerHealth);
        setGuessedLetters([]);
        setSecretWord("");
        setSelectedCategory("");
      }
      setShowMenu(false);
    }
  }, [gameStatus, maxPlayerHealth, category]);

  const displaySecretWord = secretWord.split("").map((letter) => {
    if (letter === " ") return " ";
    console.log(guessedLetters);
    const isGuessed = guessedLetters.some(
      (guessedLetter) => guessedLetter.toLowerCase() === letter.toLowerCase()
    );
    return isGuessed ? letter : "_";
  });

  console.log(displaySecretWord);

  // This is the section for storing the local-storage
  // localStorage.setItem("Hangman-game-state", JSON.stringify(gameState));
  // localStorage.setItem("maxPlayerHealth", "100");

  // const savedProgressString = localStorage.getItem("Hangman-game-state");

  // if (savedProgressString) {
  //   const loadedGameState = JSON.parse(savedProgressString);
  //   console.log("This is the saved game state:", loadedGameState);
  // }

  // const yourHealth = localStorage.getItem("maxPlayerHealth");

  // if (yourHealth) {
  //   const savedPlayerHealth = localStorage.getItem("maxPlayerHealth");
  //   console.log("This is your health:", savedPlayerHealth);
  // }

  const gameState = {
    secretWord,
    category,
    guessedLetters,
    showMenu,
    playerHealth,
    gameStatus,
  };

  return (
    <GameContext.Provider
      value={{
        secretWord,
        setSecretWord,
        guessedLetters,
        setGuessedLetters,
        playerHealth,
        setPlayerHealth,
        category,
        setSelectedCategory,
        showMenu,
        setShowMenu,
        maxPlayerHealth,
        displaySecretWord,
        handleAlphabetClick,
        gameStatus,
        setGameStatus,
        resetGame,
        gameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("Kindly Wrap your app with the Game Provider please!");

  return context;
};

export default GameProvider;
