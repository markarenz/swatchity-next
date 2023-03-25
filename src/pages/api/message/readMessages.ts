import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { UserMeta } from '@prisma/client';
import { getMessagesDB } from '@/utils/dbFunctions';

/*
 * PATH: api/message/readMessages
 * PURPOSE: Read a list of messages for display on a message thread page
 * NOTES: The endpoint expects a logged in user
 * PAYLOAD: userID, skip
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    const data = JSON.parse(req.body);
    const { userID, skip } = data;
    let userMeta: UserMeta | null = null;
    let isLoggedIn = false;
    if (!!userID && !!session?.user) {
      userMeta = await prisma.userMeta.findUnique({
        where: {
          id: userID,
        },
      });
      const email = userMeta?.email;
      isLoggedIn = !!email && email === session?.user?.email;
    }
    const isValid = !!userID && !!userMeta?.id && skip >= 0;
    if (!isValid) {
      throw 'invalid data';
    }
    const messagesData = await getMessagesDB(session, userID, skip);
    const { messages } = messagesData;
    return res.status(200).json({ messages });
  } catch (err) {
    return res.status(500).json({ messages: null });
  }
}

export default handler;
