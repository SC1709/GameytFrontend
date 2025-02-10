import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMonsterContext } from "../context/MonsterContext"; // Import context hook
import resultFailMonster from "../assets/images/resultFailMonster.png";
import resultFailCage from "../assets/images/resultSucessCage.png";
import thread from "../assets/images/thread.png"; // Thread image or style
import Score from "../Components/game/ScoreComponent";
import Buttons from "./Buttons";
import useQuestionStore from "../../../../store/zustand";

const ResultFailure: React.FC = () => {
  const { totalQuestions, correctCount, answerStatus, setIsCageFalling } = useMonsterContext(); // Get the context values
  const [isBreakingOut, setIsBreakingOut] = useState(false);
  const [showScore, setShowScore] = useState(false); // State to control score visibility
  const { playMore, currentChunkIndex, transcriptChunks } = useQuestionStore();

  // Trigger the animation after the component mounts
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsBreakingOut(true); // Start the animation
      setTimeout(() => {
        setShowScore(true); // Show score after the animation
      }, 2000); // Delay for showing score after animation
    }, 500); // Initial delay before starting the animation

    return () => clearTimeout(animationTimer); // Cleanup timeout on unmount
  }, []);

  useEffect(() => {
    if (answerStatus === "wrong") {
      // Trigger special effects or animations for wrong answers
      setIsCageFalling(true);
    }
  }, [answerStatus, setIsCageFalling]);

  return (
    <>
      {/* Animation Container */}
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        {/* Score Container */}
        {showScore && (
          <div className="absolute top-16 w-full flex justify-center">
            <div className="w-5/6 sm:w-2/3 lg:w-1/2 text-center">
              {/* Show the score after all animations are done */}
              <Score total={totalQuestions} current={correctCount} />
            </div>
          </div>
        )}

        <motion.div className="relative">
          {/* Thread (Hanging initially) */}
          <motion.img
            src={thread}
            alt="Thread"
            className="absolute top-8 left-1/2 transform -translate-x-1/2"
            initial={{ y: -400 }} // Initial state: hanging
            animate={isBreakingOut ? { y: 350, marginLeft: "10rem", rotate: 120 } : {}} // Falls after breakout
            transition={{
              type: "spring",
              stiffness: 60, // Slower movement
              damping: 25, // Smoother motion
              duration: 3, // Longer duration for a more dramatic effect
              delay: 0.5, // Slight delay for realism
            }}
          />

          {/* Cage Animation */}
          <motion.img
            src={resultFailCage}
            alt="Cage"
            className="absolute inset-0 mx-auto w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
            initial={{ y: -20 }}
            animate={isBreakingOut ? { scale: 1.2, y: 400, rotate: 20, marginRight: "10rem" } : {}}
            transition={{
              type: "spring",
              stiffness: 50, // Slower movement for cage
              damping: 10, // Smoother cage motion
              duration: 2, // Longer duration to let the cage animate
              delay: 0.5, // Delay so the cage moves after thread and monster
            }}
          />

          {/* Monster Animation */}
          <motion.img
            src={resultFailMonster}
            alt="Monster"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64"
            initial={{ scale: 1 }}
            animate={isBreakingOut ? { scale: 3, y: -50 } : {}}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 30,
              duration: 3, // Slow down the monster's growth
              delay: 0.5, // Delay for monster scaling to start after the cage starts moving
            }}
          />
        </motion.div>
      </div>
      {/* Pass playMore as a prop to Buttons */}
      {showScore && <Buttons />}
    </>
  );
};

export default ResultFailure;
