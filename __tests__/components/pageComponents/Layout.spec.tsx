import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Layout from '@/components/pageComponents/Layout';
import messages from '@/locale/en-US.json';
import mockUserData from '../../__fixtures__/mockUserMeta';

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest.fn(() => ({
    userMeta: mockUserData,
  })),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/test',
  })),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest
    .fn()
    .mockReturnValueOnce({
      data: {
        email: 'email@test.com',
      },
    })
    .mockReturnValueOnce({
      data: null,
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

describe('Layout', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Layout pageMeta={mocks.pageMeta} subNavData={mocks.subNavData}>
          <div>Page Content</div>
        </Layout>
      </IntlProvider>,
    );
    const element = screen.queryByTestId('layout-base');
    expect(element).toBeInTheDocument();
  });

  it('renders sessionLoading while session is loading', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Layout pageMeta={mocks.pageMeta} subNavData={mocks.subNavData}>
          <div>Page Content</div>
        </Layout>
      </IntlProvider>,
    );
    const element = screen.queryByTestId('loading-session');
    expect(element).toBeInTheDocument();
  });
});
