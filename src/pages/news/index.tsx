import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import type { NextPage, GetServerSideProps } from 'next';
import Layout from '@/components/pageComponents/Layout';
import { useUserContext } from '@/context/UserContext';
import { getPosts } from '@/utils/apiFunctions';
import { getPostSummariesDB } from '@/utils/dbFunctions';
import { PageMeta, PostSummary } from '@/types';
import { FormattedMessage } from 'react-intl';
import PostSkeleton from '@/components/common/PostSkeleton';
import ButtonIcon from '@/components/common/ButtonIcon';
import IconRefresh from '@/components/icons/IconRefresh';
import NewsListItem from '@/components/common/NewsListItem';
import { postsPerPage } from '@/constants';

type Props = {
  initialPosts: PostSummary[];
  initialCanLoadMore: boolean;
};

const NewsPage: NextPage<Props> = ({ initialPosts, initialCanLoadMore }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostSummary[]>(initialPosts);
  const [canLoadMore, setCanLoadMore] = useState(initialCanLoadMore);
  const { userMeta } = useUserContext();
  const { formatMessage } = useIntl();
  const pageMeta: PageMeta = {
    title: 'News',
    metadesc:
      'There is always something interesting happening here at Swatchity. Follow the news feed!',
  };

  const refreshPosts = () => {
    setCanLoadMore(true);
    setPosts([]);
    loadPosts(0);
  };
  const loadMorePosts = () => {
    loadPosts(posts.length);
  };
  const loadPosts = async (sk: number) => {
    if (userMeta?.id) {
      setIsLoading(true);
      const newPostsData = await getPosts(sk);
      const { posts: newPosts } = newPostsData;
      if (sk > 0 && !!newPosts) {
        setPosts([...posts, ...newPosts]);
      } else {
        setPosts(newPosts);
      }
      if (newPosts.length === 0) {
        setCanLoadMore(false);
      }
      setIsLoading(false);
    }
  };
  const headerButtons = (
    <ButtonIcon
      onClick={refreshPosts}
      label={formatMessage({ id: 'feed__refresh' })}
      testID="btn-refresh"
    >
      <div key="btn-refresh" className="hover-zoom h-3 w-3 py-0-5 px-0-5">
        <IconRefresh color="gray-6" colorDark="gray-2" />
      </div>
    </ButtonIcon>
  );

  return (
    <Layout pageMeta={pageMeta} headerButtons={headerButtons}>
      <div id="posts-page" className="contained pt-2 pb-6">
        <div>
          <h1>Swatchity News</h1>
        </div>
        <div id="posts-feed" className="py-1">
          {posts.map((post) => (
            <NewsListItem key={post.id} post={post} />
          ))}
        </div>

        {isLoading &&
          [...Array(postsPerPage)].map((_a, idx) => (
            <PostSkeleton key={`alertSkeleton-${idx}`} idx={idx} />
          ))}

        {canLoadMore && (
          <div className="w-full py-1">
            <button
              onClick={loadMorePosts}
              className="btn margin-center"
              data-testid="feed-load-more"
            >
              <FormattedMessage id="feed__load_more" />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialPosts = await getPostSummariesDB(true, 0);
  const initialCanLoadMore = initialPosts.length === postsPerPage;
  return {
    props: {
      initialPosts,
      initialCanLoadMore,
    },
  };
};

export default NewsPage;
