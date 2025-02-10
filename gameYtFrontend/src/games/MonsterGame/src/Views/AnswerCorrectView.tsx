import React from 'react';
import { motion } from 'framer-motion';

const AnswerCorrect: React.FC = () => {
    return (
        <div className="mt-4" >
            <motion.div
                className="text-8xl sm:text-5xl md:text-8xl lg:text-7xl font-extrabold text-center text-[#A5E169]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                Correct
            </motion.div>
        </div>
    );
}

export default AnswerCorrect;
