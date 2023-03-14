import ProfileBioEdit from '@/components/profile/ProfileBioEdit';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

const mockProps = {
  bio: 'yrb',
  setFormData: jest.fn((f: Function) => {
    f();
  }),
};

describe('ProfileBioEdit', () => {
  it('renders component', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileBioEdit {...mockProps} />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('profile-edit-bio');
    expect(element).toBeInTheDocument();
  });

  it('handles click to add color', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileBioEdit {...mockProps} />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('profile-edit-btn-1');
    await waitFor(() => {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(mockProps.setFormData).toHaveBeenCalled();
  });

  it('handles click to remove color', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileBioEdit {...mockProps} />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('chip-1');
    await waitFor(() => {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(mockProps.setFormData).toHaveBeenCalled();
  });
});
