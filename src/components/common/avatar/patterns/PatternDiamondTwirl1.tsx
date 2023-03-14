import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternDiamondTwirl1: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 05-diamond-twirl-1 */}
      <g id="">
        <path fill={color1} d="M0 0H100V100H0z"></path>
        <path fill={color2} d="M21.716 1.01L98.99 21.716 78.284 98.99 1.01 78.284z"></path>
        <path fill={color3} d="M39.54 10.963L89.037 39.54 60.46 89.037 10.963 60.46z"></path>
        <path fill={color1} d="M50 18.942L81.058 50 50 81.058 18.942 50z"></path>
        <path
          fill={color2}
          fillOpacity="1"
          d="M55.176 30.681L69.32 55.176 44.824 69.32 30.68 44.824z"
        ></path>
        <path
          fill={color3}
          fillOpacity="1"
          d="M54.141 42.827l3.032 11.314-11.314 3.032-3.032-11.314z"
        ></path>
      </g>
    </svg>
  );
};

export default PatternDiamondTwirl1;
