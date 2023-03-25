import { UserMeta } from '@prisma/client';

const mockUserData: UserMeta = {
  id: '12345abcdef',
  name: 'Test Name',
  username: 'test-name',
  email: 'test-email@domain.com',
  level: 1,
  score: 0,
  prefLang: 'en',
  lastAlert: null,
  lastMessage: null,
  numSwatches: 0,
  bio: 'ybr',
  avatarPattern: 0,
  avatarColor1r: 255,
  avatarColor1g: 255,
  avatarColor1b: 255,
  avatarColor2r: 255,
  avatarColor2g: 255,
  avatarColor2b: 255,
  avatarColor3r: 255,
  avatarColor3g: 255,
  avatarColor3b: 255,
  role: 'user',
  darkMode: 'auto',
  active: true,
  createdAt: new Date('2023-02-12T21:42:46.580+00:00'),
  modifiedAt: new Date('2023-02-12T21:42:46.580+00:00'),
};

export default mockUserData;
