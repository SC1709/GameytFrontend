import React, { createContext, useState } from "react";

interface GameStateContextProps {
  setCorrect:React.Dispatch<React.SetStateAction<{
    correct: number;
    wrong: number;
}>>;
   correct: { correct: number; wrong: number; };
}

export const GameStateContext = createContext<GameStateContextProps>({
  setCorrect: () => null,
  correct: { correct: 0, wrong: 0 },
});

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [correct, setCorrect] = useState({
    correct: 0,
    wrong : 0
  })
  return (
    <GameStateContext.Provider value={{ setCorrect, correct}}>
      {children}
    </GameStateContext.Provider>
  );
}
