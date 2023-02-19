import Link from 'next/link';
import { useUserContext } from '@/context/UserContext';
import { FormattedMessage } from 'react-intl';
import { signIn } from 'next-auth/react';
import ProfileMenu from '@/components/pageComponents/ProfileMenu';
import SwatchityLogo from '@/components/common/SwatchityLogo';
import IconAdmin from '../icons/IconAdmin';

type Props = {};

const HeaderMenu: React.FC<Props> = () => {
  const { userMeta } = useUserContext();
  const isAdmin = userMeta?.role === 'admin';
  return (
    <header className="pt-1 pb-1 bg-gray-2 dark-bg-gray-7">
      <div className="flex justify-between items-center contained">
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
        <Link href="/">
          <div className="h-3 mobile-h-2">
            <SwatchityLogo />
          </div>
        </Link>
        <div className="w-3 h-3 mobile-hide">
          {isAdmin && (
            <Link href="/admin" className="w-3 h-3 round block hover-zoom">
              <IconAdmin filled={false} color="base" colorDark="gray-2" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderMenu;
