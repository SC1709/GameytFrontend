import React from "react";
import ImageComponent from "../ImageComponent";
 

interface QuestionCardProps {
  text: any;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  text,
}) => {
  return (
    <div className="question-card  slide-down absolute left-[calc(50%-388px/2-11px)] w-[358px] min-h-[79px] max-h-auto top-[135px] text-center">
      <div className="relative w-[325px] min-h-[71px] max-h-auto left-[37px] py-[5px] px-0 gap-0 rounded-[25px] border-[3px] border-white">
            <p className=" font-[Lexend] text-[24px] font-semibold leading-[30px] text-center text-white w-[318px] min-h-[60px] break-words">
              {text}
            </p>
          </div>
    </div>
  );
};

export default QuestionCard;
