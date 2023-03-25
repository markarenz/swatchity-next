import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { UserMeta, Post, Swatch } from '@prisma/client';
/*
 * PATH: api/getSidebarContent
 * PURPOSE: Get a list of posts, swatches, and users to display in the sidebar
 * PAYLOAD: (none)
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts: Post[] = await prisma.post.findMany({
      take: 5,
      skip: 0,
      where: {
        active: true,
      },
      orderBy: {
        publishDate: 'desc',
      },
    });
    const swatches: Swatch[] = await prisma.swatch.findMany({
      take: 5,
      skip: 0,
      where: {
        active: true,
      },
      orderBy: [{ likes: 'desc' }, { createdAt: 'desc' }],
    });
    const userMeta: UserMeta[] = await prisma.userMeta.findMany({
      take: 5,
      skip: 0,
      where: {
        active: true,
      },
      orderBy: [{ score: 'desc' }, { createdAt: 'desc' }],
    });
    return res
      .status(200)
      .json({ posts: posts || [], swatches: swatches || [], userMeta: userMeta || [] });
  } catch (err) {
    return res.status(500).json({ posts: [], swatches: [], userMeta: [] });
  }
}

export default handler;
