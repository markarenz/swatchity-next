import styles from '@/styles/modules/swatchPost.module.scss';

type Props = {
  idx: number;
};
const AlertSkeleton: React.FC<Props> = ({ idx }) => {
  const delayStyles = [
    styles.animDelay0,
    styles.animDelay1,
    styles.animDelay2,
    styles.animDelay3,
    styles.animDelay4,
  ];
  const delayStyle = delayStyles[idx % 5];
  return (
    <div className={styles.skeletonSwatch} aria-label="loading">
      <div className={`px-2 py-2 round-1 ${styles.alertSkeleton} ${delayStyle}`}>
        <div className="flex items-center">
          <div className="flex-grow text-gray-1 dark-text-gray-2">
            <div className={`${styles.skeletonTextExtraLong} ${delayStyle}`} />{' '}
            <div className={`${styles.skeletonTextShort} ${delayStyle}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSkeleton;
