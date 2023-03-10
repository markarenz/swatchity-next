import { UserProfile } from '@/types';
import Avatar from '@/components/common/avatar/Avatar';
import UserProfileBioDisplay from './UserProfileBioDisplay';

type Props = {
  userProfile: UserProfile;
};
const UserProfileBlock: React.FC<Props> = ({ userProfile }) => {
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
        <div className="h-10 w-10">
          <Avatar avatarData={avatarData} displayOnly={true} />
        </div>
        <div className="flex-grow">
          <div className="pb-1">
            <h1 className="text-3">{userProfile?.name}</h1>
          </div>
          <div className="pb-1">
            <span className="label">Bio</span>
            <UserProfileBioDisplay bio={userProfile.bio} />
          </div>
          <div className="grid">
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
  );
};

export default UserProfileBlock;
