import { useState } from 'react';
import Link from 'next/link';
import { useUserContext } from '@/context/UserContext';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { mainNavData } from '@/constants';
import IconHome from '../icons/IconHome';
import IconAlerts from '../icons/IconAlerts';
import IconMessages from '../icons/IconMessages';
import IconSearch from '../icons/IconSearch';
import IconNews from '../icons/IconNews';
import ColorPicker from '../common/ColorPicker';
import { Color } from '@/types';
import { getRandomColor } from '@/utils/colorFunctions';

const MainNav = () => {
  const { userMeta } = useUserContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { formatMessage } = useIntl();
  const router = useRouter();
  const [pathRoot] = router.pathname.split('/');
  const isActive = (keys: string[]): boolean => keys.includes(pathRoot);

  const getIcon = (iconName: string, rootPaths: string[]) => {
    const iconProps = {
      color: isActive(rootPaths) ? 'gray-1' : 'gray-2',
      colorDark: isActive(rootPaths) ? 'gray-2' : 'gray-3',
      filled: isActive(rootPaths),
    };
    switch (iconName) {
      case 'search':
        return <IconSearch {...iconProps} />;
      case 'news':
        return <IconNews {...iconProps} />;
      case 'messages':
        return <IconMessages {...iconProps} />;
      case 'alerts':
        return <IconAlerts {...iconProps} />;
      case 'home':
      default:
        return <IconHome {...iconProps} />;
    }
  };
  const searchRedirect = (color: Color) => {
    setIsSearchOpen(false);
    const path = `/search/${color.r}-${color.g}-${color.b}`;
    router.push(path);
  };
  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };
  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const getItemHasDot = (icon: string) => {
    let lastAlertsView = null;
    let lastMessagesView = null;
    if (typeof window !== 'undefined') {
      lastAlertsView = localStorage.getItem('lastAlertView');
      lastMessagesView = localStorage.getItem('lastMessagesView');
    }
    if (
      icon === 'alerts' &&
      !!userMeta?.lastAlert &&
      (!lastAlertsView ||
        (!!lastAlertsView &&
          userMeta.lastAlert.toISOString() > new Date(lastAlertsView).toISOString()))
    ) {
      return true;
    }
    if (
      icon === 'messages' &&
      !!userMeta?.lastMessage &&
      (!lastMessagesView ||
        (!!lastMessagesView &&
          userMeta.lastMessage.toISOString() > new Date(lastMessagesView).toISOString()))
    ) {
      return true;
    }
    return false;
  };
  return (
    <nav
      aria-label={formatMessage({ id: 'main_nav__main_nav' })}
      className="bg-gray-5 dark-bg-gray-7 pt-2 pb-3 fixed bottom-0 left-0 w-full"
      style={{ zIndex: 10 }}
    >
      <div className="contained">
        <div className="flex items-center justify-between">
          {mainNavData.map((item, idx) =>
            item.type === 'link' ? (
              <Link
                href={item.href}
                className="hover-zoom outline-light round"
                key={`${item.labelKey}-${idx}`}
                aria-label={formatMessage({ id: item.labelKey })}
              >
                <div className="w-3 h-3 px-0-5 py-0-5">
                  {getItemHasDot(item.linkIcon) && (
                    <div>
                      <div
                        className="h-1 w-1 round bg-yellow absolute top-0 right-0"
                        role="figure"
                        aria-label={formatMessage({ id: 'main_nav__badge' })}
                      />
                    </div>
                  )}
                  {getIcon(item.linkIcon, item.rootPaths)}
                </div>
              </Link>
            ) : (
              <button
                data-testid={item.labelKey}
                className="hover-zoom outline-light round"
                key={`${item.labelKey}-${idx}`}
                aria-label={formatMessage({ id: item.labelKey })}
                onClick={handleSearchClick}
              >
                <div className="w-3 h-3 px-0-5 py-0-5">
                  {item.hasDot && (
                    <div>
                      <div
                        className="h-1 w-1 round bg-yellow absolute top-0 right-0"
                        role="figure"
                        aria-label={formatMessage({ id: 'main_nav__badge' })}
                      />
                    </div>
                  )}
                  {getIcon(item.linkIcon, item.rootPaths)}
                </div>
              </button>
            ),
          )}
        </div>
      </div>
      <ColorPicker
        isOpen={isSearchOpen}
        color={getRandomColor()}
        closeColorPicker={handleSearchClose}
        onChange={searchRedirect}
      />
    </nav>
  );
};

export default MainNav;
