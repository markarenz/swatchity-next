import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternDotsRandom: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 15-dots-square-random */}
      <g>
        <path fill={color1} d="M0 0H100V100H0z"></path>
        <path
          fill={color2}
          d="M-38.746 30.792H-18.746000000000002V50.792H-38.746z"
          transform="rotate(-55)"
        ></path>
        <path
          fill={color2}
          d="M7.6 62.047H27.6V82.047H7.6z"
          display="inline"
          transform="rotate(-60)"
        ></path>
        <path
          fill={color2}
          d="M-76.733 65.854H-56.733000000000004V85.854H-76.733z"
          display="inline"
          transform="rotate(-80)"
        ></path>
        <path
          fill={color3}
          d="M-67.605 50.407H-47.605000000000004V70.407H-67.605z"
          display="inline"
          transform="rotate(-65)"
        ></path>
        <path
          fill={color3}
          d="M2.207 87.767H22.207V107.767H2.207z"
          display="inline"
          transform="rotate(-50)"
        ></path>
        <path
          fill={color3}
          d="M-43.15 18.069H-23.15V38.069H-43.15z"
          display="inline"
          transform="rotate(-110)"
        ></path>
        <path
          fill={color3}
          d="M-8.095 59.935H11.905V79.935H-8.095z"
          display="inline"
          transform="rotate(-45)"
        ></path>
      </g>
    </svg>
  );
};

export default PatternDotsRandom;
