import ProfileUsername from '@/components/profile/ProfileUsername';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

jest.useFakeTimers();

jest.mock('@/utils/apiFunctions', () => ({
  ...jest.requireActual('@/utils/apiFunctions'),
  checkUsername: jest.fn().mockReturnValue(true),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const mockProps = {
  username: 'Test Name',
  setFormData: jest.fn((f: Function) => {
    f();
  }),
};
describe('ProfileUsername', () => {
  it('renders component', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileUsername {...mockProps} />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('profile-username');
    expect(element).toBeInTheDocument();
  });

  it('handles userame change', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileUsername {...mockProps} />
        </IntlProvider>,
      );
    });
    const input = await screen.findByTestId('profile-username-input');
    await act(() =>
      fireEvent.change(input, {
        target: { value: 'new-username' },
      }),
    );
    // act(() => {
    //   jest.advanceTimersToNextTimer();
    // });
    expect(mockProps.setFormData).toHaveBeenCalledTimes(1);
  });
  it('handles userame change - short username', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileUsername {...mockProps} />
        </IntlProvider>,
      );
    });
    const input = await screen.findByTestId('profile-username-input');
    await act(() =>
      fireEvent.change(input, {
        target: { value: 'n' },
      }),
    );
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(mockProps.setFormData).toHaveBeenCalledTimes(2);
  });
});
