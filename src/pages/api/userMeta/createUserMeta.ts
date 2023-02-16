// import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { getDefaultLanguage, cleanSlug, cleanSlugWithRandomNums } from '@/utils/apiFunctions';
import { getRandomColor } from '@/utils/colorFunctions';
import { validateWithRules } from '@/utils/validationFunctions';
import { createUserRules } from '@/validation/userRules';

interface UserCreateInput {
  email: String;
  name: String;
}

/*
 * PATH: api/userMeta/createUserMeta
 * PURPOSE: Create userMeta record by email address (unique)
 * NOTES: For security, the function only creates userMeta for the logged-in user
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const color = getRandomColor();
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
    // TODO: add check for existing username and add RND #s if that's the case
    const userMeta = await prisma.userMeta.create({
      data: {
        name: data.name,
        username,
        email: data.email,
        level: 1,
        score: 0,
        prefLang: getDefaultLanguage(data.locale), // TODO: develop this further once we have multiple language support
        bio: '', // TODO: randomize color dot emoji?
        role: 'user',
        avatarPattern: 0,
        avatarColor1r: color.r,
        avatarColor1g: color.g,
        avatarColor1b: color.b,
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
