import PageSeo from '@/components/pageComponents/PageSeo';
import { PageMeta, SubNavItem } from '@/types';
import SkipLink from '@/components/pageComponents/SkipLink';
import { useUserContext } from '@/context/UserContext';
import HeaderMenu from './HeaderMenu';
import MainNav from './MainNav';
import SubNav from './SubNav';
import Footer from './Footer';

type Props = {
  children: JSX.Element;
  pageMeta: PageMeta;
  subNavData?: SubNavItem[];
};

const Layout: React.FC<Props> = ({ children, pageMeta, subNavData }) => {
  const { userMeta, isNewUser } = useUserContext();
  return (
    <div id="app-panel-wrap" className="flex dir-row" data-testid="layout-base">
      <div id="app-panel" className="over-y-hidden wide-col-main">
        <SkipLink />
        <PageSeo pageMeta={pageMeta} />
        <HeaderMenu />
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
    </div>
  );
};

export default Layout;
