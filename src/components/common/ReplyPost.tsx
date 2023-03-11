import Link from 'next/link';
import { ReplyExt } from '@/types';
import { getCornerColor, getRGBfromColorObj } from '@/utils/colorFunctions';
import { setLikeReply } from '@/utils/apiFunctions';
import TimeSince from './TimeSince';
import Avatar from './avatar/Avatar';
import { useIntl } from 'react-intl';
import IconLike from '../icons/IconLike';
import styles from '@/styles/modules/swatchPost.module.scss';

type Props = {
  reply: ReplyExt;
  userID?: string;
  isLiked: boolean;
  setReplyLikes: Function;
  setReplies: Function;
};

const ReplyPost: React.FC<Props> = ({ reply, userID, isLiked, setReplyLikes, setReplies }) => {
  const { colorR, colorG, colorB, user, likes, id } = reply;
  const bgColor = `rgb(${colorR}, ${colorG}, ${colorB})`;
  const cornerColor = getRGBfromColorObj(getCornerColor({ r: colorR, g: colorG, b: colorB }));
  const { formatMessage } = useIntl();
  const avatarData = {
    avatarPattern: user.avatarPattern,
    avatarColor1r: user.avatarColor1r,
    avatarColor1g: user.avatarColor1g,
    avatarColor1b: user.avatarColor1b,
    avatarColor2r: user.avatarColor2r,
    avatarColor2g: user.avatarColor2g,
    avatarColor2b: user.avatarColor2b,
    avatarColor3r: user.avatarColor3r,
    avatarColor3g: user.avatarColor3g,
    avatarColor3b: user.avatarColor3b,
  };
  const handleLikeClick = () => {
    if (userID) {
      setLikeReply(userID, reply?.user?.id, reply.id, !isLiked);
      const newLikes = isLiked ? reply.likes - 1 : reply.likes + 1;
      if (isLiked) {
        setReplyLikes((prev: string[]) => prev.filter((l: string) => l !== reply.id));
      } else {
        setReplyLikes((prev: string[]) => [...prev, reply.id]);
      }
      setReplies((prev: ReplyExt[]) =>
        prev.map((s) => ({
          ...s,
          likes: s.id === reply.id ? newLikes : s.likes,
        })),
      );
    }
  };
  return (
    <div className={styles.reply}>
      <div className="flex gap-1 mb-1">
        <div className="w-4 h-4" />
        <div className="flex-grow">
          <div className="pb-1 text-right">
            <span>{user?.name}</span> <span>({user?.username})</span> <span>&#183;</span>{' '}
            <TimeSince inputDate={reply.createdAt} />
          </div>
          <div>
            <div className={styles.swatchBody} style={{ backgroundColor: bgColor }}>
              <div className={`${styles.corner} ${styles.cornerReply}`}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 40 40">
                  <g strokeWidth="0" paintOrder="stroke markers fill">
                    <path className={styles.cornerBG} d="M40 40H0L40 0z"></path>
                    <path d="M0 40V0h40z" style={{ fill: cornerColor }} />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className={`${styles.btnRow} ${styles.btnRowReply}`}>
            {!!userID && (
              <div>
                <button
                  aria-label={formatMessage({ id: 'reply__like' })}
                  onClick={handleLikeClick}
                  className="flex items-center"
                  data-testid={`btn-${reply.id}-like`}
                >
                  <div className="w-3 h-3 py-1 px-1">
                    <IconLike
                      filled={isLiked}
                      color={isLiked ? 'teal' : 'gray-6'}
                      colorDark={isLiked ? 'yellow' : 'gray-2'}
                    />
                  </div>
                  <span className="text-gray-2">{likes}</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-4 h-4">
          <Link href={`/profile/${user?.id}`} aria-label={`Profile for ${user?.name}`}>
            <Avatar avatarData={avatarData} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReplyPost;
