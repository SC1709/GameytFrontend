import React, { useEffect } from "react";
import { Button } from "../../components/basic/button";
import { Coin } from "../../components/custom/coin";
import { HintIcon } from "../../components/custom/hintIcon";
import {
  Mine1,
  Mine2,
  // Mine3,
  Mine4,
  Mine5,
} from "../../components/custom/Mines";
import { Player } from "../../components/custom/player";
import { PowerUpIcon } from "../../components/custom/powerupIcon";
import FakeAPI from "../../utils/FakeAPI.json";
import { useNavigate } from "react-router-dom";
import { Boom } from "../../components/custom/boom";

interface GameviewProps {
  handleMine: (
    event: React.MouseEvent<HTMLButtonElement>,
    correctOption: number,
    correctOptionsIndex: number
  ) => void;
}

export const GameView = React.forwardRef<HTMLDivElement, GameviewProps>(
  ({ handleMine }, clipStickRef) => {
    const questionsList = FakeAPI.data.questions || []; // Ensure fallback
    const questionStorage = localStorage.getItem("question-storage");
    const navigate = useNavigate();

    const [isActivated, setIsActivated] = React.useState(false);
    const [questions, setQuestions] = React.useState(questionsList);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

    const handleChoice = (event: React.MouseEvent<HTMLButtonElement>) => {
      handleMine(event, currentQuestionIndex ,questions[currentQuestionIndex].correctOptionsIndex);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsActivated((prev) => !prev);
      }, 10000);
      setIsActivated((prev) => !prev);
    };

    useEffect(() => {
      if (currentQuestionIndex >= questions.length) {
        navigate("/mine-your-answer/play/result");
      }
    }, [currentQuestionIndex, questions.length]);

    useEffect(() => {
      if (questionStorage) {
        setQuestions(JSON.parse(questionStorage).state.question);
      }
    }, []); // Fix: Added an empty dependency array

    return (
      <>
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

        <h2 className="question animate-question absolute font-bold">
          {questions[currentQuestionIndex]?.question || ""}
        </h2>

        <div
          ref={clipStickRef}
          className="player absolute left-1/2 transform -translate-x-1/2 translate-y-[172px]"
        >
          <Player />
        </div>

        <div className="absolute mine-container bottom-0 w-full grid h-1/2">
          <Button
            disabled={isActivated}
            onClick={handleChoice}
            className="0 flex items-center translate-x-[90px] absolute translate-y-[20px] w-max-content animate-mine5"
          >
            <div className="boom hidden">
              <Boom />
            </div>
            <div className="non-boom flex items-center">
              <p
                id="choice-0"
                className="choice-0 absolute animate-choice text-[0.8rem]"
              >
                {questions[currentQuestionIndex]?.options[0] || ""}
              </p>
              <Mine5 className="h-[80px]" />
            </div>
          </Button>

          <Button
            disabled={isActivated}
            onClick={handleChoice}
            className="1 flex items-center absolute right-0 -translate-x-[30px] translate-y-[-10px] w-max-content animate-mine2"
          >
            <div className="boom hidden">
              <Boom />
            </div>
            <div className="non-boom flex items-center">
              <p
                id="choice-1"
                className="choice-1 absolute animate-choice text-[0.8rem]"
              >
                {questions[currentQuestionIndex]?.options[1] || ""}
              </p>
              <Mine2 className="h-[90px]" />
            </div>
          </Button>

          <Button
            disabled={isActivated}
            onClick={handleChoice}
            className="2 borderOut flex items-center absolute left-1/2 top-[40%] translate-x-[-70px] translate-y-[-10px] w-max-content animate-mine1"
          >
            <div className="boom hidden">
              <Boom />
            </div>
            <div className="non-boom flex items-center">
              <p
                id="choice-2"
                className="choice-2 absolute animate-choice text-[0.8rem]"
              >
                {questions[currentQuestionIndex]?.options[2] || ""}
              </p>
              <Mine1 className="h-[80px]" />
            </div>
          </Button>

          <Button
            disabled={isActivated}
            onClick={handleChoice}
            className="3 flex items-center absolute bottom-0 translate-x-[80px] -translate-y-[30px] w-max-content animate-mine4"
          >
            <div className="boom hidden">
              <Boom />
            </div>
            <div className="non-boom flex items-center">
              <p
                id="choice-3"
                className="choice-3 absolute animate-choice text-[0.8rem]"
              >
                {questions[currentQuestionIndex]?.options[3] || ""}
              </p>
              <Mine4 className="h-[80px]" />
            </div>
          </Button>
        </div>
      </>
    );
  }
);
