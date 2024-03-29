import { useIntl } from 'react-intl';

type Props = {
  filled: boolean;
  color: string;
  colorDark: string;
};

const IconMessages: React.FC<Props> = ({ filled, color, colorDark }) => {
  const { formatMessage } = useIntl();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <title>{formatMessage({ id: 'icon_messages' })}</title>
      <g className={`fill-${color} dark-fill-${colorDark}`} transform="translate(-4 -4)">
        {filled ? (
          <g>
            <path d="M80.48 41.232l-3.23 3.232L67.382 54H26.5l-.775.816L22 58.541v6.691l20 20h41.172L100 102.06V53.232s.027-2.918-1.461-5.895c-1.489-2.977-4.873-6.105-10.54-6.105zm-52.893 24H42v14.25z" />
            <path d="M20 7.47c-5.667 0-9.05 3.13-10.539 6.106-1.489 2.977-1.46 5.894-1.46 5.894V68.3L24.827 51.47H66l20-20v-12c0-5.667-3.129-9.051-6.106-10.54C76.917 7.444 74 7.472 74 7.472zm46 24h14.413L66 45.72z" />
          </g>
        ) : (
          <g>
            <path d="M82.106 40.857c-1.634 1.635-3.27 3.268-4.902 4.905 4.587.025 7.177-.052 11.763.038 2.07.08 4.192 1.058 5.187 2.953.996 1.672 1.402 3.635 1.317 5.509v36.863c-3.475-3.474-6.948-6.95-10.424-10.422H46.529v-20h-20v-5.44l-5.058 5.06v5.128c6.768 6.772 13.538 13.542 20.31 20.31h41.17c5.86 5.86 11.717 11.72 17.578 17.577-.01-16.842.021-33.684-.015-50.525-.223-3.819-1.903-7.725-5.15-9.916-2.46-1.784-5.581-2.329-8.564-2.194h-4.538zM41.47 65.762v12.453L28.875 65.762z" />
            <path d="M19.465 6.951c-3.814.063-7.619 1.924-9.744 5.14-1.818 2.711-2.412 6.062-2.25 9.28v48.205C13.332 63.72 19.189 57.858 25.049 52h41.17c6.772-6.769 13.542-13.539 20.31-20.31-.025-4.434.051-8.87-.037-13.301-.207-3.887-2.348-7.663-5.76-9.606-2.602-1.5-5.661-1.99-8.632-1.842-17.545.007-35.09-.013-52.635.01zM20.014 12c18.085.01 36.172-.022 54.256.016 2.183.192 4.737 1.067 6.091 3.01 1.53 2.33 1.014 5.232 1.11 7.858v4.057h-20v20H22.953c-3.476 3.472-6.949 6.949-10.424 10.422.013-12.74-.026-25.481.02-38.22.138-1.594.683-3.4 1.7-4.763 1.289-1.856 3.63-2.402 5.765-2.38zm59.111 20L66.529 44.453V32h12.596z" />
          </g>
        )}
      </g>
    </svg>
  );
};

export default IconMessages;
