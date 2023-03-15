import { useIntl } from 'react-intl';

type Props = {
  color: string;
  colorDark: string;
  titleKey?: string;
};

const IconLink: React.FC<Props> = ({ color, colorDark, titleKey }) => {
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
        <path d="M38.58 7.916H26.49c-13.11 0-23.844 10.734-23.844 23.845v42.311c0 13.111 10.734 23.844 23.845 23.844H68.8c13.112 0 23.845-10.733 23.845-23.844V61.984s-.27-6.045-5.71-6.045c-5.44 0-5.713 6.045-5.713 6.045v12.088c0 6.98-5.44 12.422-12.422 12.422h-42.31c-6.98 0-12.422-5.441-12.422-12.422v-42.31c0-6.981 5.441-12.423 12.422-12.423H38.58s6.044-.271 6.044-5.711-6.044-5.712-6.044-5.712z" />
        <path d="M58.208 2.646h39.688v39.687H87.313v-18.52L47.625 63.5 37.042 52.917l39.687-39.688H58.21z" />
      </g>
    </svg>
  );
};

IconLink.defaultProps = {
  titleKey: 'icon_link',
};

export default IconLink;
