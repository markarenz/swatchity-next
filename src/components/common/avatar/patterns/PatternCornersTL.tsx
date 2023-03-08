import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternCornersTL: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 07-corners-tl */}
      <g>
        <path fill={color3} d="M0 0h100v100H0z"></path>
        <path fill={color2} d="M0 0h75v75H0z"></path>
        <path fill={color1} d="M0 0h50v50H0z"></path>
      </g>
    </svg>
  );
};

export default PatternCornersTL;
