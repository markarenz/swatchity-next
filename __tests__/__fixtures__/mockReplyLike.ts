import { mockReply } from './mockReply';
import mockUserData from './mockUserMeta';

export const mockReplyLike = {
  id: '765eidkj',
  replyID: mockReply.id,
  userID: mockUserData.id,
  authorID: mockUserData.id,
  createdAt: new Date('2023-02-12T21:42:46.580+00:00'),
  modifiedAt: new Date('2023-02-12T21:42:46.580+00:00'),
};
