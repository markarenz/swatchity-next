import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Profile from '@/pages/profile';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockUserMeta from '../__fixtures__/mockUserMeta';
import { updateUserProfile } from '@/utils/apiFunctions';

jest.useFakeTimers();

jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/utils/apiFunctions', () => ({
  ...jest.requireActual('@/utils/apiFunctions'),
  updateUserProfile: jest.fn().mockReturnValueOnce(false).mockReturnValue(true),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn().mockReturnValue({
    session: {
      email: 'email@test.com',
    },
  }),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/profile',
  })),
}));

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest.fn(() => ({
    userMeta: mockUserMeta,
    updateUserMeta: jest.fn(),
  })),
}));

describe('Profile Page', () => {
  it('renders page', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Profile />
      </IntlProvider>,
    );
    expect(screen).toMatchSnapshot();
  });

  it('handles OK button click when dirty - error on save', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <Profile />
        </IntlProvider>,
      );
    });
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    const input = await screen.findByTestId('field__name');
    if (input) {
      await act(async () => {
        await waitFor(() =>
          fireEvent.change(input, {
            target: { value: 'New Name' },
          }),
        );
      });
      act(() => {
        jest.advanceTimersToNextTimer();
      });
      // FormData should now be "dirty"
      await act(async () => {
        const element = await screen.findByTestId('profile-ok');
        fireEvent(
          element,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        );
      });
      act(() => {
        jest.advanceTimersToNextTimer();
      });

      // expect(element).toBeInTheDocument();
    }
  });

  it('handles OK button click when dirty - success', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <Profile />
        </IntlProvider>,
      );
    });
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    const input = await screen.findByTestId('field__name');
    if (input) {
      await act(async () => {
        await waitFor(() =>
          fireEvent.change(input, {
            target: { value: 'New Name' },
          }),
        );
      });
      act(() => {
        jest.advanceTimersToNextTimer();
      });
      // FormData should now be "dirty"
      await act(async () => {
        const element = await screen.findByTestId('profile-ok');

        fireEvent(
          element,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        );
      });
      act(() => {
        jest.advanceTimersToNextTimer();
      });

      // expect(element).toBeInTheDocument();
    }
  });

  // useEffect(change userMeta) setFormData
  // handleOK (isDirty: true, success from updateUserProfile() true and false)

  // submit form testid="profile-form"
});
