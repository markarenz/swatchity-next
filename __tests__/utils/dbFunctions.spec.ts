import { getSwatchesDB, sortByLikeIdx } from '@/utils/dbFunctions';
import { Session } from 'next-auth';
import mockSwatch from '../__fixtures__/mockSwatch';
import mockUserData from '../__fixtures__/mockUserMeta';
import { SwatchExt } from '@/types';

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
  },
  swatchLike: {
    findMany: jest.fn(() => ['abcd1234']),
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
});

describe('sortByLikeIdx', () => {
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
