// GameScreenStructure.tsx
import React from "react";
import QuestionCard from "../../container/QuestionCard/index";
import "../../styles/GameScreen.css";
import Cartoon from "../../Resources/images/Cartoon.png";
import back from "../../Resources/images/back.png";

interface GameScreenStructureProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
  isAnswerCorrect: boolean | null;
  characterImages: string[];
  currentCharacter: number;
  treasureImage: string;
  showCoin: boolean;
  coin: string;
}

const GameScreenView: React.FC<GameScreenStructureProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
  isAnswerCorrect,
  characterImages,
  currentCharacter,
  treasureImage,
  showCoin,
  coin,
}) => {
  return (
    <div className="game-screen h-[90vh] md:h-[100vh]">
      <div className="game-header">
        <img src={Cartoon} alt="Logo" className="logo" />
      </div>

      <div className="game-question">
        <QuestionCard question={question} options={options} correctAnswer={correctAnswer} onAnswer={onAnswer} isAnswerCorrect={isAnswerCorrect} />
      </div>

      <div className="game-bottom relative">
        <img src={back} alt="background" className="w-screen" />
        <div className="flex">
          <div className={`character ${isAnswerCorrect === true ? "correct" : isAnswerCorrect === false ? "wrong" : ""}`}>
            <img src={characterImages[currentCharacter]} alt="Character" className="relative bottom-52 h-52 w-48 z-20" />
          </div>
          <div className={`treasure ${isAnswerCorrect === true ? "open" : ""}`}>
            <img src={treasureImage} alt="Treasure" className="relative h-60 bottom-60 -right-5 z-0" />
            {showCoin && <img src={coin} alt="Coin" className="absolute bottom-96 right-[3rem] transform -translate-x-1/2 h-20 w-20 z-30" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreenView;
