import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternEye: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 20-eye */}
      <g>
        <path
          fill={color1}
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeOpacity="1"
          d="M0 0H100V100H0z"
          paintOrder="stroke markers fill"
        ></path>
        <path
          fill={color2}
          fillRule="evenodd"
          d="M95 50S74.853 69.286 50 69.286 5 50 5 50s20.147-19.286 45-19.286S95 50 95 50z"
          display="inline"
        ></path>
        <circle cx="49.342" cy="50" r="12.148" fill={color3} fillRule="evenodd"></circle>
      </g>
    </svg>
  );
};

export default PatternEye;
