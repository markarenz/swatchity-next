import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { UserMeta } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { randomString } from '@/utils/apiFunctions';
import { validateWithRules } from '@/utils/validationFunctions';
import { updatePostRules } from '@/validation/postRules';

/*
 * PATH: api/post/updatePost
 * PURPOSE: Update post record from input for logged in admin user
 * NOTES: For security, the function only updates a post if user is logged in as an ADMIN
 * PAYLOAD: id, formData
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    let success = false;
    const userMeta: UserMeta | null = await prisma.userMeta.findUnique({
      where: {
        email: `${session?.user?.email}`,
      },
    });
    const data = JSON.parse(req.body);
    const { id, formData } = data;
    const isValid =
      !!userMeta && userMeta.role === 'admin' && validateWithRules(formData, updatePostRules);
    if (!isValid) {
      throw 'invalid data';
    }
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: formData.title,
        slug: formData.slug,
        minLevel: parseInt(formData.minLevel, 10),
        tags: formData.tags,
        content: formData.content,
        metadesc: formData.metadesc,
        imgFeatured: formData.imgFeatured,
        imgThumbnail: formData.imgThumbnail,
        colorR: formData.colorR,
        colorG: formData.colorG,
        colorB: formData.colorB,
        active: formData.active,
        publishDate: formData.publishDate,
        modifiedAt: new Date(),
      },
    });
    success = !!post?.id;
    return res.status(200).json({ success });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
}

export default handler;
