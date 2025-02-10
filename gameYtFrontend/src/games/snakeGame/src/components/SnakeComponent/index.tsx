import React from "react";
import ImageComponent from "./../ImageComponent/index";
import snake from "../../Resources/Images/snake.png";
import snake3 from "../../Resources/Images/snake3.png";

interface SnakeProps {
  className?: string;
}

const SnakeComponent: React.FC<SnakeProps> = ({ className }) => {
  return (
    <div
      className={`absolute w-[68px] h-[29px] top-[261px] left-[50px] ${className}`}
    >
      <ImageComponent
        src={snake}
        alt="snake Decoration"
        className="absolute w-[30px] h-[29px] top-[2px] left-[52px] gap-0 "
      />
      <div className="absolute w-[20px] h-[7px] top-[12px] left-[39px] gap-0 bg-[#078F14]"></div>
      <ImageComponent
        src={snake3}
        alt="snake Decoration"
        className="absolute w-[22px] h-[29px] left-[20px] top-[1.5px] gap-0 transform rotate-[375deg]"
      />
    </div>
  );
};

export default SnakeComponent;
