import styles from '@/styles/modules/swatchPost.module.scss';

type Props = {
  idx: number;
};
const PostSkeleton: React.FC<Props> = ({ idx }) => {
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
      <div className={`px-1 py-1 round-1 ${styles.alertSkeleton} ${delayStyle}`}>
        <div className="flex gap-1 items-center">
          <div className={`w-3 h-3 round bg-red ${styles.skeletonAvatar}`} />
          <div className="flex-grow py-1">
            <div className={`${styles.skeletonTextExtraLong} ${delayStyle}`} />{' '}
            <div className={`${styles.skeletonTextShort} ${delayStyle}`} />
          </div>
          <div className="py-0-5">
            <div className="w-3 h-3 py-1 px-1 bg-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
