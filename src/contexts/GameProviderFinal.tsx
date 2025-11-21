import { createContext, useContext, useReducer } from "react";
import api from "../api/axiosInstance";

type GameStart = {
  _id: string;
  word: string;
  category: string;
  hint: string;
  difficulty: string;
  length: number;
};

type GameStartInput = {
  category: string | undefined;
};

type GameEndInput = {
  won: string;
  usedHint: boolean;
  wrongGuesses: number;
  duration: number;
  gameData: GameStart;
};

type GameStats = {
  totalWins: number;
  totalLoses: number;
  currentStreak: number;
  bestStreak: number;
  winRate: number;
};

type GameEnd = {
  stats: GameStats;
  newAchievements: [];
  rank: number;
  score: number;
  totalAchievements: number;
};

type GameState = {
  won: boolean;
  usedHint: boolean;
  wrongGuesses: number | null;
  duration: number | null;
  gameStart: GameStart | null;
  gameEnd: GameEnd | null;
  category: string | null;
  playerHealth: number | null;
  maxPlayerHealth: number;
  guessedLetters: string[] | null;
  gameStatus: "paused" | "playing" | "won" | "lost" | "setup";
  showMenu: boolean;
  secretWord: string | null;
};

type GameContextType = {
  state: GameState;
  gameStart: (category: GameStartInput) => void;
  gameEnd: (gameEndInput: GameEndInput) => void;
  gameReset: () => void;
  checkIsWordGuessed: (word: string, guessedLetters: string[]) => boolean;
  reduceHealthPoints: (
    points: number,
    letter: string,
    secretWord: string
  ) => void;
  handleAlphabetClick: (letter: string) => void;
};

type GameActionType =
  | { type: "GAME_START"; payload: GameStart }
  | { type: "GAME_END"; payload: GameEnd }
  | { type: "REDUCE_HEALTH"; payload: number }
  | { type: "GAME_RESET"; payload: GameState };

const initialGameState: GameState = {
  won: false,
  usedHint: false,
  wrongGuesses: null,
  duration: null,
  gameStart: null,
  gameEnd: null,
  showMenu: false,
  gameStatus: "setup",
  playerHealth: 100,
  maxPlayerHealth: 100,
  guessedLetters: [],
  secretWord: null,
  category: null,
};

const gameReducer = (state: GameState, action: GameActionType): GameState => {
  switch (action.type) {
    case "GAME_START":
      return {
        ...state,
        gameStatus: "playing",
        gameStart: action.payload,
        category: action.payload.category,
        secretWord: action.payload.word,
      };

    case "GAME_END":
      return { ...state };

    case "GAME_RESET":
      return { ...initialGameState };

    case "REDUCE_HEALTH":
      return {
        ...state,
        playerHealth: Math.max((state.playerHealth || 0) - action.payload, 0),
      };

    default:
      return state;
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProviderFinal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const gameStart = async (category: GameStartInput) => {
    try {
      const response = await api.get("/game/start", {
        params: category,
      });

      console.log(response.data);

      console.log(response.data.data);

      const GameStart = {
        _id: response.data.data.id,
        word: response.data.data.word,
        category: response.data.data.category,
        hint: response.data.data.hint,
        difficulty: response.data.data.difficulty,
        length: response.data.data.length,
      };

      dispatch({ type: "GAME_START", payload: GameStart });
    } catch (error) {
      console.log(error);
    }
  };
  const gameEnd = async (gameEndInput: GameEndInput) => {
    try {
      const response = await api.post("/game/end", {
        gameEndInput,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsWordGuessed = (word: string, guessedLetters: string[]) => {
    const wordLetters = word
      .toLowerCase()
      .split(" ")
      .filter((letter) => letter !== "");

    return wordLetters.every((letter) =>
      guessedLetters.some((guessed) => guessed.toLowerCase() === letter)
    );
  };

  const reduceHealthPoints = (
    points: number,
    letter: string,
    secretWord: string
  ) => {
    const isLetterInSecretWord = secretWord
      .toLowerCase()
      .includes(letter.toLowerCase());

    if (!isLetterInSecretWord) {
      dispatch({ type: "REDUCE_HEALTH", payload: points });
    }
  };

  const handleAlphabetClick = (letter: string) => {
    if (state.gameStatus !== "playing") return;

    const checkIsGuessed = state.guessedLetters?.some(
      (guessedLetters) => guessedLetters.toLowerCase() === letter.toLowerCase()
    );

    if (checkIsGuessed) return;
  };

  const gameReset = () => {
    dispatch({ type: "GAME_RESET", payload: initialGameState });
  };

  const value: GameContextType = {
    state,
    checkIsWordGuessed,
    handleAlphabetClick,
    reduceHealthPoints,
    gameReset,
    gameStart,
    gameEnd,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("Game must be wrapped within game provider");
  }

  return context;
};

export default GameProviderFinal;
