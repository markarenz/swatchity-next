import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { UserMeta } from '@prisma/client';
import { getSwatchesDB } from '@/utils/dbFunctions';
/*
 * PATH: api/swatch/readSwatches
 * PURPOSE: Read a list of swatches for display in feeds
 * NOTES: The mode and str arguments are used to reuse the function for a variety of purposes
 * PAYLOAD: userID, mode, str, skip
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    const data = JSON.parse(req.body);
    const { userID, mode, str, skip } = data;
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
    if (!!str || !['feed', 'liked', 'featured', 'mood', 'search'].includes(mode)) {
      throw 'invalid data';
    }
    const swatchData = await getSwatchesDB(session, mode, str, skip);
    const { swatches, likes } = swatchData;
    return res.status(200).json({ swatches, likes });
  } catch (err) {
    return res.status(500).json({ swatch: null, likes: [] });
  }
}

export default handler;
