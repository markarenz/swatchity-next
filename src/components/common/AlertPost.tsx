import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import TimeSince from './TimeSince';
import { Alert } from '@prisma/client';
import IconLink from '../icons/IconLink';

type Props = {
  alert: Alert;
  lastVisitStr: string;
};
const AlertPost: React.FC<Props> = ({ alert, lastVisitStr }) => {
  return (
    <Link
      href={alert.link}
      aria-label="view"
      className="text-link text-link-no-underline hover-group"
    >
      <div
        className={`px-1 py-1 round-1 relative ${
          `${alert.createdAt}` > lastVisitStr ? 'bg-red dark-bg-base' : 'bg-gray-3 dark-bg-gray-5'
        }`}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-gray-7 round-1 group-hover-opacity-in" />
        <div className="flex items-center relative">
          <div className="flex-grow text-gray-1 dark-text-gray-2">
            <FormattedMessage id={'alerts__templates__reply_1'} />{' '}
            <span className="bold uppercase">swatchity</span>{' '}
            <FormattedMessage id={'alerts__templates__reply_2'} />{' '}
            <TimeSince inputDate={alert.createdAt} />
          </div>
          <div>
            <div className="group-hover-zoom h-4 w-4 py-1 px-1 round">
              <IconLink color="gray-1" colorDark="gray-2" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlertPost;
