import React from "react";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import Question from "../../components/Questions/Questions";
import useQuestionStore from "../../store/zustand";
import { ChevronLeft } from "lucide-react";

export const Summary = () => {
  const { question: allQuestion } = useQuestionStore();

  const handleBack = () => {
    window.history.back();
  };

  return (
    <AnimateProvider>
      <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h3 className="text-center text-3xl font-bold text-sky-950 mb-2">Questions Summary</h3>
            <p className="text-center text-sky-700">Review your answers and correct solutions</p>
          </div>

          {/* Questions Container */}
          <div className=" rounded-2xl p-4 sm:p-6">
            <div className="h-[calc(100vh-300px)] overflow-y-auto">
              <div className="flex flex-col space-y-4">
                {allQuestion.map((question, i) => (
                  <div key={i} className="w-full bg-white rounded-xl border p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
                    <Question singleQuestion={question} id={i + 1} summary={true} trueAnswer={question.correct_answer} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleBack}
              className="group flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </AnimateProvider>
  );
};
