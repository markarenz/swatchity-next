import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { UserMeta } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { checkUserScore } from '@/utils/scoreFunctions';

/*
 * PATH: api/reply/setLikeReply
 * PURPOSE: update like value for Reply and update reply's likes total and update the reply author's score
 * NOTES: For security, the function only creates a reply like if user is logged in
 * PAYLOAD: email, replyID, authorID, value
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    const data = JSON.parse(req.body);
    const { userID, replyID, authorID, value } = data;
    const userMeta: UserMeta | null = await prisma.userMeta.findUnique({
      where: {
        id: userID,
      },
    });
    const isValid =
      !!userMeta && userMeta.email === session?.user?.email && !!replyID && !!userMeta?.id;
    if (!isValid) {
      throw 'invalid data';
    }

    if (value) {
      // add LIKE IF NOT EXISTS
      const likeExistCheck = await prisma.replyLike.count({
        where: {
          replyID: replyID,
          userID: userMeta?.id,
        },
      });
      if (likeExistCheck === 0) {
        await prisma.replyLike.create({
          data: {
            replyID: replyID,
            userID: userMeta?.id,
            authorID,
            createdAt: new Date(),
            modifiedAt: new Date(),
          },
        });
      }
    } else {
      // remove LIKE
      await prisma.replyLike.deleteMany({
        where: {
          userID: userMeta?.id,
          replyID,
        },
      });
    }
    // UPDATE REPLY STATS
    const numLikes = await prisma.replyLike.count({
      where: {
        replyID,
      },
    });
    await prisma.reply.update({
      where: {
        id: replyID,
      },
      data: {
        likes: numLikes || 0,
      },
    });
    await checkUserScore(authorID, prisma);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
}

export default handler;
