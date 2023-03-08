import { ProfileFormFields, SwatchExt } from '@/types';

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
    },
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
