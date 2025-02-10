import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameScreenView from "../../views/GameScreenView/index";
import character1 from "../../Resources/images/character1.png";
import character2 from "../../Resources/images/character2.png";
import character3 from "../../Resources/images/character3.png";
import character4 from "../../Resources/images/character4.png";
import character5 from "../../Resources/images/character5.png";
import treasure1 from "../../Resources/images/treasure1.png";
import treasure2 from "../../Resources/images/treasure2.png";
import treasure3 from "../../Resources/images/treasure3.png";
import coin from "../../Resources/images/coin.png";
import demoData from "../../data/sampleData.json";

const GameScreen: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [treasureImage, setTreasureImage] = useState(treasure1);
  const [showCoin, setShowCoin] = useState(false);
  const navigate = useNavigate();

  const characterImages = [character1, character2, character3, character4, character5];
  const animationDuration = 3000;
  const timePerImage = animationDuration / characterImages.length;

  useEffect(() => {
    // Reset game results at the start of a new game
    localStorage.setItem("gameResults", JSON.stringify({ trueAnswer: 0, falseAnswer: 0 }));

    // Fetch questions from localStorage or JSON file
    const storedData = localStorage.getItem("question-storage");

    const fetchQuestions = async () => {
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const questionData = parsedData.state?.question || [];
        const formattedQuestions = formatQuestions(questionData);
        setQuestions(formattedQuestions);
      } else {
        try {
          const response = await fetch("demoData"); // Update the path to your JSON file
          const questionData = await response.json();
          const formattedQuestions = formatQuestions(questionData);
          setQuestions(formattedQuestions);

          // Save questions in localStorage for future use
          localStorage.setItem("question-storage", JSON.stringify({ state: { question: questionData } }));
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };

    fetchQuestions();
  }, []);

  const formatQuestions = (questionData: any[]) => {
    return questionData.map((q: any) => {
      const options = q.options || [];
      const correctOption = options[q.correctOptionsIndex];
      const incorrectOption = options.filter((_: any, idx: number) => idx !== q.correctOptionsIndex);

      // Combine correct and incorrect options, then shuffle them
      const shuffledOptions = [correctOption, ...incorrectOption].sort(() => Math.random() - 0.5);

      return {
        question: q.question,
        options: shuffledOptions,
        correct: correctOption,
      };
    });
  };

  useEffect(() => {
    let interval: number | null = null;

    if (isAnswerCorrect !== null) {
      interval = window.setInterval(() => {
        setCurrentCharacter((prev) => {
          const nextIndex = prev + 1;

          if (nextIndex === Math.floor(characterImages.length * 0.7)) {
            setTreasureImage(treasure1);
          }

          if (nextIndex === characterImages.length) {
            setTreasureImage(treasure2);
            setTimeout(() => {
              setTreasureImage(treasure3);
              if (isAnswerCorrect) {
                setShowCoin(true);
              }
            }, 100);
          }

          if (nextIndex >= characterImages.length) {
            window.clearInterval(interval as number);
            return characterImages.length - 1;
          }

          return nextIndex;
        });
      }, timePerImage);
    }

    return () => {
      if (interval !== null) window.clearInterval(interval);
    };
  }, [isAnswerCorrect]);

  const handleAnswer = (isCorrect: boolean) => {
    setIsAnswerCorrect(isCorrect);

    // Update the results in localStorage
    const gameResults = JSON.parse(localStorage.getItem("gameResults") || "{}");
    const updatedResults = {
      trueAnswer: (gameResults.trueAnswer || 0) + (isCorrect ? 1 : 0),
      falseAnswer: (gameResults.falseAnswer || 0) + (isCorrect ? 0 : 1),
    };
    localStorage.setItem("gameResults", JSON.stringify(updatedResults));

    setTimeout(() => {
      setIsAnswerCorrect(null);
      setTreasureImage(treasure1);
      setShowCoin(false);
      setCurrentCharacter(0);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        navigate("/dropdead/play/success");
      }
    }, animationDuration + 1000);
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <GameScreenView
      question={questions[currentQuestionIndex].question}
      options={questions[currentQuestionIndex].options}
      correctAnswer={questions[currentQuestionIndex].correct}
      onAnswer={handleAnswer}
      isAnswerCorrect={isAnswerCorrect}
      characterImages={characterImages}
      currentCharacter={currentCharacter}
      treasureImage={treasureImage}
      showCoin={showCoin}
      coin={coin}
    />
  );
};

export default GameScreen;
