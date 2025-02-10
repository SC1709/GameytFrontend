import React from "react";
import { Image } from "../../basic/Img";
import mine1 from "../../../assets/e4.svg"
import mine2 from "../../../assets/e5.svg"
import mine3 from "../../../assets/e6.svg"
import mine4 from "../../../assets/e7.svg"
import mine5 from "../../../assets/e8.svg"

export const Mine1: React.FC<{ className?: string }> = ({className}) => (
  <Image src={mine1} alt="mine" className={className} />
);

export const Mine2: React.FC<{ className?: string }> = ({className}) => (
  <Image src={mine2} alt="mine" className={className}/>
);

export const Mine3: React.FC<{ className?: string }> = ({className}) => (
  <Image src={mine3} alt="mine" className={className}/>
);

export const Mine4: React.FC<{ className?: string }> = ({className}) => (
  <Image src={mine4} alt="mine" className={className}/>
);

export const Mine5: React.FC<{ className?: string }> = ({className}) => (
  <Image src={mine5} alt="mine" className={className}/>
);
