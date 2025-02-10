import { useContext, useEffect } from "react";
import { Player } from "../../components/custom/player";
import { Button } from "../../components/basic/button";
import { PowerUpIcon } from "../../components/custom/powerupIcon";
import { Coin } from "../../components/custom/coin";
import { HintIcon } from "../../components/custom/hintIcon";
import { GameStateContext } from "../../context/GameStateContext";
import React from "react";

export const ResultView = () => {
  const {correct} = useContext(GameStateContext);

  useEffect(() => {
    const clipContainer = document.querySelector(
      ".clip-contianer"
    ) as HTMLElement;
    const clipStick = document.querySelector(".clipStick") as HTMLElement;
    if (clipStick) {
      clipStick.style.height = "100vh";
      setTimeout(() => {
        const gameover = clipContainer.querySelector(
          ".gameover"
        ) as HTMLElement;
        gameover.style.display = "block";
        clipStick.style.height = "90px";
      }, 2000);
    }
  }, []);
  return (
    <>
    <div className="w-[100%] h-[100vh]" style={{ backgroundColor: "rgb(251 251 251 / 45%)" }}>
    {/* <div className="rewards absolute right-0 m-3 w-[65px] flex flex-col items-right justify-center">
        <div className="w-[40px] h-[30px] rounded flex items-center justify-around bg-green-200 w-[65px] rounded-[10px]">
          <Coin className="h-7" />
          <b>50</b>
        </div>
        <div className="mt-1 flex flex-col place-items-end">
          <Button className="rounded-full broder-transparent">
            <HintIcon />
          </Button>
          <Button className="rounded-full border-transparent w-max-content">
            <PowerUpIcon />
          </Button>
        </div>
      </div> */}
      <div className="player absolute left-1/2 transform -translate-x-1/2 translate-y-[172px]">
        <Player />
      </div>
      <div className="score-board absolute bottom-0 flex w-full justify-around h-[35vh]">
        <div className="correct relative bg-green-400 w-[100px] flex justify-center">
          <div className="bg-violet-800 h-[100px] w-[90px] mt-[10px] flex justify-center items-center text-white">
            Right
          </div>
          <p className="font-bold absolute bottom-0 text-white text-4xl">{correct.correct}</p>
        </div>
        <div className="incorrect bg-red-600 w-[100px] flex justify-center">
          <div className="bg-violet-800 h-[100px] w-[90px] mt-[10px] flex justify-center items-center text-white">
            Wrong
          </div>
          <p className="font-bold absolute bottom-0 tex-white text-4xl">{correct.wrong}</p>
        </div>
      </div>
    </div>
    </>
  );
};
