import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { subNavLinksFeed } from '@/constants';
import messages from '@/locale/en-US.json';
import SubNav from '@/components/pageComponents/SubNav';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/test',
  })),
}));

describe('SubNav', () => {
  it('renders the component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <SubNav subNavData={subNavLinksFeed} />
      </IntlProvider>,
    );
  });
});
