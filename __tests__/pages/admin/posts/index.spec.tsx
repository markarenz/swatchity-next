import { render, screen, act, fireEvent } from '@testing-library/react';
import AdminPosts, { getServerSideProps } from '@/pages/admin/posts';
import { SessionProvider } from 'next-auth/react';
import { createRequest, createResponse } from 'node-mocks-http';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockUserData from '../../../__fixtures__/mockUserMeta';
import mockNewsPost from '../../../__fixtures__/mockNewsPost';

jest.mock('@/utils/apiFunctions', () => ({
  createPost: jest.fn(() => ({
    post: mockNewsPost,
  })),
}));
jest.mock('@/utils/dbFunctions', () => ({
  getPostSummariesDB: jest.fn().mockImplementation(() => [mockNewsPost]),
}));
jest.mock('@/context/UserContext', () => ({
  useUserContext: jest
    .fn()
    .mockImplementation(() => ({ userMeta: { ...mockUserData, role: 'admin' } })),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    pathname: '/',
    push: jest.fn(),
  })),
}));
const mockSession = {
  user: {
    email: 'test@domain.com',
    name: 'jeffrafter',
  },
  status: 'authenticated',
  expires: new Date().toDateString(),
};

describe('AdminPosts Page', () => {
  it('renders page', () => {
    act(() => {
      render(
        <SessionProvider session={mockSession}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <AdminPosts
              posts={[mockNewsPost, { ...mockNewsPost, id: '9875jhfjfk', active: false }]}
            />
          </IntlProvider>
        </SessionProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('handles create post', async () => {
    act(() => {
      render(
        <SessionProvider session={mockSession}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <AdminPosts posts={[mockNewsPost]} />
          </IntlProvider>
        </SessionProvider>,
      );
    });
    const element = await screen.findByTestId('btn-new-post');

    act(() => {
      fireEvent(
        element,
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
        posts: [mockNewsPost],
      },
    });
    expect(JSON.stringify(result)).toEqual(expectedResult);
  });
});
