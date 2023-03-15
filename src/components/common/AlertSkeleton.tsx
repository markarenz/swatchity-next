import styles from '@/styles/modules/swatchPost.module.scss';

const AlertSkeleton = () => {
  return (
    <div className={styles.skeletonSwatch} aria-label="loading">
      <div className={`px-2 py-2 round-1 ${styles.alertSkeleton}`}>
        <div className="flex items-center">
          <div className="flex-grow text-gray-1 dark-text-gray-2">
            <div className={styles.skeletonTextExtraLong} />{' '}
            <div className={styles.skeletonTextShort} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSkeleton;
