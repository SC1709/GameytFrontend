import { useState, useEffect } from "react";
import { Idx } from "../../constant";

function Option({ value, idx, handleClick, trueAnswer, userAnswer, summary }) {
  const [clicked, setClicked] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isIncorrectAnswer, setIsIncorrectAnswer] = useState(false);

  // Preload audio files
  const correctSound = new Audio("/sounds/correct.mp3");
  const incorrectSound = new Audio("/sounds/incorrect.mp3");

  // Define color mapping for different options
  const colorMapping = [
    { bg: "rgb(235, 75, 54)", text: "rgb(255,255,255)" },
    { bg: "rgb(255, 184, 61)", text: "rgb(255,255,255)" },
    { bg: "rgb(70, 120, 101)", text: "rgb(255,255,255)" },
    { bg: "rgb(189, 113, 90)", text: "rgb(255,255,255)" },
  ];

  // Update the states based on userAnswer when it's a summary page
  useEffect(() => {
    if (summary) {
      setIsCorrectAnswer(trueAnswer === value); // Check if the answer is correct
      setIsIncorrectAnswer(
        userAnswer?.answer !== trueAnswer && userAnswer?.answer === value // Incorrect answer
      );
    }
  }, [summary, trueAnswer, userAnswer, value]);

  // Handle option click for the live quiz
  const handleOptionClick = (value) => {
    setClicked(true); // Mark the option as clicked
    const isCorrect = trueAnswer === value;

    setIsCorrectAnswer(isCorrect); // Check if the answer is correct
    setIsIncorrectAnswer(!isCorrect); // Check if the answer is incorrect

    // Play sound based on correctness
    if (isCorrect) {
      correctSound.play();
    } else {
      incorrectSound.play();
    }

    // Call the handleClick function passed from the parent
    handleClick(value);

    // Reset the state after 1 second
    setTimeout(() => {
      setClicked(false); // Reset clicked state
      setIsCorrectAnswer(false); // Reset correct state
      setIsIncorrectAnswer(false); // Reset incorrect state
    }, 700);
  };

  const currentColors = colorMapping[idx % colorMapping.length];

  return (
    <div
      style={
        summary
          ? // In summary mode, apply colors based on correctness
            isCorrectAnswer
            ? {
                background: "rgb(187 247 208 / 1)", // Green background for correct answer
                color: "rgb(21 128 61 / 1)", // Green text
                fontWeight: "bold",
              }
            : isIncorrectAnswer
            ? {
                background: "rgb(254 202 202 / 1)", // Red background for incorrect answer
                color: "rgb(127 29 29 / 1)", // Red text
              }
            : {}
          : // In quiz mode, apply the defined colors
          !summary
          ? {
              background: currentColors.bg,
              color: currentColors.text,
            }
          : {}
      }
      className={`flex items-center space-x-3 mb-5 rounded-full py-4 px-6 w-4/5 text-lg font-medium cursor-pointer 
    ${!summary && isIncorrectAnswer ? "shake" : ""}
    ${!summary && isCorrectAnswer ? "stars bounce" : ""}`} // Apply only in quiz mode
      onClick={() => !summary && handleOptionClick(value)} // Only allow click during the quiz phase
    >
      <p>{Idx[idx]}.</p>
      <p>{value}</p>
    </div>
  );
}

export default Option;
