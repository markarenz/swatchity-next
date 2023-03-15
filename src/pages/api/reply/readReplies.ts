import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { UserMeta } from '@prisma/client';
import { getSwatchThreadDB } from '@/utils/dbFunctions';

/*
 * PATH: api/reply/readReplies
 * PURPOSE: Read a list of replies for display on a thread page
 * NOTES: The mode and str arguments are used to reuse the function for a variety of purposes
 * PAYLOAD: userID, swatchID, skip
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    const data = JSON.parse(req.body);
    const { userID, swatchID, skip } = data;
    let isLoggedIn = false;
    if (!!userID && !!session?.user) {
      const userMeta: UserMeta | null = await prisma.userMeta.findUnique({
        where: {
          id: userID,
        },
      });
      const email = userMeta?.email;
      isLoggedIn = !!email && email === session?.user?.email;
    }
    const isValid = !!userID && !!swatchID && skip >= 0;
    if (!isValid) {
      throw 'invalid data';
    }
    const repliesData = await getSwatchThreadDB(session, swatchID, skip);
    const { replies, replyLikes } = repliesData;
    return res.status(200).json({ replies, replyLikes });
  } catch (err) {
    return res.status(500).json({ replies: null, replyLikes: [] });
  }
}

export default handler;
