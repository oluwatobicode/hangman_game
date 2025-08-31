import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

/* 

HANG MAN GAME LOGIC
the goal of the game is to make a match of a hidden word before your life runs out from a category
so lets say if I have a hidden word such as the lion king i am to try to get 
that hidden word with as little number of tries possible

interface GameState {
  secretWord: string;
  setSecretWord: Dispatch<SetStateAction<string>>;
  category: string;
  selectedCategory: Dispatch<SetStateAction<string>>;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

interface GameActionProps {
  children: ReactNode;
  selectAlphabet: () => void;
  playGame: () => void;
  pauseGame: () => void;
  reduceHealthPoints: () => void;
  playAgain: () => void;
  continueGame: () => void;
  newCategory: () => void;
  quitGame: () => void;
}


FLOW OF THE APP 
- when the user clicks on play, he is taken to page called select category 
- if the user then selects a category from [movies, tv shows, countries, capital cities, animals , sports]
- each of the category has a like a bucket of words, which is randomized and a word is given 
- the length of the word is shown in terms of positions with spacing
- if the user selects an alphabet and the alphabet is in that word it will show in the position of that word 
- if the user selects an alphabet and the alphabet is not in that word it will not show and a point would be removed from their health
- if the user cannot guess the full word they loose 
- if the user finishes guessing the full word they win



questions I have to ask myself
0. how will i get a secret word from the category selected ?
My best guess: 
if the user selects a category lets say animals it will go to the animals object and randomize the array of objects there and return a secret word!

"Animals": [
            {"name": "Elephant", "selected": false},
            {"name": "Lion", "selected": false},
            {"name": "Giraffe", "selected": false},
            {"name": "Penguin", "selected": false},
            {"name": "Dolphin", "selected": false},
            {"name": "Tiger", "selected": false},
            {"name": "Kangaroo", "selected": false},
            {"name": "Panda", "selected": false},
            {"name": "Zebra", "selected": false},
            {"name": "Polar Bear", "selected": false},
            {"name": "Cheetah", "selected": false},
            {"name": "Rhino", "selected": false},
            {"name": "Buffalo", "selected": false},
            {"name": "Koala", "selected": false},
            {"name": "Gorilla", "selected": false},
            {"name": "Chimpanzee", "selected": false},
            {"name": "Crocodile", "selected": false},
            {"name": "Flamingo", "selected": false},
            {"name": "Peacock", "selected": false},
            {"name": "Jaguar", "selected": false},
            {"name": "Leopard", "selected": false},
            {"name": "Wolf", "selected": false},
            {"name": "Fox", "selected": false},
            {"name": "Bald Eagle", "selected": false},
            {"name": "Owl", "selected": false},
            {"name": "Frog", "selected": false},
            {"name": "Shark", "selected": false},
            {"name": "Octopus", "selected": false},
            {"name": "Turtle", "selected": false},
            {"name": "Snake", "selected": false}
        ],

- how will i randomize the selected category for a selected word ? 

i can could get the total items in the array multiply it by math.random() and then return a random word or just use a randomizer algorithm (considering big 0 notation)

1. Should there be a state for the secret word ? 

yes when we get a secret word we can update it here

2. Should there be a state for the selected alphabet word ? 
maybe

3. should there be a state for the category selected ?
yes it will be useful

4. How do we track the health ? 
okay we make a win or loose state or tracker, if the selected alphabet is in the secret word it will not subtract a health but if it is not
in the selected alphabet it will subtract from their health

5. How will I handle the alphabets to be displayed on the UI
render an alpahent array from a -z 


6. How will I handle the alphabets when an alphabet is selected
- if the alphabet selected appears twice in the word how will i handle that ? 
i will compare it
- if the alphabet is not the word how will i handle that 
- ignore it and delete a health point

revelation state: ["B", "A", "_", "A", "_", "A"]
7. If the user selects an alphabet and it is in the secret word how will i display that
so i wil compare the selected alphabet to the whole word and return the position that alphabet might be in (also counting spaces!!)
revelation state: ["B", "A", "_", "A", "_", "A"]

*/

interface GameState {
  secretWord: string;
  setSecretWord: Dispatch<SetStateAction<string>>;
  category: string;
  selectedCategory: Dispatch<SetStateAction<string>>;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  gameStatus: "menu" | "playing" | "won" | "lost";
  health: number;
  guessedLetters: string[];
  revealedWord: string[];
}

interface GameActionProps {
  children: ReactNode;
  selectAlphabet: (letter: string) => void;
  playGame: () => void;
  pauseGame: () => void;
  reduceHealthPoints: () => void;
  playAgain: () => void;
  continueGame: () => void;
  newCategory: () => void;
  quitGame: () => void;
}

type WordData = { name: string; selected: boolean; category: string };

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider = ({ children }: GameActionProps) => {
  const [secretWord, setSecretWord] = useState<string>("");
  const [category, selectedCategory] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <GameContext.Provider
      value={{
        secretWord,
        setSecretWord,
        category,
        selectedCategory,
        showMenu,
        setShowMenu,
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
