import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import AlertPost from '@/components/common/AlertPost';
import mockAlert from '../../__fixtures__/mockAlert';

describe('AlertSkeleton', () => {
  it('renders the component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <AlertPost alert={mockAlert} lastVisitStr={mockAlert.createdAt.toISOString()} />
      </IntlProvider>,
    );
  });
  expect(screen).toMatchSnapshot();
});
