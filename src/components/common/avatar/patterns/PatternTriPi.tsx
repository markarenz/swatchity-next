import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternTriPi: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 14-tri-pi */}
      <g>
        <path
          fill={color1}
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeOpacity="1"
          d="M0 0H100V100H0z"
        ></path>
        <path fill={color2} d="M0 50V0h50v50L0 80z"></path>
        <path fill={color3} d="M100 50V0H50v50l50 30z" display="inline"></path>
      </g>
    </svg>
  );
};

export default PatternTriPi;
