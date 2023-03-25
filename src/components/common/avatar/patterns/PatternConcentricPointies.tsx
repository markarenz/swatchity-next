import React from 'react';

type Props = {
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
};

const PatternConcentricPointies: React.FC<Props> = ({ colors }) => {
  const { color1, color2, color3 } = colors;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="round w-full h-full"
    >
      {/* 12-concentric-pointies */}
      <g>
        <path fill={color1} strokeWidth="0.265" d="M0 0H100V100H0z"></path>
        <path
          fill={color2}
          strokeWidth="0.316"
          d="M-23.023 73.132l-15.603-1.674-6.63 14.223-12.675-9.25-12.853 9.003-6.353-14.35-15.632 1.37 1.673-15.602-14.223-6.63 9.25-12.676-9.002-12.853 14.35-6.352-1.37-15.632 15.602 1.673 6.63-14.223 12.676 9.25 12.853-9.002 6.352 14.349 15.632-1.37-1.673 15.603 14.223 6.63-9.25 12.675 9.002 12.853-14.349 6.352z"
          transform="matrix(.8375 0 0 .8375 98.204 18.242)"
        ></path>
        <path
          fill={color3}
          strokeWidth="0.323"
          d="M-46.384 38.376l-8.806-12.98-15.64 1.208 4.659-14.978L-76.867.153l14.615-5.697 2.302-15.516 13.566 7.874 13.565-7.874 2.302 15.516L-15.902.153l-10.696 11.473 4.658 14.978-15.638-1.208z"
          transform="matrix(.82015 0 0 .82015 88.042 43.428)"
        ></path>
      </g>
    </svg>
  );
};

export default PatternConcentricPointies;
