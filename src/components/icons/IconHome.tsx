import { useIntl } from 'react-intl';

type Props = {
  filled: boolean;
  color: string;
  colorDark: string;
};

const IconHome: React.FC<Props> = ({ filled, color, colorDark }) => {
  const { formatMessage } = useIntl();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <title>{formatMessage({ id: 'icon_home' })}</title>
      <g className={`fill-${color} dark-fill-${colorDark}`}>
        {filled ? (
          <g>
            <path d="M50 1.258l-17 17V2.6H17v31.658L0 52v1h16.5v44.5h45.242L83.5 75.742V53H100v-1zm8.208 70.18h21.167L58.208 92.603z" />
          </g>
        ) : (
          <g>
            <path d="M50 2.424l-.375.373C33.048 19.375 16.575 35.95 0 52.529h17.47v44h43.577c7.162-7.159 14.323-14.32 21.482-21.482V52.53H100C83.3 35.826 66.703 19.124 50 2.424zm0 7.154L87.893 47.47H77.47v24h-20v20H22.529v-44H12.107zM62.53 76.53h11.363L62.53 87.892z" />
            <path d="M18 4h14v12L18 30z" />
          </g>
        )}
      </g>
    </svg>
  );
};

export default IconHome;
