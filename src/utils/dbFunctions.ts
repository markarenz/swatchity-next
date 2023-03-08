import { Session } from 'next-auth';
import prisma from '@/lib/prismadb';
import { UserMeta } from '@prisma/client';
import { SwatchExt } from '@/types';
import { swatchesPerPage } from '@/constants';
import { getColorScore } from './colorFunctions';

// export const updateSwatchColorScores = async () => {
//   // update all Swatches to use new colorScore function
//   const swatches = await prisma.swatch.findMany({
//     where: {
//       active: true,
//     },
//   });
//   swatches.forEach(async (s) => {
//     const color = {
//       r: s.colorR,
//       g: s.colorG,
//       b: s.colorB,
//     };
//     const colorScore = getColorScore(color);
//     await prisma.swatch.update({
//       where: {
//         id: s.id,
//       },
//       data: {
//         colorScore,
//       },
//     });
//   });
// };

export const sortByLikeIdx = (swatchesRaw: SwatchExt[], likes: string[]) => {
  const newSwatches = swatchesRaw.sort((a, b) => {
    const aIdx = likes.indexOf(a.id);
    const bIdx = likes.indexOf(b.id);
    if (aIdx > bIdx) {
      return 1;
    }
    if (aIdx < bIdx) {
      return -1;
    }
    return 0;
  });
  return newSwatches;
};
export const getSwatchesDB = async (
  session: Session | null,
  mode: string,
  str: string,
  skip: number,
) => {
  // await updateSwatchColorScores();
  let swatches: SwatchExt[] | null = [];
  let likes: string[] = [];
  let isLoggedIn = false;
  let userMeta: UserMeta | null = null;
  if (!!session?.user) {
    userMeta = await prisma.userMeta.findUnique({
      where: {
        email: `${session?.user?.email}`,
      },
    });
    const email = userMeta?.email;
    isLoggedIn = !!email && email === session?.user?.email;
  }
  switch (mode) {
    case 'search':
      const [rStr, gStr, bStr] = str.split(',');
      const r = parseInt(rStr, 10);
      const g = parseInt(gStr, 10);
      const b = parseInt(bStr, 10);
      const moe = 75;
      swatches = await prisma.swatch.findMany({
        skip,
        take: swatchesPerPage,
        where: {
          active: true,
          colorR: {
            gte: r - moe,
            lte: r + moe,
          },
          colorG: {
            gte: g - moe,
            lte: g + moe,
          },
          colorB: {
            gte: b - moe,
            lte: b + moe,
          },
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      break;
    case 'mood':
      swatches = await prisma.swatch.findMany({
        skip,
        take: swatchesPerPage,
        where: {
          active: true,
        },
        include: {
          user: true,
        },
        orderBy: {
          colorScore: 'desc',
        },
      });
      break;
    case 'liked':
      if (isLoggedIn) {
        const userLikes = await prisma.swatchLike.findMany({
          skip,
          take: 100,
          where: {
            userID: userMeta?.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        likes = userLikes.map((ls) => ls.swatchID);
        const swatchesRaw = await prisma.swatch.findMany({
          where: {
            active: true,
            id: { in: likes },
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        swatches = sortByLikeIdx(swatchesRaw, likes);
      }
      break;
    case 'featured':
      swatches = await prisma.swatch.findMany({
        skip,
        take: swatchesPerPage,
        where: {
          active: true,
          likes: {
            gte: 1,
          },
        },
        include: {
          user: true,
        },
        orderBy: [{ likes: 'desc' }, { createdAt: 'desc' }],
      });
      break;
    case 'feed':
    default:
      swatches = await prisma.swatch.findMany({
        skip,
        take: swatchesPerPage,
        where: {
          active: true,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      break;
  }
  if (isLoggedIn && mode !== 'liked') {
    const swatchIDs = swatches?.map((s) => s.id);
    const likedSwatches = await prisma.swatchLike.findMany({
      where: {
        swatchID: { in: swatchIDs },
        userID: userMeta?.id,
      },
    });
    likes = likedSwatches.map((ls) => ls.swatchID);
  }
  return {
    swatches,
    likes,
  };
};