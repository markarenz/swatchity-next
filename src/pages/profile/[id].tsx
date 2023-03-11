import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useUserContext } from '@/context/UserContext';
import { subNavLinksFeed } from '@/constants';
import { serializeSwatchDates } from '@/utils/apiFunctions';
import { getSwatchesDB, getUserProfileDB } from '@/utils/dbFunctions';
import { SwatchExt, UserProfile } from '@/types';
import SwatchFeed from '@/components/common/SwatchFeed';

type Props = {
  userID: string;
  initialSwatches: SwatchExt[];
  initialLikes: string[];
  userProfile: UserProfile;
};
const AuthorPage: NextPage<Props> = ({ initialSwatches, initialLikes, userProfile, userID }) => {
  const { userMeta } = useUserContext();
  const subNavData = subNavLinksFeed;
  return (
    <SwatchFeed
      titleKey="feed__profile__title"
      introKey="feed__profile__intro"
      subNavData={subNavData}
      userMeta={userMeta}
      initialSwatches={initialSwatches}
      initialLikes={initialLikes}
      mode="profile"
      userProfile={userProfile}
      str={`${userID}`}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { id } = context.query;
  const swatchData = await getSwatchesDB(session, 'profile', `${id}`, 0);
  const userProfile = await getUserProfileDB(`${id}`);
  const { likes: initialLikes, swatches } = swatchData;
  const initialSwatches = serializeSwatchDates(swatches);
  return {
    props: {
      initialSwatches,
      initialLikes,
      userProfile,
      userID: id,
    },
  };
};

export default AuthorPage;
