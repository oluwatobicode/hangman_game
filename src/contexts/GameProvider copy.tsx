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
}

type WordData = { name: string; selected: boolean; category: string };

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const maxPlayerHealth = 100;
  const [secretWord, setSecretWord] = useState<string>("Treasure");
  const [category, setSelectedCategory] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<Array<string>>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [playerHealth, setPlayerHealth] = useState<number>(90);
  const [gameStatus, setGameStatus] = useState<
    "playing" | "won" | "lost" | "paused" | "setup"
  >("setup");

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
    // this is going to allow clicks if game is playing
    if (gameStatus !== "playing") return;

    // this checks if the letter has already been guessed
    const checkIsGuessed = guessedLetters.some(
      (guessedLetters) => guessedLetters.toLowerCase() === letter.toLowerCase()
    );

    if (checkIsGuessed) return;

    setGuessedLetters((prevLetter) => [...prevLetter, letter]);
    reduceHealthPoints(10, letter, secretWord);
  };

  // this is to check for a win condition
  useEffect(() => {
    if (gameStatus !== "playing") return;

    if (checkIsWordGuessed(secretWord, guessedLetters)) {
      setGameStatus("won");
    }
  }, [guessedLetters, secretWord, gameStatus]);

  // Check for lose condition
  useEffect(() => {
    if (gameStatus !== "playing") return;

    if (playerHealth <= 0) {
      setGameStatus("lost");
    }
  }, [playerHealth, gameStatus]);

  useEffect(() => {
    if (gameStatus === "setup") {
      setPlayerHealth(maxPlayerHealth);
      setGuessedLetters([]);
      setSecretWord("");
      setSelectedCategory("");
      setShowMenu(false);
      // Don't set gameStatus here - it's already "setup"
    }
  }, [gameStatus, maxPlayerHealth]);

  // generating the display secret word
  // this is the logic that will display the secret word with underscores and revealed letters
  // if the letter is in the guessed letters array it will be revealed otherwise it will be an underscore
  // also considering spaces in the secret word
  // e.g "The Lion King" -> ["T", "_", "_", " ", "L", "_", "_", " ", "K", "_", "_"]
  // e.g "The Lion King" with guessed letters ["T", "L", "K"] -> ["T", "_", "_", " ", "L", "_", "_", " ", "K", "_", "_"]
  const displaySecretWord = secretWord.split("").map((letter) => {
    if (letter === " ") return " ";
    console.log(guessedLetters);
    const isGuessed = guessedLetters.some(
      (guessedLetter) => guessedLetter.toLowerCase() === letter.toLowerCase()
    );
    return isGuessed ? letter : "_";
  });

  console.log(displaySecretWord);

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
