import {
  serializeDate,
  getUserMeta,
  createUserMeta,
  getDefaultLanguage,
  cleanSlug,
  cleanSlugWithRandomNums,
} from '../../src/utils/apiFunctions';
import fetchMock from 'jest-fetch-mock';

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
