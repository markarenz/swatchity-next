import TimeSince from './TimeSince';
import styles from '@/styles/modules/swatchPost.module.scss';
import IconThread from '../icons/IconThread';
import IconLike from '../icons/IconLike';
import IconReply from '../icons/IconReply';

type Props = {
  isLoggedIn?: boolean;
};
const SwatchSkeleton: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <div data-testid="skeleton-swatch" className={styles.skeletonSwatch}>
      <div className="flex gap-1 mb-1">
        <div className="w-4 h-4">
          <div
            data-testid="skeleton-avatar"
            className={`relative round w-full h-full border-2 ${styles.skeletonAvatar}`}
          />
        </div>
        <div className="flex-grow">
          <div className="pb-1">
            <div className={styles.skeletonTextLong} /> <span>&#183;</span>{' '}
            <div className={styles.skeletonTextShort} />
          </div>
          <div>
            <div className={styles.swatchBody}>
              <div className={styles.corner}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 40 40">
                  <g strokeWidth="0" paintOrder="stroke markers fill">
                    <path className={styles.cornerBG} d="M40 40H0L40 0z"></path>
                    <path d="M0 40V0h40z" className={styles.cornerFill} />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.btnRow}>
            <div className="mr-1">
              <div className={styles.skeletonTextShort} />
            </div>
            <div className="mr-1">
              <div className={styles.skeletonTextShort} />
            </div>
            {isLoggedIn && (
              <div>
                <div className={styles.skeletonTextShort} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwatchSkeleton;
