import React from 'react';
import { motion } from 'framer-motion';
import left from '../assets/left.png';
import right from '../assets/right.png';
import enter from '../assets/enter.png';
import boy from '../assets/boy.png';

interface InstructionsScreenProps {
  onStartGame: () => void;
}

const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onStartGame }) => {
  return (
    <div className='flex justify-center items-center'>
    <div className="absolute top-0 w-full max-w-xs h-screen mx-auto bg-cover bg-center">
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center text-white"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <motion.h1
          className="text-2xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Game Instructions
        </motion.h1>
        <motion.p
          className="text-lg mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Control the basket with:
        </motion.p>
        <motion.div
          className="flex justify-center items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <img src={left} className="w-14" alt="Left Arrow" />
          <img src={boy} alt="Boy" />
          <img src={right} className="w-14" alt="Right Arrow" />
        </motion.div>
        <motion.p
          className="text-lg mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Press "Enter" to drop the apple
        </motion.p>
        <motion.img
          src={enter}
          alt="Enter Key"
          className="w-14"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.button
          onClick={onStartGame}
          className="px-6 py-3 bg-orange-950 text-white mt-16 text-lg font-semibold rounded hover:bg-orange-900"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Start Game
        </motion.button>
      </motion.div>
    </div>
    </div>
  );
};

export default InstructionsScreen;