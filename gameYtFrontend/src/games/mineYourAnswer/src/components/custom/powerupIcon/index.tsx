import React from "react";
import { Image } from "../../basic/Img";
import powerups from "../../../assets/powerups.svg";


export const PowerUpIcon : React.FC<{ className?: string }> = ({className}) => (
  <Image src={powerups} alt="mine" className={className} />
);