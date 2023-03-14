import UserProfileBioDisplay from '@/components/common/UserProfileBioDisplay';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';

describe('UserProfileBioDisplay', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <UserProfileBioDisplay bio="ybbr" />
      </IntlProvider>,
    );
    expect(screen).toMatchSnapshot();
  });
  //
});
