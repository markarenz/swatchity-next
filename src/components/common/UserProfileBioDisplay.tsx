import { getColorEmoji } from '@/utils/profileFunctions';

type Props = {
  bio: string;
};

const UserProfileBioDisplay: React.FC<Props> = ({ bio }) => {
  const bits = bio.split('');
  return (
    <div>
      {bits.map((b, idx) => (
        <span className="text-2 mr-1" key={`bio-${idx}`}>
          {getColorEmoji(b)}
        </span>
      ))}
    </div>
  );
};

export default UserProfileBioDisplay;
