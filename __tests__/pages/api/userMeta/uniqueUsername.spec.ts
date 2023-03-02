import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient, UserMeta } from '@prisma/client';
import prisma from '@/lib/prismadb';
import handler from '../../../../src/pages/api/userMeta/uniqueUsername';
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

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

describe('/api/userMeta/uniqueUsername API endpoint', () => {
  it('returns true when username is unique', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({ username: 'test-name-unique' }),
    });
    prismaMock.userMeta.findUnique.mockResolvedValueOnce(mockUserMeta); // current user
    prismaMock.userMeta.findUnique.mockResolvedValueOnce(null); // username search
    req.body = JSON.stringify({ username: 'test-name-unique' });
    await handler(req, res);
    const result = await res._getJSONData();
    expect(result?.unique).toBe(true);
  });

  it('returns true when username is same user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({ username: 'test-name' }),
    });
    prismaMock.userMeta.findUnique.mockResolvedValueOnce(mockUserMeta); // current user
    prismaMock.userMeta.findUnique.mockResolvedValueOnce(mockUserMeta); // username search
    await handler(req, res);
    const result = await res._getJSONData();
    expect(result?.unique).toBe(true);
  });

  it('returns false when username is not unique', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({ username: 'test-name-unique' }),
    });
    prismaMock.userMeta.findUnique.mockResolvedValueOnce(mockUserMeta); // current user
    prismaMock.userMeta.findUnique.mockResolvedValueOnce({
      ...mockUserMeta,
      email: 'different-email@domain.com',
    }); // username search
    await handler(req, res);
    const result = await res._getJSONData();
    expect(result?.unique).toBe(false);
  });

  it('returns an error when invalid data is provided', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({ username: null }),
    });
    // No need for prisma mocks since it won't get that far
    await handler(req, res);
    expect(res.statusCode).toEqual(500);
  });
});
