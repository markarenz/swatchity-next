import ProfileColorEdit from '@/components/profile/ProfileColorEdit';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

const mockProps = {
  color: {
    r: 100,
    g: 100,
    b: 100,
  },
  handleClick: jest.fn(),
  isSelected: true,
  idx: 1,
};

describe('ProfileColorEdit', () => {
  it('renders component', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileColorEdit {...mockProps} />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('avatar-color-btn-1');
    expect(element).toBeInTheDocument();
  });
  it('calls click function when clicked', async () => {
    await act(async () => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ProfileColorEdit {...mockProps} />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('avatar-color-btn-1');
    await waitFor(() => {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(mockProps.handleClick).toHaveBeenCalled();
  });
});
