import React from 'react';
import { motion } from 'framer-motion';

type IndexProps = {
    id: number;
};

const QuestionIndex: React.FC<IndexProps> = ({ id }) => {
    return (
        <div className="mt-4" >
            <motion.h1
                className="text-6xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-center text-[#D4A9FF]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                Question {id}
            </motion.h1>
        </div>
    );
};

export default QuestionIndex;
