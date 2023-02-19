import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import { SubNavItem } from '@/types';

type Props = {
  subNavData: SubNavItem[];
};
const SubNav: React.FC<Props> = ({ subNavData }) => {
  const { pathname } = useRouter();
  const isActive = (h: string): boolean => h === pathname;
  return (
    <nav aria-label="Page Sub Navigation" className="contained bg-gray-4 dark-bg-gray-5">
      <div className="flex justify-between">
        {subNavData.map((item: SubNavItem) => (
          <Link
            href={item.href}
            key={item.labelKey}
            className={`nav-link py-1 px-1 uppercase text-gray-1 hover-underline ${
              isActive(item.href) ? 'bg-base' : ''
            }`}
          >
            <FormattedMessage id={item.labelKey} />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default SubNav;
