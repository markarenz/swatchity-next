import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternAbstract2: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 30-abstract-2 */}
      <g>
        <path fill={color1} d="M0 0H100V100H0z"></path>
        <path fill={color2} d="M100 100V50H50z"></path>
        <path fill={color2} d="M75 50V25H50z"></path>
        <path fill={color2} d="M25 100V75H0z"></path>
        <path fill={color2} d="M50 25V0H25z"></path>
        <path fill={color3} d="M0 0v50h50z"></path>
        <path fill={color3} d="M25 50v25h25z"></path>
        <path fill={color3} d="M75 0v25h25z"></path>
        <path fill={color3} d="M50 75v25h25z"></path>
      </g>
    </svg>
  );
};

export default PatternAbstract2;
