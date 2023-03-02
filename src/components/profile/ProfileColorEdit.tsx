import { Color } from '@/types';
import { useIntl } from 'react-intl';

type Props = {
  color: Color;
  handleClick: Function;
  isSelected: boolean;
  idx: number;
};
const ProfileColorEdit: React.FC<Props> = ({ color, handleClick, isSelected, idx }) => {
  const { formatMessage } = useIntl();
  return (
    <button
      onClick={() => handleClick()}
      aria-label={formatMessage({ id: 'profile_edit__avatar__edit_color' })}
      className="block"
      data-testid={`avatar-color-btn-${idx}`}
    >
      <div
        className={`h-4 w-4 round hover-zoom ${
          isSelected
            ? 'border-2 border-gray-7 dark-border-gray-1'
            : 'border-1 border-gray-5 dark-border-gray-2'
        }`}
        style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
      />
    </button>
  );
};

export default ProfileColorEdit;
