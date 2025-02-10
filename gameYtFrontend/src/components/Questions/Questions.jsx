import React, { useEffect, useState } from "react";
import Option from "../Option/Option";
import useQuestionStore from "../../store/zustand";
import TimeStamp from "../TimeStamp/TimeStamp";

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Question({ id, handleClick, singleQuestion, summary }) {
  const { options, correctOptionsIndex, question } = singleQuestion;
  const { userAnswer: allUserAnswer } = useQuestionStore();

  const userAnswer = allUserAnswer.find((ans) => ans.question === question) || {};

  // Shuffle options once and store in state
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    // Shuffle options when component mounts
    setShuffledOptions(shuffleArray(options));
  }, [options]);

  return (
    <section>
      <div
        className={`${
          summary
            ? "flex justify-center items-center text-base md:text-lg mb-2" // Styling in summary mode
            : "flex justify-center items-center text-base md:text-lg mb-8"
        }`}
      >
        <div
          className={`${
            summary
              ? "w-4/5 relative z-20 bg-white rounded-2xl px-5 py-4 mb-4 shadow-sm mt-12 text-lg font-medium flex gap-2 shadow-neutral-500" // Styling in summary mode
              : "w-4/5 relative z-20 bg-white rounded-2xl px-5 py-8 mb-4 shadow-sm mt-12 text-lg font-medium flex gap-2 shadow-neutral-500"
          }`}
        >
          <h3 className={`${summary ? "" : "text-gray-800 font-medium text-center"}`}>{id}.</h3>
          <h3>{question.toString()}</h3>
        </div>
      </div>
      {!summary && (
        <div className="flex justify-end mb-5 mr-16">
          <TimeStamp />
        </div>
      )}
      <div
        className={`${
          summary
            ? "flex flex-col items-center" // No additional styling for summary // positioned options to center
            : "flex justify-center items-center flex-col"
        }`}
      >
        {shuffledOptions.map((opt, i) => (
          <Option key={i} value={opt.toString()} idx={i} handleClick={handleClick} trueAnswer={options[correctOptionsIndex]} userAnswer={userAnswer} summary={summary} />
        ))}
      </div>
    </section>
  );
}

export default Question;
