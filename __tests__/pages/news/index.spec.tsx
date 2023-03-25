import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import NewsPage, { getServerSideProps } from '@/pages/news/';
import { createRequest, createResponse } from 'node-mocks-http';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockUserData from '../../__fixtures__/mockUserMeta';
import mockNewsPost from '../../__fixtures__/mockNewsPost';

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
    checkUserMeta: jest.fn(),
  })),
}));

jest.mock('@/utils/dbFunctions', () => ({
  getPostSummariesDB: jest
    .fn()
    .mockImplementationOnce(() => [mockNewsPost])
    .mockImplementation(() => [mockNewsPost]),
}));
jest.mock('@/utils/apiFunctions', () => ({
  ...jest.requireActual('@/utils/apiFunctions'),
  getPosts: jest
    .fn()
    .mockImplementationOnce(() => ({
      posts: [],
    }))
    .mockImplementation(() => ({
      posts: [mockNewsPost],
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
    query: '50-50-50',
    pathname: '/',
  })),
}));

describe('News Page', () => {
  it('renders page', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <NewsPage initialPosts={[mockNewsPost]} initialCanLoadMore={true} />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('handles load more - no results', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <NewsPage initialPosts={[mockNewsPost]} initialCanLoadMore={true} />
        </IntlProvider>,
      );
    });
    const btnMore = await screen.findByTestId('feed-load-more');
    act(() => {
      fireEvent(
        btnMore,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('handles load more', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <NewsPage initialPosts={[mockNewsPost]} initialCanLoadMore={true} />
        </IntlProvider>,
      );
    });
    const btnMore = await screen.findByTestId('feed-load-more');
    act(() => {
      fireEvent(
        btnMore,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('handles refresh', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <NewsPage initialPosts={[mockNewsPost]} initialCanLoadMore={true} />
        </IntlProvider>,
      );
    });
    const btnMore = await screen.findByTestId('btn-refresh');
    act(() => {
      fireEvent(
        btnMore,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
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
    // @ts-ignore
    const result = await getServerSideProps(context);
    const expectedResult = JSON.stringify({
      props: {
        initialPosts: [mockNewsPost],
        initialCanLoadMore: false,
      },
    });
    expect(JSON.stringify(result)).toEqual(expectedResult);
  });
});
