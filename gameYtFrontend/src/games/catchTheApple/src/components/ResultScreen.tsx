import React from "react";
import { motion } from "framer-motion";
import over from "../assets/over.png";
import cross from "../assets/cross.png";
import tick from "../assets/tick.png";
import questions from "../data/questions";
import trophy from "../assets/trophy.png";

interface ResultScreenProps {
  score: number;
  onReplay: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, onReplay }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="absolute top-0 w-full max-w-xs h-screen mx-auto bg-cover bg-center">
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.img
            src={over}
            alt="Game Over"
            className="w-36 font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          <motion.div
            className="w-4/5 h-96 flex flex-col justify-evenly bg-white rounded-md text-black"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center justify-center">
              <img src={trophy} className="w-36" alt="" />
            </div>

            <h1>{score > 0 ? "Congratulations!" : "Uh oh"}</h1>
            <div className="flex justify-evenly items-center">
              <div className="border-r border-t border-black w-1/3 flex flex-col items-center">
                <h1>{questions.length}</h1>
                <p>Total</p>
              </div>
              <div className="border-r  border-t border-black w-1/3 flex flex-col items-center">
                <div className="flex justify-between items-center space-x-3">
                  <img src={tick} className="w-6 h-6 mt-2" alt="" />
                  <h1>{score}</h1>
                </div>
                <p>Correct</p>
              </div>
              <div className=" border-t border-black w-1/3 flex flex-col items-center">
                <div className="flex justify-between items-center space-x-3">
                  <img src={cross} className="w-6 h-6 mt-2" alt="" />
                  <h1>{questions.length - score}</h1>
                </div>
                <p>Wrong</p>
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={onReplay}
            className="relative bottom-6 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded hover:bg-green-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Replay Game
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultScreen;
