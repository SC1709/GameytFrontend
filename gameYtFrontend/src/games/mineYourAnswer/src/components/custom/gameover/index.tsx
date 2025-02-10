import React from "react";
import { Image } from "../../basic/Img";
import gameOver from "../../../assets/gameOver.svg";

export const Gameover: React.FC<{ className?: string }> = ({className}) => (
  <Image src={gameOver} alt="mine" className={className} />
);