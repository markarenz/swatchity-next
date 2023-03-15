import { useEffect } from 'react';
import PageSeo from '@/components/pageComponents/PageSeo';
import { PageMeta, SubNavItem } from '@/types';
import SkipLink from '@/components/pageComponents/SkipLink';
import { useUserContext } from '@/context/UserContext';
import { useSession } from 'next-auth/react';
import HeaderMenu from './HeaderMenu';
import MainNav from './MainNav';
import SubNav from './SubNav';
import Footer from './Footer';
import LoadingSession from './LoadingSession';

type Props = {
  children: JSX.Element;
  pageMeta: PageMeta;
  subNavData?: SubNavItem[];
  headerButtons?: JSX.Element;
  showLoading?: boolean;
};

const Layout: React.FC<Props> = ({
  children,
  pageMeta,
  subNavData,
  headerButtons,
  showLoading: forceShowLoading,
}) => {
  const { userMeta } = useUserContext();
  const { data: session } = useSession();
  const darkMode = userMeta?.darkMode;
  const showLoadingSession = (session === undefined && userMeta === null) || forceShowLoading;
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', `${darkMode}`);
  }, [darkMode]);

  return (
    <div id="app-panel-wrap" className={`flex dir-row theme-${darkMode}`} data-testid="layout-base">
      <div id="app-panel" className="over-y-hidden wide-col-main">
        <SkipLink />
        <PageSeo pageMeta={pageMeta} />
        <HeaderMenu headerButtons={headerButtons} />
        <MainNav />
        {subNavData && <SubNav subNavData={subNavData} />}
        <main id="main-content" className="h-min-screen pb-5">
          {children}
        </main>
        <Footer />
      </div>
      <div
        id="sidebar"
        className="wide-col-sidebar py-1 px-1 bg-gray-4 text-gray-1 border-l-2 border-teal"
      >
        Sidebar
      </div>
      {showLoadingSession && <LoadingSession />}
    </div>
  );
};

export default Layout;
