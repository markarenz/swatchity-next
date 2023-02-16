import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient, UserMeta } from '@prisma/client';
import prisma from '@/lib/prismadb';
import handler from '../../../../src/pages/api/userMeta/createUserMeta';
import mockUserMeta from '../../../__fixtures__/mockUserMeta';

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

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe('/api/userMeta/createUserMeta API endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      'Content-Type': 'application/json',
    };
    return { req, res };
  }

  it('returns 200 when valid data is provided', async () => {
    const { req, res } = mockRequestResponse();
    req.body = JSON.stringify({ email: 'email@domain.com', name: 'username', locale: 'en-US' });
    await handler(req, res);
    expect(res.statusCode).toBe(200);
  });
  it('returns 500 when invalid data is provided', async () => {
    const { req, res } = mockRequestResponse();
    req.body = JSON.stringify({ email: 'test', name: 'no', locale: 'en-US' });
    await handler(req, res);
    expect(res.statusCode).toBe(500);
  });

  it('uses a randomized username when the username already exists', async () => {
    const { req, res } = mockRequestResponse();
    // TODO: refactor this test to spy on cleanSlugWithRandomNums()
    // Force our mock create function to return the data sent to it
    // @ts-ignore
    prismaMock.userMeta.create = async (userMeta: UserMeta | null) => ({
      ...userMeta,
    });
    // For the username uniqueness check, return the mock data with the same username to force usage of the random numbers
    prismaMock.userMeta.findUnique.mockResolvedValue(mockUserMeta);
    req.body = JSON.stringify({ email: 'email@domain.com', name: 'Test Name', locale: 'en-US' });
    const result = await handler(req, res);
    // @ts-ignore
    const data = res._getJSONData();
    expect(data.userMeta.data.username.length).toEqual(13);
  });
});
