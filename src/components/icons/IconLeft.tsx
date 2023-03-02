import { useIntl } from 'react-intl';

type Props = {
  color: string;
  colorDark: string;
};

const IconLeft: React.FC<Props> = ({ color, colorDark }) => {
  const { formatMessage } = useIntl();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <title>{formatMessage({ id: 'icon_left' })}</title>
      <g className={`fill-${color} dark-fill-${colorDark}`}>
        <path d="M90 0v100L10 50z" />
      </g>
    </svg>
  );
};

export default IconLeft;
