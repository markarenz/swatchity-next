import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import * as nextAuthReact from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';
import messages from '@/locale/en-US.json';
import mockUserData from '../../__fixtures__/mockUserMeta';
import ProfileMenu from '@/components/pageComponents/ProfileMenu';

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest.fn().mockImplementation(() => ({ checkUserMeta: jest.fn() })),
}));

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));
const signOutSpy = jest.spyOn(nextAuthReact, 'signOut');

beforeEach(() => {
  fetchMock.doMock();
});

describe('ProfileMenu', () => {
  it('renders the component', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <ProfileMenu userMeta={mockUserData} />
      </IntlProvider>,
    );
    const element = await screen.findByTestId('profile-menu');
    expect(element).toBeInTheDocument();
  });

  it('handles clicks to toggle menu and log out', async () => {
    fetchMock.mockOnce(JSON.stringify({}));
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <ProfileMenu userMeta={mockUserData} />
      </IntlProvider>,
    );
    const element = document.querySelector('button');
    expect(element).toBeInTheDocument();
    if (element) {
      await waitFor(() => {
        fireEvent(
          element,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        );
      });
      const btnSignout = await screen.findByTestId('btn-signout');
      fireEvent(
        btnSignout,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(signOutSpy).toHaveBeenCalled();
  });
});
