import { useIntl } from 'react-intl';

type Props = {
  color: string;
  colorDark: string;
  titleKey?: string;
};

const IconMoon: React.FC<Props> = ({ color, colorDark, titleKey }) => {
  const { formatMessage } = useIntl();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <title>{formatMessage({ id: titleKey })}</title>
      <g className={`fill-${color} dark-fill-${colorDark}`}>
        <path d="M50 5A45 45 0 005 50a45 45 0 0045 45 45 45 0 0044.336-37.438 35 35 0 01-28.73 15.018 35 35 0 01-35-35A35 35 0 0152.69 5.083 45 45 0 0050 5z" />
      </g>
    </svg>
  );
};

IconMoon.defaultProps = {
  titleKey: 'icon_dark',
};

export default IconMoon;
