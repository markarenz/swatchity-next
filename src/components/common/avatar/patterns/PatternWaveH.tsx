import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternWaveH: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 01-wave-h */}
      <g>
        <path fill={color1} d="M0 0h100v100H0z" />
        <path fill={color3} d="M0 50h100v50H0z" />
        <path
          fill={color2}
          d="M0 33s28.593 11.173 50 0 50 0 50 0v34s-25.208-10.834-50 0-50 0-50 0z"
        />
      </g>
    </svg>
  );
};

export default PatternWaveH;
