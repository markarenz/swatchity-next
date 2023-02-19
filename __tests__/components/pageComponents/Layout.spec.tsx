import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Layout from '@/components/pageComponents/Layout';
import messages from '@/locale/en-US.json';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/test',
  })),
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
});
