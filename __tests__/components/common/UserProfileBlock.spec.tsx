import UserProfileBlock from '@/components/common/UserProfileBlock';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockUserData from '../../__fixtures__/mockUserMeta';

const mockOtherUser = {
  ...mockUserData,
  id: 'stuv6769',
  name: 'Other user',
  username: 'otherUsername',
  email: 'other@domain.com',
};
jest.mock('@/utils/apiFunctions', () => ({
  createMessage: jest.fn(),
}));
jest.mock('@/context/UserContext', () => ({
  useUserContext: jest
    .fn()
    .mockImplementation(() => ({ userMeta: mockUserData, checkUserMeta: jest.fn() })),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    pathname: '/',
    push: jest.fn(),
  })),
}));

describe('UserProfileBioDisplay', () => {
  it('renders component - profile mode', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <UserProfileBlock userProfile={mockOtherUser} mode="profile" />
      </IntlProvider>,
    );
  });

  it('renders component - messages mode', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <UserProfileBlock userProfile={mockOtherUser} mode="messages" />
      </IntlProvider>,
    );
  });
  it('renders component - inactive', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <UserProfileBlock userProfile={{ ...mockOtherUser, active: false }} mode="messages" />
      </IntlProvider>,
    );
  });
  it('renders component - empty bio', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <UserProfileBlock userProfile={{ ...mockOtherUser, bio: '' }} mode="messages" />
      </IntlProvider>,
    );
  });

  it('handles message flow - cancel', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <UserProfileBlock userProfile={mockOtherUser} mode="messages" />
      </IntlProvider>,
    );
    const element = await screen.findByTestId('profile-block-message');
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
      const btnOk = await screen.findByTestId('picker-close');
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

  it('handles message flow - complete', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <UserProfileBlock userProfile={mockOtherUser} mode="messages" />
      </IntlProvider>,
    );
    const element = await screen.findByTestId('profile-block-message');
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
