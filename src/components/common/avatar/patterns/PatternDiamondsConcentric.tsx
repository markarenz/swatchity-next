import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternDiamondsConcentric: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 04-diamonds-concentric */}
      <g>
        <path fill={color1} d="M0 0.06H100V100.06H0z"></path>
        <path fill={color2} d="M15 50.06l35-35 35 35-35 35z"></path>
        <path fill={color3} d="M35 50.06l15-15 15 15-15 15z"></path>
      </g>
    </svg>
  );
};

export default PatternDiamondsConcentric;
