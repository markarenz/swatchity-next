import mockUserData from '../__fixtures__/mockUserMeta';
import { ProfileFormFields } from '@/types';

import {
  bioLetters,
  getColorEmoji,
  truncateMaxLen,
  removeNonAlphaNumeric,
  removeProfanity,
  getAvatarFromUserMeta,
  isPatternValidForUser,
  checkDirty,
} from '@/utils/profileFunctions';
import { mock } from 'jest-mock-extended';

describe('getColorEmoji', () => {
  it('returns emoji for color string', () => {
    let resultStr = '';
    bioLetters.forEach((s) => {
      const result = getColorEmoji(s);
      resultStr = result.props.children;
    });
    expect(resultStr).toEqual('🔴');
  });
});

describe('truncateMaxLen', () => {
  it('truncates string when too long', () => {
    const result = truncateMaxLen('too long string', 8);
    expect(result).toEqual('too long');
  });
  it('returns original string when under max length', () => {
    const result = truncateMaxLen('short', 8);
    expect(result).toEqual('short');
  });
});

describe('removeNonAlphaNumeric', () => {
  it('filters out punctuation and spaces', () => {
    const result = removeNonAlphaNumeric('t!e_s t');
    expect(result).toEqual('test');
  });
});

describe('removeProfanity', () => {
  it('removes unfortunate substrings', () => {
    const result = removeProfanity('Bad words, etc.');
    expect(result).toEqual('Bad words, etc.');
  });
});

describe('getAvatarFromUserMeta', () => {
  it('pulls avatar when data is provided', () => {
    const result = getAvatarFromUserMeta(mockUserData);
    expect(result).toEqual({
      avatarPattern: 0,
      avatarColor1r: 255,
      avatarColor1g: 255,
      avatarColor1b: 255,
      avatarColor2r: 255,
      avatarColor2g: 255,
      avatarColor2b: 255,
      avatarColor3r: 255,
      avatarColor3g: 255,
      avatarColor3b: 255,
    });
  });
  it('returns default avatar when data is not provided', () => {
    //@ts-ignore
    const result = getAvatarFromUserMeta({
      id: '12345abcdef',
      name: 'Test Name',
      username: 'test-name',
      email: 'test-email@domain.com',
      level: 1,
      score: 0,
      prefLang: 'en',
      bio: '',
      // avatarPattern: 0,
      // avatarColor1r: 255,
      // avatarColor1g: 255,
      // avatarColor1b: 255,
      // avatarColor2r: 255,
      // avatarColor2g: 255,
      // avatarColor2b: 255,
      // avatarColor3r: 255,
      // avatarColor3g: 255,
      // avatarColor3b: 255,
      role: 'user',
      darkMode: 'auto',
      active: true,
      createdAt: new Date('2023-02-12T21:42:46.580+00:00'),
      modifiedAt: new Date('2023-02-12T21:42:46.580+00:00'),
    });
    expect(result).toEqual({
      avatarPattern: 0,
      avatarColor1r: 150,
      avatarColor1g: 150,
      avatarColor1b: 150,
      avatarColor2r: 150,
      avatarColor2g: 150,
      avatarColor2b: 150,
      avatarColor3r: 150,
      avatarColor3g: 150,
      avatarColor3b: 150,
    });
  });
});

describe('isPatternValidForUser', () => {
  it('returns true if level is sufficient', () => {
    expect(isPatternValidForUser(10, 1)).toBe(true);
    expect(isPatternValidForUser(18, 2)).toBe(true);
    expect(isPatternValidForUser(21, 3)).toBe(true);
    expect(isPatternValidForUser(23, 4)).toBe(true);
    expect(isPatternValidForUser(26, 5)).toBe(true);
    expect(isPatternValidForUser(28, 6)).toBe(true);
    expect(isPatternValidForUser(31, 7)).toBe(true);
  });
  it('returns false if level is insufficient', () => {
    expect(isPatternValidForUser(18, 1)).toBe(false);
    expect(isPatternValidForUser(21, 2)).toBe(false);
    expect(isPatternValidForUser(23, 3)).toBe(false);
    expect(isPatternValidForUser(26, 4)).toBe(false);
    expect(isPatternValidForUser(28, 5)).toBe(false);
    expect(isPatternValidForUser(31, 6)).toBe(false);
  });
});

describe('checkDirty', () => {
  const mockFormData: ProfileFormFields = {
    name: mockUserData?.name,
    username: mockUserData?.username,
    darkMode: mockUserData.darkMode,
    prefLang: mockUserData.prefLang,
    bio: mockUserData.bio,
    avatarPattern: mockUserData.avatarPattern,
    color1: {
      r: mockUserData.avatarColor1r,
      g: mockUserData.avatarColor1g,
      b: mockUserData.avatarColor1b,
    },
    color2: {
      r: mockUserData.avatarColor2r,
      g: mockUserData.avatarColor2g,
      b: mockUserData.avatarColor2b,
    },
    color3: {
      r: mockUserData.avatarColor3r,
      g: mockUserData.avatarColor3g,
      b: mockUserData.avatarColor3b,
    },
  };
  it('returns true when formData has changed', () => {
    const result = checkDirty(
      {
        ...mockFormData,
        avatarPattern: 12,
        color1: {
          r: 210,
          g: 210,
          b: 210,
        },
      },
      mockUserData,
    );
    expect(result).toBe(true);
  });
  it('returns false when formData is unchanged', () => {
    const result = checkDirty(mockFormData, mockUserData);
    expect(result).toBe(false);
  });
});
