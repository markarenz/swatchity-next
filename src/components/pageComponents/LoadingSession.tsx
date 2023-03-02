const LoadingSession = () => {
  return (
    <div
      className="fixed wh-screen bg-base anim-pulse"
      style={{ zIndex: 15 }}
      data-testid="loading-session"
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="0 0 60 60"
          >
            <defs>
              <linearGradient
                id="linearGradient401"
                x1="210.588"
                x2="219.748"
                y1="137.706"
                y2="145.691"
                gradientTransform="matrix(1.5 0 0 1.5 -107.266 -70.42)"
                gradientUnits="userSpaceOnUse"
                spreadMethod="pad"
                xlinkHref="#linearGradient18603"
              ></linearGradient>
              <linearGradient id="linearGradient18603">
                <stop offset="0" stopColor="#2a9d8f" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#264653" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient
                id="linearGradient399"
                x1="217.442"
                x2="219.489"
                y1="143.32"
                y2="145.324"
                gradientTransform="matrix(1.5 0 0 1.5 -107.266 -70.42)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#linearGradient18917"
              ></linearGradient>
              <linearGradient id="linearGradient18917">
                <stop offset="0" stopColor="#bfbfbf" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#898989" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <g>
              <g
                stroke="navy"
                strokeWidth="0"
                paintOrder="markers fill stroke"
                transform="matrix(2 0 0 2 -399.065 -251.683)"
              >
                <path
                  fill="#fff"
                  d="M199.533 125.842v15a15 15 0 0115-15zm15 0a15 15 0 0115 15v-15zm15 15a15 15 0 01-15 15h15zm-15 15a15 15 0 01-15-15v15z"
                  display="none"
                ></path>
                <path
                  style={{}}
                  fill="url(#linearGradient401)"
                  fillOpacity="1"
                  fillRule="nonzero"
                  d="M199.533 125.842v30h15v-15h15v-15z"
                  display="inline"
                  fontFamily="Times"
                  fontSize="35.278"
                  fontStyle="italic"
                  fontWeight="bold"
                ></path>
                <path
                  style={{}}
                  fill="url(#linearGradient399)"
                  fillOpacity="1"
                  d="M214.533 155.842v-15h15z"
                  display="inline"
                  fontFamily="Times"
                  fontSize="35.278"
                  fontStyle="italic"
                  fontWeight="bold"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default LoadingSession;
