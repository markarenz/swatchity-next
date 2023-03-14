import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Color } from '@/types';
import ButtonIcon from '../common/ButtonIcon';
import ProfileColorEdit from '@/components/profile/ProfileColorEdit';
import Avatar from '@/components/common/avatar/Avatar';
import ColorPicker from '../common/ColorPicker';
import { ProfileFormFields } from '@/types';
import IconLeft from '../icons/IconLeft';
import IconRight from '../icons/IconRight';

type Props = {
  avatarPattern: number;
  color1: Color;
  color2: Color;
  color3: Color;
  isPatternValid: boolean;
  setFormData: Function;
};

const ProfileAvatarEdit: React.FC<Props> = ({
  avatarPattern,
  color1,
  color2,
  color3,
  isPatternValid,
  setFormData,
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const { formatMessage } = useIntl();
  const avatarData = {
    avatarPattern,
    avatarColor1r: color1.r,
    avatarColor1g: color1.g,
    avatarColor1b: color1.b,
    avatarColor2r: color2.r,
    avatarColor2g: color2.g,
    avatarColor2b: color2.b,
    avatarColor3r: color3.r,
    avatarColor3g: color3.g,
    avatarColor3b: color3.b,
  };
  const openColorPicker = (n: number) => {
    setSelectedColorIdx(n);
    switch (n) {
      case 1:
        setSelectedColor(color1);
        break;
      case 2:
        setSelectedColor(color2);
        break;
      default:
      case 3:
        setSelectedColor(color3);
        break;
    }
  };
  const closeColorPicker = () => {
    setSelectedColorIdx(0);
  };
  const updateColor = (color: Color) => {
    setFormData((prev: ProfileFormFields) => {
      const newFormData = {
        ...prev,
        color1: selectedColorIdx === 1 ? color : prev.color1,
        color2: selectedColorIdx === 2 ? color : prev.color2,
        color3: selectedColorIdx === 3 ? color : prev.color3,
      };
      return newFormData;
    });
    closeColorPicker();
  };
  const defaultColor = { r: 100, g: 100, b: 100 };
  const isColorPickerOpen = selectedColorIdx !== 0;
  const changePattern = (dir: number) => {
    const maxPatIdx = 32;
    let idx = avatarPattern + dir;
    if (idx > maxPatIdx) {
      idx = 0;
    }
    if (idx < 0) {
      idx = maxPatIdx;
    }
    setFormData((prev: ProfileFormFields) => ({
      ...prev,
      avatarPattern: idx,
    }));
  };
  return (
    <div>
      <label htmlFor="profile-avatar-edit">
        <span>
          <FormattedMessage id="profile_edit__labels__avatar" />
        </span>
      </label>
      <div id="profile-avatar-edit" className="flex justify-between items-center sm-flex-col">
        <div className="flex items-center py-1">
          <div className="mr-0-5">
            <ButtonIcon
              label={formatMessage({ id: 'icon_left' })}
              onClick={() => changePattern(-1)}
            >
              <div className="py-0-5 px-0-5 hover-zoom">
                <IconLeft color="gray-5" colorDark="gray-2" />
              </div>
            </ButtonIcon>
          </div>
          <div className="h-7 w-7">
            <Avatar avatarData={avatarData} displayOnly={true} isLocked={!isPatternValid} />
          </div>
          <div className="ml-0-5">
            <ButtonIcon
              label={formatMessage({ id: 'icon_right' })}
              onClick={() => changePattern(1)}
            >
              <div className="py-0-5 px-0-5 hover-zoom">
                <IconRight color="gray-5" colorDark="gray-2" />
              </div>
            </ButtonIcon>
          </div>
        </div>
        <div className="py-1">
          <ProfileColorEdit
            color={color1}
            handleClick={() => openColorPicker(1)}
            isSelected={selectedColorIdx === 1}
            idx={1}
          />
        </div>
        <div className="py-1">
          <ProfileColorEdit
            color={color2}
            handleClick={() => openColorPicker(2)}
            isSelected={selectedColorIdx === 2}
            idx={2}
          />
        </div>
        <div className="py-1">
          <ProfileColorEdit
            color={color3}
            handleClick={() => openColorPicker(3)}
            isSelected={selectedColorIdx === 3}
            idx={3}
          />
        </div>
      </div>
      <div className="italic py-1 leading-1-5">
        <FormattedMessage id="profile_edit__avatar__explainer" />
      </div>
      <ColorPicker
        color={selectedColor || defaultColor}
        isOpen={isColorPickerOpen}
        closeColorPicker={closeColorPicker}
        onChange={updateColor}
      />
    </div>
  );
};

export default ProfileAvatarEdit;
