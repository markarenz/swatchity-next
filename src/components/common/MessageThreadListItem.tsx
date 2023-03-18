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
    <div
      className={`px-1 py-1 round-1 ${
        `${thread.modifiedAt}` > lastVisitStr ? 'bg-red dark-bg-base' : 'bg-gray-3 dark-bg-gray-5'
      }`}
    >
      <div className="flex items-center">
        <div className="flex-grow text-gray-1 dark-text-gray-2">
          <span className="mr-0-5">{threadUserName}</span>
          <span className="mr-0-5">&#183;</span>
          <TimeSince inputDate={thread.modifiedAt} />
        </div>
        <div>
          <Link href={threadLink} aria-label="view" prefetch={false}>
            <div className="hover-zoom h-4 w-4 py-1 px-1 round">
              <IconLink color="gray-1" colorDark="gray-2" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessageThreadListItem;
