import React from 'react';
import { render, act, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserContextProvider, useUserContext } from '@/context/UserContext';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

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
          <UserContextProvider locale="en-US">
            <div>Test</div>
          </UserContextProvider>
        </SessionProvider>,
      );
    });
    // const element = await screen.findByTestId('grid-wrap');
    // expect(element).toBeInTheDocument();
    // expect(element).toMatchSnapshot();
  });
  it('renders user context when user does exist', async () => {
    await act(async () => {
      render(
        <SessionProvider session={mockSessionUserExists}>
          <UserContextProvider locale="en-US">
            <div>Test</div>
          </UserContextProvider>
        </SessionProvider>,
      );
    });
    // const element = await screen.findByTestId('grid-wrap');
    // expect(element).toBeInTheDocument();
    // expect(element).toMatchSnapshot();
  });

  it('renders user context when user does exist', async () => {
    const TestComponent = () => {
      const { isNewUser } = useUserContext();
      return (
        <SessionProvider session={mockSession}>
          <UserContextProvider locale="en-US">
            <div>OK {isNewUser ? 'New' : 'Not New'}</div>
          </UserContextProvider>
        </SessionProvider>
      );
    };

    await act(async () => {
      render(<TestComponent />);
    });
    // const element = await screen.findByTestId('grid-wrap');
    // expect(element).toBeInTheDocument();
    // expect(element).toMatchSnapshot();
  });
});
