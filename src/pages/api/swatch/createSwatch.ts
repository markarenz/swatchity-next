import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { UserMeta } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { validateWithRules } from '@/utils/validationFunctions';
import { createSwatchRules } from '@/validation/swatchRules';
import { getColorScore } from '@/utils/colorFunctions';
import { checkUserScore } from '@/utils/scoreFunctions';

/*
 * PATH: api/swatch/createSwatch
 * PURPOSE: Create swatch record from input for logged in user
 * NOTES: For security, the function only creates a swatch if user is logged in
 * PAYLOAD: email, colorR, colorG, colorB
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    let success = false;
    const data = JSON.parse(req.body);
    const { email, colorR, colorG, colorB } = data;
    const isValid =
      !!email && email === session?.user?.email && validateWithRules(data, createSwatchRules);
    if (!isValid) {
      throw 'invalid data';
    }
    const userMeta: UserMeta | null = await prisma.userMeta.findUnique({
      where: {
        email,
      },
    });
    const colorScore = getColorScore({ r: colorR, g: colorG, b: colorB });
    const swatch = await prisma.swatch.create({
      data: {
        userID: `${userMeta?.id}`,
        colorR: colorR,
        colorG: colorG,
        colorB: colorB,
        colorScore,
        likes: 0,
        replies: 0,
        active: true,
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
    });
    const swatchExt = {
      ...swatch,
      user: userMeta,
    };
    success = !!swatch?.id && !!swatchExt?.user?.name;
    if (userMeta) {
      await checkUserScore(userMeta?.id, prisma);
    }
    return res.status(200).json({ success, swatch: swatchExt });
  } catch (err) {
    return res.status(500).json({ success: false, swatch: null });
  }
}

export default handler;
