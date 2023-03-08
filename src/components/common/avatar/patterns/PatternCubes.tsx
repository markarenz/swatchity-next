import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternCubes: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 27-cubes */}
      <g>
        <path fill="#0f0" strokeWidth="0.265" d="M0 0H100V100H0z"></path>
        <path
          fill={color3}
          strokeWidth="0.265"
          d="M100 80.556L75 97.222V100h25z"
          display="inline"
        ></path>
        <path
          fill={color2}
          strokeWidth="0.265"
          d="M75 97.222L50 80.556V100h25z"
          display="inline"
        ></path>
        <path
          fill={color3}
          strokeWidth="0.265"
          d="M50 80.556L25 97.222V100h25z"
          display="inline"
        ></path>
        <path
          fill={color2}
          strokeWidth="0.265"
          d="M25 97.222L0 80.556V100h25z"
          display="inline"
        ></path>
        <path
          fill={color1}
          strokeWidth="0.265"
          d="M62.5 0L75 8.333 87.5 0z"
          display="inline"
        ></path>
        <path
          fill={color1}
          strokeWidth="0.265"
          d="M75 36.111l25 16.667V19.444z"
          display="inline"
        ></path>
        <path
          fill={color1}
          strokeWidth="0.265"
          d="M0 19.444v33.334L25 36.11z"
          display="inline"
        ></path>
        <path
          fill={color1}
          strokeWidth="0.265"
          d="M12.5 0L25 8.333 37.5 0z"
          display="inline"
        ></path>
        <path
          fill={color2}
          strokeWidth="0.265"
          d="M0 0v19.444l25 16.667V8.333L12.5 0z"
          display="inline"
        ></path>
        <path
          fill={color3}
          strokeWidth="0.265"
          d="M37.5 0L25 8.333v27.778l25-16.667V0z"
          display="inline"
        ></path>
        <path
          fill={color2}
          strokeWidth="0.265"
          d="M50 0v19.444l25 16.667V8.333L62.5 0z"
          display="inline"
        ></path>
        <path
          fill={color3}
          strokeWidth="0.265"
          d="M87.5 0L75 8.333v27.778l25-16.667V0z"
          display="inline"
        ></path>
        <path
          fill={color1}
          strokeWidth="0.252"
          d="M-60.854 55.563l23.812-15.876 23.813 15.876-23.813 15.874z"
          display="inline"
          transform="matrix(1.04987 0 0 -1.04987 113.889 138.889)"
        ></path>
        <path
          fill={color1}
          strokeWidth="0.252"
          d="M-60.854 55.563l23.812-15.876 23.813 15.876-23.813 15.874z"
          display="inline"
          transform="matrix(1.04987 0 0 -1.04987 63.889 138.889)"
        ></path>
        <path
          fill={color3}
          strokeWidth="0.252"
          d="M-13.23 29.104v26.459l-23.812-15.876V13.23z"
          display="inline"
          transform="matrix(1.04987 0 0 -1.04987 38.889 94.444)"
        ></path>
        <path
          fill={color2}
          strokeWidth="0.252"
          d="M-60.854 29.104v26.459l23.812-15.876V13.23z"
          display="inline"
          transform="matrix(1.04987 0 0 -1.04987 138.889 94.444)"
        ></path>
        <path
          fill={color3}
          strokeWidth="0.252"
          d="M-13.23 29.104v26.459l-23.812-15.876V13.23z"
          display="inline"
          transform="matrix(1.04987 0 0 -1.04987 88.889 94.444)"
        ></path>
        <path
          fill={color2}
          strokeWidth="0.252"
          d="M-60.854 29.104v26.459l23.812-15.876V13.23z"
          display="inline"
          transform="matrix(1.04987 0 0 -1.04987 88.889 94.444)"
        ></path>
        <path
          fill={color1}
          strokeWidth="0.252"
          d="M-60.854 55.563l23.812-15.876 23.813 15.876-23.813 15.874z"
          display="inline"
          transform="matrix(1.04987 0 0 -1.04987 88.889 94.444)"
        ></path>
      </g>
    </svg>
  );
};

export default PatternCubes;
