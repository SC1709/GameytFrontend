import React from "react";
import Cartoon from "../../Resources/images/Cartoon.png";
import character1 from "../../Resources/images/character1.png";
import treasure1 from "../../Resources/images/treasure1.png";
import back from "../../Resources/images/back.png";
import { useNavigate } from "react-router-dom";

const StartScreen: React.FC = () => {
  const navigate = useNavigate();

  const start = () => {
    navigate("/dropdead/play/tutorial");
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="w-full md:w-[22rem] h-screen bg-[#C3F8F6] flex flex-col items-center justify-between py-8 relative">
        {/* Viking Image */}
        <img src={Cartoon} alt="Viking Head" className="w-42 h-42 object-contain mt-4 z-20" />

        {/* Start Button */}
        <button
          onClick={start}
          className="text-4xl font-medium p-2 px-5 rounded-xl text-black focus:outline-none transition duration-300 z-20 relative bottom-20"
          style={{ fontFamily: "Marko One" }}
        >
          START
        </button>

        {/* Background and Bottom Characters */}
        <div className="w-full relative z-10">
          <img src={back} alt="background" className="absolute -bottom-7 w-full" />
          <div className="flex justify-between items-end absolute bottom-10 w-full">
            <img src={character1} alt="Warrior" className="w-40 h-40 object-contain relative -bottom-14" />
            <img src={treasure1} alt="Treasure" className="w-40 h-40 object-contain relative -bottom-14" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
