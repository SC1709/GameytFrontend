import React,{ useEffect, useState } from "react";
import GameView from "../../views/GameView";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGameScore, setTotalQuestion } from "../../redux/rootSlice";
import questionData from "../../Resources/Data/Questions.json";

// Retrieve questions from localStorage or fallback to default questions
const getQuestionsFromLocalStorage = () => {
  const questionsString = localStorage.getItem("question-storage");
  if (questionsString) {
    try {
      const parsedData = JSON.parse(questionsString);
      return parsedData?.state?.question || questionData; // Fallback to default questions
    } catch (error) {
      console.error("Error parsing questions from local storage:", error);
      return questionData;
    }
  }
  return questionData;
};
// const questionsString = localStorage.getItem("question-storage");
// const questions = questionsString? JSON.parse(questionsString).state.question: questionData;
// console.log(questions);
const transformQuestionFormat = (question: any) => {
  const allOptions = question.options;
  const correctIndex = question.correctOptionsIndex;
  const firstTwoOptions = allOptions.slice(0, 2);
  const thirdOption = correctIndex === 3 ? allOptions[3] : allOptions[2];
  const selectedOptions = [...firstTwoOptions, thirdOption];
  // Find the new index of the correct answer in the selected options
  const newCorrectIndex = selectedOptions.indexOf(allOptions[correctIndex]);
  return {
    question: question.question,
    options: selectedOptions.map((option, index) => ({
      optionContent: option,
      isCorrect: index === newCorrectIndex,
    })),
    correctAnswerId: `Option${String.fromCharCode(65 + newCorrectIndex)}`, // Map to OptionA, OptionB, etc.
  };
};

const GameContainer = () => {
  const [questions, setQuestions] = useState(getQuestionsFromLocalStorage());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isReverseAnimationsDone, setReverseAnimationsDone] = useState(false);
  const [isOptionClicked, setOptionClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch updated questions from localStorage whenever the game starts
  useEffect(() => {
    const updatedQuestions = getQuestionsFromLocalStorage();
    setQuestions(updatedQuestions);
    dispatch(setTotalQuestion(updatedQuestions.length));
  }, [dispatch]);

  const currentQuestion = transformQuestionFormat(
    questions[currentQuestionIndex]
  );
  // console.log(currentQuestion);

  const moveSnake = (targetId: string, isOptionC: boolean = false) => {
    const snake = document.querySelector(".snake1") as HTMLElement;
    const target = document.querySelector(`#${targetId}`) as HTMLElement;

    if (snake && target) {
      // Rotate the snake
      const snakeRotation =
        targetId === "buttonA"
          ? "rotate(-20deg)"
          : targetId === "buttonB"
          ? "rotate(-17deg)"
          : "rotate(2deg)";

      snake.style.transform = snakeRotation;

      setTimeout(() => {
        snake.style.opacity = "1";

        const targetRect = target.getBoundingClientRect();
        const snakeRect = snake.getBoundingClientRect();

        const stopBefore = 80; // Horizontal distance to stop before the button
        const stopBelow = 40; // Vertical distance to position below the button
        let offsetY = 0;

        if (!isOptionC) {
          offsetY = targetRect.top - snakeRect.top + stopBelow;
        } else {
          offsetY = targetRect.top - snakeRect.top;
        }
        const offsetX = targetRect.left - snakeRect.left - stopBefore;

        // Update the snake's position
        snake.style.left = `${snake.offsetLeft + offsetX}px`;
        snake.style.top = `${snake.offsetTop + offsetY}px`;
      }, 1000);
    }
  };

  const moveEagle = (targetId: string) => {
    const snake = document.querySelector(".snake1") as HTMLElement;
    const eagle = document.querySelector(".eagle") as HTMLElement;
    const flower = document.querySelector(".flower-image") as HTMLElement;

    if (snake && eagle && flower) {
      const eagleRotation =
        targetId === "buttonA"
          ? "rotate(16deg)"
          : targetId === "buttonB"
          ? "rotate(2deg)"
          : "rotate(-6deg)";

      // Move eagle to the snake
      setTimeout(() => {
        eagle.style.transition =
          "transform 2s ease-in-out, left 3s ease-in-out, top 3s ease-in-out, opacity 1s ease-in-out";
        eagle.style.transform = eagleRotation;
        eagle.style.opacity = "1";

        const updatedSnakeRect = snake.getBoundingClientRect();
        const stopAbove = 80; // Distance to stop above the snake
        const stopAfter = 40;
        const eagleOffsetX =
          updatedSnakeRect.left -
          eagle.getBoundingClientRect().left +
          stopAfter;
        const eagleOffsetY =
          updatedSnakeRect.top - eagle.getBoundingClientRect().top - stopAbove;

        eagle.style.left = `${eagle.offsetLeft + eagleOffsetX}px`;
        eagle.style.top = `${eagle.offsetTop + eagleOffsetY}px`;

        // Move both snake and eagle to the flower after eagle reaches the snake
        setTimeout(() => {
          const flowerRect = flower.getBoundingClientRect();
          const snakeRect = snake.getBoundingClientRect();

          const moveToFlowerX = flowerRect.left - snakeRect.left - 30;
          const moveToFlowerY = flowerRect.top - snakeRect.top + 10;

          eagle.style.transform = "rotate(20deg)";
          snake.style.transition =
            "transform 2s ease-in-out, left 2s ease-in-out, top 2s ease-in-out";
          eagle.style.transition =
            "transform 2s ease-in-out, left 2s ease-in-out, top 2s ease-in-out";

          snake.style.left = `${snake.offsetLeft + moveToFlowerX}px`;
          snake.style.top = `${snake.offsetTop + moveToFlowerY}px`;

          eagle.style.left = `${eagle.offsetLeft + moveToFlowerX}px`;
          eagle.style.top = `${eagle.offsetTop + moveToFlowerY}px`;

          //Make both snake and eagle invisible
          setTimeout(() => {
            snake.style.opacity = "0";
            eagle.style.opacity = "0";
          }, 1800);
        }, 3000);
      }, 2000);
    }
  };

  const makeTargetInvisible = (targetId: string) => {
    const target = document.querySelector(`#${targetId}`) as HTMLElement;

    if (target) {
      setTimeout(() => {
        if (targetId === "buttonC") {
          target.classList.add("optionC-shrinkAndDisappear");
        } else {
          target.classList.add("shrink-and-disappear");
        }
      }, 3500);
    }
  };

  const moveSnakeBack = () => {
    const snake = document.querySelector(".snake1") as HTMLElement;
    if (snake) {
      const originalPosition = { left: 50, top: 261 }; // original position
      snake.style.transition = "left 3s ease-in-out, top 3s ease-in-out";
      snake.style.left = `${originalPosition.left}px`;
      snake.style.top = `${originalPosition.top}px`;
      setTimeout(() => {
        snake.style.opacity = "0";
      }, 1800);
    }
  };

  const rotateSnakeMovement = (isOptionC: boolean) => {
    const snake = document.querySelector(".snake1") as HTMLElement;
    if (snake) {
      snake.style.transition = "transform 2s ease-in-out";
      snake.style.transform = isOptionC ? "rotate(200deg)" : "rotate(140deg)";
    }
  };

  const changeBackgroundColor = (
    clickedElement: HTMLElement,
    correctAnswerId: string
  ) => {
    const correctElement = document.querySelector(
      `#${correctAnswerId}`
    ) as HTMLElement;

    clickedElement.classList.add(
      clickedElement.id === correctAnswerId ? "correct-answer" : "wrong-answer"
    );
    // Always highlight the correct option
    if (correctElement) {
      correctElement.classList.add("correct-answer");
    }
  };

  const triggerReverseAnimations = () => {
    const question = document.querySelector(".question-card") as HTMLElement;
    const options = document.querySelectorAll(
      ".option-card"
    ) as NodeListOf<HTMLElement>;
    const buttons = document.querySelectorAll(
      ".button-element"
    ) as NodeListOf<HTMLElement>;
    // Apply reverse animation classes
    if (question) {
      question.classList.add("slide-DownReverse");
    }
    options.forEach((option) => option.classList.add("slide-leftReverse"));

    buttons.forEach((button) => {
      button.classList.add("button-slide-reverse");
    });

    setTimeout(() => {
      setReverseAnimationsDone(true);
    }, 1000);
  };

  const rotateSnake = (
    e: React.MouseEvent<HTMLDivElement>,
    isOptionC: boolean = false
  ) => {
    if (isReverseAnimationsDone || isOptionClicked) return;
    setOptionClicked(true);
    const clickedElement = e.currentTarget as HTMLElement;
    console.log(clickedElement.id);

    // Get the correct answer ID from the current question
    const correctAnswerId = currentQuestion.correctAnswerId;
    //changed option id i.e clicked option to its corresponding element
    const targetId = clickedElement.id.replace("Option", "button");
    console.log(targetId);

    moveSnake(targetId, isOptionC);
    setTimeout(() => {
      changeBackgroundColor(clickedElement, correctAnswerId);
    }, 3500);

    if (clickedElement.id === correctAnswerId) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        console.log("Updated Score:", newScore);
        return newScore;
      });
      makeTargetInvisible(targetId);
      setTimeout(() => {
        rotateSnakeMovement(isOptionC);
      }, 4500);
      setTimeout(() => {
        moveSnakeBack();
      }, 5500);
      // Trigger reverse animations after snake moves back
      setTimeout(() => {
        triggerReverseAnimations();
      }, 7200);
    } else {
      setTimeout(() => moveEagle(targetId), 1500);
      // Trigger reverse animations after eagle movement
      setTimeout(() => {
        triggerReverseAnimations();
      }, 8400);
    }
  };

  const rotateSnakeA = (e: React.MouseEvent<HTMLDivElement>) => rotateSnake(e);
  const rotateSnakeB = (e: React.MouseEvent<HTMLDivElement>) => rotateSnake(e);
  const rotateSnakeC = (e: React.MouseEvent<HTMLDivElement>) =>
    rotateSnake(e, true);

  const loadNextQuestion = () => {
    setReverseAnimationsDone(false);
    setOptionClicked(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      dispatch(setGameScore(score));
      // dispatch(setTotalQuestion(questions.length));
      console.log("Quiz completed!");
      navigate("/snakegame/play/result");
    }
  };
  useEffect(() => {
    if (isReverseAnimationsDone) {
      loadNextQuestion(); // Load the next question after the animation timeout
    }
  }, [isReverseAnimationsDone]);

  return (
    <div>
      <GameView
        key={currentQuestionIndex}
        options={currentQuestion.options}
        question={currentQuestion.question}
        rotateSnakeA={rotateSnakeA}
        rotateSnakeB={rotateSnakeB}
        rotateSnakeC={rotateSnakeC}
      />
    </div>
  );
};

export default GameContainer;
