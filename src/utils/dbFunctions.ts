import { Session } from 'next-auth';
import prisma from '@/lib/prismadb';
import { UserMeta, Alert } from '@prisma/client';
import { SwatchExt, UserProfile } from '@/types';
import {
  swatchesPerPage,
  repliesPerPage,
  alertsPerPage,
  postsPerPage,
  messagesPerPage,
} from '@/constants';
// import { getColorScore } from './colorFunctions';

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
export const getUserProfileFromUserMeta = (userMeta: UserMeta | null): UserProfile => ({
  id: userMeta?.id || '',
  name: userMeta?.name || '',
  active: !!userMeta?.active,
  username: userMeta?.username || '',
  level: userMeta?.level || 1,
  score: userMeta?.score || 0,
  bio: userMeta?.bio || '',
  numSwatches: userMeta?.numSwatches || 0,
  avatarPattern: userMeta?.avatarPattern || 0,
  avatarColor1r: userMeta?.avatarColor1r || 0,
  avatarColor1g: userMeta?.avatarColor1g || 0,
  avatarColor1b: userMeta?.avatarColor1b || 0,
  avatarColor2r: userMeta?.avatarColor2r || 0,
  avatarColor2g: userMeta?.avatarColor2g || 0,
  avatarColor2b: userMeta?.avatarColor2b || 0,
  avatarColor3r: userMeta?.avatarColor3r || 0,
  avatarColor3g: userMeta?.avatarColor3g || 0,
  avatarColor3b: userMeta?.avatarColor3b || 0,
});

export const getUserProfileDB = async (id: string) => {
  const userMeta: UserMeta | null = await prisma.userMeta.findUnique({
    where: {
      id,
    },
  });
  const userProfile = getUserProfileFromUserMeta(userMeta);
  return userProfile;
};

export const getSwatchesDB = async (
  session: Session | null,
  mode: string,
  str: string,
  skip: number,
) => {
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
    case 'profile':
      swatches = await prisma.swatch.findMany({
        skip,
        take: swatchesPerPage,
        where: {
          active: true,
          userID: str,
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

export const getSwatchThreadDB = async (session: Session | null, id: string, skip: number) => {
  let userMeta: UserMeta | null = null;
  let swatchLikes: string[] = [];
  let isLoggedIn = false;
  let replyLikes: string[] = [];
  if (!!session?.user) {
    userMeta = await prisma.userMeta.findUnique({
      where: {
        email: `${session?.user?.email}`,
      },
    });
    const email = userMeta?.email;
    isLoggedIn = !!email && email === session?.user?.email;
  }
  const swatch = await prisma.swatch.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
  const likedSwatches = await prisma.swatchLike.findMany({
    where: {
      swatchID: id,
      userID: userMeta?.id,
    },
  });
  swatchLikes = likedSwatches.map((ls) => ls.swatchID);

  const replies = await prisma.reply.findMany({
    skip,
    take: repliesPerPage,
    where: {
      swatchID: id,
      active: true,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  if (isLoggedIn && replies.length > 0) {
    const replyIDs = replies?.map((s) => s.id);
    const likedReplies = await prisma.swatchLike.findMany({
      where: {
        swatchID: { in: replyIDs },
        userID: userMeta?.id,
      },
    });
    replyLikes = likedReplies.map((lr) => lr.swatchID);
  }
  return {
    swatch,
    swatchLikes,
    replies,
    replyLikes,
  };
};

export const getAlertsDB = async (session: Session | null, skip: number) => {
  let alerts: Alert[] = [];
  let userMeta = null;
  if (!!session?.user) {
    userMeta = await prisma.userMeta.findUnique({
      where: {
        email: `${session?.user?.email}`,
      },
    });
    if (userMeta?.id) {
      alerts = await prisma.alert.findMany({
        skip,
        take: alertsPerPage,
        where: {
          userID: userMeta.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
  }
  return { alerts };
};

export const getMessageThreads = async (session: Session | null) => {
  if (session?.user?.email) {
    const userMeta = await prisma.userMeta.findUnique({
      where: {
        email: `${session?.user?.email}`,
      },
    });
    if (userMeta?.id && userMeta?.active) {
      const { id } = userMeta;
      const threads = await prisma.messageThread.findMany({
        where: {
          OR: [
            {
              toUserID: id,
            },
            {
              fromUserID: id,
            },
          ],
        },
      });
      return {
        threads,
      };
    }
  }
  return { threads: [] };
};

export const getMessagesDB = async (session: Session | null, userID: string, skip: number) => {
  const otherUser = await prisma.userMeta.findUnique({
    where: {
      id: userID,
    },
  });
  if (!!session?.user && !!session?.user.email) {
    const userMeta = await prisma.userMeta.findUnique({
      where: {
        email: `${session?.user?.email}`,
      },
    });
    const email = userMeta?.email;
    const isLoggedIn = !!email && email === session?.user?.email;

    if (isLoggedIn) {
      const messages = await prisma.message.findMany({
        skip,
        take: messagesPerPage,
        where: {
          OR: [
            {
              toUserID: `${otherUser?.id}`,
              fromUserID: `${userMeta?.id}`,
            },
            {
              toUserID: `${userMeta?.id}`,
              fromUserID: `${otherUser?.id}`,
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const otherUserProfile = {
        id: otherUser?.id,
        name: otherUser?.name,
        active: otherUser?.active,
        username: otherUser?.username,
        numSwatches: otherUser?.numSwatches,
        level: otherUser?.level,
        score: otherUser?.score,
        bio: otherUser?.bio,
        avatarPattern: otherUser?.avatarPattern,
        avatarColor1r: otherUser?.avatarColor1r,
        avatarColor1g: otherUser?.avatarColor1g,
        avatarColor1b: otherUser?.avatarColor1b,
        avatarColor2r: otherUser?.avatarColor2r,
        avatarColor2g: otherUser?.avatarColor2g,
        avatarColor2b: otherUser?.avatarColor2b,
        avatarColor3r: otherUser?.avatarColor3r,
        avatarColor3g: otherUser?.avatarColor3g,
        avatarColor3b: otherUser?.avatarColor3b,
      };
      return {
        otherUserProfile,
        messages,
      };
    }
  }
  return {
    otherUserProfile: null,
    messages: [],
  };
};

export const getPostByIdDB = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  if (!!post?.id) {
    return {
      post,
    };
  }
  return {
    post: null,
  };
};
export const getPostSummariesDB = async (
  activeOnly: boolean,
  skip: number,
  take = postsPerPage,
) => {
  const posts = await prisma.post.findMany({
    take,
    skip,
    where: {
      active: activeOnly ? true : {},
    },
    orderBy: {
      publishDate: 'desc',
    },
  });
  const postSummaries = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    colorR: p.colorR,
    colorG: p.colorG,
    colorB: p.colorB,
    imgFeatured: p.imgFeatured,
    imgThumbnail: p.imgThumbnail,
    publishDate: p.publishDate,
  }));
  return !!postSummaries ? postSummaries : [];
};

export const getPostBySlugDB = async (slug: string) => {
  const post = await prisma.post.findFirst({
    where: {
      slug,
    },
  });
  if (!!post?.id) {
    return {
      post,
    };
  }
  return {
    post: null,
  };
};
