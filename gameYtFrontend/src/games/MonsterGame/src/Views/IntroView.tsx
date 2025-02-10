import React from 'react';
import Title from '../Components/common/TitleComponent';
import Button from '../Components/common/ButtonComponent';
import { useNavigate } from 'react-router-dom';

const Intro: React.FC = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("../game");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 lg:p-16">
            <Title text="How to Play" />
            <p className="text-center text-[#D4A9FF] text-lg sm:text-xl md:text-2xl mb-8 max-w-xl">
                The objective of the game is to answer all of the questions correctly. Get all the correct answers and you can imprison the monster.
            </p>
            <Button text="Let's Go" onClick={onClick} />
        </div>
    );
};

export default Intro;
