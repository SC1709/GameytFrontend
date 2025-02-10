import React from "react";
import ImageComponent from "../ImageComponent";
import HeadingText from "../../Base/Heading";
import CoinImage from "../../../Resources/Images/coin.png";

interface CoinHolderProps {
  coin: string;
}

const CoinHolder: React.FC<CoinHolderProps> = ({ coin }) => {
  return (
    <div className="bg-[#88F0C8] rounded-3xl flex justify-center gap-5 items-center h-8 w-16 relative">
      <ImageComponent src={CoinImage} className="w-4 h-6 coin" />
      <HeadingText
        text={coin}
        className="w-5 h-4 text-sm text-center pr-4 mb-2"
      />
    </div>
  );
};

export default CoinHolder;
