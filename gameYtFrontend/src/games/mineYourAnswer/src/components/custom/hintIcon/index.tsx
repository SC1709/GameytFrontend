import React from "react";
import { Image } from "../../basic/Img";
import hintImg from "../../../assets/hint 1.svg";

export const HintIcon: React.FC<{ className?: string }> = ({className}) => (
  <Image src={hintImg} alt="mine" className={className} />
);