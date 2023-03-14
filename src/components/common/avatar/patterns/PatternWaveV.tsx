import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternWaveV: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 02-wave-v */}
      <g>
        <path fill={color1} d="M0 0h100v100H0z" display="inline"></path>
        <path fill={color3} d="M50 0h50v100H50z" display="inline"></path>
        <path
          fill={color2}
          d="M33 0h34s12.066 30.335 0 50c-11.08 18.059 0 50 0 50H33s-12.189-29.27 0-50 0-50 0-50z"
          display="inline"
        ></path>
      </g>
    </svg>
  );
};

export default PatternWaveV;
