import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuestionStore from "../../../../store/zustand";

const Buttons: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { playMore, currentChunkIndex, transcriptChunks, videoId, resetQuestion } = useQuestionStore();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handlePlayMore = async () => {
    resetQuestion();
    setIsLoading(true);
    try {
      await playMore(videoId);
      const allQuestions = useQuestionStore.getState().question;
      if (allQuestions.length > 0) {
        setIsLoading(false);
        navigate(`../`);
      }
    } catch (error) {
      console.error("Error fetching questions for Play More:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 p-6 z-50">
      <button className="bg-[#9B52B3] text-white px-12 py-6 text-2xl rounded-lg w-full sm:w-auto" onClick={() => handleNavigate("../../question")}>
        Dashboard
      </button>

      {/* Conditionally render the "Play More" button based on the playMore prop */}
      {currentChunkIndex < transcriptChunks.length && (
        <button onClick={handlePlayMore} disabled={isLoading} className="bg-[#9B52B3] text-white px-12 py-6 text-2xl rounded-lg w-full sm:w-auto">
          {/* <RefreshCcw size={"26px"} />{" "} */}
          <span className="pl-2">Play More</span>
        </button>
      )}

      <button className="bg-[#9B52B3] text-white px-12 py-6 text-2xl rounded-lg w-full sm:w-auto" onClick={() => handleNavigate("../../summary")}>
        Summary
      </button>
    </div>
  );
};

export default Buttons;
