import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient, UserMeta } from '@prisma/client';
import prisma from '@/lib/prismadb';
import handler from '../../../../src/pages/api/userMeta/updateUserMeta';
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
    user: { name: 'test', email: 'test-email@domain.com' },
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

const mockFormData = {
  name: 'New name',
  username: 'unique-username',
  email: mockUserMeta.email,
  prefLang: 'auto',
  bio: 'rbyby',
  avatarPattern: 10,
  darkMode: true,
  usernameUnique: true,
  color1: {
    r: 50,
    g: 50,
    b: 50,
  },
  color2: {
    r: 100,
    g: 100,
    b: 100,
  },
  color3: {
    r: 150,
    g: 150,
    b: 150,
  },
};
describe('/api/userMeta/updateUserMeta API endpoint', () => {
  it('updates userMeta for session-self user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({ formData: mockFormData, email: mockUserMeta.email }),
    });
    prismaMock.userMeta.update.mockResolvedValueOnce({ ...mockUserMeta, id: 'abc1234' }); // update user, return mock
    await handler(req, res);
    const result = await res._getJSONData();
    expect(result?.success).toBe(true);
  });

  it('updates userMeta for session-self user - error', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({ formData: mockFormData, email: mockUserMeta.email }),
    });
    //@ts-ignore
    prismaMock.userMeta.update.mockResolvedValueOnce({ ...mockUserMeta, id: null }); // update user, return mock
    await handler(req, res);
    const result = await res._getJSONData();
    expect(result?.success).toBe(false);
  });

  it('fails when invalid data is provided', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({ formData: mockFormData, email: null }),
    });
    //@ts-ignore
    prismaMock.userMeta.update.mockResolvedValueOnce({ ...mockUserMeta, id: null }); // update user, return mock
    await handler(req, res);
    const result = await res._getJSONData();
    expect(result?.success).toBe(false);
  });
});
