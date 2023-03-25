import { render, screen, act } from '@testing-library/react';
import NotFound from '@/pages/404';
import { SessionProvider } from 'next-auth/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

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

describe('404 Page', () => {
  it('renders page', () => {
    act(() => {
      render(
        <SessionProvider session={mockSession}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <NotFound />
          </IntlProvider>
        </SessionProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });
});
