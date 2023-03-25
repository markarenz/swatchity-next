import { useIntl } from 'react-intl';

type Props = {
  color: string;
  colorDark: string;
};

const IconLock: React.FC<Props> = ({ color, colorDark }) => {
  const { formatMessage } = useIntl();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <title>{formatMessage({ id: 'icon_lock' })}</title>
      <g className={`fill-${color} dark-fill-${colorDark}`}>
        <path d="M50.27.29c-5.916 0-10.87 1.118-14.843 3.546-3.973 2.428-6.698 6.127-8.32 10.182-3.244 8.108-3.002 17.732-3.002 28.315h-3.522c-5.54 0-10 4.46-10 10v38.209c0 5.54 4.46 10 10 10h59.375c5.54 0 10-4.46 10-10V52.333c0-5.54-4.46-10-10-10h-3.521c0-10.583.241-20.207-3.002-28.315-1.622-4.055-4.347-7.754-8.32-10.182C61.14 1.408 56.186.29 50.27.29zm0 10c4.667 0 7.65.87 9.63 2.08 1.98 1.209 3.225 2.802 4.25 5.362 2.048 5.12 2.287 14.018 2.287 24.601H34.105c0-10.583.239-19.48 2.287-24.6 1.024-2.561 2.27-4.154 4.25-5.364s4.962-2.078 9.629-2.078zm0 44.743a10 10 0 011.565.123 10 10 0 011.526.367 10 10 0 011.45.6 10 10 0 011.338.82 10 10 0 011.193 1.019 10 10 0 011.019 1.193 10 10 0 01.82 1.338 10 10 0 01.6 1.45 10 10 0 01.367 1.525 10 10 0 01.123 1.565 10 10 0 01-.127 1.584 10 10 0 01-.376 1.544 10 10 0 01-.616 1.466 10 10 0 01-.84 1.349 10 10 0 01-1.045 1.198 10 10 0 01-1.22 1.019 10 10 0 01-1.367.812V88.26h-8.819V74.005a10 10 0 01-1.366-.812 10 10 0 01-1.22-1.019 10 10 0 01-1.045-1.198 10 10 0 01-.84-1.35 10 10 0 01-.616-1.465 10 10 0 01-.376-1.544 10 10 0 01-.127-1.584 10 10 0 01.123-1.565 10 10 0 01.366-1.526 10 10 0 01.6-1.45 10 10 0 01.82-1.337 10 10 0 011.02-1.193 10 10 0 011.193-1.02 10 10 0 011.338-.819 10 10 0 011.45-.6 10 10 0 011.526-.367 10 10 0 011.564-.123z" />
      </g>
    </svg>
  );
};

export default IconLock;
