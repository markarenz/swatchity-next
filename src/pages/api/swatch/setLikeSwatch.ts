import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { UserMeta } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { checkUserScore } from '@/utils/scoreFunctions';

/*
 * PATH: api/swatch/setLikeSwatch
 * PURPOSE: update like value for Swatch and update swatch's likes total and update the swatch author's score
 * NOTES: For security, the function only creates a swatch if user is logged in
 * PAYLOAD: email, swatchID, authorID, value
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    const data = JSON.parse(req.body);
    const { userID, swatchID, authorID, value } = data;
    const userMeta: UserMeta | null = await prisma.userMeta.findUnique({
      where: {
        id: userID,
      },
    });
    const isValid =
      !!userMeta && userMeta.email === session?.user?.email && !!swatchID && !!userMeta?.id;
    if (!isValid) {
      throw 'invalid data';
    }

    if (value) {
      // add LIKE IF NOT EXISTS
      const likeExistCheck = await prisma.swatchLike.count({
        where: {
          swatchID: swatchID,
          userID: userMeta?.id,
        },
      });
      if (likeExistCheck === 0) {
        await prisma.swatchLike.create({
          data: {
            swatchID: swatchID,
            userID: userMeta?.id,
            authorID,
            createdAt: new Date(),
            modifiedAt: new Date(),
          },
        });
      }
    } else {
      // remove LIKE
      await prisma.swatchLike.deleteMany({
        where: {
          userID: userMeta?.id,
          swatchID,
        },
      });
    }
    // UPDATE SWATCH STATS
    const numLikes = await prisma.swatchLike.count({
      where: {
        swatchID,
      },
    });
    await prisma.swatch.update({
      where: {
        id: swatchID,
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
