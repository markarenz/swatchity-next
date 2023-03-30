import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { UserContextProvider, useUserContext } from '@/context/UserContext';
import { SessionProvider } from 'next-auth/react';
import mockUserData from '../__fixtures__/mockUserMeta';
import mockSwatch from '../__fixtures__/mockSwatch';
import mockNewsPost from '../__fixtures__/mockNewsPost';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    locale: 'en-US',
  })),
}));

jest.mock('@/utils/apiFunctions', () => ({
  getUserMeta: jest.fn((email) =>
    email === 'email@domain.com'
      ? {
          email: 'email@domain.com',
          name: 'Test Name',
          username: 'test-name',
        }
      : null,
  ),
  createUserMeta: jest.fn(() => ({
    email: 'test@domain.com',
    name: 'Test User',
    username: 'test-user',
  })),
  getSidebarContent: jest.fn(() => ({
    posts: [mockNewsPost],
    swatches: [mockSwatch],
    usermta: [mockUserData],
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
const mockSessionUserExists = {
  ...mockSession,
  user: {
    email: 'email@domain.com',
    name: 'jeffrafter',
  },
};

describe('UserContext', () => {
  it('renders user context when user does not exist', async () => {
    await act(async () => {
      render(
        <SessionProvider session={mockSession}>
          <UserContextProvider>
            <div>Test</div>
          </UserContextProvider>
        </SessionProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });
  it('renders user context when user does exist', async () => {
    await act(async () => {
      render(
        <SessionProvider session={mockSessionUserExists}>
          <UserContextProvider>
            <div>Test</div>
          </UserContextProvider>
        </SessionProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('renders user context when user does exist', async () => {
    const TestComponent = () => {
      const { isNewUser } = useUserContext();
      return (
        <SessionProvider session={mockSession}>
          <UserContextProvider>
            <div>OK {isNewUser ? 'New' : 'Not New'}</div>
          </UserContextProvider>
        </SessionProvider>
      );
    };

    await act(async () => {
      render(<TestComponent />);
    });
    expect(screen).toMatchSnapshot();
  });
});
