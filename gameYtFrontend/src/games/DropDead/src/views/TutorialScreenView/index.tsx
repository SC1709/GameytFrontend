import React from "react";
import character1 from "../../Resources/images/character1.png";
import treasure1 from "../../Resources/images/treasure1.png";
import { useNavigate } from "react-router-dom";
import downarrow from "../../Resources/images/downarrow.png";
import uparrow from "../../Resources/images/uparrow.png";
import back from "../../Resources/images/back.png";
import Frame from "../../Resources/images/Frame.png";

const TutorialScreen: React.FC = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/dropdead/play/game");
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="w-full md:w-[22rem] h-full bg-[#C3F8F6] flex flex-col items-center justify-between relative text-white">
        {/* Frame Background */}
        <img src={Frame} alt="frame" className="absolute inset-0 h-full w-full z-20 opacity-90" />

        {/* Content */}
        <div className="z-20 flex flex-col items-center mt-16 space-y-5">
          <h1 className="font-medium text-4xl mb-5" style={{ fontFamily: "Marko One" }}>
            Tutorials
          </h1>
          <img src={uparrow} alt="uparrow" className="h-16" />
          <div className="h-40 w-40 bg-black text-center py-16 rounded-full font-bold" style={{ fontFamily: "Marko One" }}>
            Question??
          </div>
          <img src={downarrow} alt="downarrow" className="h-16" />
          <p className="font-bold text-lg text-center">
            Move the question <br />
            towards the right answer <br />
            using the up and down <br /> keypad
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={startGame}
          className="absolute bottom-10 text-4xl font-medium bg-[#FF0000] p-1 px-5 rounded-xl text-white focus:outline-none transition duration-300 z-20"
          style={{ fontFamily: "Marko One" }}
        >
          START
        </button>

        {/* Background Characters */}
        <div className="w-full flex items-center justify-between z-10 absolute bottom-1">
          <img src={character1} alt="warrior" className="w-40 h-40 object-contain" />
          <img src={treasure1} alt="treasure" className="w-40 h-40 object-contain" />
        </div>
        <img src={back} alt="background" className="absolute bottom-0 w-full" />
      </div>
    </div>
  );
};

export default TutorialScreen;
