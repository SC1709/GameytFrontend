import React from "react";

type ScoreProps = {
    total: number;
    current: number;
};

const Score: React.FC<ScoreProps> = ({ total, current }) => {
    return (
        <>
            <p className="text-[#8C47CD] font-bold text-4xl sm:text-4xl md:text-4xl lg:text-4xl">
                YOUR SCORE
            </p>
            <h2 className="text-[#A5E169] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
                {`${current}/${total}`}
            </h2>
        </>
    );
};

export default Score;
