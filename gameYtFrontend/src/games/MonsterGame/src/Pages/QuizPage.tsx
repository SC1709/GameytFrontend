// src/Pages/MonsterCagePage.tsx
import React from "react";
import MonsterGame from "../Containers/GameContainer.tsx";
import { MonsterProvider } from "../context/MonsterContext.tsx";

const MonsterCagePage: React.FC = () => {
  return (
    <div className="bg-[#5A1E96] h-100">
      <MonsterProvider>
        {/* <h1>hi</h1> */}
        <MonsterGame />
      </MonsterProvider>
    </div>
  );
};

export default MonsterCagePage;
