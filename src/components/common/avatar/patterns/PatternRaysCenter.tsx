import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternRaysCenter: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 31-rays-center */}
      <g>
        <path fill={color1} d="M50 0v50l50-33.333V0z" display="inline"></path>
        <path fill={color2} d="M100 55.529V0h-8.045L50 50z"></path>
        <path fill={color3} d="M97.765 100H100V41.184L50 50z"></path>
        <path fill={color1} d="M53.225 100H100V78.868L50 50z"></path>
        <path fill={color2} d="M13.258 100h54.94L50 50z"></path>
        <path fill={color3} d="M0 62.18V100h31.802L50 50z"></path>
        <path fill={color1} d="M0 25.278v53.59L50 50z"></path>
        <path fill={color2} d="M28.062 0H0v41.184L50 50z"></path>
        <path fill={color3} d="M50 0H8.045L50 50z"></path>
      </g>
    </svg>
  );
};

export default PatternRaysCenter;
