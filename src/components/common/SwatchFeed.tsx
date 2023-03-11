import React, { useState, useEffect } from 'react';
import Layout from '../pageComponents/Layout';
import { useIntl } from 'react-intl';
import { UserMeta } from '@prisma/client';
import { SwatchExt, Color, PageMeta, SubNavItem, UserProfile } from '@/types';
import { swatchesPerPage } from '@/constants';
import SwatchPost from './SwatchPost';
import SwatchSkeleton from './SwatchSkeleton';
import ColorPicker from './ColorPicker';
import { FormattedMessage } from 'react-intl';
import { getSwatches, createSwatch } from '@/utils/apiFunctions';
import { getRandomColor } from '@/utils/colorFunctions';
import ButtonIcon from '@/components/common/ButtonIcon';
import IconNew from '@/components/icons/IconNew';
import { useRouter } from 'next/router';
import IconRefresh from '@/components/icons/IconRefresh';
import SearchColor from '@/components/common/SearchColor';
import UserProfileBlock from '@/components/common/UserProfileBlock';

type Props = {
  subNavData: SubNavItem[];
  userMeta: UserMeta | null;
  initialSwatches: SwatchExt[];
  initialLikes: string[];
  mode: string;
  str: string;
  titleKey: string;
  introKey: string;
  userProfile?: UserProfile;
};
const SwatchFeed: React.FC<Props> = ({
  subNavData,
  initialSwatches,
  initialLikes,
  userMeta,
  mode,
  str,
  titleKey,
  introKey,
  userProfile,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [swatches, setSwatches] = useState<SwatchExt[]>(initialSwatches);
  const [userLikes, setUserLikes] = useState<string[]>(initialLikes);
  const [isNewSwatchOpen, setIsNewSwatchOpen] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const { formatMessage } = useIntl();
  const router = useRouter();
  const isLoggedIn = !!userMeta?.name;
  const isSearch = router.route === '/search/[rgb]';
  const newSwatchOpen = () => {
    setIsNewSwatchOpen(true);
  };
  const closeNewSwatch = () => {
    setIsNewSwatchOpen(false);
  };
  const pageTitle =
    mode === 'profile'
      ? formatMessage({ id: titleKey }, { name: `${userProfile?.name}` })
      : formatMessage({ id: titleKey });
  const pageIntro =
    mode === 'profile'
      ? formatMessage({ id: introKey }, { name: `${userProfile?.name}` })
      : formatMessage({ id: introKey });
  const pageMeta: PageMeta = {
    title: pageTitle,
    metadesc: pageIntro,
  };
  const createNewSwatch = async (color: Color) => {
    if (userMeta && userMeta.email) {
      const newSwatch = await createSwatch(userMeta.email, color.r, color.g, color.b);
      if (newSwatch) {
        setSwatches([newSwatch, ...swatches]);
      }
      closeNewSwatch();
      // if we are not on the home page, redirect to /
      if (router.pathname !== '/') {
        router.push('/');
      }
    }
  };
  const refreshSwatches = () => {
    setCanLoadMore(true);
    setSwatches([]);
    loadSwatches(0);
  };
  const loadMoreSwatches = () => {
    loadSwatches(swatches.length);
  };
  const loadSwatches = async (sk: number) => {
    if (userMeta?.id) {
      setIsLoading(true);
      const newSwatchData = await getSwatches(`${userMeta?.id}`, mode, str, sk);
      const { likes: newLikes, swatches: newSwatches } = newSwatchData;
      if (sk > 0) {
        setSwatches([...swatches, ...newSwatches]);
        setUserLikes([...userLikes, newLikes]);
      } else {
        setSwatches(newSwatches);
        setUserLikes(newLikes);
      }
      if (newSwatches.length === 0) {
        setCanLoadMore(false);
      }
      setIsLoading(false);
    }
  };
  // For Search pages, we need to refresh data on page load for multiple searches in a row
  let rgb = '';
  let searchColor = { r: 0, g: 0, b: 0 };
  if (isSearch) {
    rgb = `${router?.query?.rgb}`;
    const [tmpR, tmpG, tmpB] = rgb.split('-');
    searchColor = { r: parseInt(tmpR, 10), g: parseInt(tmpG, 10), b: parseInt(tmpB, 10) };
  }
  useEffect(() => {
    if (!!userMeta?.id) {
      refreshSwatches();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rgb]);
  const handleSearchColorChange = (color: Color) => {
    const path = `/search/${color.r}-${color.g}-${color.b}`;
    router.push(path);
  };
  const headerButtons = (
    <React.Fragment>
      <ButtonIcon onClick={refreshSwatches} label={formatMessage({ id: 'feed__refresh' })}>
        <div key="btn-refresh" className="hover-zoom h-3 w-3 py-0-5 px-0-5">
          <IconRefresh color="gray-6" colorDark="gray-2" />
        </div>
      </ButtonIcon>
      {isLoggedIn && (
        <ButtonIcon
          key="btn-new"
          onClick={newSwatchOpen}
          label={formatMessage({ id: 'feed__new_swatch' })}
          testID="feed-btn-new"
        >
          <div className="hover-zoom h-3 w-3 py-0-5 px-0-5">
            <IconNew color="gray-6" colorDark="gray-2" />
          </div>
        </ButtonIcon>
      )}
    </React.Fragment>
  );
  const warningNotLoggedIn = !isLoggedIn && mode === 'liked';
  return (
    <Layout pageMeta={pageMeta} subNavData={subNavData} headerButtons={headerButtons}>
      <div className="contained pt-1 pb-4" id="swatch-feed">
        <div className="flex items-center">
          {mode === 'profile' && !!userProfile ? (
            <UserProfileBlock userProfile={userProfile} mode={mode} />
          ) : (
            <div className="flex-grow">
              <h1 className="text-3">{pageTitle}</h1>
              <div className="mb-1 italic">
                <p>{pageIntro}</p>
              </div>
            </div>
          )}
          {isSearch && (
            <div className="pl-2">
              <SearchColor color={searchColor} onChange={handleSearchColorChange} />
            </div>
          )}
        </div>
        <div id="feed" className="pt-1 pb-2">
          <div id="swatchPosts">
            {swatches.map((s) => (
              <SwatchPost
                userID={userMeta?.id}
                swatch={s}
                key={s.id}
                setUserLikes={setUserLikes}
                setSwatches={setSwatches}
                isLiked={userLikes.includes(s.id)}
              />
            ))}
          </div>

          {isLoading &&
            [...Array(swatchesPerPage)].map((_e, idx) => (
              <SwatchSkeleton key={`skeleton-swatch-${idx}`} isLoggedIn={isLoggedIn} />
            ))}
          {!isLoading && swatches.length === 0 && mode === 'search' && (
            <h2>
              <FormattedMessage id="search__no_results" />
            </h2>
          )}
          {warningNotLoggedIn && (
            <h2>
              <FormattedMessage id="feed__liked__not_logged_in" />
            </h2>
          )}
          {canLoadMore && !warningNotLoggedIn && (
            <div className="text-center">
              <button onClick={loadMoreSwatches} className="btn" data-testid="feed-load-more">
                <FormattedMessage id="feed__load_more" />
              </button>
            </div>
          )}
        </div>
        <ColorPicker
          color={getRandomColor()}
          isOpen={isNewSwatchOpen}
          closeColorPicker={closeNewSwatch}
          onChange={createNewSwatch}
        />
      </div>
    </Layout>
  );
};

export default SwatchFeed;
