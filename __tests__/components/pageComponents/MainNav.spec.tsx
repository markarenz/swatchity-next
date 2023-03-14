import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import MainNav from '@/components/pageComponents/MainNav';
import mockUserData from '../../__fixtures__/mockUserMeta';

const mockuserDataAlertsMessages = {
  ...mockUserData,
  lastAlert: new Date('2023-02-12T21:42:46.580+00:00'),
  lastMessage: new Date('2023-02-12T21:42:46.580+00:00'),
};
jest.mock('@/context/UserContext', () => ({
  useUserContext: jest.fn(() => ({
    userMeta: mockuserDataAlertsMessages,
  })),
}));

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest
    .fn()
    .mockImplementation(() => ({ userMeta: mockuserDataAlertsMessages }))
    .mockImplementationOnce(() => ({ userMeta: null })),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/test',
    push: jest.fn(),
  })),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest
    .fn()
    .mockReturnValueOnce({
      data: undefined,
    })
    .mockReturnValueOnce({
      data: {
        email: 'email@test.com',
      },
    }),
}));

const mocks = {
  pageMeta: {
    title: 'Test Title',
    metadesc: 'Test metadesc',
  },
  subNavData: [
    {
      href: '/test',
      labelKey: 'header__subNav__feed__home',
    },
  ],
};

describe('MainNav', () => {
  it('renders component with unread messages and alerts', async () => {
    act(() => {
      // global.localStorage.getItem;
      Storage.prototype.getItem = jest.fn().mockReturnValue(null);
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MainNav />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('main_nav__search');
    expect(element).toBeInTheDocument();
  });

  it('renders component with unread messages and alerts - local values exist', async () => {
    act(() => {
      // global.localStorage.getItem;
      Storage.prototype.getItem = jest.fn().mockReturnValue('2023-02-10T21:42:46.580+00:00');
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MainNav />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('main_nav__search');
    expect(element).toBeInTheDocument();
  });

  it('renders component', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MainNav />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('main_nav__search');
    expect(element).toBeInTheDocument();
  });

  it('renders component - open and close search', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MainNav />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('main_nav__search');
    act(() => {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    await waitFor(async () => {
      const btnClose = await screen.findByLabelText('Close');
      fireEvent(
        btnClose,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });
  it('renders component - search select color', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MainNav />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('main_nav__search');
    act(() => {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    await waitFor(async () => {
      const btnOk = await screen.findByTestId('picker-btn-ok');
      fireEvent(
        btnOk,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });
});
