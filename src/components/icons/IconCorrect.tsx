import { useIntl } from 'react-intl';

type Props = {
  color: string;
  colorDark: string;
  titleKey?: string;
};

const IconCorrect: React.FC<Props> = ({ color, colorDark, titleKey }) => {
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
        <path d="M85.89 7.678L36.405 76.957 14.12 54.672l-7.072 7.072L37.68 92.375 94.027 13.49z" />
      </g>
    </svg>
  );
};

IconCorrect.defaultProps = {
  titleKey: 'icon_correct',
};

export default IconCorrect;
