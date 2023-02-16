export const serializeDate = (dateObj: Date) => JSON.parse(JSON.stringify(dateObj));

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
