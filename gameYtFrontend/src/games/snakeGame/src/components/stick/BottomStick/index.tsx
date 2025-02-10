import React from "react";
import ImageComponent from "../../ImageComponent";
import stick from "../../../Resources/Images/stick.png";

const BottomSticks: React.FC = () => {
  return (
    <div className=" stick flex justify-start mb-0 w-full h-[46px] relative">
      <ImageComponent
        src={stick}
        className="w-[213.42px] h-[46px] transform rotate-180"
        alt="Bottom Right Stick"
      />
      <ImageComponent
        src={stick}
        className="w-[213.42px] h-[46px] transform scale-y-[-1]"
        alt="Bottom Left Stick"
      />
    </div>
  );
};

export default BottomSticks;
