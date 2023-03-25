import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternSwirl: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 32-swirl */}
      <g>
        <path fill={color3} d="M0 0H100V100H0z"></path>
        <path fill={color1} d="M100 66.667V0H50c50 25 0 50 0 50z"></path>
        <path
          fill={color2}
          d="M80.718 100H100V0H77l5.14 11.698C104.371 62.988 50 50 50 50z"
          display="inline"
        ></path>
        <path
          fill={color3}
          d="M42.586 100H100V40.836l-.76.481C83.303 94.9 50 50 50 50z"
          display="inline"
        ></path>
        <path
          fill={color1}
          d="M0 94.337V100h100V70l-6.699 5C46.651 105.801 50 50 50 50z"
          display="inline"
        ></path>
        <path
          fill={color2}
          d="M0 51.366V100h80l-12.9-3.015C11.567 90.593 50 50 50 50z"
          display="inline"
        ></path>
        <path
          fill={color3}
          d="M0 10.32V100h36l-3.101-3.015C-5.535 56.39 50 50 50 50z"
          display="inline"
        ></path>
        <path
          fill={color1}
          d="M39.769 0H0v100h7.294l-.595-25C3.349 19.2 50 50 50 50z"
          display="inline"
        ></path>
        <path
          fill={color2}
          d="M56.298 24.261C53.694 10.661 38.538 0 38.538 0H0v41.02l.76.297C34.062-3.582 50 50 50 50s8.903-12.138 6.298-25.739z"
          display="inline"
        ></path>
        <path
          fill={color3}
          d="M66.624 26.084C66.455 15.809 47.19 0 47.19 0H0v18.193l17.86-6.495C72.232-1.29 50 50 50 50s16.794-13.642 16.624-23.916z"
          display="inline"
        ></path>
      </g>
    </svg>
  );
};

export default PatternSwirl;
