import React, { useState } from "react";
import ResultBox from "../../components/ResultBoxComponent";
import SnakeComponent from "../../components/SnakeComponent";
import { useNavigate } from "react-router-dom";
import useQuestionStore from "../../../../../store/zustand";

interface ResultViewProps {
  answer?: number;
  incorrect?: number;
  onNavigate: (path: string) => void;
}

const ResultView: React.FC<ResultViewProps> = ({
  answer,
  incorrect,
  onNavigate,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { playMore, currentChunkIndex, transcriptChunks, videoId, resetQuestion,questionType ,resetGame} = useQuestionStore();
  
  const handlePlayMore = async () => {
    resetQuestion();
    setIsLoading(true);
    try {
      await playMore(videoId,questionType);
      const allQuestions = useQuestionStore.getState().question;
      if (allQuestions.length > 0) {
    // resetQuestion();
        console.log("New questions fetched:", allQuestions);
        navigate(`/snakegame/play/game`);        
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching questions for Play More:", error);
      setIsLoading(false);
    }
  };
    // const handleBackToDashboard = () => {
  //   resetGame();
  //   window.location.href = `/`;        
  // };
  return (
    <>
      <div className="snake-container flex flex-col items-center background-green relative">
        <p className="slide-down absolute w-[302px]  h-[56px] top-[200px] left-[43px] text-[#FFFFFF] text-center text-[48px] font-medium leading-[55.8px] font-[Eraser]">
          GAME OVER
        </p>
        <div className="slide-down absolute top-[350px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 p-6 z-50">
          <button
            className="bg-[#FFE1BC] top-[120px] text-grey px-6 py-2 text-2xl rounded-3xl w-full sm:w-auto"
            onClick={() => onNavigate("../../question")}
            // onClick={handleBackToDashboard}
          >
            Dashboard
          </button>

          {/* Conditionally render the "Play More" button based on the playMore prop */}
          {currentChunkIndex < transcriptChunks.length && (
          <button
            className="bg-[#FFE1BC] text-grey px-6 py-2 text-2xl rounded-3xl w-full sm:w-auto"
            onClick={handlePlayMore}
            disabled={isLoading}
          >
            Play More
          </button>
          )}

          <button
            className="bg-[#FFE1BC] text-grey px-6 py-2 text-2xl rounded-3xl w-full sm:w-auto"
            onClick={() => onNavigate("../../summary")}
          >
            Summary
          </button>
        </div>
        <div className="snake-animation-container">
          <SnakeComponent className="snake  opacity-0" />
        </div>

        <ResultBox
          text="Wrong"
          answer={incorrect ? incorrect : 0}
          className="slide-left left-[212px] bg-[#D8002F]"
        />
        <ResultBox
          text="Right"
          answer={answer ? answer : 0}
          className="slide-right left-[54px] bg-[#078F14]"
        />
      </div>
    </>
  );
};

export default ResultView;
