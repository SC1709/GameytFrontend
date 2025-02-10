import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useQuestionStore from "../../store/zustand";
import TimeStamp from "../../components/TimeStamp/TimeStamp";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import Question from "../../components/Questions/Questions";

function SingleQuestion() {
  const { question: allQuestions, trueAction, falseAction, addAnswer, page, nextPage, videoId } = useQuestionStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(page - 1);
  const singleQuestion = allQuestions[currentQuestionIndex];

  useEffect(() => {
    // After finishing, redirect to /finish, no direct question access
    if (page > allQuestions.length) {
      navigate("/finish", { replace: true });
    }
  }, [page, allQuestions.length, navigate]);

  useEffect(() => {
    // Sync current index with global page state
    setCurrentQuestionIndex(page - 1);
  }, [page]);

  const handleAnswerClick = (selectedOption) => {
    const { correctOptionsIndex, options, question } = singleQuestion;

    // Record the user's answer
    addAnswer({ question, answer: selectedOption });

    // Check if the answer is correct
    if (selectedOption === options[correctOptionsIndex]) {
      trueAction();
    } else {
      falseAction();
    }

    // Proceed to the next question or finish the quiz
    setTimeout(() => {
      if (currentQuestionIndex < allQuestions.length - 1) {
        nextPage(); // Update the global `page` in the store
      } else {
        navigate("/finish");
      }
    }, 700);
  };

  // Handle invalid questions
  if (!singleQuestion) {
    setTimeout(() => {
      navigate("/finish", { replace: true }); // Redirect to finish page if no questions are available
    }, 700);
    return <p>Oops! No more questions available.</p>;
  }

  return (
    <div className="bg-[#eee7de] h-screen p-0 m-0">
      <AnimateProvider className="max-w-xl mx-auto ">
        <Question id={currentQuestionIndex + 1} handleClick={handleAnswerClick} singleQuestion={singleQuestion} />
        {/* 
      <div className="flex justify-between mt-5">
        <button
          onClick={() =>
            setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
          }
          disabled={currentQuestionIndex === 0}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentQuestionIndex((prev) =>
              Math.min(prev + 1, allQuestions.length - 1)
            )
          }
          disabled={currentQuestionIndex >= allQuestions.length - 1}
          className="p-2 bg-orange-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div> */}
      </AnimateProvider>
    </div>
  );
}

export default SingleQuestion;
