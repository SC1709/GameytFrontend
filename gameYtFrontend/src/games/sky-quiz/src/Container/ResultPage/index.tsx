import React from "react";
import ResultPageView from "../../Views/ResultPage";
import { useSelector } from "react-redux";
import { myState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const ResultPageContainer: React.FC = () => {
  const gamescore = useSelector((state: myState) => state.root.gamescore);
  const totalQuestion = useSelector(
    (state: myState) => state.root.totalQuestion
  );
  let incorrect = totalQuestion - gamescore;
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="cloud-background-result">
      <ResultPageView
        answer={gamescore}
        onNavigate={handleNavigate}
        incorrect={incorrect}
      />
    </div>
  );
};

export default ResultPageContainer;
