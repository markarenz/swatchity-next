import { render, screen, act } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import Liked, { getServerSideProps } from '@/pages/feed/liked';
import { createRequest, createResponse } from 'node-mocks-http';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockSwatch from '../../__fixtures__/mockSwatch';
import mockUserData from '../../__fixtures__/mockUserMeta';

const initialLikes = ['abcd1234'];
const initialSwatches = [mockSwatch];
jest.mock('@/components/common/SwatchFeed', () => () => <div>Swatch Feed</div>);

jest.mock('next', () => ({
  ...jest.requireActual('next'),
  GetServerSideProps: () => () => {},
}));

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(() => ({
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: 'test', email: 'test@domain.com' },
  })),
}));

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest.fn(() => ({
    userMeta: mockUserData,
  })),
}));

jest.mock('@/utils/dbFunctions', () => ({
  getSwatchesDB: jest.fn(() => ({
    likes: initialLikes,
    swatches: initialSwatches,
  })),
}));
jest.mock('@/utils/apiFunctions', () => ({
  ...jest.requireActual('@/utils/apiFunctions'),
  getSwatches: jest.fn(() => ({
    likes: initialLikes,
    swatches: initialSwatches,
  })),
}));

jest.mock('next-auth', () => ({
  __esModule: true,
  default: () =>
    Promise.resolve({
      NextAuth: jest.fn(),
    }),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn().mockReturnValue({
    session: {
      email: 'email@test.com',
    },
  }),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/',
  })),
}));

describe('Liked Page', () => {
  it('renders page', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <Liked initialLikes={initialLikes} initialSwatches={initialSwatches} />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });
  it('GetServerSideProps', async () => {
    const req = createRequest({
      method: 'GET',
    });
    const res = createResponse();
    const context = {
      req,
      res,
    };
    const result = await getServerSideProps(context as GetServerSidePropsContext);
    const expectedResult = JSON.stringify({
      props: {
        initialSwatches,
        initialLikes,
      },
    });
    expect(JSON.stringify(result)).toEqual(expectedResult);
  });
});

// GetServerSideProps
