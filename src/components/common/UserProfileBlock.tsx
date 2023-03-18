import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import { UserProfile, Color } from '@/types';
import { useIntl, FormattedMessage } from 'react-intl';
import ButtonIcon from './ButtonIcon';
import ColorPicker from './ColorPicker';
import IconMessages from '../icons/IconMessages';
import Avatar from '@/components/common/avatar/Avatar';
import UserProfileBioDisplay from './UserProfileBioDisplay';
import { getRandomColor } from '@/utils/colorFunctions';
import { createMessage } from '@/utils/apiFunctions';
import { Message } from '@prisma/client';

type Props = {
  userProfile: UserProfile;
  mode: string;
  setMessages?: Function;
};
const UserProfileBlock: React.FC<Props> = ({ userProfile, mode, setMessages }) => {
  const [rndColor] = useState(getRandomColor());
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { userMeta } = useUserContext();
  const isLoggedIn = !!userMeta?.name;
  const router = useRouter();
  const handleClosePicker = () => {
    setIsPickerOpen(false);
  };
  const handleMessageClick = () => {
    setIsPickerOpen(true);
  };
  const handlePickerChange = async (color: Color) => {
    setIsPickerOpen(false);
    if (!!userMeta?.email) {
      const result = await createMessage(
        userMeta?.email,
        userProfile.id,
        color.r,
        color.g,
        color.b,
      );
      if (mode === 'profile') {
        router.push(`/messages/${userProfile?.id}`);
      } else {
        const newMessage = result?.message;
        if (!!setMessages) {
          setMessages((prevMessages: Message[]) => [newMessage, ...prevMessages]);
        }
      }
    }
  };

  const { formatMessage } = useIntl();
  const avatarData = {
    avatarPattern: userProfile.avatarPattern,
    avatarColor1r: userProfile.avatarColor1r,
    avatarColor1g: userProfile.avatarColor1g,
    avatarColor1b: userProfile.avatarColor1b,
    avatarColor2r: userProfile.avatarColor2r,
    avatarColor2g: userProfile.avatarColor2g,
    avatarColor2b: userProfile.avatarColor2b,
    avatarColor3r: userProfile.avatarColor3r,
    avatarColor3g: userProfile.avatarColor3g,
    avatarColor3b: userProfile.avatarColor3b,
  };
  const showMessageBtn = isLoggedIn && userProfile?.active && userProfile.id !== userMeta.id;
  const showInactive = isLoggedIn && !userProfile?.active;
  return (
    <div className="w-full flex flex-col gap-1 pb-2">
      <div className="flex justify-between">
        <h1 className="text-3 word-break leading-1 inline">
          <FormattedMessage
            id={
              mode === 'profile'
                ? 'feed__profile_block__title_profile'
                : 'feed__profile_block__title_messages'
            }
          />{' '}
          {userProfile?.name}
        </h1>
        <div>
          {showMessageBtn && (
            <ButtonIcon
              onClick={() => handleMessageClick()}
              label={formatMessage({ id: 'feed__profile_block__message' })}
              testID="profile-block-message"
            >
              <div className="hover-zoom h-3 w-3 py-0-5 px-0-5">
                <IconMessages filled={true} color="gray-6" colorDark="gray-2" />
              </div>
            </ButtonIcon>
          )}

          {showInactive && (
            <div className="uppercase py-1 text-right">
              <FormattedMessage id="feed__profile_block__inactive" />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-1">
        <div className="flex-grow">
          <div className="flex flex-col gap-1">
            <div>
              <span className="label">Bio</span>
              {userProfile.bio ? (
                <UserProfileBioDisplay bio={userProfile.bio} />
              ) : (
                <div>
                  <FormattedMessage id="feed__profile_block__bio__no_content" />
                </div>
              )}
            </div>
            <div className="grid">
              <div className="grid-row grid-row-4">
                <div className="pb-1">
                  <span className="label">
                    {formatMessage({ id: 'feed__profile_block__username' })}
                  </span>
                  {userProfile?.username}
                </div>
                <div className="pb-1">
                  <span className="label">
                    {formatMessage({ id: 'feed__profile_block__swatches' })}
                  </span>
                  {userProfile.numSwatches}
                </div>
                <div className="pb-1">
                  <span className="label">
                    {formatMessage({ id: 'feed__profile_block__score' })}
                  </span>
                  {userProfile.score}
                </div>
                <div className="pb-1">
                  <span className="label">
                    {formatMessage({ id: 'feed__profile_block__level' })}
                  </span>{' '}
                  {userProfile.level}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-10 w-10 aspect-1 sm-wh-8">
            {mode === 'messages' ? (
              <Link
                href={`/profile/${userProfile.id}`}
                className="round"
                aria-label={userProfile.name}
              >
                <Avatar avatarData={avatarData} displayOnly={false} />
              </Link>
            ) : (
              <Avatar avatarData={avatarData} displayOnly={true} />
            )}
          </div>
        </div>
      </div>
      <ColorPicker
        isOpen={isPickerOpen}
        color={rndColor}
        closeColorPicker={handleClosePicker}
        onChange={handlePickerChange}
      />
    </div>
  );
};

export default UserProfileBlock;
