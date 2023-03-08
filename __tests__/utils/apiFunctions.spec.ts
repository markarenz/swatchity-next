import {
  serializeDate,
  getUserMeta,
  createUserMeta,
  getDefaultLanguage,
  cleanSlug,
  cleanSlugWithRandomNums,
  checkUsername,
  updateUserProfile,
  createSwatch,
  getSwatches,
  setLikeSwatch,
} from '../../src/utils/apiFunctions';
import fetchMock from 'jest-fetch-mock';
import mockSwatch from '../__fixtures__/mockSwatch';
import mockUserData from '../__fixtures__/mockUserMeta';

const mockSwatchExt = {
  ...mockSwatch,
  user: {
    ...mockUserData,
  },
};

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ test: 100 }),
//   }),
// ) as jest.Mock;

jest.mock('next-auth/next', () => {
  getServerSession: () => {
    user: {
      email: 'email@domain.com';
    }
  };
});

jest.useFakeTimers().setSystemTime(new Date('2023-02-10'));

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.doMock();
});

describe('serializeDate', () => {
  // global.fetch = jest.fn(() => ({
  //   data: {
  //     success: true,
  //     userMeta: {},
  //   },
  // }));
  it('returns serialized date', () => {
    const result = serializeDate(new Date());
    expect(result).toEqual('2023-02-10T00:00:00.000Z');
  });
});

describe('getDefaultLanguage', () => {
  it('returns language from locale', () => {
    const result = getDefaultLanguage('fr-FR');
    expect(result).toEqual('fr');
  });
  it('returns default when no locale provided', () => {
    const result = getDefaultLanguage('');
    expect(result).toEqual('en');
  });
});
describe('cleanSlug', () => {
  it('cleans a string into a usable slug for usernames and URLs', () => {
    const result = cleanSlug('Test Name!');
    expect(result).toEqual('test-name');
  });
});

describe('cleanSlugWithRandomNums', () => {
  const testName = 'Test Name!';
  it('returns a clean username with 4 digit random number', () => {
    const result = cleanSlugWithRandomNums(testName);
    // NOTE: 4 additional digits - 1 extraneous character
    expect(result.length).toEqual(testName.length + 3);
  });
});

describe('getUserMeta', () => {
  it('returns user metaData', async () => {
    const mockResponse = {
      success: true,
      userMeta: {
        email: 'email@domain.com',
      },
    };
    fetchMock.mockOnce(JSON.stringify(mockResponse));
    const result = await getUserMeta('email@domain.com');
    expect(result.email).toEqual('email@domain.com');
  });
  it('returns null when success is false', async () => {
    const mockResponse = {
      success: false,
      userMeta: {
        email: 'email@domain.com',
      },
    };
    fetchMock.mockOnce(JSON.stringify(mockResponse));
    const result = await getUserMeta('email@domain.com');
    expect(result).toBe(null);
  });
});

describe('createUserMeta', () => {
  const mockResponse = {
    success: true,
    userMeta: {
      email: 'email@domain.com',
    },
  };

  it('calls fetch', async () => {
    fetchMock.mockOnce(JSON.stringify(mockResponse));
    const result = await createUserMeta('email@domain.com', 'Test Name', 'en-US');
    expect(result.email).toEqual('email@domain.com');
    expect(fetch).toHaveBeenCalled();
  });
  it('returns null when success is false', async () => {
    const mockResponse = {
      success: false,
      userMeta: {
        email: 'email@domain.com',
      },
    };
    fetchMock.mockOnce(JSON.stringify(mockResponse));
    const result = await createUserMeta('email@domain.com', 'Test Name', 'en-US');
    expect(result).toBe(null);
  });
});

describe('checkUsername', () => {
  it('returns true if name is unique', async () => {
    fetchMock.mockOnce(
      JSON.stringify({
        unique: true,
      }),
    );
    const result = await checkUsername('testUsername');
    expect(result).toBe(true);
  });
});
describe('updateUserProfile', () => {
  const formData = {
    name: 'Test Name',
    username: 'testuser',
    usernameUnique: true,
    bio: 'ryb',
    avatarPattern: 1,
    color1: { r: 100, g: 100, b: 100 },
    color2: { r: 100, g: 100, b: 100 },
    color3: { r: 100, g: 100, b: 100 },
    darkMode: 'auto',
    prefLang: 'auto',
  };
  it('calls ', async () => {
    fetchMock.mockOnce(
      JSON.stringify({
        success: true,
      }),
    );

    const result = await updateUserProfile(formData, 'email@domain.com');
    expect(result).toBe(true);
  });
  it('returns false for invalid formData', async () => {
    fetchMock.mockOnce(
      JSON.stringify({
        success: false,
      }),
    );
    const result = await updateUserProfile(null, 'email@domain.com');
    expect(result).toBe(false);
  });
  it('returns false for null response', async () => {
    fetchMock.mockOnce(JSON.stringify(null));
    const result = await updateUserProfile(formData, 'email@domain.com');
    expect(result).toBe(false);
  });
});

describe('createSwatch', () => {
  it('creates Swatch with info provided - success', async () => {
    const mockResponse = {
      success: true,
      swatch: mockSwatchExt,
    };
    fetchMock.mockOnce(JSON.stringify(mockResponse));
    const result = await createSwatch('test-email@domain.com', 123, 200, 17);
    expect(result.id).toEqual('abcd1234');
  });
  it('creates Swatch with info provided - fail', async () => {
    const mockResponse = {
      success: false,
      swatch: mockSwatchExt,
    };
    fetchMock.mockOnce(JSON.stringify(mockResponse));
    const result = await createSwatch('test-email@domain.com', 123, 200, 17);
    expect(result).toBeNull();
  });
});
describe('getSwatches', () => {
  it('returns swatches for feed mode', async () => {
    const mockResponse = {
      swatches: [
        { ...mockSwatchExt, id: '10' },
        { ...mockSwatchExt, id: '11' },
      ],
      likes: ['10'],
    };
    fetchMock.mockOnce(JSON.stringify(mockResponse));
    const result = await getSwatches('1234', 'feed', '', 0);
  });
  it('returns emptu array when an error occurs', async () => {
    const mockResponse = {
      swatches: null,
      likes: null,
    };
    fetchMock.mockOnce(JSON.stringify(mockResponse));
    const result = await getSwatches('1234', 'feed', '', 0);
  });
});

describe('setLikeSwatch', () => {
  it('sets like for swatch - scuccess', async () => {
    const mockResponse = {
      success: true,
      swatch: mockSwatchExt,
    };
    fetchMock.mockOnce(JSON.stringify(mockResponse));
    const result = await setLikeSwatch('1234', 'abcdefg', '10', true);
    expect(result?.id).toEqual('abcd1234');
  });
  it('sets like for swatch - fail', async () => {
    const mockResponse = {
      success: false,
      swatch: mockSwatchExt,
    };
    fetchMock.mockOnce(JSON.stringify(mockResponse));
    const result = await setLikeSwatch('1234', 'abcdefg', '10', true);
    expect(result).toBeNull();
  });
});
