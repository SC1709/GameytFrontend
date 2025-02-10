import React from 'react';
import { motion } from 'framer-motion';
import wrong from "../assets/images/answerWrong.png";

const AnswerWrong: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen overflow-hidden">
            {/* Wrap both image and text in a motion.div for combined scaling */}
            <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 2 }}
                transition={{ duration: 1.5 }}
            >
                {/* Image */}
                <motion.img
                    src={wrong}
                    alt="Wrong Answer"
                    className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] max-w-full max-h-full" // Resize for responsiveness and limit max width/height
                />
                {/* Text Overlay */}
                <motion.p
                    className="absolute text-white text-xl sm:text-2xl md:text-3xl font-extrabold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    OH NO!
                </motion.p>
            </motion.div>
        </div>
    );
}

export default AnswerWrong;
