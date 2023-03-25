import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient, UserMeta } from '@prisma/client';
import prisma from '@/lib/prismadb';
import handler from '../../../src/pages/api/getSidebarContent';
import mockUserData from '../../__fixtures__/mockUserMeta';
import mockSwatch from '../../__fixtures__/mockSwatch';
import mockNewsPost from '../../__fixtures__/mockNewsPost';

jest.mock('@/lib/prismadb', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

describe('/api/getSidebarContent API endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      'Content-Type': 'application/json',
    };
    return { req, res };
  }

  it('returns 200 when valid data is provided', async () => {
    const { req, res } = mockRequestResponse();
    prismaMock.post.findMany.mockResolvedValue([mockNewsPost]);
    prismaMock.swatch.findMany.mockResolvedValue([mockSwatch]);
    prismaMock.userMeta.findMany.mockResolvedValue([mockUserData]);
    req.body = JSON.stringify({});
    await handler(req, res);
    expect(res.statusCode).toBe(200);
  });
  it('returns 200 when valid data is provided - no results', async () => {
    const { req, res } = mockRequestResponse();
    // @ts-ignore
    prismaMock.post.findMany.mockResolvedValue(null);
    // @ts-ignore
    prismaMock.swatch.findMany.mockResolvedValue(null);
    // @ts-ignore
    prismaMock.userMeta.findMany.mockResolvedValue(null);
    req.body = JSON.stringify({});
    await handler(req, res);
    expect(res.statusCode).toBe(200);
  });
  it('returns 500 when invalid data is provided', async () => {
    const { req, res } = mockRequestResponse();
    prismaMock.post.findMany.mockResolvedValue([mockNewsPost]);
    prismaMock.swatch.findMany.mockResolvedValue([mockSwatch]);
    prismaMock.userMeta.findMany.mockRejectedValue(null);
    req.body = JSON.stringify({});
    await handler(req, res);
    expect(res.statusCode).toBe(500);
  });
});
