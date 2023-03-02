import { User, UserMeta } from '@prisma/client';
import { Avatar, ProfileFormFields } from '@/types';

export const bioLetters = ['y', 'g', 'b', 'p', 'o', 'n', 'k', 'w', 'r'];

export const getColorEmoji = (s: string): JSX.Element => {
  switch (s) {
    case 'y':
      return <span>&#x1F7E1;</span>;
    case 'g':
      return <span>&#x1F7E2;</span>;
    case 'b':
      return <span>&#x1F535;</span>;
    case 'p':
      return <span>&#x1F7E3;</span>;
    case 'o':
      return <span>&#x1F7E0;</span>;
    case 'n':
      return <span>&#x1F7E4;</span>;
    case 'k':
      return <span>&#x26AB;</span>;
    case 'w':
      return <span>&#x26AA;</span>;
    case 'r':
    default:
      return <span>&#x1F534;</span>;
  }
};

export const truncateMaxLen = (s: string, maxLen: number) =>
  s.length <= maxLen ? s : s.substring(0, maxLen);

export const removeNonAlphaNumeric = (s: string) => s.replace(/[^A-Za-z0-9]/g, '');

export const removeProfanity = (s: string) => {
  var list = require('badwords-list');
  const allowedWords = ['tit'];
  let output = s;
  list.array
    .filter((w: string) => !allowedWords.includes(w))
    .forEach((p: string) => {
      const regEx = new RegExp(p, 'ig'); // global, case insensitive
      output = output.replace(regEx, '');
    });
  return output;
};

export const getAvatarFromUserMeta = (userMeta: UserMeta): Avatar => ({
  avatarPattern: userMeta?.avatarPattern || 0,
  avatarColor1r: userMeta?.avatarColor1r || 150,
  avatarColor1g: userMeta?.avatarColor1g || 150,
  avatarColor1b: userMeta?.avatarColor1b || 150,
  avatarColor2r: userMeta?.avatarColor2r || 150,
  avatarColor2g: userMeta?.avatarColor2g || 150,
  avatarColor2b: userMeta?.avatarColor2b || 150,
  avatarColor3r: userMeta?.avatarColor3r || 150,
  avatarColor3g: userMeta?.avatarColor3g || 150,
  avatarColor3b: userMeta?.avatarColor3b || 150,
});

export const isPatternValidForUser = (idx: number, level: number): boolean => {
  if (idx > 30 && level < 7) {
    return false;
  }
  if (idx > 27 && level < 6) {
    return false;
  }
  if (idx > 25 && level < 5) {
    return false;
  }
  if (idx > 22 && level < 4) {
    return false;
  }
  if (idx > 20 && level < 3) {
    return false;
  }
  if (idx > 17 && level < 2) {
    return false;
  }
  return true;
};

export const checkDirty = (
  formData: ProfileFormFields | null,
  userMeta: UserMeta | null,
): boolean => {
  let isDirty = false;
  const fields = ['name', 'username', 'bio', 'avatarPattern', 'darkMode', 'prefLang'];
  if (formData) {
    fields.forEach((k) => {
      //@ts-ignore
      if (formData[k] !== userMeta[k]) {
        isDirty = true;
      }
    });

    if (
      formData?.color1?.r !== userMeta?.avatarColor1r ||
      formData?.color1?.g !== userMeta?.avatarColor1g ||
      formData?.color1?.b !== userMeta?.avatarColor1b ||
      formData?.color2?.r !== userMeta?.avatarColor2r ||
      formData?.color2?.g !== userMeta?.avatarColor2g ||
      formData?.color2?.b !== userMeta?.avatarColor2b ||
      formData?.color3?.r !== userMeta?.avatarColor3r ||
      formData?.color3?.g !== userMeta?.avatarColor3g ||
      formData?.color3?.b !== userMeta?.avatarColor3b
    ) {
      isDirty = true;
    }
  }
  return isDirty;
};
