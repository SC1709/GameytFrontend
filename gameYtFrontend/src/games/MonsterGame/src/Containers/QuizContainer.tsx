import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMonsterContext } from "../context/MonsterContext";
import Question from "../Components/game/QuestionComponent";
import Option from "../Views/OptionView";
import monster from "../assets/images/resultSucessMonster.png";
import QuestionIndex from "../Views/QuestionIndexView";
import AnswerCorrect from "../Views/AnswerCorrectView";
import AnswerWrong from "../Views/AnswerWrongView";
import questionsDemoData from "../assets/sample.json";

type Question = {
  correctOptionsIndex: number;
  options: string[];
  question: string;
  chunkIndex: number;
};

// const questionsDemoData = [
//   {
//     correctOptionsIndex: 0,
//     options: ["Guido van Rossum", "Brendan Eich", "Tim Berners-Lee", "Linus Torvalds"],
//     question: "Who created JavaScript in 1995?",
//     chunkIndex: 0,
//   },
//   {
//     correctOptionsIndex: 0,
//     options: ["Cappuccino", "Espresso", "Latte", "Mocha"],
//     question: "What was JavaScript originally named?",
//     chunkIndex: 0,
//   },
//   {
//     correctOptionsIndex: 0,
//     options: ["SpiderMonkey Engine", "ChakraCore Engine", "Nitro Engine", "V8 Engine"],
//     question: "Which engine uses a just-in-time compiler for JavaScript?",
//     chunkIndex: 0,
//   },
//   {
//     correctOptionsIndex: 0,
//     options: ["Parallel processing threads ", "Non-blocking event loop ", "Blocking synchronous calls ", "Multi-threading model "],
//     question: "How does JavaScript handle I/O operations efficiently despite being single-threaded?",
//     chunkIndex: 0,
//   },
//   {
//     correctOptionsIndex: 0,
//     options: ["Node.js runtime ", "Tomcat server ", "Apache server ", "IIS server "],
//     question: "In which environment can you run server-side JavaScript code? ",
//     chunkIndex: 0,
//   },
//   {
//     correctOptionsIndex: 0,
//     options: ["Reassignable variable declaration ", "Constant value assignment ", "Event listener attachment ", "Function definition keyword "],
//     question: "What is the purpose of 'let' in JavaScript variables? ",
//     chunkIndex: 0,
//   },
//   {
//     correctOptionsIndex: 0,
//     options: ["Immediate functions", "Blocking callbacks", "Async/await syntax", "Synchronous loops"],
//     question: "Which syntax supports asynchronous programming in JavaScript? ",
//     chunkIndex: 0,
//   },
// ];

// Shuffling options while keeping track of the correct answer
function shuffleCorrectOption(questions: Question[]): Question[] {
  return questions.map((question) => {
    const shuffledOptions = [...question.options];
    const correctOption = shuffledOptions[question.correctOptionsIndex]; // Get the correct option
    shuffledOptions.splice(question.correctOptionsIndex, 1); // Remove the correct option from its original position

    const randomIndex = Math.floor(Math.random() * shuffledOptions.length); // Random position for the correct option
    shuffledOptions.splice(randomIndex, 0, correctOption); // Insert the correct option at the random position

    // Find the new index of the correct option after shuffling
    const newCorrectIndex = shuffledOptions.indexOf(correctOption);

    return {
      ...question,
      options: shuffledOptions,
      correctOptionsIndex: newCorrectIndex, // Update the index to the new position of the correct option
    };
  });
}

const QuestionsList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(questionsDemoData);
  const [playMore, setPlayMore] = useState<boolean>(false);

  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    correctCount,
    setCorrectCount,
    currentView,
    setCurrentView,
    answerStatus,
    setAnswerStatus,
    isAnswered,
    setIsAnswered,
    setTotalQuestions,
    totalQuestions,
  } = useMonsterContext();

  const navigate = useNavigate();

  const handleOptionSelect = (selectedId: number) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the selected option is correct
    if (selectedId === currentQuestion.correctOptionsIndex) {
      setAnswerStatus("correct");
      setCorrectCount(correctCount + 1);
    } else {
      setAnswerStatus("wrong");
    }

    setIsAnswered(true); // Mark the question as answered
    setCurrentView("status");
  };

  // View transition function to simplify logic
  const transitionToNextView = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setCurrentView("index");
    } else {
      setCurrentView("result");
    }
  };

  // Load questions from localStorage and shuffle them
  useEffect(() => {
    const storedQuestions = localStorage.getItem("question-storage");
    if (storedQuestions) {
      const loadedQuestions = JSON.parse(storedQuestions).state.question;
      setQuestions(shuffleCorrectOption(loadedQuestions));
      // console.log(loadedQuestions);

      setPlayMore(true); // Set playMore to true if questions are loaded from localStorage
    } else {
      setQuestions(shuffleCorrectOption(questionsDemoData)); // Use demo data if no questions are stored
      setPlayMore(true); // Set playMore to true when using demo data
    }
    setTotalQuestions(questions.length);
  }, []);

  // Handle navigation after the quiz is completed
  useEffect(() => {
    if (currentView === "result") {
      if (correctCount < questions.length) {
        navigate("../fail"); // Pass playMore to the fail path
      } else {
        navigate("../success"); // Pass playMore to the success path
      }
    }
  }, [currentView, correctCount, navigate, playMore]);

  useEffect(() => {
    if (currentView === "status") {
      const timer = setTimeout(() => {
        transitionToNextView();
      }, 2000); // Wait for 2 seconds before moving to the next question or result

      return () => clearTimeout(timer); // Cleanup timeout when component unmounts or currentView changes
    }
  }, [currentView, currentQuestionIndex]);

  useEffect(() => {
    if (currentView === "index" && !isAnswered) {
      const timer = setTimeout(() => {
        setCurrentView("question");
      }, 2000); // Transition to question after 2 seconds

      return () => clearTimeout(timer); // Cleanup timeout when component unmounts or currentView changes
    }
  }, [currentView, isAnswered]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#5A1E96] space-y-4 p-4">
      {/* Question Index View */}
      {currentView === "index" && (
        <div className="flex-grow flex justify-center items-center">
          <QuestionIndex id={currentQuestionIndex + 1} />
        </div>
      )}

      {/* Question and Options View */}
      {currentView === "question" && (
        <div className="flex flex-col flex-grow justify-center items-center space-y-4">
          <Question text={questions[currentQuestionIndex].question} />
          <ul className="w-full flex flex-col items-center space-y-3">
            {questions[currentQuestionIndex].options.map((option, i) => (
              <li key={i} onClick={() => handleOptionSelect(i)} className="w-full max-w-md">
                <Option text={option} />
              </li>
            ))}
          </ul>
          <div className="relative flex justify-center items-center">
            <img src={monster} alt="Monster" className="w-40 max-w-full h-auto object-contain" />
          </div>
        </div>
      )}

      {/* Correct/Wrong Status View */}
      {currentView === "status" && (
        <div className="flex-grow flex justify-center items-center">
          {answerStatus === "correct" && <AnswerCorrect />}
          {answerStatus === "wrong" && <AnswerWrong />}
        </div>
      )}
    </div>
  );
};

export default QuestionsList;
