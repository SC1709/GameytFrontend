import React from 'react';

type QuestionProps = {
    text: string;
};

const Question: React.FC<QuestionProps> = ({ text }) => {
    return (
        <div className="bg-[#31134F] text-[#FFA247] p-6 rounded-lg w-full max-w-3xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{text}</h3>
        </div>
    );
};

export default Question;
