import { SwatchExt } from '@/types';
import mockUserData from './mockUserMeta';

export const mockSwatch: SwatchExt = {
  id: 'abcd1234',
  userID: '12345abcdef',
  user: {
    ...mockUserData,
  },
  colorR: 150,
  colorG: 120,
  colorB: 84,
  colorScore: 100,
  likes: 1,
  replies: 0,
  active: true,
  createdAt: new Date('2023-03-04T22:22:51.201+00:00'),
  modifiedAt: new Date('2023-03-04T22:22:51.201+00:00'),
};

export default mockSwatch;
