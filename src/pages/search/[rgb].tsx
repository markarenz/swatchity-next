import React, { useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useUserContext } from '@/context/UserContext';
import { subNavLinksFeed } from '@/constants';
import { serializeSwatchDates } from '@/utils/apiFunctions';
import { getSwatchesDB } from '@/utils/dbFunctions';
import { SwatchExt } from '@/types';
import SwatchFeed from '@/components/common/SwatchFeed';

type Props = {
  initialSwatches: SwatchExt[];
  initialLikes: string[];
};
const Search: NextPage<Props> = ({ initialSwatches, initialLikes }) => {
  const router = useRouter();
  const { rgb } = router.query;
  const [r, g, b] = `${rgb}`.split('-');
  const str = `${parseInt(r, 10)},${parseInt(g, 10)},${parseInt(b, 10)}`;
  const { userMeta } = useUserContext();
  const subNavData = subNavLinksFeed;
  return (
    <SwatchFeed
      titleKey="feed__search_title"
      introKey="feed__search_intro"
      subNavData={subNavData}
      userMeta={userMeta}
      initialSwatches={initialSwatches}
      initialLikes={initialLikes}
      mode="search"
      str={str}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { rgb } = context.query;
  const [r, g, b] = `${rgb}`.split('-');
  const swatchData = await getSwatchesDB(session, 'search', `${r},${g},${b}`, 0);
  const { likes: initialLikes, swatches } = swatchData;
  const initialSwatches = serializeSwatchDates(swatches);
  return {
    props: {
      initialSwatches,
      initialLikes,
    },
  };
};

export default Search;
