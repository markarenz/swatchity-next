import Link from 'next/link';
import TimeSince from '@/components/common/TimeSince';
import { MessageThread } from '@prisma/client';
import IconLink from '../icons/IconLink';

type Props = {
  thread: MessageThread;
  lastVisitStr: string;
  userID: string;
};
const MessageThreadListItem: React.FC<Props> = ({ thread, lastVisitStr, userID }) => {
  const threadUserName = userID === thread.fromUserID ? thread.toUserName : thread.fromUserName;
  const threadUserID = userID === thread.fromUserID ? thread.toUserID : thread.fromUserID;
  const threadLink = `/messages/${threadUserID}`;
  return (
    <Link
      href={threadLink}
      aria-label="view"
      prefetch={false}
      className="text-link text-link-no-underline hover-group"
    >
      <div
        className={`px-1 py-1 round-1 relative ${
          `${thread.modifiedAt}` > lastVisitStr ? 'bg-red dark-bg-base' : 'bg-gray-3 dark-bg-gray-5'
        }`}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-gray-7 round-1 group-hover-opacity-in" />
        <div className="flex items-center relative">
          <div className="flex-grow text-gray-1 dark-text-gray-2">
            <span className="mr-0-5">{threadUserName}</span>
            <span className="mr-0-5">&#183;</span>
            <TimeSince inputDate={thread.modifiedAt} />
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

export default MessageThreadListItem;
