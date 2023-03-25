import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { getDefaultLanguage, cleanSlug, cleanSlugWithRandomNums } from '@/utils/apiFunctions';
import { getRandomColor } from '@/utils/colorFunctions';
import { validateWithRules } from '@/utils/validationFunctions';
import { createUserRules } from '@/validation/userRules';

/*
 * PATH: api/userMeta/createUserMeta
 * PURPOSE: Create userMeta record by email address (unique)
 * NOTES: For security, the function only creates userMeta for the logged-in user
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const color3 = getRandomColor();
  try {
    let success = false;
    const data = JSON.parse(req.body);
    const isValid = validateWithRules(data, createUserRules);
    if (!isValid) {
      throw 'invalid data';
    }

    let username = cleanSlug(data.name);
    const usernameCheckResult = await prisma.userMeta.findUnique({
      where: {
        username,
      },
    });
    if (usernameCheckResult?.username) {
      username = cleanSlugWithRandomNums(data.name);
    }
    // TODO: develop getDefaultLanguage() further once we have multiple language support
    const userMeta = await prisma.userMeta.create({
      data: {
        name: data.name,
        username,
        email: data.email,
        level: 1,
        score: 0,
        prefLang: getDefaultLanguage(data.locale),
        bio: '', // TODO: randomize color dot emoji?
        role: 'user',
        numSwatches: 0,
        avatarPattern: Math.floor(Math.random() * 20),
        avatarColor1r: color1.r,
        avatarColor1g: color1.g,
        avatarColor1b: color1.b,
        avatarColor2r: color2.r,
        avatarColor2g: color2.g,
        avatarColor2b: color2.b,
        avatarColor3r: color3.r,
        avatarColor3g: color3.g,
        avatarColor3b: color3.b,
        darkMode: 'auto',
        active: true,
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
    });
    success = !!userMeta?.id;
    return res.status(200).json({ success, userMeta });
  } catch (err) {
    return res.status(500).json({ success: false, userMeta: null });
  }
}

export default handler;
