import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

const Footer = () => (
  <footer
    className="fixed bottom-0 py-1 w-full text-center text-gray-2 text-sm"
    style={{ zIndex: 11 }}
  >
    &copy;{new Date().getFullYear()} All Rights Reserved -{' '}
    <Link href="/privacy-policy" className="text-gray-2">
      <FormattedMessage id="footer__privacy_polciy" />
    </Link>{' '}
    -{' '}
    <Link href="/terms-of-service" className="text-gray-2">
      <FormattedMessage id="footer__terms" />
    </Link>
  </footer>
);

export default Footer;
