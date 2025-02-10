// src/App.tsx
import React from "react";
import MonsterQuizPage from "./Pages/QuizPage.tsx";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="bg-purple-300 h-screen flex justify-center items-center">
      <div className="monsterGame-container w-full max-w-md h-screen bg-customPurple overflow-y-auto">
        <MonsterQuizPage />
      </div>
    </div>
  );
};

export default App;
