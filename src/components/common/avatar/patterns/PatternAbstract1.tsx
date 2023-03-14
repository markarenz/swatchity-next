import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternAbstract1: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 29-abstract-1 */}
      <g>
        <path fill={color1} d="M0 0H100V100H0z"></path>
        <path fill={color3} d="M25 25h25l25 25H25z"></path>
        <path fill={color2} d="M100 50H75L50 25h50z" display="inline"></path>
        <path fill={color3} d="M50 75l25 25H50z"></path>
        <path fill={color3} d="M75 50v50h25V75z" display="inline"></path>
        <path fill={color3} d="M0 50l25 25H0z" display="inline"></path>
        <path fill={color2} d="M50 75L25 50h25z" display="inline"></path>
        <path fill={color2} d="M50 25L25 0h25z" display="inline"></path>
        <path fill={color2} d="M50 100L25 75h25z" display="inline"></path>
        <path fill={color2} d="M25 50L0 25h25z" display="inline"></path>
        <path fill={color3} d="M50 0l25 25H50z" display="inline"></path>
        <path fill={color2} d="M0 75H25V100H0z"></path>
      </g>
    </svg>
  );
};

export default PatternAbstract1;
