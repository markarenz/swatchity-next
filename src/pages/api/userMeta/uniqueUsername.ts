import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prismadb';
import { UserMeta } from '@prisma/client';

/*
 * PATH: api/userMeta/uniqueUsername
 * PURPOSE: Check if the logged in user's proposed username is unique
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    let success = false;
    const data = await JSON.parse(req.body);
    const { username } = data;
    const isValid = session?.user?.email && !!username;
    if (!isValid) {
      throw 'invalid data';
    }
    const userMeta: UserMeta | null = await prisma.userMeta.findUnique({
      where: {
        email: `${session?.user?.email}`,
      },
    });
    if (username === userMeta?.username) {
      return res.status(200).json({ unique: true });
    }
    const usernameUserMeta: UserMeta | null = await prisma.userMeta.findUnique({
      where: {
        username,
      },
    });
    const unique = !usernameUserMeta?.id;
    return res.status(200).json({ unique });
  } catch (err) {
    return res.status(500).json({ unique: false });
  }
}

export default handler;
