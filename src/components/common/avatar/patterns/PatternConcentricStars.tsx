import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternConcentricStars: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 13-concentric-stars */}
      <g>
        <path fill={color1} d="M0 0H100V100H0z" display="inline"></path>
        <path
          fill={color2}
          d="M6.927-87.652l14.12 30.119 33.008 4.121-24.282 22.736 6.28 32.666L6.927-14.077-22.199 1.99l6.28-32.666-24.282-22.736 33.008-4.121z"
          transform="translate(43.073 89.127)"
        ></path>
        <path
          fill={color3}
          d="M-16.548 26.825l6.721 14.337 15.713 1.962-11.559 10.823 2.99 15.55-13.865-7.648-13.865 7.648 2.99-15.55-11.559-10.823 15.713-1.962z"
          transform="translate(66.548 -.278)"
        ></path>
      </g>
    </svg>
  );
};

export default PatternConcentricStars;
