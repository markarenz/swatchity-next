import { render, screen, act, fireEvent } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import AlertsPage, { getServerSideProps } from '@/pages/alerts';
import { createRequest, createResponse } from 'node-mocks-http';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockSwatch from '../__fixtures__/mockSwatch';
import mockUserData from '../__fixtures__/mockUserMeta';
import mockAlert from '../__fixtures__/mockAlert';

jest.useFakeTimers().setSystemTime(new Date('2023-03-04T22:22:51.201+00:00'));

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
  getAlertsDB: jest.fn(() => ({
    alerts: [mockAlert],
  })),
}));
jest.mock('@/utils/apiFunctions', () => ({
  ...jest.requireActual('@/utils/apiFunctions'),
  getAlerts: jest
    .fn()
    .mockImplementation(() => ({
      alerts: [mockAlert],
    }))
    .mockImplementationOnce(() => ({
      alerts: [],
    })),
  // getAlerts2: jest.fn(() => ({
  //   alerts: [mockAlert],
  // })),
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

describe('Alert Page Page', () => {
  it('renders page', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <AlertsPage initialAlerts={[mockAlert]} />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('renders page - has unread alerts', () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue('TEST');
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <AlertsPage initialAlerts={[mockAlert]} />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('handles load more', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <AlertsPage initialAlerts={[mockAlert]} />
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

  it('handles load more - no results', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <AlertsPage initialAlerts={[mockAlert]} />
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
          <AlertsPage initialAlerts={[mockAlert]} />
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
        initialAlerts: [mockAlert],
      },
    });
    expect(JSON.stringify(result)).toEqual(expectedResult);
  });
});
