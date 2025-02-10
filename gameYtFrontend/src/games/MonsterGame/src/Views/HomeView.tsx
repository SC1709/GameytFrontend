import React from 'react';
import monster from "../assets/images/resultSucessMonster.png";
import Button from '../Components/common/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import Title from '../Components/common/TitleComponent';

const HomeView: React.FC = () => {
    const navigate = useNavigate();
    const onClick = () => {
        // navigate("/fail");
        navigate("intro")
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b ">
            {/* Title */}
            <Title text='Monster Quiz' />
            {/* Monster Image */}
            <img
                src={monster}
                alt="Monster"
                className="w-40 sm:w-52 md:w-64 lg:w-72 mb-8 animate-bounce"
            />

            {/* Play Button */}
            <Button
                text="Play"
                onClick={onClick}

            />
        </div>
    );
};

export default HomeView;
