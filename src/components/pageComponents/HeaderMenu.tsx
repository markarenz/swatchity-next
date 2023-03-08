import Link from 'next/link';
import { useUserContext } from '@/context/UserContext';
import { FormattedMessage } from 'react-intl';
import { signIn } from 'next-auth/react';
import ProfileMenu from '@/components/pageComponents/ProfileMenu';
import SwatchityLogo from '@/components/common/SwatchityLogo';
import SwatchityLogoMark from '../common/SwatchityLogoMark';

type Props = {
  headerButtons?: JSX.Element;
};

const HeaderMenu: React.FC<Props> = ({ headerButtons = [] }) => {
  const { userMeta } = useUserContext();
  return (
    <header className="pt-1 pb-1 bg-gray-2 dark-bg-gray-7">
      <div className="flex justify-between items-center contained ">
        <div>
          {!!userMeta ? (
            <ProfileMenu userMeta={userMeta} />
          ) : (
            <button
              data-testid="btn-signin"
              onClick={() => signIn()}
              className="text-base dark-text-gray-1 uppercase text-1-5"
            >
              <FormattedMessage id="header__log_in" />
            </button>
          )}
        </div>
        <Link href="/" className="flex-grow mobile-flex-grow-0 text-center">
          <div className="h-3 mobile-h-2">
            <div className="mobile-hide h-3">
              <SwatchityLogo />
            </div>
            <div className="mobile-show h-2">
              <SwatchityLogoMark />
            </div>
          </div>
        </Link>
        {headerButtons}
      </div>
    </header>
  );
};

export default HeaderMenu;
