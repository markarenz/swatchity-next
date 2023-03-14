import { useIntl } from 'react-intl';

type Props = {
  color: string;
  colorDark: string;
  titleKey?: string;
};

const IconSun: React.FC<Props> = ({ color, colorDark, titleKey }) => {
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
        <path
          strokeWidth="0"
          d="M27.364 66.65l-6.81-16.844a38.466 37.882 0 006.81.61 38.466 37.882 0 006.807-.604zM-8.503 53.596l5.712-17.591a38.466 37.882 0 0010.42 9.018zm71.734 0l-16.11-8.562a38.466 37.882 0 0010.408-8.998zM-9.1 24.475l-18.489-3.934 16.597-10.376a38.466 37.882 0 00-.111 2.369 38.466 37.882 0 002.004 11.941zm72.971-.01a38.466 37.882 0 001.958-11.931 38.466 37.882 0 00-.111-2.369l16.596 10.376zm-.628-25.58a38.466 37.882 0 00-8.582-12.983l21.026-2.95zm-71.76 0L-20.96-17.049l21.025 2.95A38.466 37.882 0 00-8.517-1.116zm16.033-18.78l.762-21.688 14.854 16.49a38.466 37.882 0 00-15.616 5.198zm39.694 0a38.466 37.882 0 00-15.617-5.198l14.854-16.49z"
          paintOrder="markers fill stroke"
          transform="matrix(.9099 0 0 -.92393 25.102 61.58)"
        />
        <circle cx="50" cy="50" r="30"></circle>
      </g>
    </svg>
  );
};

IconSun.defaultProps = {
  titleKey: 'icon_light',
};

export default IconSun;
