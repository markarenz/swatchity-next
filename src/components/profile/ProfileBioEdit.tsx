import { FormattedMessage } from 'react-intl';
import { ProfileFormFields } from '@/types';
import Chip from '@/components/common/Chip';
import styles from '@/styles/modules/profileBioEdit.module.scss';
import { bioLetters, getColorEmoji } from '@/utils/profileFunctions';

type Props = {
  bio: string;
  setFormData: Function;
};
const ProfileBioEdit: React.FC<Props> = ({ bio, setFormData }) => {
  const removeLetter = (idx: number) => {
    setFormData((prev: ProfileFormFields) => ({
      ...prev,
      bio: bio
        .split('')
        .filter((_s, i) => i !== idx)
        .join(''),
    }));
  };
  const addLetter = (s: string) => {
    setFormData((prev: ProfileFormFields) => ({
      ...prev,
      bio: `${bio}${s}`,
    }));
  };
  return (
    <div className={styles.root} data-testid="profile-edit-bio">
      <label>
        <span>
          <FormattedMessage id="profile_edit__labels__bio" />
        </span>
        <input type="hidden" value={bio} />
      </label>

      <div>
        <div className={`input-text ${styles.inputBio}`}>
          {bio.split('').map((s, idx) => (
            <Chip removeItem={() => removeLetter(idx)} idx={idx} key={`${idx}-${s}`}>
              <span>{getColorEmoji(s)}</span>
            </Chip>
          ))}
        </div>
        <div className="italic py-1 leading-1-5">
          <FormattedMessage id="profile_edit__bio__explainer" />
        </div>

        <div id="bio-keyboard">
          <div className="flex justify-between flex-wrap gap-1">
            {bioLetters.map((s, idx) => (
              <button
                key={`${s}-${idx}`}
                onClick={() => addLetter(s)}
                className="py-0-25 px-0-25"
                data-testid={`profile-edit-btn-${idx}`}
              >
                <div className="text-2 border-1 relative border-gray-5 dark-border-gray-1 round hover-zoom">
                  {getColorEmoji(s)}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div
                      className={`text-2 ${
                        ['y', 'w', 'o'].includes(s) ? 'text-gray-6' : 'text-gray-1'
                      }`}
                    >
                      +
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBioEdit;
