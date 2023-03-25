import ProfileName from '@/components/profile/ProfileName';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import { ProfileFormFields } from '@/types';

const mockProps = {
  name: 'Test Name',
  setFormData: jest.fn((f: Function) => {
    f();
  }),
};
describe('ProfileName', () => {
  it('renders component', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileName {...mockProps} />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('profile-edit-name');
    expect(element).toBeInTheDocument();
  });
  it('handles update', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileName {...mockProps} />
        </IntlProvider>,
      );
    });
    const input = document.querySelector('input');
    if (input) {
      await waitFor(() =>
        fireEvent.change(input, {
          target: { value: 'New Value' },
        }),
      );
    }
    expect(mockProps.setFormData).toHaveBeenCalled();
  });
});
