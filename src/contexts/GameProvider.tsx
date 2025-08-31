import React, { createContext, useContext, useState } from "react";

/* 

HANG MAN GAME LOGIC
the goal of the game is to make a match of a hidden word before your life runs out from a category
so lets say if I have a hidden word such as the lion king i am to try to get 
that hidden word with as little number of tries possible

interface GameState {
hiddenWord: String
MatchedWord: String
life: 10
compredWord: String
slectedCategory: String
}


*/

const GameContext = createContext();

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [secretWord, setSecretWord] = useState<String>("hII");
  const [category, selectedCategory] = useState<String>("");

  return (
    <GameContext.Provider
      value={{ secretWord, setSecretWord, category, selectedCategory }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("Wrap your app with the Game Provider please!");

  return context;
};

export default GameProvider;
