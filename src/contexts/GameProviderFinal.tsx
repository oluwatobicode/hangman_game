import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import api from "../api/axiosInstance";

type GameStart = {
  _id: string | undefined;
  word: string | undefined;
  category: string | undefined;
  hint: string | undefined;
  difficulty: string | undefined;
  length: number | undefined;
};

type GameStartInput = {
  category: string | undefined;
};

type GameEndInput = {
  won: boolean;
  usedHint: boolean;
  wrongGuesses: number;
  duration: number;
  gameData: GameStart;
};

type GameEnd = {
  newAchievements: [];
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
  playerHealth: number;
  maxPlayerHealth: number;
  guessedLetters: string[];
  gameStatus: "paused" | "playing" | "won" | "lost" | "setup" | string;
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
  displaySecretWord: string;
  showMenu: (mode: boolean) => void;
  updateGameStatus: (mode: string) => void;
};

type GameActionType =
  | { type: "GAME_START"; payload: GameStart }
  | { type: "GAME_END"; payload: GameEnd }
  | { type: "GUESS_LETTER"; payload: string }
  | { type: "REDUCE_HEALTH"; payload: number }
  | { type: "SHOW_MENU"; payload: boolean }
  | { type: "GAME_STATUS"; payload: string }
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
        guessedLetters: [],
      };

    case "GUESS_LETTER":
      return {
        ...state,
        guessedLetters: [...state.guessedLetters, action.payload],
      };

    case "GAME_STATUS":
      return {
        ...state,
        gameStatus: action.payload,
      };

    case "SHOW_MENU":
      return {
        ...state,
        showMenu: action.payload,
        gameStatus: action.payload ? "paused" : "playing",
      };

    case "GAME_END":
      return { ...state, gameEnd: action.payload };

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

      const GameStartResponse = {
        _id: response.data.data.id,
        word: response.data.data.word,
        category: response.data.data.category,
        hint: response.data.data.hint,
        difficulty: response.data.data.difficulty,
        length: response.data.data.length,
      };

      dispatch({ type: "GAME_START", payload: GameStartResponse });
    } catch (error) {
      console.log(error);
    }
  };
  const gameEnd = async (gameEndInput: GameEndInput) => {
    try {
      const response = await api.post("/game/end", {
        ...gameEndInput,
      });

      console.log(response.data);

      /* 
      {
    "status": "success",
    "stats": {
        "totalWins": 12,
        "totalLoses": 8,
        "currentStreak": 12,
        "bestStreak": 12,
        "winRate": 60
    },
    "newAchievements": [],
    "rank": 1,
    "score": 250,
    "totalAchievements": 14
}
      */

      const GameEndResponse = {
        newAchievements: response.data?.newAchievements,
        totalAchievements: response.data?.totalAchievements,
      };

      console.log(GameEndResponse);
      dispatch({ type: "GAME_END", payload: GameEndResponse });
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsWordGuessed = (word: string, guessedLetters: string[]) => {
    const wordLetters = word
      .toLowerCase()
      .split("")
      .filter((letter) => letter !== " ");

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

    dispatch({ type: "GUESS_LETTER", payload: letter });

    if (state.secretWord) {
      reduceHealthPoints(10, letter, state.secretWord);
    }
  };

  const displaySecretWord = useMemo(() => {
    if (!state.secretWord) return " ";

    return state.secretWord
      .split("")
      .map((char) => {
        if (char === " ") return " ";

        const isGuessed = state.guessedLetters.some(
          (guessedLetter) => guessedLetter.toLowerCase() === char.toLowerCase()
        );

        return isGuessed ? char : "_";
      })
      .join("");
  }, [state.secretWord, state.guessedLetters]);

  const gameReset = () => {
    dispatch({ type: "GAME_RESET", payload: initialGameState });
  };

  const showMenu = (mode: boolean) => {
    dispatch({ type: "SHOW_MENU", payload: mode });
  };

  const updateGameStatus = (mode: string) => {
    dispatch({ type: "GAME_STATUS", payload: mode });
  };

  // checking if the user has won
  useEffect(() => {
    if (state.gameStatus !== "playing") return;

    if (!state.secretWord || state.secretWord.trim() === "") return;

    console.log(state.secretWord);

    console.log(state.gameStatus);

    if (checkIsWordGuessed(state.secretWord, state.guessedLetters)) {
      updateGameStatus("won");
    }
  }, [state.guessedLetters, state.secretWord, state.gameStatus]);

  // checking if the user has lost
  useEffect(() => {
    if (state.gameStatus !== "playing") return;

    if (state.playerHealth <= 0) {
      updateGameStatus("lost");
    }
  }, [state.playerHealth, state.gameStatus]);

  // sending the data if the user has won or lost
  useEffect(() => {
    if (state.gameStatus !== "won" && state.gameStatus !== "lost") return;

    const gameEndInput: GameEndInput = {
      won: state.gameStatus === "won" ? true : false,
      usedHint: false,
      duration: state.duration || 0,
      wrongGuesses: state.wrongGuesses || 0,
      gameData: {
        word: state.gameStart?.word,
        _id: state.gameStart?._id,
        category: state.gameStart?.category,
        hint: state.gameStart?.hint,
        difficulty: state.gameStart?.difficulty,
        length: state.gameStart?.length,
      },
    };

    console.log(gameEndInput);

    gameEnd(gameEndInput);
  }, [state.gameStatus]);

  const value: GameContextType = {
    state,
    checkIsWordGuessed,
    handleAlphabetClick,
    reduceHealthPoints,
    gameReset,
    gameStart,
    gameEnd,
    displaySecretWord,
    showMenu,
    updateGameStatus,
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

/* next things to work on 
1) tracking the following - [[
- usedHint
- duration
- wrongGuesses
]]
2) sound effects for a when user wins
3) difficulty level

*/
