import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { UserMeta, Alert } from '@prisma/client';
import { getAlertsDB } from '@/utils/dbFunctions';

/*
 * PATH: api/alert/readAlerts
 * PURPOSE: Read a list of alerts for the user's Alert page
 * NOTES: Only logged in users can retrieve alerts
 * PAYLOAD: userID, skip
 */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    const data = JSON.parse(req.body);
    const { userID, skip } = data;
    let isLoggedIn = false;
    if (!!userID && !!session?.user) {
      const userMeta: UserMeta | null = await prisma.userMeta.findUnique({
        where: {
          id: userID,
        },
      });
      const email = userMeta?.email;
      isLoggedIn = !!email && email === session?.user?.email;
    }
    const isValid = !!userID && skip >= 0;
    if (!isValid) {
      throw 'invalid data';
    }
    const alerts = await getAlertsDB(session, skip);
    return res.status(200).json({ alerts });
  } catch (err) {
    return res.status(500).json({ alerts: null });
  }
}

export default handler;
