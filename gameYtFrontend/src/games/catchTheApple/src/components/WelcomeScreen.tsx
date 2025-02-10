import React from 'react';
import { motion } from 'framer-motion';
import boy from '../assets/boy.png';
import redapple from '../assets/red-apple.png';
import greenapple from '../assets/green-apple.png';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className='flex justify-center items-center'>
    <div className="absolute top-0 w-full max-w-xs h-screen mx-auto bg-cover bg-center">
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-90 p-3 flex flex-col justify-center items-center text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.h1
          className="text-3xl font-bold mb-4 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Welcome to Catch the Apple Game
        </motion.h1>
        <motion.p
          className="text-lg mb-2 flex flex-col items-center mt-9"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Choose the <img src={greenapple} className="w-12" alt="green-apple" /> if
          the statement is correct.
        </motion.p>
        <motion.p
          className="text-lg mb-4 flex flex-col items-center mt-9"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Choose the <img src={redapple} className="w-16" alt="red-apple" /> if the
          statement is wrong.
        </motion.p>
        <motion.button
          className="flex flex-col items-center mt-12 text-lg font-semibold"
          onClick={onStart}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <img src={boy} alt="boy" /> Click Me
        </motion.button>
      </motion.div>
    </div>
    </div>
  );
};

export default WelcomeScreen;