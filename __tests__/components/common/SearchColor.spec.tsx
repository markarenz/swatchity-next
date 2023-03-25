import SearchColor from '@/components/common/SearchColor';
import { render, act, screen, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

const mockProps = {
  color: {
    r: 100,
    g: 125,
    b: 50,
  },
  onChange: jest.fn(),
};
describe('SearchColor', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <SearchColor {...mockProps} />
      </IntlProvider>,
    );
    expect(screen).toMatchSnapshot();
  });

  it('open and close picker', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SearchColor {...mockProps} />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('btn-search-color');
    act(() => {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    await waitFor(async () => {
      const btnClose = await screen.findByLabelText('Close');
      fireEvent(
        btnClose,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('open picker, select color', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SearchColor {...mockProps} />
        </IntlProvider>,
      );
    });
    const element = await screen.findByTestId('btn-search-color');
    act(() => {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    await waitFor(async () => {
      const btnOk = await screen.findByTestId('picker-btn-ok');
      fireEvent(
        btnOk,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });
});
