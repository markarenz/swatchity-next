import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import Footer from '@/components/pageComponents/Footer';

describe('Footer', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Footer />
      </IntlProvider>,
    );
    const element = document.querySelector('a');
    expect(element).toBeInTheDocument();
  });
});
