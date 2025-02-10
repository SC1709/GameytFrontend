import React, { useState } from "react";
import ResultBox from "../../Components/Custom/ResultBox";
import { useNavigate } from "react-router-dom";
import useQuestionStore from "../../../../../store/zustand";

interface ResultViewProps {
  answer?: number;
  className?: string;
  incorrect?: number;
  onNavigate: (path: string) => void;
}
const ResultPageView: React.FC<ResultViewProps> = ({
  answer,
  className,
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
        setIsLoading(false);
        navigate(`/sky-quiz/play/game`);        
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
      <div className="flex flex-col items-center background-green relative">
        <p className="absolute w-[302px]  h-[56px] top-[220px] left-[58px] text-[#FFFFFF] text-center gameover-heading text-[48px] font-extrabold leading-[55.8px] font-[Eraser]">
          GAME OVER
        </p>
        <div className="slide-down absolute top-[375px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 p-6 z-50">
          <button
            className="bg-[#9B52B3] top-[120px] text-white px-6 py-2 text-2xl rounded-3xl w-full sm:w-auto"
            onClick={() => onNavigate("../../question")}
            // onClick={handleBackToDashboard}
          >
            Dashboard
          </button>

          {/* Conditionally render the "Play More" button based on the playMore prop */}
          {currentChunkIndex < transcriptChunks.length && (
          <button
            className="bg-[#9B52B3] text-white px-6 py-2 text-2xl rounded-3xl w-full sm:w-auto"
            onClick={handlePlayMore}
            disabled={isLoading}
          >
            Play More
          </button>
           )}

          <button
            className="bg-[#9B52B3] text-white px-6 py-2 text-2xl rounded-3xl w-full sm:w-auto"
            onClick={() => onNavigate("../../summary")}
          >
            Summary
          </button>
        </div>
        <ResultBox
          text="Wrong"
          answer={incorrect ? incorrect : 0}
          className="absolute left-[212px] top-[480px] bg-[#D8002F]"
        />
        <ResultBox
          text="Right"
          answer={answer ? answer : 0}
          className="left-[54px] top-[480px] bg-[#078F14]"
        />
      </div>
    </>
  );
};

export default ResultPageView;
