import React from "react";
import { useSelector } from "react-redux";
import ResultView from "../../views/ResultView";
import { myState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const ResultContainer = () => {
  const gamescore = useSelector((state: myState) => state.root.gamescore);
  const totalQuestion = useSelector(
    (state: myState) => state.root.totalQuestion
  );
  let incorrect = totalQuestion - gamescore;

  // Navigation handler
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <ResultView
        answer={gamescore}
        incorrect={incorrect}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default ResultContainer;
