import Head from 'next/head';
import { PageMeta } from '@/types';

type Props = {
  pageMeta: PageMeta;
};

const PageSeo: React.FC<Props> = ({ pageMeta }) => {
  const pageTitle = `${pageMeta?.title} | Swatchity`;
  const imSrc = 'https://swatchity-assets.s3.amazonaws.com/swatchity-img.jpg';
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" data-testid="description" content={pageMeta?.metadesc} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <meta property="og:title" content={pageMeta?.title} />
      <meta property="og:type" content="video.movie" />
      <meta property="og:image" content={imSrc} />
      <meta name="twitter:title" content={pageMeta?.title} />
      <meta name="twitter:description" content={pageMeta?.metadesc} />
      <meta name="twitter:image" content={imSrc} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default PageSeo;
