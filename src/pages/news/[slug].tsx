import React, { ReactNode } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Post } from '@prisma/client';
import Layout from '@/components/pageComponents/Layout';
import { useUserContext } from '@/context/UserContext';
import { serializeDate } from '@/utils/apiFunctions';
import { getPostBySlugDB } from '@/utils/dbFunctions';
import { PageMeta } from '@/types';
import ReactMarkdown from 'react-markdown';
import styles from '@/styles/modules/postDetailPage.module.scss';
import { dummyNewsPost } from '@/constants';

type Props = {
  post: Post;
};
const PostDetailPage: NextPage<Props> = ({ post }) => {
  const { userMeta } = useUserContext();
  // const subNavData = subNavLinksFeed;
  const pageMeta: PageMeta = {
    title: post.title,
    metadesc: post.metadesc,
  };
  const pubD = new Date(post.publishDate);
  const mdComponents = {
    a: ({ ...props }) => (
      <a {...props} target="blank" rel="noopener noreferrer">
        {props.children}
      </a>
    ),
  };
  return (
    <Layout pageMeta={pageMeta}>
      <div className="pb-6">
        <div>
          <div>
            <img
              src={post.imgFeatured}
              style={{
                backgroundColor: 'red',
                display: 'block',
                width: '100%',
                height: 'auto',
              }}
              alt={post.title}
            />
          </div>
        </div>
        <div className="contained py-2">
          <div className={styles.content}>
            <div className="pb-1">
              <h1>{post.title}</h1>
              <p>
                <FormattedDate
                  value={pubD}
                  year="numeric"
                  month="long"
                  day="numeric"
                  weekday="long"
                />
              </p>
            </div>
            <ReactMarkdown components={mdComponents}>{post.content}</ReactMarkdown>
          </div>

          <div className="flex justify-center py-2">
            <Link href="/news" className="btn hover-zoom">
              <FormattedMessage id="news__post_detail__more_news" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const postData = await getPostBySlugDB(`${slug}`);
  const post = postData?.post ? postData.post : dummyNewsPost;
  return {
    props: {
      post: {
        ...post,
        createdAt: serializeDate(post?.createdAt),
        modifiedAt: serializeDate(post?.modifiedAt),
      },
    },
  };
};

export default PostDetailPage;
