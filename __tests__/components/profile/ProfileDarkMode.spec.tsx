import ProfileDarkMode from '@/components/profile/ProfileDarkMode';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

const mockProps = {
  darkMode: 'auto',
  setFormData: jest.fn((f: Function) => {
    f();
  }),
};

describe('ProfilePerfLang', () => {
  it('renders component theme auto', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileDarkMode {...mockProps} />
        </IntlProvider>,
      );
    });
    const btnLight = await screen.findByTestId('btn-theme-light');
    expect(btnLight).toBeInTheDocument();
  });
  it('renders component theme dark', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileDarkMode {...mockProps} darkMode="light" />
        </IntlProvider>,
      );
    });
    const btnLight = await screen.findByTestId('btn-theme-light');
    expect(btnLight).toBeInTheDocument();
  });
  it('renders component theme dark', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileDarkMode {...mockProps} darkMode="dark" />
        </IntlProvider>,
      );
    });
    const btnLight = await screen.findByTestId('btn-theme-light');
    expect(btnLight).toBeInTheDocument();
  });

  it('handles button clicks', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileDarkMode {...mockProps} />
        </IntlProvider>,
      );
    });
    const btnLight = await screen.findByTestId('btn-theme-light');
    const btnAuto = await screen.findByTestId('btn-theme-auto');
    const btnDark = await screen.findByTestId('btn-theme-dark');
    if (btnLight) {
      fireEvent(
        btnLight,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    if (btnAuto) {
      fireEvent(
        btnAuto,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    if (btnDark) {
      fireEvent(
        btnDark,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(mockProps.setFormData).toHaveBeenCalledTimes(3);
  });
});
