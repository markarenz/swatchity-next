import React, { useState } from 'react';
import { Message } from '@prisma/client';
import type { NextPage, GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useUserContext } from '@/context/UserContext';
import Layout from '@/components/pageComponents/Layout';
import { useIntl, FormattedMessage } from 'react-intl';
import UserProfileBlock from '@/components/common/UserProfileBlock';
import MessagePost from '@/components/common/MessagePost';
import { useRouter } from 'next/router';
import MessageSkeleton from '@/components/common/MessageSkeleton';

import {
  serializeMessageDates,
  serializeUserMeta,
  getReplies,
  createReply,
  getMessages,
} from '@/utils/apiFunctions';
import { getMessagesDB } from '@/utils/dbFunctions';
import { PageMeta, UserProfile } from '@/types';
import ButtonIcon from '@/components/common/ButtonIcon';
import IconRefresh from '@/components/icons/IconRefresh';
import { repliesPerPage } from '@/constants';
import ReplySkeleton from '@/components/common/ReplySkeleton';

type Props = {
  initialMessages: Message[];
  otherUser: UserProfile;
};
const MessageThreadPage: NextPage<Props> = ({ initialMessages, otherUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(initialMessages.length > 0);
  const [messages, setMessages] = useState(initialMessages);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const { userMeta, checkUserMeta } = useUserContext();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const pageMeta: PageMeta = {
    title: 'Message Thread',
    metadesc: 'Have an in-depth conversation the Swatchity way!',
  };
  const isLoggedIn = !!userMeta?.name;
  const refreshMessages = () => {
    setCanLoadMore(true);
    setMessages([]);
    loadMessages(0);
  };
  const loadMoreMessages = () => {
    loadMessages(messages.length);
  };
  const loadMessages = async (sk: number) => {
    setIsLoading(true);
    const newMessagesData = await getMessages(`${otherUser?.id}`, sk);
    const { messages: newMessages } = newMessagesData;
    if (sk > 0) {
      setMessages([...messages, ...newMessages]);
    } else {
      setMessages(newMessages);
    }
    if (newMessages.length === 0) {
      setCanLoadMore(false);
    }
    setIsLoading(false);
  };

  const headerButtons = (
    <React.Fragment>
      <ButtonIcon
        onClick={refreshMessages}
        label={formatMessage({ id: 'feed__refresh' })}
        testID="btn-refresh"
      >
        <div key="btn-refresh" className="hover-zoom h-3 w-3 py-0-5 px-0-5">
          <IconRefresh color="gray-6" colorDark="gray-2" />
        </div>
      </ButtonIcon>
    </React.Fragment>
  );
  const selfName = `${userMeta?.name}`;
  const otherName = `${otherUser?.name}`;
  if (!isLoggedIn) {
    return (
      <Layout pageMeta={pageMeta} headerButtons={headerButtons}>
        <div id="message-thread">
          <div className="contained pt-1 pb-4">
            <h2>
              <FormattedMessage id="messages__not_logged_in" />
            </h2>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout pageMeta={pageMeta} headerButtons={headerButtons}>
      <div id="message-thread">
        <div className="contained pt-1 pb-4">
          <UserProfileBlock userProfile={otherUser} mode="messages" setMessages={setMessages} />
          <div id="messages-feed">
            {isCreating && <ReplySkeleton idx={0} />}
            {messages.map((m) => (
              <MessagePost
                key={m.id}
                message={m}
                isSelf={m.fromUserID === userMeta?.id}
                name={m.fromUserID === userMeta?.id ? selfName : otherName}
              />
            ))}

            {isLoading &&
              [...Array(repliesPerPage)].map((_e, idx) => (
                <MessageSkeleton key={`skeleton-message-${idx}`} isSelf={idx % 2 === 0} idx={idx} />
              ))}
            {!isLoading && messages.length === 0 && (
              <h2 className="pl-5">
                <FormattedMessage id="messages__thread__no_messages" />
              </h2>
            )}
            {canLoadMore && (
              <div className="w-full py-1">
                <button
                  onClick={loadMoreMessages}
                  className="btn margin-center"
                  data-testid="feed-load-more"
                >
                  <FormattedMessage id="feed__load_more" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { id } = context.query;
  const messagesData = await getMessagesDB(session, `${id}`, 0);
  const { messages, otherUserProfile } = messagesData;
  const initialMessages = serializeMessageDates(messages);
  return {
    props: {
      initialMessages,
      otherUser: otherUserProfile,
    },
  };
};

export default MessageThreadPage;
