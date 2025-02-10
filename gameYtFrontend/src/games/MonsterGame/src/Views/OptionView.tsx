import React from 'react';

type OptionProps = {
    text: string;
};

const Option: React.FC<OptionProps> = ({ text }) => {
    return (
        <div className="bg-[#D4A9FF] text-[#5A1E96] p-4 rounded-lg w-full max-w-3xl mx-auto mb-4 text-center hover:cursor-pointer">
            <span className="text-lg sm:text-xl md:text-2xl font-medium hover:cursor-pointer">{text}</span>
        </div>
    );
};

export default Option;
