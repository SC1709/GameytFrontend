import React from "react";
import { Image } from "../../basic/Img";
import coin from "../../../assets/coin 1.svg";

export const Coin: React.FC<{ className?: string }> = ({ className }) => (
  <Image src={coin} alt="coin" className={className}/>
);
