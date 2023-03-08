import { useState } from 'react';
import Link from 'next/link';
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
  // TODO: check for "new" items for alerts, messages, news
  // TODO: reset badges when we visit these pages
  // TODO: get latest news publish date on app load
  // TODO: get unread alerts as userMeta
  // TODO: get unread messages as userMeta

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
