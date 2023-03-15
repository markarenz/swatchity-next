import mockSwatch from './mockSwatch';
import mockUserData from './mockUserMeta';

const mockAlert = {
  id: '789pqrst',
  alertType: 'reply',
  userID: mockUserData.id,
  link: `/swatch/${mockSwatch.id}`,
  noun: 'Test Name',
  active: true,
  createdAt: new Date('2023-02-12T21:42:46.580+00:00'),
  modifiedAt: new Date('2023-02-12T21:42:46.580+00:00'),
};

export default mockAlert;
