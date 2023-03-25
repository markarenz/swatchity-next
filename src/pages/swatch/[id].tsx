import React, { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useUserContext } from '@/context/UserContext';
import Layout from '@/components/pageComponents/Layout';
import { useIntl, FormattedMessage } from 'react-intl';
import {
  serializeReplyDates,
  serializeSwatchDates,
  getReplies,
  createReply,
} from '@/utils/apiFunctions';
import { getSwatchThreadDB } from '@/utils/dbFunctions';
import { SwatchExt, ReplyExt, PageMeta, Color } from '@/types';
import ButtonIcon from '@/components/common/ButtonIcon';
import IconRefresh from '@/components/icons/IconRefresh';
import SwatchPost from '@/components/common/SwatchPost';
import ReplyPost from '@/components/common/ReplyPost';
import IconReply from '@/components/icons/IconReply';
import { getRandomColor } from '@/utils/colorFunctions';
import ColorPicker from '@/components/common/ColorPicker';
import { repliesPerPage } from '@/constants';
import ReplySkeleton from '@/components/common/ReplySkeleton';
type Props = {
  initialSwatches: SwatchExt[];
  initialSwatchLikes: string[];
  initialReplies: ReplyExt[];
  initialReplyLikes: string[];
};
const ThreadPage: NextPage<Props> = ({
  initialSwatches,
  initialSwatchLikes,
  initialReplies,
  initialReplyLikes,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(initialReplies.length > 0);
  const [swatches, setSwatches] = useState(initialSwatches);
  const [swatchLikes, setSwatchLikes] = useState(initialSwatchLikes);
  const [replies, setReplies] = useState(initialReplies);
  const [replyLikes, setReplyLikes] = useState(initialReplyLikes);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const { userMeta, checkUserMeta } = useUserContext();
  const { formatMessage } = useIntl();
  const swatch = swatches[0] || null;
  if (!swatch) {
    return null;
  }
  const pageMeta: PageMeta = {
    title: 'Swatch Detail',
    metadesc: 'Dive deeply into a single color. Post replies. Have fun!',
  };
  const isLoggedIn = !!userMeta?.name;
  const newReplyOpen = () => {
    setIsReplyOpen(true);
  };
  const newReplyClose = () => {
    setIsReplyOpen(false);
  };
  const createNewReply = async (color: Color) => {
    newReplyClose();
    setIsCreating(true);
    if (userMeta && userMeta.email) {
      const link = `/swatch/${swatch.id}`;
      const newReplyData = await createReply(
        `${userMeta.email}`,
        swatch?.id,
        color.r,
        color.g,
        color.b,
        link,
      );
      const { reply: newReply, numReplies } = newReplyData;
      if (newReply) {
        setReplies([newReply, ...replies]);
        setSwatches([
          {
            ...swatch,
            replies: numReplies,
          },
        ]);
      }
      setCanLoadMore(true);
      setIsCreating(false);
      checkUserMeta();
    }
  };

  const refreshReplies = () => {
    setCanLoadMore(true);
    setReplies([]);
    loadReplies(0);
  };
  const loadMoreReplies = () => {
    loadReplies(replies.length);
  };
  const loadReplies = async (sk: number) => {
    setIsLoading(true);
    const newRepliesData = await getReplies(`${userMeta?.id}`, swatch.id, sk);
    const { replyLikes: newReplyLikes, replies: newReplies } = newRepliesData;
    if (sk > 0) {
      setReplies([...replies, ...newReplies]);
      setReplyLikes([...replyLikes, ...newReplyLikes]);
    } else {
      setReplies(newReplies);
      setReplyLikes(newReplyLikes);
    }
    if (newReplies.length === 0) {
      setCanLoadMore(false);
    }
    setIsLoading(false);
  };

  const headerButtons = (
    <React.Fragment>
      <ButtonIcon
        onClick={refreshReplies}
        label={formatMessage({ id: 'feed__refresh' })}
        testID="btn-refresh"
      >
        <div key="btn-refresh" className="hover-zoom h-3 w-3 py-0-5 px-0-5">
          <IconRefresh color="gray-6" colorDark="gray-2" />
        </div>
      </ButtonIcon>
      {isLoggedIn && (
        <ButtonIcon
          key="btn-new"
          onClick={newReplyOpen}
          label={formatMessage({ id: 'feed__new_swatch' })}
          testID="feed-btn-reply"
        >
          <div className="hover-zoom h-3 w-3 py-0-5 px-0-5">
            <IconReply filled={true} color="gray-6" colorDark="gray-2" />
          </div>
        </ButtonIcon>
      )}
    </React.Fragment>
  );
  return (
    <Layout pageMeta={pageMeta} headerButtons={headerButtons}>
      <div id="reply-feed">
        <div className="contained pt-1 pb-4">
          <div id="swatch-featured">
            {swatches?.length > 0 && (
              <SwatchPost
                swatch={swatch}
                isLiked={swatchLikes.includes(swatch.id)}
                setSwatches={setSwatches}
                isFeatured={true}
                setUserLikes={setSwatchLikes}
                userID={userMeta?.id}
              />
            )}
          </div>
          <div id="replies-feed">
            {isCreating && <ReplySkeleton idx={0} />}

            {replies.map((r) => (
              <ReplyPost
                key={r.id}
                reply={r}
                userID={userMeta?.id}
                isLiked={replyLikes.includes(r.id)}
                setReplies={setReplies}
                setReplyLikes={setReplyLikes}
              />
            ))}

            {isLoading &&
              [...Array(repliesPerPage)].map((_e, idx) => (
                <ReplySkeleton key={`skeleton-swatch-${idx}`} idx={idx} />
              ))}
            {!isLoading && replies.length === 0 && (
              <h2 className="pl-5">
                <FormattedMessage id="swatch__thread__no_replies" />
              </h2>
            )}
            {canLoadMore && (
              <div className="w-full">
                <button
                  onClick={loadMoreReplies}
                  className="btn margin-center"
                  data-testid="feed-load-more"
                >
                  <FormattedMessage id="feed__load_more" />
                </button>
              </div>
            )}
          </div>
        </div>
        <ColorPicker
          color={getRandomColor()}
          isOpen={isReplyOpen}
          closeColorPicker={newReplyClose}
          onChange={createNewReply}
        />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { id } = context.query;
  const swatchThreadData = await getSwatchThreadDB(session, `${id}`, 0);
  const { swatch, swatchLikes, replies, replyLikes: initialReplyLikes } = swatchThreadData;
  const initialSwatches = !!swatch ? serializeSwatchDates([swatch]) : [];
  const initialReplies = serializeReplyDates(replies);
  return {
    props: {
      initialSwatches,
      initialSwatchLikes: swatchLikes,
      initialReplies,
      initialReplyLikes,
    },
  };
};

export default ThreadPage;
