import styles from '@/styles/modules/swatchPost.module.scss';

type Props = {
  isSelf: boolean;
  idx: number;
};

const MessageSkeleton: React.FC<Props> = ({ isSelf, idx }) => {
  const delayStyles = [
    styles.animDelay0,
    styles.animDelay1,
    styles.animDelay2,
    styles.animDelay3,
    styles.animDelay4,
  ];
  const delayStyle = delayStyles[idx % 5];
  return (
    <div className={`py-1 ${styles.skeletonSwatch}`}>
      <div className={`py-1 ${isSelf ? 'text-right' : 'text-left'}`}>
        <div className={`${styles.skeletonTextLong} ${delayStyle} mr-1`} />
        <span className="mr-0-5">&#183;</span>
        <div className={`${styles.skeletonTextShort} ${delayStyle}`} />
      </div>
      <div
        className={`${styles.swatchBody} ${
          isSelf ? styles.messageSelf : styles.messageOther
        } ${delayStyle}`}
      >
        <div className={`${styles.corner} ${isSelf ? styles.cornerReply : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 40 40">
            <g strokeWidth="0" paintOrder="stroke markers fill">
              <path className={styles.cornerBG} d="M40 40H0L40 0z"></path>
              <path d="M0 40V0h40z" className={styles.cornerFill} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
