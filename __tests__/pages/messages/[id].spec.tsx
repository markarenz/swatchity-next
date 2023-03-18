import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import MessageThreadPage, { getServerSideProps } from '@/pages/messages/[id]';
import { createRequest, createResponse } from 'node-mocks-http';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockSwatch from '../../__fixtures__/mockSwatch';
import { mockReplyExt } from '../../__fixtures__/mockReply';
import mockUserData from '../../__fixtures__/mockUserMeta';
import { mockMessage } from '../../__fixtures__/mockMessage';

const otherUser = {
  ...mockUserData,
  id: 'other1234',
  name: 'Other User',
  username: 'otheruser',
};
const initialSwatches = [mockSwatch];
const initialSwatchLikes = [mockSwatch.id];
const initialReplies = [mockReplyExt];
const initialReplyLikes = [mockReplyExt.id];
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
  useUserContext: jest
    .fn()
    .mockImplementationOnce(() => ({
      userMeta: null,
      checkUserMeta: jest.fn(),
    }))
    .mockImplementation(() => ({
      userMeta: mockUserData,
      checkUserMeta: jest.fn(),
    })),
}));

jest.mock('@/utils/dbFunctions', () => ({
  getMessagesDB: jest
    .fn()
    .mockImplementationOnce(() => ({
      otherUserProfile: otherUser,
      messages: [mockMessage],
    }))
    .mockImplementation(() => ({
      otherUserProfile: otherUser,
      messages: [mockMessage],
    })),
}));
jest.mock('@/utils/apiFunctions', () => ({
  ...jest.requireActual('@/utils/apiFunctions'),
  getMessages: jest
    .fn()
    .mockImplementationOnce(() => ({
      messages: [],
    }))
    .mockImplementation(() => ({
      messages: [mockMessage],
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

describe('MessageThreadPage Page', () => {
  it('displays a message when you are not logged in', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MessageThreadPage initialMessages={[mockMessage]} otherUser={otherUser} />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });
  it('renders page', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MessageThreadPage initialMessages={[mockMessage]} otherUser={otherUser} />
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
      query: {
        id: 'testID',
      },
    };
    // @ts-ignore
    const result = await getServerSideProps(context);
    const expectedResult = JSON.stringify({
      props: {
        initialMessages: [mockMessage],
        otherUser,
      },
    });
    expect(JSON.stringify(result)).toEqual(expectedResult);
  });
  it('handles load more - no results', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MessageThreadPage initialMessages={[mockMessage]} otherUser={otherUser} />
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
          <MessageThreadPage initialMessages={[mockMessage]} otherUser={otherUser} />
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
          <MessageThreadPage initialMessages={[mockMessage]} otherUser={otherUser} />
        </IntlProvider>,
      );
    });
    const btnRefresh = await screen.findByTestId('btn-refresh');
    act(() => {
      fireEvent(
        btnRefresh,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('renders message from another user', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MessageThreadPage
            initialMessages={[
              {
                ...mockMessage,
                fromUserID: otherUser.id,
              },
            ]}
            otherUser={otherUser}
          />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });
});
