import { FormattedMessage } from 'react-intl';

type Props = {
  inputDate: Date;
};
const TimeSince: React.FC<Props> = ({ inputDate }) => {
  const dateNow = new Date().getTime();
  const prevDate = new Date(inputDate).getTime();
  const seconds = Math.floor((dateNow - prevDate) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 360.25);
  if (years > 0) {
    return <FormattedMessage id="days_since__years" values={{ num: years }} />;
  }
  if (days > 0) {
    return <FormattedMessage id="days_since__days" values={{ num: days }} />;
  }
  if (hours > 0) {
    return <FormattedMessage id="days_since__hours" values={{ num: hours }} />;
  }
  if (minutes > 0) {
    return <FormattedMessage id="days_since__minutes" values={{ num: minutes }} />;
  }
  return <FormattedMessage id="days_since__now" />;
};
export default TimeSince;
