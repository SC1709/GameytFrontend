import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useMonsterContext } from "../context/MonsterContext"; // Import the custom hook
import HomeView from "../Views/HomeView.tsx";
import ResultSuccessView from "../Views/ResultSuccessView.tsx"; // Import success view
import ResultFailure from "../Views/ResultFailureView.tsx"; // Import failure view
import Intro from "../Views/IntroView.tsx";
import QuestionsList from "./QuizContainer.tsx";

const MonsterGame: React.FC = () => {
  // Access the context state and setter function
  const { isCageFalling, setIsCageFalling, resetGameState } = useMonsterContext();

  // Start the cage falling animation on mount
  useEffect(() => {
    setIsCageFalling(true); // Trigger the falling animation when the component mounts
  }, [setIsCageFalling]);

  return (
    <Routes>
      {/* Default HomeView */}
      <Route path="/" element={<HomeView />} />

      {/* Success Page */}
      <Route path="/success" element={<ResultSuccessView isCageFalling={isCageFalling} />} />

      {/* Failure Page */}
      <Route path="/fail" element={<ResultFailure />} />

      <Route path="/intro" element={<Intro />} />

      <Route path="/game" element={<QuestionsList />} />
    </Routes>
  );
};

export default MonsterGame;
