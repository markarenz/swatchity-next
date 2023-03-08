import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
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
const Home: NextPage<Props> = ({ initialSwatches, initialLikes }) => {
  const { userMeta } = useUserContext();
  return (
    <SwatchFeed
      titleKey="feed__home_title"
      introKey="feed__home_intro"
      subNavData={subNavLinksFeed}
      userMeta={userMeta}
      initialSwatches={initialSwatches}
      initialLikes={initialLikes}
      mode="feed"
      str=""
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const swatchData = await getSwatchesDB(session, 'feed', '', 0);
  const { likes: initialLikes, swatches } = swatchData;
  const initialSwatches = serializeSwatchDates(swatches);
  return {
    props: {
      initialSwatches,
      initialLikes,
    },
  };
};

export default Home;
