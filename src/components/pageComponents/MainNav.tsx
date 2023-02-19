import Link from 'next/link';
import { useRouter } from 'next/router';
import IconHome from '../icons/IconHome';
import IconAlerts from '../icons/IconAlerts';
import IconMessages from '../icons/IconMessages';
import IconSearch from '../icons/IconSearch';
import IconNews from '../icons/IconNews';

const MainNav = () => {
  const { pathname } = useRouter();
  const [pathRoot] = pathname.split('/');
  const isActive = (keys: string[]): boolean => keys.includes(pathRoot);
  const linksData = [
    {
      href: '/',
      rootPaths: ['', 'feed'],
      linkIcon: IconHome,
      hasDot: false,
    },
    {
      href: '/alerts',
      rootPaths: ['alerts'],
      linkIcon: IconAlerts,
      hasDot: true, // TODO: detect unread alerts
    },
    {
      href: '/messages',
      rootPaths: ['messages'],
      linkIcon: IconMessages,
      hasDot: false, // TODO: detect unread messages
    },
    {
      href: '/news',
      rootPaths: ['news'],
      linkIcon: IconNews,
      hasDot: false, // TODO: detect unread news
    },
    {
      href: '/search',
      rootPaths: ['search'],
      linkIcon: IconSearch,
      hasDot: false,
    },
  ];
  return (
    <nav
      aria-label="Main Navigation"
      className="bg-gray-5 dark-bg-gray-7 pt-1 pb-3 fixed bottom-0 left-0 w-full"
    >
      <div className="contained">
        <div className="flex items-center justify-between">
          {linksData.map((item, idx) => (
            <Link href={item.href} className="hover-zoom outline-rev" key={`${item.href}-${idx}`}>
              <div className="w-4 h-4 px-1 py-1">
                {item.hasDot && (
                  <div>
                    <div
                      className="h-1 w-1 round bg-yellow absolute top-0 right-0"
                      role="figure"
                      aria-label="New Items"
                    />
                  </div>
                )}
                <item.linkIcon
                  color={isActive(item.rootPaths) ? 'gray-1' : 'gray-2'}
                  colorDark={isActive(item.rootPaths) ? 'gray-2' : 'gray-3'}
                  filled={isActive(item.rootPaths)}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
