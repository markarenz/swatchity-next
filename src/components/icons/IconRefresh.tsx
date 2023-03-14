import { useIntl } from 'react-intl';

type Props = {
  color: string;
  colorDark: string;
};

const IconRefresh: React.FC<Props> = ({ color, colorDark }) => {
  const { formatMessage } = useIntl();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <title>{formatMessage({ id: 'icon_refresh' })}</title>
      <g className={`fill-${color} dark-fill-${colorDark}`}>
        <path d="M50.271 10.875c-20.901 0-39.396 15.73-39.396 39.396 0 13.388 6.174 23.604 14.092 30.014s17.356 9.38 25.304 9.38v-10c-5.28 0-13.04-2.318-19.013-7.153-5.973-4.835-10.383-11.816-10.383-22.24 0-18.667 13.257-29.397 29.396-29.397 15.403 0 21.798 7.522 25.561 15.627.493 1.061.92 2.125 1.295 3.174l-10.334-9.043-6.586 7.525 26.48 23.17 13.206-33.013-9.286-3.713-4.36 10.9a47.158 47.158 0 00-1.345-3.21c-4.835-10.416-15.638-21.417-34.63-21.417z" />
      </g>
    </svg>
  );
};

export default IconRefresh;
