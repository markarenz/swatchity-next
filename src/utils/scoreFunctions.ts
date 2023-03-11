import { PrismaClient, UserMeta } from '@prisma/client';

export const getUserLevel = (score: number): number => {
  // Example: 200 posts  + 100 likes = 700 points
  const breaks = [5000, 3000, 2000, 1500, 1000, 700, 500, 350, 250, 150, 100, 50, 25, 0];
  let level = -1;
  breaks.forEach((b, idx) => {
    if (level < 0 && score >= b) {
      level = breaks.length - idx;
    }
  });
  return level > 1 ? level : 1;
};
export const checkUserScore = async (userID: string, prisma: PrismaClient) => {
  const numPosts = await prisma.swatch.count({
    where: {
      userID,
    },
  });
  const numLikes = await prisma.swatchLike.count({
    where: {
      authorID: userID,
    },
  });
  const score = numPosts + numLikes * 5;
  // did use level up?
  const userMeta = await prisma.userMeta.findUnique({
    where: {
      id: userID,
    },
  });
  if (userMeta) {
    const level = getUserLevel(score);
    const data =
      userMeta?.level !== level
        ? {
            score,
            level,
            numSwatches: numPosts,
          }
        : {
            score,
            numSwatches: numPosts,
          };
    await prisma.userMeta.update({
      where: {
        id: userID,
      },
      data,
    });
  }
  return score;
};
