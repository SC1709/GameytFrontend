import React, { useEffect, useRef } from "react";
import { StartView } from "../../views/startView";
import { useNavigate } from "react-router-dom";

export const StartContainer: React.FC = () => {
  const afterEffects = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  function handleStart() {
    navigate("/mine-your-answer/play/game");
  }

  useEffect(() => {
    const afterEffectsRef = afterEffects.current;
    if (afterEffectsRef) {
      const titleContainer = afterEffectsRef.querySelector(
        ".game-title-container"
      );
      const startBtn = afterEffectsRef.querySelector(".game-start-btn");
      const title = afterEffectsRef.querySelector(".game-title");
      const player = afterEffectsRef.querySelector(".player");
      if (titleContainer && startBtn && title && player) {
        player.classList.add('animate-slide-in');
        setTimeout(() => {
          titleContainer.classList.add("animate-title");
          startBtn.classList.add("animate-slide-in-btn");
          title.classList.add("animate-title");
        }, 2000);
      }
    }
  }, []);
  return <StartView ref={afterEffects} handleStart={handleStart} />;
};
