import React from 'react';

type ButtonType = {
  text: string; // Text to display on the button
  onClick: () => void; // Function to handle button clicks
};

const Button: React.FC<ButtonType> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#FFA900] w-[140px] h-[58px] rounded-lg text-white text-[25px] font-medium uppercase hover:opacity-90 focus:outline-none"
    >
      {text.toUpperCase()}
    </button>
  );
};

export default Button;
