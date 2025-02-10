import React from "react";
import { Image } from "../../basic/Img";
import { Gameover } from "../gameover";
import clipImg from "../../../assets/clip 1.svg";

interface ClipProps {
  rotate?: string;
  size?: string;
}

export const Clip = React.forwardRef<HTMLDivElement, ClipProps>(
  ({ rotate }, ref) => {
    return (
      <>
        <div
          ref={ref}
          className={`flex top-[68px] absolute items-center justify-center flex-col clip-contianer`}
        >
          <div
            className="bg-black w-[6px] clipStick"
            style={{
              rotate: `${rotate}deg`,
              height: "90px",
              transitionDuration : "2s"
            }}
          ></div>
          <Image
            src={clipImg}
            className="clipHanger h-[60px] p-0"
          />
         <Gameover className="gameover hidden -translate-y-[90px]"/>
        </div>
      </>
    );
  }
);
