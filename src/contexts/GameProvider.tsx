import React, { createContext, useContext, useState } from "react";

const GameContext = createContext<undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [secretWord, setSecretWord] = useState<String>("hII");

  return (
    <GameContext.Provider value={{ secretWord, setSecretWord }}>
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
