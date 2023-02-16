import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prismadb';
import { UserMeta } from '@prisma/client';

/*
 * PATH: api/userMeta/readUserMeta
 * PURPOSE: Get userMeta record by email address (unique)
 * NOTES: For security, the function only returns userMeta for the logged-in user
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    let success = false;
    const data = JSON.parse(req.body);
    const { email } = data;
    const isValid = !!email && email === session?.user?.email;
    if (!isValid) {
      throw 'invalid data';
    }
    const userMeta: UserMeta | null = await prisma.userMeta.findUnique({
      where: {
        email,
      },
    });
    success = !!userMeta?.id;
    return res.status(200).json({ success, userMeta });
  } catch (err) {
    return res.status(500).json({ success: false, userMeta: null });
  }
}

export default handler;
