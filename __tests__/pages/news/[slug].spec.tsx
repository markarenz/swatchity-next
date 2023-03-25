import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import PostDetailPage, { getServerSideProps } from '@/pages/news/[slug]';
import { createRequest, createResponse } from 'node-mocks-http';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockNewsPost from '../../__fixtures__/mockNewsPost';

jest.mock('@/components/common/SwatchFeed', () => () => <div>Swatch Feed</div>);

jest.mock('react-markdown', () => jest.fn());

jest.mock('next', () => ({
  ...jest.requireActual('next'),
  GetServerSideProps: () => () => {},
}));

jest.mock('@/utils/dbFunctions', () => ({
  getPostBySlugDB: jest
    .fn()
    .mockImplementationOnce(() => ({ post: null }))
    .mockImplementation(() => ({ post: mockNewsPost })),
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
    query: 'test-slug',
    pathname: '/',
  })),
}));

describe('News Detail Page', () => {
  it('renders page', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <PostDetailPage post={mockNewsPost} />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('GetServerSideProps - not found', async () => {
    const req = createRequest({
      method: 'GET',
    });
    const res = createResponse();
    const context = {
      req,
      res,
      query: {
        slug: 'test-slug',
      },
    };
    // @ts-ignore
    const result = await getServerSideProps(context);
    //@ts-ignore
    expect(result?.props?.post?.id).toEqual('1234');
  });
  it('GetServerSideProps - success', async () => {
    const req = createRequest({
      method: 'GET',
    });
    const res = createResponse();
    const context = {
      req,
      res,
      query: {
        slug: 'test-slug',
      },
    };
    // @ts-ignore
    const result = await getServerSideProps(context);
    const expectedResult = JSON.stringify({
      props: {
        post: mockNewsPost,
      },
    });
    expect(JSON.stringify(result)).toEqual(expectedResult);
  });
});
