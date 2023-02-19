import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternRaysR: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 17-rays-r */}
      <g transform="rotate(90 50 50)">
        <path fill={color1} d="M0 0H100V100H0z"></path>
        <path fill={color3} d="M49.73 0L0 100h100z" display="inline"></path>
        <path fill={color2} d="M50 0L20 100h60z" display="inline"></path>
      </g>
    </svg>
  );
};

export default PatternRaysR;
