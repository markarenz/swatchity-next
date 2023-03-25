import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { UserMeta } from '@prisma/client';
import { getPostSummariesDB, getSwatchThreadDB } from '@/utils/dbFunctions';

/*
 * PATH: api/post/readPosts
 * PURPOSE: Read summaries for posts for display on a news page
 * PAYLOAD: skip
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    const data = JSON.parse(req.body);
    const { skip } = data;
    const isValid = skip >= 0;
    if (!isValid) {
      throw 'invalid data';
    }
    const posts = await getPostSummariesDB(true, skip);
    return res.status(200).json({ posts });
  } catch (err) {
    console.error('>>>>', err);
    return res.status(500).json({ posts: null });
  }
}

export default handler;
