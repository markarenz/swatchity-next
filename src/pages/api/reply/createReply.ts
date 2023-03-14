import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { UserMeta, Swatch } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { validateWithRules } from '@/utils/validationFunctions';
import { createSwatchRules } from '@/validation/swatchRules';
import { SwatchExt } from '@/types';
import { checkUserScore } from '@/utils/scoreFunctions';

/*
 * PATH: api/replu/createReply
 * PURPOSE: Create swatchReply record from input for logged in user
 * NOTES: For security, the function only creates a swatch if user is logged in
 * PAYLOAD: email, swatchID, colorR, colorG, colorB, link
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    let success = false;
    const data = JSON.parse(req.body);
    const { email, swatchID, colorR, colorG, colorB, link } = data;
    const swatch: SwatchExt | null = await prisma.swatch.findUnique({
      where: {
        id: swatchID,
      },
      include: {
        user: true,
      },
    });
    const isValid =
      !!email &&
      email === session?.user?.email &&
      swatch?.id &&
      validateWithRules(data, createSwatchRules);
    if (!isValid) {
      throw 'invalid data';
    }
    const userMeta: UserMeta | null = await prisma.userMeta.findUnique({
      where: {
        email,
      },
    });
    const reply = await prisma.reply.create({
      data: {
        userID: `${userMeta?.id}`,
        swatchID: swatchID,
        colorR: colorR,
        colorG: colorG,
        colorB: colorB,
        likes: 0,
        active: true,
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
    });
    const replyExt = {
      ...reply,
      user: userMeta,
    };
    success = !!reply?.id && !!replyExt?.user?.name;
    const numReplies = await prisma.reply.count({
      where: {
        swatchID,
      },
    });
    prisma.swatch.update({
      where: {
        id: swatchID,
      },
      data: {
        replies: numReplies,
      },
    });
    await prisma.alert.create({
      data: {
        alertType: 'reply',
        userID: swatch.user.id,
        link,
        noun: `${userMeta?.name}`,
        active: true,
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
    });
    if (userMeta) {
      await checkUserScore(swatch.user.id, prisma, true);
    }
    return res.status(200).json({ success, reply: replyExt, numReplies });
  } catch (err) {
    return res.status(500).json({ success: false, reply: null, numReplies: 0 });
  }
}

export default handler;
