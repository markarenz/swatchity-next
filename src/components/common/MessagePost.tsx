import { Message } from '@prisma/client';
import styles from '@/styles/modules/swatchPost.module.scss';
import { getCornerColor, getRGBfromColorObj } from '@/utils/colorFunctions';
import TimeSince from '@/components/common/TimeSince';

type Props = {
  message: Message;
  name: string;
  isSelf: boolean;
};

const MessagePost: React.FC<Props> = ({ message, isSelf, name }) => {
  const { colorR, colorG, colorB, id, createdAt } = message;
  const bgColor = `rgb(${colorR}, ${colorG}, ${colorB})`;
  const cornerColor = getRGBfromColorObj(getCornerColor({ r: colorR, g: colorG, b: colorB }));
  return (
    <div className="py-1">
      <div className={`py-1 ${isSelf ? 'text-right' : 'text-left'}`}>
        <span className="uppercase mr-0-5">{name}</span>
        <span className="mr-0-5">&#183;</span>
        <TimeSince inputDate={createdAt} />
      </div>
      <div
        className={`${styles.swatchBody} ${isSelf ? styles.messageSelf : styles.messageOther}`}
        style={{ backgroundColor: bgColor }}
      >
        <div className={`${styles.corner} ${isSelf ? styles.cornerReply : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 40 40">
            <g strokeWidth="0" paintOrder="stroke markers fill">
              <path className={styles.cornerBG} d="M40 40H0L40 0z"></path>
              <path d="M0 40V0h40z" style={{ fill: cornerColor }} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MessagePost;
