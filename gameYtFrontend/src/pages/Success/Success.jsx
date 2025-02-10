import React, { useEffect, useState } from "react";
import { CircleCheck, CircleX, ClipboardList, SquareChevronLeft, RefreshCcw } from "lucide-react";
import Trophy from "../../assets/trophy.png";
import useQuestionStore from "../../store/zustand";
import { useNavigate } from "react-router-dom";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import Question from "../../components/Questions/Questions";

function Success() {
  const {
    trueAnswer,
    falseAnswer,
    setTimeStamp,
    question: allQuestion,
    playMore,
    currentChunkIndex,
    transcriptChunks,
    videoId,
    questionType,
    resetQuestion,
    resetGame,
  } = useQuestionStore();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const score = allQuestion.length === 0 ? 0 : ((trueAnswer * 100) / allQuestion.length).toFixed(0);

  useEffect(() => {
    window.history.pushState(null, null, "/finish");
    const handlePopState = () => {
      window.history.pushState(null, null, "/finish");
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    setTimeStamp(0);
  }, []);

  const handlePlayMore = async () => {
    resetQuestion();
    setIsLoading(true);
    try {
      await playMore(videoId, questionType);
      const allQuestions = useQuestionStore.getState().question;
      if (allQuestions.length > 0) {
        setIsLoading(false);
        navigate(`/questions/play`);
      }
    } catch (error) {
      console.error("Error fetching questions for Play More:", error);
      setIsLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    resetGame();
    window.location.href = `/`;
  };

  const handleSummary = () => {
    navigate("/summary");
  };

  return (
    <AnimateProvider>
      {isLoading ? (
        <div className="parent-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="relative flex flex-col justify-center mt-16 items-center bg-white rounded-xl py-10 relative w-full max-w-md mx-auto">
          <img src={Trophy} alt="Trophy" className="absolute left-1/2 transform -translate-x-1/2 -top-20 h-32" />

          <h1 className="text-3xl font-bold mb-2 mt-8">Congratulations!</h1>
          <div className="border-b border-b-gray-400 w-full mt-4">
            <p className="text-lg text-gray-400 text-center w-full mb-4">
              You've Scored <span className="text-green-500">+{score}</span> points
            </p>
          </div>

          <div className="flex justify-between w-full gap-4 mb-6">
            <div className="flex flex-col items-center flex-1 border-r border-r-gray-500 pt-3">
              <span className="text-2xl font-semibold">{allQuestion.length}</span>
              <div className="text-lg text-gray-400">Total</div>
            </div>

            <div className="flex flex-col items-center flex-1 border-r border-r-gray-500 pt-3">
              <div className="flex items-center text-green-500 text-xl mb-2">
                <CircleCheck className="mr-1" />
                <span className="text-2xl text-black font-semibold">{trueAnswer}</span>
              </div>
              <div className="text-lg text-gray-400">Correct</div>
            </div>

            <div className="flex flex-col items-center flex-1 pt-3">
              <div className="flex items-center text-red-500 text-xl mb-2">
                <CircleX className="mr-1" />
                <span className="text-2xl text-black font-semibold">{falseAnswer}</span>
              </div>
              <div className="text-lg text-gray-400">Wrong</div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="mt-4 bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-center text-neutral-800 font-bold text-2xl mb-6 border-b pb-4">
              Question Summary
            </h3>

            <div className="max-h-[500px] overflow-y-auto space-y-4">
              {allQuestion.map((question, i) => (
                <div
                  key={i}
                  className=" w-11/12 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors duration-300"
                >
                  <Question
                    singleQuestion={question}
                    id={i + 1}
                    summary={true}
                    trueAnswer={question.correct_answer}
                   />
                </div>
              ))}
            </div>
          </div> */}
      {!isLoading && (
        <div className="relative flex flex-col justify-center items-center w-full max-w-md mx-auto">
          <div className="flex items-center flex-col space-y-4 w-[60%] px-4 mx-auto mt-16">
            {currentChunkIndex < transcriptChunks.length && (
              <button
                onClick={handlePlayMore}
                disabled={isLoading}
                className="w-[15rem] bg-[#047857] flex justify-center text-white py-4 text-lg font-bold rounded-full tracking-wider shadow-lg shadow-neutral-400"
              >
                <RefreshCcw size={"26px"} /> <span className="pl-2">Play More</span>
              </button>
            )}

            <button
              onClick={handleSummary}
              className="w-[15rem] bg-[#0284c7] flex justify-center text-white py-4 text-lg font-bold rounded-full tracking-wider shadow-lg shadow-neutral-400"
            >
              <ClipboardList size={"26px"} /> <span className="pl-2">Summary</span>
            </button>

            <button
              onClick={handleBackToDashboard}
              className="w-[15rem] bg-[#ea580c] flex justify-center text-white py-4 text-lg font-bold rounded-full tracking-wider shadow-lg shadow-neutral-400"
            >
              <SquareChevronLeft size={"26px"} /> <span className="pl-2">Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </AnimateProvider>
  );
}

export default Success;
