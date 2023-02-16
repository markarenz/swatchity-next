import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import handler from '../../../../src/pages/api/userMeta/readUserMeta';

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

describe('/api/userMeta/readUserMeta API endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      'Content-Type': 'application/json',
    };
    return { req, res };
  }

  it('returns userMeta for logged-in user', async () => {
    const { req, res } = mockRequestResponse();
    req.body = JSON.stringify({ email: 'test@domain.com' });
    const result = await handler(req, res);
    expect(res.statusCode).toBe(200);
  });

  it('returns null userMeta when request is from another user', async () => {
    const { req, res } = mockRequestResponse();
    req.body = JSON.stringify({ email: 'another.email@domain.com' });
    const result = await handler(req, res);
    expect(res.statusCode).toBe(500);
  });

  // it('returns 200 when invalid data is provided', async () => {
  //   const { req, res } = mockRequestResponse();
  //   req.body = JSON.stringify({ email: 'test', username: 'no' });
  //   const result = await handler(req, res);
  //   expect(res.statusCode).toBe(500);
  // });
});
