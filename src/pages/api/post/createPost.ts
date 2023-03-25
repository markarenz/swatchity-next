import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { UserMeta } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { randomString } from '@/utils/apiFunctions';

/*
 * PATH: api/post/createPost
 * PURPOSE: Create post record from input for logged in admin user
 * NOTES: For security, the function only creates a post if user is logged in as an ADMIN
 * PAYLOAD: (none)
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
    const isValid = !!userMeta && userMeta.role === 'admin';
    if (!isValid) {
      throw 'invalid data';
    }
    const post = await prisma.post.create({
      data: {
        contentType: 'news',
        minLevel: 0,
        title: 'Untitled Post',
        slug: randomString(10),
        imgFeatured: '',
        imgThumbnail: '',
        tags: '',
        content: 'Markdown content goes here...',
        metadesc: '',
        colorR: 150,
        colorG: 150,
        colorB: 150,
        active: false,
        publishDate: new Date().toISOString().split('T')[0],
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
    });
    success = !!post?.id;
    return res.status(200).json({ success, post });
  } catch (err) {
    return res.status(500).json({ success: false, post: null });
  }
}

export default handler;
