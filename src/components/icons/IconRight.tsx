import { useIntl } from 'react-intl';

type Props = {
  color: string;
  colorDark: string;
};

const IconRight: React.FC<Props> = ({ color, colorDark }) => {
  const { formatMessage } = useIntl();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <title>{formatMessage({ id: 'icon_right' })}</title>
      <g className={`fill-${color} dark-fill-${colorDark}`}>
        <path d="M10 0v100l80-50z" />
      </g>
    </svg>
  );
};

export default IconRight;
