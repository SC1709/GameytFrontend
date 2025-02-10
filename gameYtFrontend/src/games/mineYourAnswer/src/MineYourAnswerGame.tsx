import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { MainLayout } from "./layouts/mainLayout/index.tsx";
import { StartPage } from "./pages/startPage/index.tsx";
import { GamePage } from "./pages/gamePage/index.tsx";
import { ResultPage } from "./pages/resultPage/index.tsx";
import {
  GameStateProvider,
} from "./context/GameStateContext.tsx";

function MineYourAnswerGame() {
  return (
    <GameStateProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<StartPage />} />
          <Route path="game" element={<GamePage />} />
          <Route path="result" element={<ResultPage />} />
        </Route>
      </Routes>
    </GameStateProvider>
  );
}

export default MineYourAnswerGame;
