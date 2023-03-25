import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternDotsOrdered: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 11-dots-ordered */}
      <g>
        <path
          fill={color1}
          fillOpacity="1"
          d="M0 0H100V100H0z"
          paintOrder="stroke markers fill"
        ></path>
        <circle cx="76" cy="24" r="10" fill={color2}></circle>
        <circle cx="50" cy="50" r="10" fill={color2}></circle>
        <circle cx="24" cy="24" r="10" fill={color2}></circle>
        <circle cx="24" cy="76" r="10" fill={color2}></circle>
        <circle cx="76" cy="76" r="10" fill={color2}></circle>
        <circle cx="50" cy="86" r="10" fill={color3}></circle>
        <circle cx="50" cy="14" r="10" fill={color3}></circle>
        <circle cx="86" cy="50" r="10" fill={color3}></circle>
        <circle cx="14" cy="50" r="10" fill={color3}></circle>
      </g>
    </svg>
  );
};

export default PatternDotsOrdered;
