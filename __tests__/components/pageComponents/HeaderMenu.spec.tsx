import { render, screen, fireEvent } from '@testing-library/react';
import HeaderMenu from '@/components/pageComponents/HeaderMenu';
import * as nextAuthReact from 'next-auth/react';
import { IntlProvider } from 'react-intl';
import fetchMock from 'jest-fetch-mock';
import messages from '@/locale/en-US.json';
import mockUserData from '../../__fixtures__/mockUserMeta';

const signInSpy = jest.spyOn(nextAuthReact, 'signIn');

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest
    .fn()
    .mockImplementation(() => ({ userMeta: mockUserData })) // other runs - logged in
    .mockImplementationOnce(() => ({ userMeta: null })) // 1st run - not logged in
    .mockImplementationOnce(() => ({ userMeta: null })), // 2nd run - not logged in
}));

beforeEach(() => {
  fetchMock.doMock();
  const mockResponse = {
    success: true,
    userMeta: {
      email: 'email@domain.com',
    },
  };
  fetchMock.mockOnce(JSON.stringify(mockResponse));
});

describe('Header Menu', () => {
  it('renders not logged in', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <HeaderMenu />
      </IntlProvider>,
    );
    const element = await screen.findByTestId('btn-signin');
    expect(element).toBeInTheDocument();
    const profileNav = screen.queryByTestId('profile-nav');
    expect(profileNav).not.toBeInTheDocument();
  });
  it('handles sign in click - not signed in', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <HeaderMenu />
      </IntlProvider>,
    );
    const element = await screen.findByTestId('btn-signin');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(signInSpy).toHaveBeenCalled();
  });
  it('renders component - logged in', async () => {
    render(
      <IntlProvider messages={messages} locale="en-US" defaultLocale="en-US">
        <HeaderMenu />
      </IntlProvider>,
    );
    const profileNav = await screen.findByTestId('profile-nav');
    expect(profileNav).toBeInTheDocument();
  });
});
