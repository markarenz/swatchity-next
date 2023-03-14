import { Reply } from '@prisma/client';
import { ReplyExt } from '@/types';
import mockSwatch from './mockSwatch';
import mockUserData from './mockUserMeta';

export const mockReply: Reply = {
  id: 'rst2457',
  swatchID: mockSwatch.id,
  userID: mockUserData.id,
  colorR: 125,
  colorG: 125,
  colorB: 125,
  likes: 1,
  active: true,
  createdAt: new Date('2023-02-12T21:42:46.580+00:00'),
  modifiedAt: new Date('2023-02-12T21:42:46.580+00:00'),
};

export const mockReplyExt: ReplyExt = {
  ...mockReply,
  user: {
    ...mockUserData,
  },
};
