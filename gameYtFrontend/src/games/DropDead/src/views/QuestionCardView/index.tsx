import React from 'react';
import '../../styles/QuestionCard.css';

interface QuestionCardStructureProps {
    question: string;
    options: string[];
    droppedOption: string | null;
    isAnswerCorrect: boolean | null;
    correctAnswer: string;  // Add this line
    handleMouseDrop: (e: React.DragEvent<HTMLDivElement>, option: string) => void;
    handleMouseDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    handleTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  }
  
  const QuestionCardView: React.FC<QuestionCardStructureProps> = ({
    question,
    options,
    droppedOption,
    isAnswerCorrect,
    correctAnswer,  // Use it here
    handleMouseDrop,
    handleMouseDragOver,
    handleDragStart,
    handleTouchStart,
    handleTouchMove,
  }) => {
    return (
      <div className="quiz-container h-[21.2rem]">
        {/* Option above */}
        {!droppedOption || droppedOption === options[0] ? (
          <div
            className={`option option-above ${droppedOption === options[0] ? 'highlighted' : ''}`}
            onDrop={(e) => handleMouseDrop(e, options[0])}
            onDragOver={handleMouseDragOver}
          >
            {options[0]}
          </div>
        ) : null}
  
        {/* Draggable question */}
        <div
          className={`question ${isAnswerCorrect === true ? 'correct' : isAnswerCorrect === false ? 'wrong' : ''}`}
          draggable={!droppedOption}
          onDragStart={handleDragStart}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{
            position: droppedOption ? 'absolute' : 'relative',
            top: droppedOption === options[0] ? '30%' : droppedOption === options[1] ? '70%' : 'auto',
            transform: droppedOption ? 'translateY(-50%)' : 'none',
          }}
        >
          {question}
        </div>
  
        {/* Option below */}
        {!droppedOption || droppedOption === options[1] ? (
          <div
            className={`option option-below ${droppedOption === options[1] ? 'highlighted' : ''}`}
            onDrop={(e) => handleMouseDrop(e, options[1])}
            onDragOver={handleMouseDragOver}
          >
            {options[1]}
          </div>
        ) : null}
      </div>
    );
  };
  
  export default QuestionCardView;
  