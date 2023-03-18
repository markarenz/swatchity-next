import { Alert, Message, MessageThread, UserMeta } from '@prisma/client';
import { ProfileFormFields, SwatchExt, ReplyExt, UserProfile } from '@/types';

export const serializeDate = (dateObj: Date) => JSON.parse(JSON.stringify(dateObj));
export const serializeSwatchDates = (swatches: SwatchExt[]) =>
  swatches.map((s) => ({
    ...s,
    createdAt: serializeDate(s.createdAt),
    modifiedAt: serializeDate(s.modifiedAt),
    user: {
      ...s.user,
      createdAt: serializeDate(s.user.createdAt),
      modifiedAt: serializeDate(s.user.modifiedAt),
      lastAlert: s.user.lastAlert ? serializeDate(s.user.lastAlert) : null,
      lastMessage: s.user.lastMessage ? serializeDate(s.user.lastMessage) : null,
    },
  }));
export const serializeUserMeta = (usermeta: UserMeta) => ({
  ...usermeta,
  createdAt: serializeDate(usermeta.createdAt),
  modifiedAt: serializeDate(usermeta.modifiedAt),
  lastAlert: usermeta.lastAlert ? serializeDate(usermeta.lastAlert) : null,
  lastMessage: usermeta.lastMessage ? serializeDate(usermeta.lastMessage) : null,
});

export const serializeReplyDates = (replies: ReplyExt[]) =>
  replies.map((r) => ({
    ...r,
    createdAt: serializeDate(r.createdAt),
    modifiedAt: serializeDate(r.modifiedAt),
    user: {
      ...r.user,
      createdAt: serializeDate(r.user.createdAt),
      modifiedAt: serializeDate(r.user.modifiedAt),
      lastAlert: r.user.lastAlert ? serializeDate(r.user.lastAlert) : null,
    },
  }));

export const serializeMessageThreads = (threads: MessageThread[]) =>
  threads.map((t) => ({
    ...t,
    createdAt: serializeDate(t.createdAt),
    modifiedAt: serializeDate(t.modifiedAt),
  }));
export const serializeAlerts = (alerts: Alert[]) =>
  alerts.map((a) => ({
    ...a,
    createdAt: serializeDate(a.createdAt),
    modifiedAt: serializeDate(a.modifiedAt),
  }));

export const serializeMessageDates = (messages: Message[]) =>
  messages.map((m) => ({
    ...m,
    createdAt: serializeDate(m.createdAt),
    modifiedAt: serializeDate(m.modifiedAt),
  }));

export const getUserMeta = async (email: string) => {
  const body = {
    email,
  };
  const response = await fetch('/api/userMeta/readUserMeta', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.success ? data.userMeta : null;
};

export const checkUsername = async (username: string) => {
  const body = {
    username,
  };
  const response = await fetch('/api/userMeta/uniqueUsername', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.unique;
};

export const createUserMeta = async (email: string, name: string, locale: string) => {
  const body = {
    email,
    name,
    locale,
  };
  const response = await fetch('/api/userMeta/createUserMeta', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.success ? data.userMeta : null;
};

export const getDefaultLanguage = (locale: string) => {
  const loc = locale.includes('-') ? locale : 'en-US';
  const [lang] = loc.split('-');
  return lang;
};

export const cleanSlug = (str: string): string =>
  str
    .replaceAll(' ', '-')
    .replace(/[^A-Za-z0-9\-/]/g, '')
    .toLocaleLowerCase();

export const cleanSlugWithRandomNums = (str: string): string =>
  `${cleanSlug(str)}${Math.floor(Math.random() * 8999 + 1000)}`;

export const updateUserProfile = async (formData: ProfileFormFields | null, email: string) => {
  if (!formData) {
    return false;
  }
  const body = {
    formData,
    email,
  };
  const response = await fetch('/api/userMeta/updateUserMeta', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data?.success || false;
};

export const createSwatch = async (
  email: string,
  colorR: number,
  colorG: number,
  colorB: number,
) => {
  const body = {
    email,
    colorR,
    colorG,
    colorB,
  };
  const response = await fetch('/api/swatch/createSwatch', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.success ? data.swatch : null;
};

export const getSwatches = async (userID: string, mode: string, str: string, skip: number) => {
  // str can be used as a flexible search key
  const body = {
    userID,
    mode,
    str,
    skip,
  };
  const response = await fetch('/api/swatch/readSwatches', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return {
    swatches: data.swatches || [],
    likes: data.likes || [],
  };
};

export const setLikeSwatch = async (
  userID: string,
  authorID: string,
  swatchID: string,
  value: boolean,
) => {
  const body = {
    swatchID,
    authorID,
    value,
    userID,
  };
  const response = await fetch('/api/swatch/setLikeSwatch', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.success ? data.swatch : null;
};

export const setLikeReply = async (
  userID: string,
  authorID: string,
  replyID: string,
  value: boolean,
) => {
  const body = {
    userID,
    authorID,
    replyID,
    value,
  };
  const response = await fetch('/api/reply/setLikeReply', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.success;
};

export const getReplies = async (userID: string, swatchID: string, skip: number) => {
  const body = {
    userID,
    swatchID,
    skip,
  };
  const response = await fetch('/api/reply/readReplies', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return {
    replies: data.replies || [],
    replyLikes: data.replyLikes || [],
  };
};

export const createReply = async (
  email: string,
  swatchID: string,
  colorR: number,
  colorG: number,
  colorB: number,
  link: string,
) => {
  const body = {
    email,
    swatchID,
    colorR,
    colorG,
    colorB,
    link,
  };
  const response = await fetch('/api/reply/createReply', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.success
    ? { reply: data.reply, numReplies: data.numReplies }
    : { reply: null, numReplies: 0 };
};

export const getAlerts = async (userID: string, skip: number) => {
  const body = {
    userID,
    skip,
  };
  const response = await fetch('/api/alert/readAlerts', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return {
    alerts: data.alerts || [],
  };
};

export const createMessage = async (
  email: string,
  userID: string,
  colorR: number,
  colorG: number,
  colorB: number,
) => {
  const body = {
    email,
    userID,
    colorR,
    colorG,
    colorB,
  };
  const response = await fetch('/api/message/createMessage', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.success ? { message: data.message } : { message: null };
};

export const getMessages = async (userID: string, skip: number) => {
  const body = {
    userID,
    skip,
  };
  const response = await fetch('/api/message/readMessages', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return {
    messages: data.messages || [],
  };
};
