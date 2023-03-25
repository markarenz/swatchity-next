import MessageThreadListItem from '@/components/common/MessageThreadListItem';
import { render, screen } from '@testing-library/react';
import { mockMessageThread } from '../../__fixtures__/mockMessageThread';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

jest.useFakeTimers().setSystemTime(new Date('2023-03-04T22:22:51.201+00:00'));
const mockDateStr = '2023-03-02T22:22:51.201+00:00';
const mockDateStr2 = '2023-02-10T21:42:46.580+00:00';
describe('MessageThreadListItem', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <MessageThreadListItem
          thread={mockMessageThread}
          lastVisitStr={mockDateStr}
          userID={mockMessageThread.toUserID}
        />
      </IntlProvider>,
    );
    expect(screen).toMatchSnapshot();
  });

  it('renders component with to and from flipped', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <MessageThreadListItem
          thread={mockMessageThread}
          lastVisitStr={mockDateStr2}
          userID={mockMessageThread.fromUserID}
        />
      </IntlProvider>,
    );
    expect(screen).toMatchSnapshot();
  });
});
