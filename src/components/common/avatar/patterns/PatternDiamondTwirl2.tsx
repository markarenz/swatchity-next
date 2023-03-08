import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternDiamondTwirl2: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 06-diamond-twirl-2 */}
      <g>
        <path fill={color1} d="M-100 0H0V100H-100z" transform="rotate(-90)"></path>
        <path fill={color2} d="M1.01 21.716L21.716 98.99 98.99 78.284 78.284 1.01z"></path>
        <path fill={color3} d="M10.963 39.54L39.54 89.037 89.037 60.46 60.46 10.963z"></path>
        <path fill={color1} d="M18.942 50L50 81.058 81.058 50 50 18.942z"></path>
        <path
          fill={color2}
          fillOpacity="1"
          d="M30.681 55.176L55.176 69.32 69.32 44.824 44.824 30.68z"
        ></path>
        <path
          fill={color3}
          fillOpacity="1"
          d="M42.827 54.141l11.314 3.032 3.032-11.314-11.314-3.032z"
        ></path>
      </g>
    </svg>
  );
};

export default PatternDiamondTwirl2;
