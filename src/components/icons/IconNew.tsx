import { useIntl } from 'react-intl';

type Props = {
  color: string;
  colorDark: string;
};

const IconNew: React.FC<Props> = ({ color, colorDark }) => {
  const { formatMessage } = useIntl();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <title>{formatMessage({ id: 'icon_new' })}</title>
      <g className={`fill-${color} dark-fill-${colorDark}`}>
        <path d="M2.646 2.646v95.25h53.282l41.968-41.968V2.646zm21.166 7.937h7.938v13.23h13.23v7.937H31.75v13.23h-7.938V31.75H10.584v-7.938h13.23zm29.105 42.334h39.687L52.917 92.604z" />
      </g>
    </svg>
  );
};

export default IconNew;
