import { Player } from "../../components/custom/player";
import { Button } from "../../components/basic/button";
import React from "react";

export const StartView = React.forwardRef<HTMLDivElement, { handleStart: () => void }>(({ handleStart }, ref) => {
  return (
    <>
      <div ref={ref}>
        <div className="game-title-container w-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[120px]">
          <h2 className="opacity-0 game-title text-black text-center font-bold text-[1.7rem] ">Mine Your Answer</h2>
        </div>
        <div className="player absolute left-1/2  transform -translate-x-1/2 translate-y-[172px]">
          <Player />
        </div>
        <div className="opacity-0 game-start-btn  absolute left-1/2 transform -translate-x-1/2 bottom-[10%]">
          <Button onClick={handleStart} className="w-[173px] h-[173px] bg-white rounded-full flex items-center justify-center border-red-500 border-8">
            <h2 className="text-black font-bold text-2xl">START</h2>
          </Button>
        </div>
      </div>
    </>
  );
});
