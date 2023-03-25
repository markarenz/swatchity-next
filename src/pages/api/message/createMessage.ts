import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { UserMeta } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { validateWithRules } from '@/utils/validationFunctions';
import { createMessageRules } from '@/validation/messageRules';

/*
 * PATH: api/message/createMessage
 * PURPOSE: Create message record from current user to selected user
 * NOTES: For security, the function only creates a message if user is logged in
 * PAYLOAD: email, userID, colorR, colorG, colorB
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    let success = false;
    const data = JSON.parse(req.body);
    const { email, userID, colorR, colorG, colorB } = data;
    const toUser: UserMeta | null = await prisma.userMeta.findUnique({
      where: {
        id: userID,
      },
    });
    const fromUser: UserMeta | null = await prisma.userMeta.findUnique({
      where: {
        email,
      },
    });
    const isValid =
      !!toUser?.id &&
      !!fromUser?.id &&
      email === session?.user?.email &&
      validateWithRules(data, createMessageRules);
    if (!isValid) {
      throw 'invalid data';
    }

    const message = await prisma.message.create({
      data: {
        toUserID: `${toUser?.id}`,
        fromUserID: `${fromUser?.id}`,
        colorR: colorR,
        colorG: colorG,
        colorB: colorB,
        active: true,
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
    });
    success = !!message?.id;
    // Update or create thread
    const thread = await prisma.messageThread.findFirst({
      where: {
        OR: [
          {
            toUserID: `${toUser?.id}`,
            fromUserID: `${fromUser?.id}`,
          },
          {
            toUserID: `${fromUser?.id}`,
            fromUserID: `${toUser?.id}`,
          },
        ],
      },
    });
    if (thread) {
      // update thread by ID
      await prisma.messageThread.update({
        where: {
          id: thread.id,
        },
        data: {
          modifiedAt: new Date(),
        },
      });
    } else {
      await prisma.messageThread.create({
        data: {
          toUserID: `${toUser?.id}`,
          fromUserID: `${fromUser?.id}`,
          toUserName: `${toUser.name}`,
          fromUserName: `${fromUser.name}`,
          active: true,
          createdAt: new Date(),
          modifiedAt: new Date(),
        },
      });
    }
    await prisma.userMeta.update({
      where: {
        id: `${toUser?.id}`,
      },
      data: {
        lastMessage: new Date(),
      },
    });
    return res.status(200).json({ success, message });
  } catch (err) {
    return res.status(500).json({ success: false, message: null });
  }
}

export default handler;
