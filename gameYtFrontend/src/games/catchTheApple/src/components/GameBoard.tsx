import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types/index';
import bg from '../assets/bg.png';
import greenapple from '../assets/green-apple.png';
import redapple from '../assets/red-apple.png';
import boy from '../assets/boy.png';
import bird from '../assets/bird.png';
import correct from '../assets/correct.png'
import incorrect from '../assets/incorrect.png'

interface GameBoardProps {
  currentQuestion: Question;
  score: number;
  gameState: {
    boyPosition: number;
    greenAppleY: number;
    redAppleY: number;
    birdPosition: number;
    birdY: number;
    correctImage: boolean;
    incorrectImage: boolean;
    selectedApple: 'green' | 'red' | null;
  };
}

const GameBoard: React.FC<GameBoardProps> = ({
  currentQuestion,
  score,
  gameState
}) => {
  return (
    <div className='flex justify-center items-center'>
    <div className="absolute flex justify-center top-0 items-center">
      <div className="w-[300px] h-screen bg-white shadow-lg relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>

        <div className="flex flex-col items-center">
          {/* question bar */}
          <motion.div
            className="absolute top-28 bg-gray-600 p-2 text-center text-lg font-semibold text-white rounded-md"
            initial={{ x: -200 }}
            animate={{ x: '0%' }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            {currentQuestion.statement}
          </motion.div>

          {/* answer bar */}
          <motion.div
            className="absolute top-56 bg-white p-2 text-center text-lg font-semibold text-gray-600 rounded-md"
            initial={{ x: -200 }}
            animate={{ x: '0%' }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            {currentQuestion.answer}
          </motion.div>
        </div>

        <div className="absolute top-1/2 left-0 w-full flex items-center justify-around">
          <motion.div
            animate={{ 
              y: gameState.greenAppleY, 
              x: gameState.selectedApple === 'green' ? -300 : 0 
            }}
            transition={{
              y: { type: "spring", stiffness: 50, damping: 20 },
              x: { duration: 1, delay: 2 }
            }}
          >
            <img src={greenapple} alt="Green Apple" className="w-16 h-auto" />
          </motion.div>

          <motion.div
            animate={{ 
              y: gameState.redAppleY, 
              x: gameState.selectedApple === 'red' ? 300 : 0 
            }}
            transition={{
              y: { type: "spring", stiffness: 50, damping: 20 },
              x: { duration: 1, delay: 2 }
            }}
          >
            <img src={redapple} alt="Red Apple" className="w-20 h-auto" />
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 w-full flex justify-center"
          animate={{ x: gameState.boyPosition }}
          transition={{ stiffness: 50 }}
        >
          <img src={boy} alt="Boy" className="w-44 h-auto" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2"
          initial={{ x: 300, y: -100 }}
          animate={{
            x: gameState.birdPosition,
            y: gameState.birdY
          }}
          transition={{
            x: { stiffness: 100, damping: 20 },
            y: { stiffness: 100, damping: 20 }
          }}
        >
          <img src={bird} alt="Bird" className="w-44 h-auto" />
        </motion.div>

        {gameState.correctImage && (
          <motion.img
            src={correct}
            alt="Feedback"
            className="absolute bottom-0 left-24 w-32"
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
          />
        )}
        {gameState.incorrectImage && (
          <motion.img
            src={incorrect}
            alt="Feedback"
            className="absolute bottom-0 left-24 w-32"
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
          />
        )}

        <div className="absolute top-4 right-4 text-xl text-gray-600">
          Score: {score}
        </div>
      </div>
    </div>
    </div>
  );
};

export default GameBoard;