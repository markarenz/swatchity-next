import Link from 'next/link';
import { useRouter } from 'next/router';
import { mainNavData } from '@/constants';
import IconHome from '../icons/IconHome';
import IconAlerts from '../icons/IconAlerts';
import IconMessages from '../icons/IconMessages';
import IconSearch from '../icons/IconSearch';
import IconNews from '../icons/IconNews';

const MainNav = () => {
  const { pathname } = useRouter();
  const [pathRoot] = pathname.split('/');
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
  return (
    <nav
      aria-label="Main Navigation"
      className="bg-gray-5 dark-bg-gray-7 pt-2 pb-3 fixed bottom-0 left-0 w-full"
      style={{ zIndex: 10 }}
    >
      <div className="contained">
        <div className="flex items-center justify-between">
          {mainNavData.map((item, idx) => (
            <Link
              href={item.href}
              className="hover-zoom outline-light round"
              key={`${item.href}-${idx}`}
            >
              <div className="w-3 h-3 px-0-5 py-0-5">
                {item.hasDot && (
                  <div>
                    <div
                      className="h-1 w-1 round bg-yellow absolute top-0 right-0"
                      role="figure"
                      aria-label="New Items"
                    />
                  </div>
                )}
                {getIcon(item.linkIcon, item.rootPaths)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
