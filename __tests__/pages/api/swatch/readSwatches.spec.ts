import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient, UserMeta } from '@prisma/client';
import prisma from '@/lib/prismadb';
import handler from '../../../../src/pages/api/swatch/readSwatches';
import mockUserData from '../../../__fixtures__/mockUserMeta';
import mockSwatch from '../../../__fixtures__/mockSwatch';

const mockSwatchExt = {
  ...mockSwatch,
  user: {
    ...mockUserData,
  },
};

jest.mock('@/utils/dbFunctions', () => ({
  getSwatchesDB: jest.fn(() => ({
    swatches: [mockSwatchExt],
    likes: [mockSwatch.id],
  })),
}));
jest.mock('@/utils/colorFunctions', () => ({
  getColorScore: jest.fn(() => {}),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn().mockReturnValue({
    session: {
      email: 'email@test.com',
    },
  }),
}));

jest.mock('next-auth', () => ({
  __esModule: true,
  default: () =>
    Promise.resolve({
      NextAuth: jest.fn(),
    }),
}));

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(() => ({
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: 'test', email: 'test@domain.com' },
  })),
}));

jest.mock('@/lib/prismadb', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

describe('/api/swatch/readSwatches API endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      'Content-Type': 'application/json',
    };
    return { req, res };
  }

  it('returns 200 when valid data is provided', async () => {
    const { req, res } = mockRequestResponse();
    prismaMock.userMeta.findUnique.mockResolvedValue(mockUserData);
    prismaMock.swatch.create.mockResolvedValue(mockSwatch);
    req.body = JSON.stringify({ userID: mockUserData.id, mode: 'feed', str: '', skip: 0 });
    await handler(req, res);
    expect(res.statusCode).toBe(200);
  });
  it('returns 500 when invalid data is provided', async () => {
    const { req, res } = mockRequestResponse();
    req.body = JSON.stringify({ userID: mockUserData.id, mode: '', str: '', skip: 0 });
    await handler(req, res);
    expect(res.statusCode).toBe(500);
  });
});
