import mockUserData from './mockUserMeta';
import { UserProfile } from '@/types';

const mockUserProfile: UserProfile = {
  id: mockUserData.id,
  name: mockUserData.name,
  username: mockUserData.username,
  active: true,
  numSwatches: mockUserData.numSwatches,
  score: mockUserData.score,
  level: mockUserData.level,
  bio: mockUserData.bio,
  avatarPattern: mockUserData.avatarPattern,
  avatarColor1r: mockUserData.avatarColor1r,
  avatarColor1g: mockUserData.avatarColor1g,
  avatarColor1b: mockUserData.avatarColor1b,
  avatarColor2r: mockUserData.avatarColor2r,
  avatarColor2g: mockUserData.avatarColor2g,
  avatarColor2b: mockUserData.avatarColor2b,
  avatarColor3r: mockUserData.avatarColor3r,
  avatarColor3g: mockUserData.avatarColor3g,
  avatarColor3b: mockUserData.avatarColor3b,
};

export default mockUserProfile;
