import { FormattedMessage } from 'react-intl';
import { removeProfanity, truncateMaxLen } from '@/utils/profileFunctions';
import { ProfileFormFields } from '@/types';

type Props = {
  name: string;
  setFormData: Function;
};
const ProfileName: React.FC<Props> = ({ name, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: ProfileFormFields) => ({
      ...prev,
      name: removeProfanity(truncateMaxLen(e.target.value, 40)),
    }));
  };
  return (
    <div data-testid="profile-edit-name">
      <label>
        <span>
          <FormattedMessage id="profile_edit__labels__name" />
        </span>
        <input
          id="field__name"
          data-testid="field__name"
          type="text"
          name="profileName"
          value={name}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};
export default ProfileName;
