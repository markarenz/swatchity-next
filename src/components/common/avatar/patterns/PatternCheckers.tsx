import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternCheckers: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 28-checkers */}
      <g>
        <path fill={color1} d="M0 0H100V100H0z"></path>
        <path fill={color2} d="M0 0H25V25H0z"></path>
        <path fill={color2} d="M50 50H75V75H50z"></path>
        <path fill={color3} d="M50 0H75V25H50z"></path>
        <path fill={color2} d="M25 25H50V50H25z"></path>
        <path fill={color2} d="M75 25H100V50H75z"></path>
        <path fill={color3} d="M75 75H100V100H75z"></path>
        <path fill={color3} d="M25 75H50V100H25z"></path>
        <path fill={color2} d="M0 50H25V75H0z"></path>
        <path fill={color3} d="M0 25H25V50H0z"></path>
      </g>
    </svg>
  );
};

export default PatternCheckers;
