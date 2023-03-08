import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternBullseye: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 03-bullseye */}
      <g>
        <path
          fill={color1}
          strokeWidth="0"
          d="M0 0h100v100H0z"
          paintOrder="stroke markers fill"
        ></path>
        <circle
          cx="50"
          cy="50"
          r="30"
          fill={color2}
          fillRule="evenodd"
          strokeWidth="0.265"
        ></circle>
        <circle
          cx="50"
          cy="50"
          r="15"
          fill={color3}
          fillRule="evenodd"
          strokeWidth="0.265"
        ></circle>
      </g>
    </svg>
  );
};

export default PatternBullseye;
