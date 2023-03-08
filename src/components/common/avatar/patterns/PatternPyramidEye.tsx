import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternPyramidEye: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 21-pyramid-eye */}
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
          fill={color3}
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeOpacity="1"
          d="M50 0L4 86h92z"
          display="inline"
          paintOrder="stroke markers fill"
        ></path>
        <path
          fill={color2}
          fillRule="evenodd"
          d="M68.792 50.938S60.5 58.874 50.27 58.874c-10.229 0-18.521-7.938-18.521-7.937 0 0 8.292-7.938 18.52-7.938 10.23 0 18.522 7.938 18.522 7.938z"
          display="inline"
        ></path>
        <circle cx="50" cy="50.667" r="5" fill={color1} fillRule="evenodd"></circle>
      </g>
    </svg>
  );
};

export default PatternPyramidEye;
