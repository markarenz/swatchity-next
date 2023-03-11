import Link from 'next/link';
import TimeSince from './TimeSince';
import Avatar from './avatar/Avatar';
import { SwatchExt } from '@/types';
import styles from '@/styles/modules/swatchPost.module.scss';
import IconThread from '../icons/IconThread';
import IconLike from '../icons/IconLike';
import IconReply from '../icons/IconReply';
import { getCornerColor, getRGBfromColorObj } from '@/utils/colorFunctions';
import { setLikeSwatch } from '@/utils/apiFunctions';
import { useIntl } from 'react-intl';
type Props = {
  swatch: SwatchExt;
  userID?: string;
  isLiked: boolean;
  setUserLikes: Function;
  setSwatches: Function;
};
const SwatchPost: React.FC<Props> = ({ userID, swatch, isLiked, setUserLikes, setSwatches }) => {
  const { colorR, colorG, colorB, user, likes, replies } = swatch;
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
      setLikeSwatch(userID, swatch.userID, swatch.id, !isLiked);
      const newLikes = isLiked ? swatch.likes - 1 : swatch.likes + 1;
      if (isLiked) {
        setUserLikes((prev: string[]) => prev.filter((l: string) => l !== swatch.id));
      } else {
        setUserLikes((prev: string[]) => [...prev, swatch.id]);
      }
      setSwatches((prev: SwatchExt[]) =>
        prev.map((s) => ({
          ...s,
          likes: s.id === swatch.id ? newLikes : s.likes,
        })),
      );
    }
  };
  return (
    <div>
      <div className="flex gap-1 mb-1">
        <div className="w-4 h-4">
          <Link href={`/profile/${user?.id}`} aria-label={`Profile for ${user?.name}`}>
            <Avatar avatarData={avatarData} />
          </Link>
        </div>
        <div className="flex-grow">
          <div className="pb-1">
            <span>{user?.name}</span> <span>({user?.username})</span> <span>&#183;</span>{' '}
            <TimeSince inputDate={swatch.createdAt} />
          </div>
          <div>
            <div className={styles.swatchBody} style={{ backgroundColor: bgColor }}>
              <div className={styles.corner}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 40 40">
                  <g strokeWidth="0" paintOrder="stroke markers fill">
                    <path className={styles.cornerBG} d="M40 40H0L40 0z"></path>
                    <path d="M0 40V0h40z" style={{ fill: cornerColor }} />
                    {/* <path className={styles.cornerFill} d="M2 35L35 2H2z" /> */}
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.btnRow}>
            <div>
              <button aria-label={formatMessage({ id: 'swatch__thread' })} onClick={() => {}}>
                <div className="w-3 h-3 py-1 px-1">
                  <IconThread filled={true} color="gray-6" colorDark="gray-2" />
                </div>
              </button>
            </div>
            <div>
              <button
                aria-label={formatMessage({ id: 'swatch__reply' })}
                onClick={() => {}}
                className="flex items-center"
              >
                <div className="w-3 h-3 py-1 px-1">
                  <IconReply filled={false} color="gray-6" colorDark="gray-2" />
                </div>
                <span className="text-gray-2">{replies}</span>
              </button>
            </div>
            {!!userID && (
              <div>
                <button
                  aria-label={formatMessage({ id: 'swatch__like' })}
                  onClick={handleLikeClick}
                  className="flex items-center"
                  data-testid={`btn-${swatch.id}-like`}
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
      </div>
    </div>
  );
};

export default SwatchPost;
