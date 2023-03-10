import { UserProfile } from '@/types';
import { useIntl } from 'react-intl';
import ButtonIcon from './ButtonIcon';
import IconMessages from '../icons/IconMessages';
import Avatar from '@/components/common/avatar/Avatar';
import UserProfileBioDisplay from './UserProfileBioDisplay';

type Props = {
  userProfile: UserProfile;
};
const UserProfileBlock: React.FC<Props> = ({ userProfile }) => {
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
  return (
    <div className="w-full">
      <div className="flex gap-1">
        <div className="h-10 w-10 aspect-1 ">
          <Avatar avatarData={avatarData} displayOnly={true} />
        </div>
        <div className="flex-grow">
          <div className="grid gap-1">
            <div className="grid-row grid-row-2">
              <div>
                <div className="pb-1">
                  <h1 className="text-3 flex items-center">
                    {userProfile?.name}
                    <div className="ml-1">
                      <ButtonIcon
                        onClick={() => {}}
                        label={formatMessage({ id: 'feed__profile_message' })}
                      >
                        <div className="hover-zoom h-3 w-3 py-0-5 px-0-5">
                          <IconMessages filled={true} color="gray-6" colorDark="gray-2" />
                        </div>
                      </ButtonIcon>
                    </div>
                  </h1>
                </div>
                <div className="pb-1">
                  <span className="label">Bio</span>
                  <UserProfileBioDisplay bio={userProfile.bio} />
                </div>
              </div>
              <div className="md-pt-6">
                <div className="grid grid-sm">
                  <div className="grid-row grid-row-2">
                    <div className="pb-1">
                      <span className="label">Username</span>
                      {userProfile?.username}
                    </div>
                    <div className="pb-1">
                      <span className="label">Swatches</span>
                      {userProfile.numSwatches}
                    </div>
                  </div>
                  <div className="grid-row grid-row-2">
                    <div className="pb-1">
                      <span className="label">Score</span>
                      {userProfile.score}
                    </div>
                    <div className="pb-1">
                      <span className="label">Level</span> {userProfile.level}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileBlock;
