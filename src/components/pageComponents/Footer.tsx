import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
  return (
    <footer
      className="fixed bottom-0 py-1 w-full text-center text-gray-2 text-sm"
      style={{ zIndex: 11 }}
    >
      <span>&copy;{new Date().getFullYear()} All Rights Reserved</span> -{' '}
      <Link href="/privacy-policy" className="text-gray-2 inline-block" prefetch={false}>
        <FormattedMessage id="footer__privacy_policy" />
      </Link>
    </footer>
  );
};

export default Footer;
