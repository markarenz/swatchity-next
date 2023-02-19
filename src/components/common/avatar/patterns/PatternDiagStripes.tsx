import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternDiagStripes: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 0-diag-stripes */}
      <g>
        <path fill={color1} d="M0 0H100V100H0z"></path>
        <path fill={color2} d="M17.977 17.977l40 40h25.468l40-40z" transform="rotate(45)"></path>
        <path fill={color3} d="M60.019-60.019l-40 40h101.384l-40-40z" transform="rotate(45)"></path>
      </g>
    </svg>
  );
};

export default PatternDiagStripes;
