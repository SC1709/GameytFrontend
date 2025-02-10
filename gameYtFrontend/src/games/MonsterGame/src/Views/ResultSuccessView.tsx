import React from "react";
import { motion } from "framer-motion";
// @ts-ignore
import cage from "../assets/images/resultSucessCage.png";
import monster from "../assets/images/resultSucessMonster.png";
import thread from "../assets/images/thread.png";
import Button from "../Components/common/ButtonComponent.tsx";
import GameOver from "../Components/game/GameOverView.tsx";
import Score from "../Components/game/ScoreComponent.tsx";
import { useNavigate } from "react-router-dom";
import { useMonsterContext } from "../context/MonsterContext.tsx";
import Buttons from "./Buttons.tsx";

interface ResultSuccessViewProps {
  isCageFalling: boolean;
  resetGame: () => void; // Accept resetGame as a prop
  playMore: boolean; // Accept playMore as a prop
}

const ResultSuccessView: React.FC<ResultSuccessViewProps> = ({ isCageFalling, resetGame, playMore }) => {
  const navigate = useNavigate();
  const { totalQuestions } = useMonsterContext();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between">
      {/* Top Section: Animation */}
      <div className="relative w-full flex-grow flex items-center justify-center h-3/5">
        <motion.div
          className="absolute flex flex-col items-center"
          initial={{ y: -600 }}
          animate={isCageFalling ? { y: -40 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ zIndex: 10 }}
        >
          <img
            src={thread}
            alt="Thread"
            className="w-1 sm:w-2 -mt-8"
            style={{ objectFit: "cover", height: "13rem" }}
          />
          <img
            src={cage}
            alt="Cage"
            className="h-64 w-64"
          />
        </motion.div>

        <img
          src={monster}
          alt="Monster"
          className="absolute bottom-28 h-48 w-48"
        />
      </div>

      {/* Bottom Section */}
      <div className="w-full h-2/5 flex flex-col items-center space-y-4 py-4">
        <GameOver text="Game Over!!" />
        <Score total={totalQuestions} current={totalQuestions} />
        <Buttons playMore={playMore} /> {/* Pass playMore prop to Buttons */}
      </div>
    </div>
  );
};

export default ResultSuccessView;
