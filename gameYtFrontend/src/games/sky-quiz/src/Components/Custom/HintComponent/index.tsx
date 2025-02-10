import React from "react";
import ImageComponent from "../ImageComponent";
import HintIconImage from "../../../Resources/Images/hintIcon.png";
import PowerUpIconImage from "../../../Resources/Images/powerUpIcon.png";

const HintComponent: React.FC = () => {
  return (
    <div className="flex flex-col w-12 h-28">
      <ImageComponent src={HintIconImage} className="w-12 h-12" />
      <ImageComponent src={PowerUpIconImage} className="w-12 h-12" />
    </div>
  );
};

export default HintComponent;
