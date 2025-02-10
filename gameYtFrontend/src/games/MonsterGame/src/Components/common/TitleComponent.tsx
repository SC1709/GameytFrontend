import React from 'react';

interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <h1 className="font-bold text-5xl sm:text-5xl md:text-6xl lg:text-6xl text-center mb-16" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            {text.toLocaleUpperCase()}
        </h1>
    );
};

export default Title;
