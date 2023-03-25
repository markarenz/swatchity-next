import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternCornersTR: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 08-corners-tr */}
      <g>
        <path fill={color3} d="M100 100H0V0h100z" transform="rotate(90 50 50)"></path>
        <path fill={color2} d="M75 75H0V0h75z" transform="rotate(90 50 50)"></path>
        <path fill={color1} d="M50 50H0V0h50z" transform="rotate(90 50 50)"></path>
      </g>
    </svg>
  );
};

export default PatternCornersTR;
