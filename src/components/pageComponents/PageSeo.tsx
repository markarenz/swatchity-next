import Head from 'next/head';
import { PageMeta } from '@/types';

type Props = {
  pageMeta: PageMeta;
};

const PageSeo: React.FC<Props> = ({ pageMeta }) => {
  const pageTitle = `${pageMeta?.title} | Swatchity`;
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" data-testid="description" content={pageMeta?.metadesc} />
      <link rel="icon" href="/img/favicons/favicon.ico" />
      <link rel="android-chrome" sizes="192x192" href="/img/favicons/android-chrome-192x192.png" />
      <link rel="android-chrome" sizes="512x512" href="/img/favicons/android-chrome-512x512.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/favicon-16x16.png" />
    </Head>
  );
};

export default PageSeo;
