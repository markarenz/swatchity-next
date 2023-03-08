import { useIntl } from 'react-intl';

type Props = {
  color: string;
  colorDark: string;
  titleKey?: string;
};

const IconAuto: React.FC<Props> = ({ color, colorDark, titleKey }) => {
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
        <path d="M50 1C22.986 1 1 22.986 1 50c0 27.015 21.986 49 49 49a49 49 0 0049-49A49 49 0 0050 1zm0 8v82C27.31 91 9 72.691 9 50 9 27.31 27.31 9 50 9z" />
      </g>
    </svg>
  );
};

IconAuto.defaultProps = {
  titleKey: 'icon_auto',
};

export default IconAuto;
