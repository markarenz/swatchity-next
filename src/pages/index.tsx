import Layout from '@/components/pageComponents/Layout';
import { PageMeta } from '@/types';
import { FormattedMessage } from 'react-intl';
import { useSession, signIn, signOut } from 'next-auth/react';

// import { Inter } from '@next/font/google';
// import styles from '@/styles/Home.module.css';
// const inter = Inter({ subsets: ['latin'] });

// export type PageMeta = {
//   title: string;
//   metedesc: string;
// };
export default function Home() {
  // TODO: internationalize ALL text
  const { data: session } = useSession();
  const isLoadingAuth = session === undefined;
  const isLoggedIn = session ? !!session.user : false;

  const pageMeta: PageMeta = {
    title: 'Feed',
    metadesc: 'This is the main page',
  };

  return (
    <Layout pageMeta={pageMeta}>
      <div>
        {!session ? 'No session' : 'Yes session'}
        {JSON.stringify(session)}
        {!isLoadingAuth && isLoggedIn && (
          <div>
            Yo. You are logged in!
            <button onClick={() => signOut()}>
              <FormattedMessage id="header__profile_menu__log_out" />
            </button>
          </div>
        )}
        {!isLoadingAuth && !isLoggedIn && (
          <button onClick={() => signIn()}>
            <FormattedMessage id="header__log_in" />
          </button>
        )}
      </div>
    </Layout>
  );
}
