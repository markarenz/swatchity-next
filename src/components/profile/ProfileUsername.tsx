import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { ProfileFormFields } from '@/types';
import { FormattedMessage } from 'react-intl';
import IconLoading from '../icons/IconLoading';
import IconCorrect from '../icons/IconCorrect';
import IconClose from '../icons/IconClose';
import { checkUsername } from '@/utils/apiFunctions';
import { truncateMaxLen, removeNonAlphaNumeric, removeProfanity } from '@/utils/profileFunctions';

type Props = {
  username: string;
  setFormData: Function;
};
const ProfileUsername: React.FC<Props> = ({ username, setFormData }) => {
  const [isValid, setIsValid] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUniqueCheck = useCallback(
    debounce(async (val) => {
      if (val.length < 3) {
        setIsValid(false);
        setFormData((prev: ProfileFormFields) => ({
          ...prev,
          usernameUnique: false,
        }));
      } else {
        setIsChecking(true);
        const isUnique = await checkUsername(val);
        setIsValid(isUnique);
        setIsChecking(false);
        setFormData((prev: ProfileFormFields) => ({
          ...prev,
          usernameUnique: isUnique,
        }));
      }
    }, 500),
    [],
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = removeNonAlphaNumeric(
      removeProfanity(truncateMaxLen(e.target.value, 40)),
    ).toLocaleLowerCase();
    setFormData((prev: ProfileFormFields) => ({
      ...prev,
      username: newUsername,
      usernameUnique: isValid,
    }));
    debouncedUniqueCheck(newUsername);
  };
  return (
    <div data-testid="profile-username">
      <label>
        <span>
          <FormattedMessage id="profile_edit__labels__username" />
        </span>
        <div className="relative">
          <input
            id="field__username"
            data-testid="profile-username-input"
            type="text"
            name="profileUsername"
            value={username}
            onChange={handleChange}
          />
          <div className="absolute right-0 top-0 h-full">
            <div className="flex items-center justify-right pr-0-5 h-full w-2">
              {isChecking && (
                <div className="anim-spin block h-2 w-2">
                  <IconLoading color="gray-5" colorDark="gray-2" />
                </div>
              )}

              {!isChecking && isValid && <IconCorrect color="teal" colorDark="teal" />}
              {!isChecking && !isValid && (
                <IconClose color="red" colorDark="red" titleKey="icon_incorrect" />
              )}
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};
export default ProfileUsername;
