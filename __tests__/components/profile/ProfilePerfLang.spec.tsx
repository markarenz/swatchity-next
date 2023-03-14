import ProfilePerfLang from '@/components/profile/ProfilePerfLang';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

const mockProps = {
  perfLang: 'auto',
  setFormData: jest.fn((f: Function) => {
    f();
  }),
};

describe('ProfilePerfLang', () => {
  it('renders component', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfilePerfLang {...mockProps} />
        </IntlProvider>,
      );
    });
    const select = await screen.findByTestId('lang-select');
    if (select) {
      await waitFor(() =>
        fireEvent.change(select, {
          target: { value: 'en' },
        }),
      );
    }
  });
});
