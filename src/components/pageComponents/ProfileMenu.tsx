import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import ButtonIcon from '@/components/common/ButtonIcon';
import { FormattedMessage } from 'react-intl';
import Avatar from '@/components/common/avatar/Avatar';
import { UserMeta } from '.prisma/client';
import { profileLinks } from '@/constants';
import styles from '@/styles/modules/profileMenu.module.scss';

type Props = {
  userMeta: UserMeta;
};

const ProfileMenu: React.FC<Props> = ({ userMeta }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleProfileClick = () => {
    setIsOpen((prev) => !prev);
  };
  const linkClasses =
    'block no-wrap uppercase text-1 text-base dark-text-gray-2 hover-text-gray-1 dark-hover-text-gray-1';
  return (
    <div className="relative" data-testid="profile-menu">
      <ButtonIcon onClick={handleProfileClick} label={userMeta?.name}>
        <Avatar userMeta={userMeta} />
      </ButtonIcon>
      <nav
        aria-label="Profile Menu"
        data-testid="profile-nav"
        className={`${styles.root} ${
          isOpen ? styles.open : ''
        } absolute mobile-w-full bg-teal dark-bg-base pt-1 pb-0-5 px-1 round-tr round-bl round-br t-5 caret-tl`}
      >
        <div className="pb-0-5">
          <span className={`block no-wrap bold text-1 uppercase text-gray-1 dark-text-yellow`}>
            @{userMeta.username}
          </span>
        </div>
        <hr className="mt-0-5 mb-0-5 border-base dark-border-gray-2" />

        {profileLinks.map((item, idx) => (
          <div key={`${item.labelKey}-${idx}`}>
            <Link
              href={item.href}
              className={`nav-link py-0-9 ${linkClasses}`}
              tabIndex={isOpen ? 0 : -1}
            >
              <FormattedMessage id={item.labelKey} />
            </Link>
          </div>
        ))}
        <hr className="mt-0-5 mb-0-5 border-base dark-border-gray-2" />
        <button
          data-testid="btn-signout"
          onClick={() => {
            signOut();
          }}
          className={`w-full text-left py-0-9 ${linkClasses}`}
          tabIndex={isOpen ? 0 : -1}
        >
          {isOpen ? 'WIDE OPEN' : 'SO CLOSED'}
          <FormattedMessage id="header__profile_menu__log_out" />
        </button>
      </nav>
    </div>
  );
};

export default ProfileMenu;
