import MessagePost from '@/components/common/MessagePost';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import { mockMessage } from '../../__fixtures__/mockMessage';

const mockProps = {
  message: mockMessage,
  name: 'Test',
};
describe('MessagePost', () => {
  it('renders component - self', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <MessagePost {...mockProps} isSelf={true} />
      </IntlProvider>,
    );
    expect(screen).toMatchSnapshot();
  });

  it('renders component - other', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <MessagePost {...mockProps} isSelf={false} />
      </IntlProvider>,
    );
    expect(screen).toMatchSnapshot();
  });
});
