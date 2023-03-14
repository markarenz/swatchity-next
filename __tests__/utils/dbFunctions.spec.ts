import {
  getSwatchesDB,
  sortByLikeIdx,
  getUserProfileDB,
  getUserProfileFromUserMeta,
  getSwatchThreadDB,
  getAlertsDB,
} from '@/utils/dbFunctions';
import { Session } from 'next-auth';
import mockSwatch from '../__fixtures__/mockSwatch';
import mockUserData from '../__fixtures__/mockUserMeta';
import mockUserProfile from '../__fixtures__/mockUserProfile';
import { mockReplyExt } from '../__fixtures__/mockReply';
import { SwatchExt } from '@/types';
import mockAlert from '../__fixtures__/mockAlert';

const mockSwatchExt = {
  ...mockSwatch,
  user: mockUserData,
};
jest.mock('@/lib/prismadb', () => ({
  userMeta: {
    findUnique: jest.fn(() => ({
      ...mockUserData,
    })),
  },
  swatch: {
    findMany: jest.fn(() => [
      { ...mockSwatchExt },
      { ...mockSwatchExt, id: '10', colorScore: 0 },
      { ...mockSwatchExt, id: '11', colorScore: 10 },
      { ...mockSwatchExt, id: '12', colorScore: 12 },
    ]),
    findUnique: jest.fn(() => ({
      ...mockSwatchExt,
    })),
  },
  swatchLike: {
    findMany: jest.fn(() => ['abcd1234']),
  },
  reply: {
    findMany: jest.fn(() => [mockReplyExt]),
  },
  replyLike: {
    findMany: jest.fn(() => [mockReplyExt.id]),
  },
  alert: {
    findMany: jest.fn(() => [mockAlert]),
  },
}));

describe('getSwatchesDB', () => {
  const mockSession: Session = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: 'test', email: 'test-email@domain.com' },
  };
  it('returns swatches for home feed mode', async () => {
    const result = await getSwatchesDB(mockSession, 'feed', '', 0);
    expect(result.swatches?.length).toBe(4);
  });
  it('returns swatches for liked mode', async () => {
    const result = await getSwatchesDB(mockSession, 'liked', '', 0);
    expect(result.swatches?.length).toBe(4);
  });
  it('returns swatches for search mode', async () => {
    const result = await getSwatchesDB(mockSession, 'search', '15-10-100', 0);
    expect(result.swatches?.length).toBe(4);
  });
  it('returns swatches for mode mode', async () => {
    const result = await getSwatchesDB(mockSession, 'mood', '', 0);
    expect(result.swatches?.length).toBe(4);
  });
  it('returns swatches for featured mode', async () => {
    const result = await getSwatchesDB(mockSession, 'featured', '', 0);
    expect(result.swatches?.length).toBe(4);
  });

  it('returns swatches for profile mode', async () => {
    const result = await getSwatchesDB(mockSession, 'profile', mockUserData.id, 0);
    expect(result.swatches?.length).toBe(4);
  });
});

describe('sortByLikeIdx', () => {
  it('returns sorted array', () => {
    const swatchesRaw: SwatchExt[] = [
      { ...mockSwatchExt, id: '10', colorScore: 300 },
      { ...mockSwatchExt, id: '11', colorScore: 0 },
      { ...mockSwatchExt, id: '12', colorScore: 10 },
      { ...mockSwatchExt, id: '13', colorScore: 12 },
    ];
    const likes = ['13', '10', '11', '12'];
    const swatches = sortByLikeIdx(swatchesRaw, likes);
    const swatchLikeIdx = swatches.map((s) => s.id);
    expect(swatchLikeIdx[0]).toEqual('13');
  });
});

describe('getUserProfileDB', () => {
  it('returns the profile', async () => {
    const userProfile = await getUserProfileDB(mockUserProfile.id);
    expect(userProfile).toEqual(mockUserProfile);
  });
});

describe('getUserProfileFromUserMeta', () => {
  it('returns a profile for userMeta data', () => {
    const userProfile = getUserProfileFromUserMeta(mockUserData);
    expect(userProfile).toEqual(mockUserProfile);
  });
  it('returns a profile for null userMeta', () => {
    const userProfile = getUserProfileFromUserMeta(null);
    expect(userProfile).toEqual({
      name: '',
      username: '',
      bio: '',
      id: '',
      score: 0,
      level: 1,
      active: false,
      numSwatches: 0,
      avatarPattern: 0,
      avatarColor1r: 0,
      avatarColor1g: 0,
      avatarColor1b: 0,
      avatarColor2r: 0,
      avatarColor2g: 0,
      avatarColor2b: 0,
      avatarColor3r: 0,
      avatarColor3g: 0,
      avatarColor3b: 0,
    });
  });
});

describe('getSwatchThreadDB', () => {
  const mockSession: Session = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: 'test', email: 'test-email@domain.com' },
  };
  it('returns data for swatch thread', async () => {
    // session, id, skip
    const result = await getSwatchThreadDB(mockSession, mockSwatch.id, 0);
  });
});

describe('getAlertsDB', () => {
  const mockSession: Session = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: 'test', email: 'test-email@domain.com' },
  };
  it('returns alerts', async () => {
    const result = await getAlertsDB(mockSession, 0);
    expect(result.alerts[0].id).toEqual('789pqrst');
  });
});
