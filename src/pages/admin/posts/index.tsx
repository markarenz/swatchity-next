import React from 'react';
import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';
import { subNavLinksAdmin } from '@/constants';
import { PageMeta } from '@/types';
import Layout from '@/components/pageComponents/Layout';
import AdminProtected from '@/components/common/AdminProtected';
import { createPost } from '@/utils/apiFunctions';
import { useRouter } from 'next/router';
import { getPostSummariesDB } from '@/utils/dbFunctions';
import { Post } from '@prisma/client';
import IconLink from '@/components/icons/IconLink';
import TimeSince from '@/components/common/TimeSince';

type Props = {
  posts: Post[];
};
const AdminPosts: NextPage<Props> = ({ posts }) => {
  const router = useRouter();
  const pageMeta: PageMeta = {
    title: 'CMS: Posts',
    metadesc:
      'Posts! Posts! We got posts! Select a post from the list to edit it or click New to create a new one.',
  };
  const hanleCreatePost = async () => {
    const result = await createPost();
    if (result?.post) {
      router.push(`/admin/posts/${result?.post?.id}`);
    }
  };
  return (
    <Layout pageMeta={pageMeta} subNavData={subNavLinksAdmin}>
      <AdminProtected>
        <div className="contained py-2">
          <div className="flex gap-1 items-center">
            <div className="flex-grow">
              <h1>{pageMeta.title}</h1>
              <div>{pageMeta.metadesc}</div>
            </div>
            <div className="">
              <button className="btn hover-zoom" onClick={hanleCreatePost}>
                New
              </button>
            </div>
          </div>
          <div id="posts-feed" className="pt-2 pb-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`px-1 py-1 mb-1 round-1 ${
                  post.active ? 'bg-gray-3 dark-bg-gray-5' : 'bg-gray-4 dark-bg-gray-7'
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-grow text-gray-1 dark-text-gray-2">
                    <span className="mr-0-5">{post.title}</span>
                    <span className="mr-0-5">&#183;</span>
                    <span className="mr-0-5">
                      <TimeSince inputDate={post.modifiedAt} />
                    </span>
                    <span className="mr-0-5">&#183;</span>
                    {post.publishDate}
                  </div>
                  <div>
                    <Link href={`/admin/posts/${post.id}`} aria-label="view" prefetch={false}>
                      <div className="hover-zoom h-4 w-4 py-1 px-1 round">
                        <IconLink color="gray-1" colorDark="gray-2" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminProtected>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await getPostSummariesDB(false, 0, 999);
  return {
    props: {
      posts,
    },
  };
};

export default AdminPosts;
