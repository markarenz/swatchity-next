import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import ThreadPage, { getServerSideProps } from '@/pages/swatch/[id]';
import { createRequest, createResponse } from 'node-mocks-http';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockSwatch from '../../__fixtures__/mockSwatch';
import { mockReplyExt } from '../../__fixtures__/mockReply';
import mockUserData from '../../__fixtures__/mockUserMeta';

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
  })),
}));

jest.mock('@/utils/dbFunctions', () => ({
  getSwatchesDB: jest.fn(() => ({
    likes: initialSwatchLikes,
    swatches: initialSwatches,
  })),
  getSwatchThreadDB: jest
    .fn()
    .mockImplementationOnce(() => ({
      swatch: null,
      swatchLikes: [mockSwatch.id],
      replies: [mockReplyExt],
      replyLikes: [mockReplyExt.id],
    }))
    .mockImplementation(() => ({
      swatch: mockSwatch,
      swatchLikes: [mockSwatch.id],
      replies: [mockReplyExt],
      replyLikes: [mockReplyExt.id],
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

describe('Thread Page', () => {
  it('renders page', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ThreadPage
            initialReplies={initialReplies}
            initialReplyLikes={initialReplyLikes}
            initialSwatches={initialSwatches}
            initialSwatchLikes={initialSwatchLikes}
          />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });
  it('returns null when no swatch is provided', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ThreadPage
            initialReplies={initialReplies}
            initialReplyLikes={initialReplyLikes}
            initialSwatches={[]}
            initialSwatchLikes={initialSwatchLikes}
          />
        </IntlProvider>,
      );
    });
  });
  it('GetServerSideProps - bad swatch ID', async () => {
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
        initialSwatches: [],
        initialSwatchLikes,
        initialReplies,
        initialReplyLikes,
      },
    });
    expect(JSON.stringify(result)).toEqual(expectedResult);
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
        id: mockSwatch.id,
      },
    };
    // @ts-ignore
    const result = await getServerSideProps(context);
    const expectedResult = JSON.stringify({
      props: {
        initialSwatches,
        initialSwatchLikes,
        initialReplies,
        initialReplyLikes,
      },
    });
    expect(JSON.stringify(result)).toEqual(expectedResult);
  });

  it('handles new reply flow - cancel', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ThreadPage
            initialReplies={initialReplies}
            initialReplyLikes={initialReplyLikes}
            initialSwatches={initialSwatches}
            initialSwatchLikes={initialSwatchLikes}
          />
        </IntlProvider>,
      );
    });
    const btnNew = await screen.findByTestId('feed-btn-reply');
    act(() => {
      fireEvent(
        btnNew,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    const btnClose = document.querySelector('#reply-feed .colorPicker .pickerClose');
    if (btnClose) {
      fireEvent(
        btnClose,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(screen).toMatchSnapshot();
  });
  it('handles new reply flow - complete', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ThreadPage
            initialReplies={initialReplies}
            initialReplyLikes={initialReplyLikes}
            initialSwatches={initialSwatches}
            initialSwatchLikes={initialSwatchLikes}
          />
        </IntlProvider>,
      );
    });
    const btnNew = await screen.findByTestId('feed-btn-reply');
    act(() => {
      fireEvent(
        btnNew,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    const btnOK = document.querySelector('#reply-feed .colorPicker .pickerOK');
    if (btnOK) {
      fireEvent(
        btnOK,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(screen).toMatchSnapshot();
  });

  it('handles load more - no results', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ThreadPage
            initialReplies={initialReplies}
            initialReplyLikes={initialReplyLikes}
            initialSwatches={initialSwatches}
            initialSwatchLikes={initialSwatchLikes}
          />
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
  });

  it('handles load more', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ThreadPage
            initialReplies={initialReplies}
            initialReplyLikes={initialReplyLikes}
            initialSwatches={initialSwatches}
            initialSwatchLikes={initialSwatchLikes}
          />
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
  });

  it('handles refresh', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ThreadPage
            initialReplies={initialReplies}
            initialReplyLikes={initialReplyLikes}
            initialSwatches={initialSwatches}
            initialSwatchLikes={initialSwatchLikes}
          />
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
  });
});
