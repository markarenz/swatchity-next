import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useUserContext } from '@/context/UserContext';
import { PageMeta } from '@/types';
import { serializeMessageThreads } from '@/utils/apiFunctions';
import { getMessageThreads, getSwatchesDB } from '@/utils/dbFunctions';
import Layout from '@/components/pageComponents/Layout';
import { MessageThread } from '@prisma/client';
import { FormattedMessage } from 'react-intl';
import IconLink from '@/components/icons/IconLink';
import MessageThreadListItem from '@/components/common/MessageThreadListItem';

type Props = {
  threads: MessageThread[];
};
const MessageThreads: NextPage<Props> = ({ threads }) => {
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const [pageInit, setPageInit] = useState(false);
  const { userMeta } = useUserContext();
  const isLoggedIn = !!userMeta?.name;
  const pageMeta: PageMeta = {
    title: 'Messages',
    metadesc:
      'Connect with your fellow Swatchers! To start a message thread, just click on Message in the profile of a friend.',
  };

  useEffect(() => {
    if (!pageInit) {
      setPageInit(true);
      if (typeof window !== 'undefined' && lastVisit === null) {
        const newLastVisit = localStorage.getItem('lastMessagesView') || '';
        setLastVisit(newLastVisit);
      }
    }
    return () => {
      if (pageInit) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('lastMessagesView', new Date().toISOString());
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInit]);

  return (
    <Layout pageMeta={pageMeta}>
      <div className="contained pt-1 pb-4" id="message-threads">
        <h1 className="text-3">{pageMeta.title}</h1>
        <div className="mb-1 italic">
          <p>{pageMeta.metadesc}</p>
        </div>
        {!isLoggedIn && (
          <h2>
            <FormattedMessage id="messages__not_logged_in" />
          </h2>
        )}
        {isLoggedIn && (
          <div id="threads-feed">
            {threads.map((thread) => (
              <MessageThreadListItem
                key={thread.id}
                thread={thread}
                userID={userMeta?.id}
                lastVisitStr={`${lastVisit}`}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const threadsData = await getMessageThreads(session);
  const { threads: threadsRaw } = threadsData;
  const threads = serializeMessageThreads(threadsRaw);
  return {
    props: {
      threads,
    },
  };
};

export default MessageThreads;
