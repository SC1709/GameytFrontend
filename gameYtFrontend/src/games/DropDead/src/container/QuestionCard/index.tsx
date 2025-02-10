import React, { useState, useEffect } from 'react';
import '../../styles/QuestionCard.css';

interface QuestionCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
  isAnswerCorrect: boolean | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
}) => {
  const [droppedOption, setDroppedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  useEffect(() => {
    setDroppedOption(null);
    setIsAnswerCorrect(null);
    setDragStartY(null);
  }, [question]);

  // Handles the drop logic
  const handleDrop = (option: string) => {
    const isCorrect = option === correctAnswer;
    setDroppedOption(option);
    setIsAnswerCorrect(isCorrect);
    onAnswer(isCorrect);
  };

  // Mouse drag events
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', 'dragging');
  };

  const handleMouseDrop = (e: React.DragEvent<HTMLDivElement>, option: string) => {
    e.preventDefault();
    if (!droppedOption) {
      handleDrop(option);
    }
  };

  const handleMouseDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Touch drag events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setDragStartY(touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const deltaY = touch.clientY - (dragStartY || 0);

    if (deltaY < -50 && !droppedOption) {
      handleDrop(options[0]);
    } else if (deltaY > 50 && !droppedOption) {
      handleDrop(options[1]);
    }
  };

  return (
    <div className="quiz-container h-[21.2rem]">
      {/* Option above */}
      <div
        className={`option option-above ${
          droppedOption === options[0] ? 'highlighted' : ''
        }`}
        onDrop={(e) => handleMouseDrop(e, options[0])}
        onDragOver={handleMouseDragOver}
      >
        {options[0]}
      </div>

      {/* Draggable question */}
      <div
        className={`question ${
          isAnswerCorrect === true
            ? 'correct'
            : isAnswerCorrect === false
            ? 'wrong'
            : ''
        }`}
        draggable={!droppedOption}
        onDragStart={handleDragStart}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{
          position: droppedOption ? 'absolute' : 'relative',
          top:
            droppedOption === options[0]
              ? '30%'
              : droppedOption === options[1]
              ? '70%'
              : 'auto',
          transform: droppedOption ? 'translateY(-50%)' : 'none',
        }}
      >
        {question}
      </div>

      {/* Option below */}
      <div
        className={`option option-below ${
          droppedOption === options[1] ? 'highlighted' : ''
        }`}
        onDrop={(e) => handleMouseDrop(e, options[1])}
        onDragOver={handleMouseDragOver}
      >
        {options[1]}
      </div>
    </div>
  );
};

export default QuestionCard;
