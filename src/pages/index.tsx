import Layout from '@/components/pageComponents/Layout';
import { PageMeta } from '@/types';
import { subNavLinksFeed } from '@/constants';

export default function Home() {
  const pageMeta: PageMeta = {
    title: 'Feed',
    metadesc: 'This is the main page',
  };
  const subNavData = subNavLinksFeed;
  return (
    <Layout pageMeta={pageMeta} subNavData={subNavData}>
      <div className="contained py-4">This is where the main feed will go...</div>
    </Layout>
  );
}
