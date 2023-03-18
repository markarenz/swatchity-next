import styles from '@/styles/modules/swatchPost.module.scss';

type Props = {
  idx: number;
};
const SwatchSkeleton: React.FC<Props> = ({ idx }) => {
  const delayStyles = [
    styles.animDelay0,
    styles.animDelay1,
    styles.animDelay2,
    styles.animDelay3,
    styles.animDelay4,
  ];
  const delayStyle = delayStyles[idx % 5];
  return (
    <div data-testid="skeleton-swatch" className={styles.skeletonSwatch}>
      <div className="flex gap-1 mb-1">
        <div className="w-4 h-4">
          <div
            data-testid="skeleton-avatar"
            className={`relative round w-full h-full border-2 ${styles.skeletonAvatar} ${delayStyle}`}
          />
        </div>
        <div className="flex-grow">
          <div className="pb-1">
            <div className={`${styles.skeletonTextLong} ${delayStyle} mr-1`} />{' '}
            <div className={`${styles.skeletonTextShort} ${delayStyle}`} />
          </div>
          <div>
            <div className={`${styles.swatchBody} ${delayStyle}`}>
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
              <div className={`${styles.skeletonTextShort} ${delayStyle}`} />
            </div>
            <div className="mr-1">
              <div className={`${styles.skeletonTextShort} ${delayStyle}`} />
            </div>
            <div>
              <div className={`${styles.skeletonTextShort} ${delayStyle}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwatchSkeleton;
