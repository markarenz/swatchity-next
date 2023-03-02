import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

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

describe('Home Page', () => {
  it('renders page', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Home />
      </IntlProvider>,
    );
  });
  expect(screen).toMatchSnapshot();
});
