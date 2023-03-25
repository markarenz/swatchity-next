import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import AdminProtected from '@/components/common/AdminProtected';
import mockUserData from '../../__fixtures__/mockUserMeta';

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest
    .fn()
    .mockImplementationOnce(() => ({ userMeta: { ...mockUserData, role: 'admin' } }))
    .mockImplementation(() => ({ userMeta: mockUserData })),
}));

describe('AdminProtected', () => {
  it('renders the component - admin', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <AdminProtected>
          <div data-testid="content">TEST</div>
        </AdminProtected>
      </IntlProvider>,
    );
    expect(screen).toMatchSnapshot();
  });
  it('renders the component - not admin', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <AdminProtected>
          <div data-testid="content">TEST</div>
        </AdminProtected>
      </IntlProvider>,
    );
    expect(screen).toMatchSnapshot();
  });
});
