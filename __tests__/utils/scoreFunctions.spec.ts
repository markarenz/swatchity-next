import { getUserLevel, checkUserScore } from '@/utils/scoreFunctions';
import mockUserData from '../__fixtures__/mockUserMeta';

describe('getUserLevel', () => {
  it('returns correct values of levels 1-14 for each score', () => {
    const scores = [10, 30, 70, 125, 200, 300, 400, 600, 800, 1200, 1600, 2500, 3500, 6000];
    const results = scores.map((s) => getUserLevel(s));
    const expectedResults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    expect(results).toEqual(expectedResults);
  });
});

describe('checkUserScore', () => {
  const mockPrisma = {
    swatch: {
      count: jest.fn(() => 1),
    },
    swatchLike: {
      count: jest.fn(() => 1),
    },
    userMeta: {
      findUnique: jest.fn(() => ({
        ...mockUserData,
      })),
      update: jest.fn(),
    },
    replyLike: {
      count: jest.fn(() => 1),
    },
  };
  it('returns user score and updates the value - level same', async () => {
    //@ts-ignore
    const resultScore = await checkUserScore(mockUserData.id, mockPrisma);
    expect(resultScore).toEqual(9);
  });
  it('returns user score and updates the value - level change', async () => {
    mockPrisma.swatchLike = {
      count: jest.fn(() => 30),
    };
    //@ts-ignore
    const resultScore = await checkUserScore(mockUserData.id, mockPrisma);
    expect(resultScore).toEqual(154);
  });

  it('returns user score and updates the value - update last alert', async () => {
    mockPrisma.swatchLike = {
      count: jest.fn(() => 30),
    };
    //@ts-ignore
    const resultScore = await checkUserScore(mockUserData.id, mockPrisma, true);
    expect(resultScore).toEqual(154);
  });
});
