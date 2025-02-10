import React, { use, useContext, useRef } from "react";
import { GameView } from "../../views/gameView";
import { GameStateContext } from "../../context/GameStateContext";
import useQuestionStore from "../../../../../store/zustand";

function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function getAngle(dy: number, dx: number) {
  return 90 + Math.atan2(dy, dx) * (180 / Math.PI);
}

function getXandY(pos: DOMRect) {
  return {
    x: Math.round(pos.x + pos.width / 2),
    y: Math.round(pos.y + pos.height / 2),
  };
}

function rotateElement(element1: HTMLElement, element2: HTMLElement) {
  const { x: mineX, y: mineY } = getXandY(element1.getBoundingClientRect());
  const { x: playerX, y: playerY } = getXandY(element2.getBoundingClientRect());

  const dis = getDistance(playerX, playerY, mineX, mineY);
  const angle = getAngle(playerY - mineY, playerX - mineX);

  return {
    dis,
    angle,
  };
}

export const GameContainer = () => {
  const { question: allQuestions, trueAction, falseAction, addAnswer, page, nextPage, videoId } = useQuestionStore();

  const clipStickRef = useRef<HTMLDivElement>(null);
  // const bombLoaction = useRef<{ x: number; y: number; angle: number }>({
  //   x: 0,
  //   y: 0,
  //   angle: 0,
  // });

  const mineRef = useRef<HTMLButtonElement | undefined>(undefined);
  const { setCorrect } = useContext(GameStateContext);

  const handleMine = (event: React.MouseEvent<HTMLButtonElement>, currentQuestionIndex: number, correct: number) => {
    const playerComponent = clipStickRef.current;

    if (!playerComponent) return;
    const clip = playerComponent.querySelector(".clip-contianer") as HTMLElement;
    const clipStick = playerComponent.querySelector(".clipStick") as HTMLElement;
    const player = playerComponent.querySelector(".player");

    //mine
    const mine = event.currentTarget;
    const mineContainer = mine.parentElement as HTMLDivElement;
    const mineIndex = mine.className.split(" ")[0];
    mineRef.current = mine as HTMLButtonElement;
    const isCorrect = correct === parseInt(mineIndex); //checks correct option

    addAnswer({ question: currentQuestionIndex, answer: mineIndex });
    if (isCorrect) {
      trueAction();
    } else {
      falseAction();
    }

    setCorrect((prev) => {
      return {
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        wrong: !isCorrect ? prev.wrong + 1 : prev.wrong,
      };
    });

    const option = mine.querySelector("p") as HTMLElement; //option

    if (!player) return;

    const yes = player.querySelector(".yes") as HTMLElement;
    const no = player.querySelector(".no") as HTMLElement;

    const { dis, angle } = rotateElement(mine, player as HTMLElement);

    clip.style.rotate = angle + "deg";
    clip.style.transformOrigin = "top center";
    clipStick.style.height = dis - 50 + "px";

    const mineName = mine.className.split(" ")[mine.className.split(" ").length - 1];
    const mineClass = mine.className;

    setTimeout(() => {
      const crtOption = document.querySelector(".choice-" + correct) as HTMLElement;
      // console.log(crtOption);
      crtOption.style.backgroundColor = "green";

      if (isCorrect) {
        clip.appendChild(mine);
        mine.classList.remove(mineName);
        mine.classList.add("taking-mine");
        clip.style.transitionDuration = "2s";
        clip.style.transitionDelay = "1s";
        clipStick.style.height = "90px";
        clip.style.rotate = "0deg";
        clipStick.style.transitionDelay = "1s";

        yes.style.display = "block";
        yes.classList.add("animate-yes");
        option.style.display = "none";

        setTimeout(() => {
          mine.classList.remove("taking-mine");
          mine.classList.add("animate-move-to-player");

          setTimeout(() => {
            yes.classList.remove("animate-yes");
            yes.style.display = "none";
          }, 2300);
        }, 2300);

        setTimeout(() => {
          clip.removeChild(mine);
          option.style.display = "block";
          mine.classList.remove("animate-move-to-player");
          mine.className = mineClass;
          // console.log(mine.className);
          mineContainer.append(mine);
        }, 7300);
      } else {
        no.style.display = "block";
        no.classList.add("animate-bad");

        setTimeout(() => {
          no.style.display = "none";
          no.classList.remove("animate-bad");
        }, 2000);

        clip.style.transitionDuration = "2s";
        clip.style.transitionDelay = "1s";
        clipStick.style.height = "90px";
        clip.style.rotate = "0deg";
        clipStick.style.transitionDelay = "1s";
        dropBomb();
      }

      crtOption.style.backgroundColor = "rgb(26, 255, 0)";

      setTimeout(() => {
        crtOption.style.backgroundColor = "rgba(255, 227, 167, 1)";
      }, 4000);
    }, 2000);
  };

  //to drop bomb
  function dropBomb() {
    const mine = mineRef.current;
    const player = clipStickRef.current;

    if (!mine || !player) return;
    const bombStick = player.querySelector(".bomb-stick") as HTMLElement;
    const bombImg = player.querySelector(".bomb") as HTMLElement;
    const bombContainer = player.querySelector(".bomb-container") as HTMLElement;
    const boom = mine.querySelector(".boom") as HTMLElement;
    const nonBoom = mine.querySelector(".non-boom") as HTMLElement;

    //positions
    const minePos = mine.getBoundingClientRect();
    // const bombPos = bombContainer.getBoundingClientRect();

    if (bombContainer && bombImg && bombStick) {
      bombContainer.style.opacity = "1";
      //trigger bomb animatoin
      bombContainer.classList.add("animate-trigger-bomb");

      setTimeout(() => {
        const { x: mineX, y: mineY } = getXandY(minePos);
        const { x: bombX, y: bombY } = getXandY(bombContainer.getBoundingClientRect());
        const dis = getDistance(bombX, bombY, mineX, mineY);
        const angle = getAngle(bombY - mineY, bombX - mineX);

        //rotate bomb-container
        bombContainer.style.rotate = `${angle}deg`;
        bombContainer.style.transformOrigin = "top center";
        bombStick.style.height = `${dis - 30}px`;

        setTimeout(() => {
          bombContainer.style.opacity = "0";
          boom.classList.add("animate-boom");
          nonBoom.style.display = "none";
          boom.style.display = "block";
          bombStick.style.height = "20px";
          bombContainer.style.transform = "translate(-0px,90px)";
          bombContainer.style.rotate = `${0}deg`;
        }, 4000);

        setTimeout(() => {
          boom.style.display = "none";
          boom.classList.remove("animate-boom");
          nonBoom.style.display = "block";
        }, 5500);
      }, 1000);

      // console.table({dis, angle})
    }
  }

  return <GameView handleMine={handleMine} ref={clipStickRef} />;
};
