import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import PostPage, { getServerSideProps } from '@/pages/admin/posts/[id]';
import { SessionProvider } from 'next-auth/react';
import { createRequest, createResponse } from 'node-mocks-http';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockUserData from '../../../__fixtures__/mockUserMeta';
import mockNewsPost from '../../../__fixtures__/mockNewsPost';

jest.mock('@/utils/apiFunctions', () => ({
  ...jest.requireActual('@/utils/apiFunctions'),
  createPost: jest.fn(() => ({
    post: mockNewsPost,
  })),
  updatePost: jest
    .fn()
    .mockImplementationOnce(() => true)
    .mockImplementation(() => false),
}));
jest.mock('@/utils/dbFunctions', () => ({
  getPostByIdDB: jest
    .fn()
    .mockImplementationOnce(() => ({
      post: mockNewsPost,
    }))
    .mockImplementationOnce(() => ({
      post: null,
    })),
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
            <PostPage initialPost={mockNewsPost} />
          </IntlProvider>
        </SessionProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('handle form change - save', async () => {
    act(() => {
      render(
        <SessionProvider session={mockSession}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <PostPage initialPost={mockNewsPost} />
          </IntlProvider>
        </SessionProvider>,
      );
    });
    const input = await screen.findByTestId('form-data-title');
    if (input) {
      await act(async () => {
        await waitFor(() =>
          fireEvent.change(input, {
            target: { value: 'New Name' },
          }),
        );
      });
    }
    const btnSave = await screen.findByTestId('btn-form-save');
    if (btnSave) {
      fireEvent(
        btnSave,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(screen).toMatchSnapshot();
  });

  it('handle form change - save - ERROR', async () => {
    act(() => {
      render(
        <SessionProvider session={mockSession}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <PostPage initialPost={mockNewsPost} />
          </IntlProvider>
        </SessionProvider>,
      );
    });
    const input = await screen.findByTestId('form-data-title');
    if (input) {
      await act(async () => {
        await waitFor(() =>
          fireEvent.change(input, {
            target: { value: 'New Name' },
          }),
        );
      });
    }
    const btnSave = await screen.findByTestId('btn-form-save');
    if (btnSave) {
      fireEvent(
        btnSave,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(screen).toMatchSnapshot();
  });

  it('handle form change - active', async () => {
    act(() => {
      render(
        <SessionProvider session={mockSession}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <PostPage initialPost={mockNewsPost} />
          </IntlProvider>
        </SessionProvider>,
      );
    });
    const input = await screen.findByTestId('form-data-active');
    if (input) {
      await act(async () => {
        await waitFor(() =>
          fireEvent.change(input, {
            target: { value: 'New Name' },
          }),
        );
      });
    }
    expect(screen).toMatchSnapshot();
  });

  it('handle color change - cancel', async () => {
    act(() => {
      render(
        <SessionProvider session={mockSession}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <PostPage initialPost={mockNewsPost} />
          </IntlProvider>
        </SessionProvider>,
      );
    });
    const btnColor = await screen.findByTestId('form-data-color');
    if (btnColor) {
      await act(async () => {
        fireEvent(
          btnColor,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        );
      });
      const btnClose = document.querySelector('#post-detail .colorPicker .pickerClose');
      if (btnClose) {
        await act(async () => {
          fireEvent(
            btnClose,
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            }),
          );
        });
      }
    }
    expect(screen).toMatchSnapshot();
  });

  it('handle color change - complete', async () => {
    act(() => {
      render(
        <SessionProvider session={mockSession}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <PostPage initialPost={mockNewsPost} />
          </IntlProvider>
        </SessionProvider>,
      );
    });
    const btnColor = await screen.findByTestId('form-data-color');
    if (btnColor) {
      await act(async () => {
        fireEvent(
          btnColor,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        );
      });
      const btnOK = document.querySelector('#post-detail .colorPicker .pickerOK');
      if (btnOK) {
        await act(async () => {
          fireEvent(
            btnOK,
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            }),
          );
        });
      }
    }
    expect(screen).toMatchSnapshot();
  });

  // save form

  it('GetServerSideProps', async () => {
    const req = createRequest({
      method: 'GET',
    });
    const res = createResponse();
    const context = {
      req,
      res,
      query: {
        id: 'test-slug',
      },
    };
    // @ts-ignore
    const result = await getServerSideProps(context);
    const expectedResult = JSON.stringify({
      props: {
        initialPost: { ...mockNewsPost },
      },
    });
    expect(JSON.stringify(result)).toEqual(expectedResult);
  });

  it('GetServerSideProps - no post', async () => {
    const req = createRequest({
      method: 'GET',
    });
    const res = createResponse();
    const context = {
      req,
      res,
      query: {
        id: 'test-slug',
      },
    };
    // @ts-ignore
    const result = await getServerSideProps(context);
    const expectedResult = JSON.stringify({
      props: {
        initialPost: { ...mockNewsPost },
      },
    });
    // @ts-ignore
    expect(result?.props?.initialPost?.id).toBe(undefined);
  });
});
