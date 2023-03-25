import { render, screen, act } from '@testing-library/react';
import AdminHome from '@/pages/admin';
import { SessionProvider } from 'next-auth/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockUserData from '../../__fixtures__/mockUserMeta';

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest
    .fn()
    .mockImplementation(() => ({ userMeta: { ...mockUserData, role: 'admin' } })),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    pathname: '/',
    push: jest.fn(),
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

describe('Admin Home Page', () => {
  it('renders page', () => {
    act(() => {
      render(
        <SessionProvider session={mockSession}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <AdminHome />
          </IntlProvider>
        </SessionProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });
});
