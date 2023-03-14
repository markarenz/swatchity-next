import IconSun from '../icons/IconSun';
import IconMoon from '../icons/IconMoon';
import IconAuto from '../icons/IconAuto';
import { ProfileFormFields } from '@/types';

type Props = {
  darkMode: string;
  setFormData: Function;
};
const ProfileDarkMode: React.FC<Props> = ({ darkMode, setFormData }) => {
  const handleChange = (val: string) => {
    setFormData((prev: ProfileFormFields) => ({
      ...prev,
      darkMode: val,
    }));
  };
  let indicatorPosition = 'calc(50% - 1.5rem)';
  if (darkMode === 'light') {
    indicatorPosition = '0';
  } else if (darkMode === 'dark') {
    indicatorPosition = 'calc(100% - 3rem)';
  }
  return (
    <div>
      <label>
        <span>Dark Mode</span>
        <div className="relative round-3 inline-block border-1 border-gray-5 dark-border-gray-2 bg-gray-1 dark-bg-gray-6">
          <div
            className="absolute round h-3 w-3 bg-gray-2 dark-bg-gray-4 transition"
            aria-hidden="true"
            style={{ top: 0, left: indicatorPosition }}
          />
          <div className="relative">
            <button
              className="w-3 h-3 py-1 px-1 inline-block"
              onClick={() => handleChange('light')}
              data-testid="btn-theme-light"
            >
              <IconSun color="gray-5" colorDark="gray-1" />
            </button>
            <button
              className="w-3 h-3 py-1 px-1 inline-block"
              onClick={() => handleChange('auto')}
              data-testid="btn-theme-auto"
            >
              <IconAuto color="gray-5" colorDark="gray-1" />
            </button>
            <button
              className="w-3 h-3 py-1 px-1 inline-block"
              onClick={() => handleChange('dark')}
              data-testid="btn-theme-dark"
            >
              <IconMoon color="gray-5" colorDark="gray-1" />
            </button>
          </div>
        </div>
      </label>
    </div>
  );
};

export default ProfileDarkMode;
