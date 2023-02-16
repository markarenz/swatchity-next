import PageSeo from '@/components/pageComponents/PageSeo';
import { PageMeta } from '@/types';
import { useUserContext } from '@/context/UserContext';
type Props = {
  children: JSX.Element;
  pageMeta: PageMeta;
};

const Layout: React.FC<Props> = ({ children, pageMeta }) => {
  const { userMeta, isNewUser } = useUserContext();
  return (
    <div>
      <PageSeo pageMeta={pageMeta} />
      LAYOUT
      {isNewUser ? 'HEY FILL OUT THIS FORM' : userMeta?.name}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
