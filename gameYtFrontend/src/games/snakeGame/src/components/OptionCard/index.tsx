import React from 'react';

interface optionProps {
  text: any;
  option: string;
  className?: string; 
  id?: string;  
  pclassName?: string; 
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void; 
}

const OptionCard: React.FC<optionProps> = ({ text, option, className, pclassName, id, onClick }) => {
  return (
    <div className="absolute w-[345px] h-[179px] top-[279px] left-[24px]" >
      <div 
        id={id}  
        className={`option-card slide-right absolute bg-white w-[345px] rounded-[25px] cursor-pointer ${className}`} 
        onClick={onClick}
      >
        <div className="absolute w-[27px] h-[27px] top-[11.95px] left-[12px]">
          <div className={`w-full h-full border border-black rounded-full ${pclassName}`}>
            <p className="relative w-[13px] h-[23px] top-[2px] left-[6px] text-[18px] font-semibold leading-[22.5px] text-center text-black">
              {option}
            </p>
          </div>
        </div>

        <p className="absolute gap-0 font-[Lexend] text-left w-[288px] h-[23px] top-[12.95px] left-[46px] text-[16px] font-semibold leading-[19.5px]">
          {text}
        </p>
      </div>
    </div>
  );
};

export default OptionCard;
