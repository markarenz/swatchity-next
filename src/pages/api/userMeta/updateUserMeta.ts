import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prismadb';
import { UserMeta } from '@prisma/client';
import { validateWithRules } from '@/utils/validationFunctions';
import { profileEditRules } from '@/validation/profileEditRules';
/*
 * PATH: api/userMeta/updateUserMeta
 * PURPOSE: Update userMeta record for session user
 * NOTES: For security, the function only saves if the user email & session info match
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    let success = false;
    const { formData, email } = JSON.parse(req.body);
    const { name, username, darkMode, prefLang, bio, avatarPattern, color1, color2, color3 } =
      formData;
    const isValid =
      !!email && email === session?.user?.email && validateWithRules(formData, profileEditRules);
    if (!isValid) {
      throw 'invalid data';
    }
    const userMeta = await prisma.userMeta.update({
      where: {
        email,
      },
      data: {
        name,
        username,
        email,
        prefLang,
        bio,
        avatarPattern,
        avatarColor1r: color1.r,
        avatarColor1g: color1.g,
        avatarColor1b: color1.b,
        avatarColor2r: color2.r,
        avatarColor2g: color2.g,
        avatarColor2b: color2.b,
        avatarColor3r: color3.r,
        avatarColor3g: color3.g,
        avatarColor3b: color3.b,
        darkMode,
        modifiedAt: new Date(),
      },
    });
    success = !!userMeta?.id;
    return res.status(200).json({ success });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
}

export default handler;
