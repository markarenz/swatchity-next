import { perfLangOptions } from '@/constants';
import { FormattedMessage } from 'react-intl';
import { ProfileFormFields } from '@/types';

type Props = {
  perfLang: string;
  setFormData: Function;
};

const ProfilePerfLang: React.FC<Props> = ({ perfLang, setFormData }) => {
  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = `${e.target.value}`;
    setFormData((prev: ProfileFormFields) => ({
      ...prev,
      prefLang: val,
    }));
  };
  return (
    <div>
      <label>
        <span>
          <FormattedMessage id="profile_edit__labels__language" />
        </span>
        <select
          className="select"
          name="prefLang"
          onChange={handleFormChange}
          value={perfLang}
          data-testid="lang-select"
        >
          {perfLangOptions.map((o) => (
            <option value={o.value} key={`${o.labelKey}-${o.value}`}>
              <FormattedMessage id={o.labelKey} />
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default ProfilePerfLang;
