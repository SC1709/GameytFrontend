import React, { useEffect, useState } from "react";
import { CircleCheck, CircleX, ClipboardList, RefreshCcw } from "lucide-react";
import Trophy from "../../../../assets/trophy.png";
import { useNavigate } from "react-router-dom";
import AnimateProvider from "../../../../components/AnimateProvider/AnimateProvider";

function Success() {
  const navigate = useNavigate();
  const [trueAnswer, setTrueAnswer] = useState(0);
  const [falseAnswer, setFalseAnswer] = useState(0);

  const score = trueAnswer + falseAnswer === 0 ? 0 : ((trueAnswer * 100) / (trueAnswer + falseAnswer)).toFixed(0);

  useEffect(() => {
    // Prevent navigating back to the game screen
    window.history.pushState(null, null, "/finish");
    const handlePopState = () => {
      window.history.pushState(null, null, "/finish");
    };
    window.addEventListener("popstate", handlePopState);

    // Fetch game results from localStorage
    const gameResults = JSON.parse(localStorage.getItem("gameResults") || "{}");
    setTrueAnswer(gameResults.trueAnswer || 0);
    setFalseAnswer(gameResults.falseAnswer || 0);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handlePlayMore = () => {
    // Reset the game results
    localStorage.setItem("gameResults", JSON.stringify({ trueAnswer: 0, falseAnswer: 0 }));
    navigate("/dropdead/play");
  };

  const handleSummary = () => {
    navigate("/summary");
  };

  const handleBackToDashboard = () => {
    // Reset the game results
    localStorage.setItem("gameResults", JSON.stringify({ trueAnswer: 0, falseAnswer: 0 }));
    navigate("/question");
  };

  return (
    <AnimateProvider>
      <div className="flex flex-col justify-center mt-16 items-center bg-white rounded-xl py-10 relative w-full max-w-md mx-auto">
        <img src={Trophy} alt="Trophy" className="absolute left-1/2 transform -translate-x-1/2 -top-20 h-32" />
        <h1 className="text-3xl font-bold mb-2 mt-8">Congratulations!</h1>
        <div className="border-b border-b-gray-400 w-full mt-4">
          <p className="text-lg text-gray-400 text-center w-full mb-4">
            You've Scored <span className="text-green-500">+{score}</span> points
          </p>
        </div>

        <div className="flex justify-between w-full gap-4 mb-6">
          <div className="flex flex-col items-center flex-1 border-r border-r-gray-500 pt-3">
            <span className="text-2xl font-semibold">{trueAnswer + falseAnswer}</span>
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

        <div className="flex flex-col items-center space-y-4 w-[60%] px-4 mx-auto mt-16">
          <button
            onClick={handlePlayMore}
            className="w-[15rem] bg-[#047857] flex justify-center text-white py-4 text-lg font-bold rounded-full tracking-wider shadow-lg shadow-neutral-400"
          >
            <RefreshCcw size={"26px"} /> <span className="pl-2">Play More</span>
          </button>

          <button
            onClick={handleSummary}
            className="w-[15rem] bg-[#0284c7] flex justify-center text-white py-4 text-lg font-bold rounded-full tracking-wider shadow-lg shadow-neutral-400"
          >
            <ClipboardList size={"26px"} /> <span className="pl-2">Summary</span>
          </button>

          <button onClick={handleBackToDashboard} className="w-[15rem] bg-[#ea580c] flex justify-center text-white py-4 text-lg font-bold rounded-full">
            Back to Dashboard
          </button>
        </div>
      </div>
    </AnimateProvider>
  );
}

export default Success;
