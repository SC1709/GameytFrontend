import React from "react";
import { Image } from "../../basic/Img";
import minnerImg from "../../../assets/miner.svg";

export const Minner: React.FC<{ className: string }> = ({ className }) => {
  return (
    <Image src={minnerImg} alt="minner" className={className} />
  );
};
