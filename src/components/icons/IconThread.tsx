import { useIntl } from 'react-intl';

type Props = {
  filled: boolean;
  color: string;
  colorDark: string;
};

const IconThread: React.FC<Props> = ({ filled, color, colorDark }) => {
  const { formatMessage } = useIntl();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <title>{formatMessage({ id: 'icon_thread' })}</title>
      <g className={`fill-${color} dark-fill-${colorDark}`}>
        {filled ? (
          <g>
            <path d="M.5.5v42.371s-.045 8.054 4.176 16.19c4.22 8.134 13.326 16.463 29.576 16.463h26.754v24.17l38.795-37.387L61.006 24.92v24.168h-16.67s-4.344-.049-8.565-2.082c-4.22-2.033-8.103-5.346-8.103-13.854V.5z" />
          </g>
        ) : (
          <g>
            <path d="M1 1v41.871s-.039 7.945 4.12 15.96c4.157 8.013 13.042 16.192 29.132 16.192h27.254v23.495L99.08 62.307 61.506 26.096v23.492h-17.17s-4.444-.041-8.781-2.131c-4.338-2.09-8.387-5.625-8.387-14.305V1zm6 6h14.168v26.152c0 10.756 6.037 16.94 11.783 19.71 5.747 2.768 11.385 2.726 11.385 2.726h23.17V40.21l22.928 22.096-22.928 22.095V69.023H34.252c-14.163 0-20.402-6.394-23.807-12.957C7.04 49.504 7 42.871 7 42.871z" />
          </g>
        )}
      </g>
    </svg>
  );
};

export default IconThread;
