import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import MessageThreads, { getServerSideProps } from '@/pages/messages/';
import { createRequest, createResponse } from 'node-mocks-http';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockSwatch from '../../__fixtures__/mockSwatch';
import { mockReplyExt } from '../../__fixtures__/mockReply';
import mockUserData from '../../__fixtures__/mockUserMeta';
import { mockMessageThread } from '../../__fixtures__/mockMessageThread';

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
  useUserContext: jest.fn(() => ({
    userMeta: mockUserData,
    checkUserMeta: jest.fn(),
  })),
}));

jest.mock('@/utils/dbFunctions', () => ({
  getMessageThreads: jest.fn().mockImplementation(() => ({
    threads: [mockMessageThread],
  })),
}));
jest.mock('@/utils/apiFunctions', () => ({
  ...jest.requireActual('@/utils/apiFunctions'),
  getSwatches: jest.fn(() => ({
    likes: initialSwatchLikes,
    swatches: initialSwatches,
  })),
  createReply: jest.fn(() => ({
    reply: mockReplyExt,
    numReplies: 1,
  })),
  getReplies: jest
    .fn()
    .mockImplementationOnce(() => ({
      replies: [],
      replyLikes: [],
    }))
    .mockImplementation(() => ({
      replies: [mockReplyExt],
      replyLikes: [mockReplyExt.id],
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

describe('MessageThreads Page', () => {
  it('renders page', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MessageThreads threads={[mockMessageThread]} />
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
    // @ts-ignore
    const result = await getServerSideProps(context);
    const expectedResult = JSON.stringify({
      props: {
        threads: [mockMessageThread],
      },
    });
    expect(JSON.stringify(result)).toEqual(expectedResult);
  });
});
