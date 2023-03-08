import TimeSince from '@/components/common/TimeSince';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

jest.useFakeTimers().setSystemTime(new Date('2023-03-04T22:22:51.201+00:00'));

describe('TimeSince', () => {
  it('renders component - years', () => {
    const mockDate = new Date('2020-03-04T22:22:51.201+00:00');
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <TimeSince inputDate={mockDate} />
      </IntlProvider>,
    );
  });
  it('renders component - days', () => {
    const mockDate = new Date('2023-03-01T22:22:51.201+00:00');
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <TimeSince inputDate={mockDate} />
      </IntlProvider>,
    );
  });
  it('renders component - hours', () => {
    const mockDate = new Date('2023-03-04T10:22:51.201+00:00');
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <TimeSince inputDate={mockDate} />
      </IntlProvider>,
    );
  });
  it('renders component - minutes', () => {
    const mockDate = new Date('2023-03-04T22:10:51.201+00:00');
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <TimeSince inputDate={mockDate} />
      </IntlProvider>,
    );
  });
  it('renders component - now', () => {
    const mockDate = new Date('2023-03-04T22:22:40.201+00:00');
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <TimeSince inputDate={mockDate} />
      </IntlProvider>,
    );
  });
});
