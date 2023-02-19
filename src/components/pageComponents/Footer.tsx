import Link from 'next/link';

const Footer = () => (
  <footer className="fixed bottom-0 py-1 w-full text-center text-gray-2 text-sm">
    &copy;{new Date().getFullYear()} All Rights Reserved -{' '}
    <Link href="/privacy-policy" className="text-gray-2">
      Privacy Policy
    </Link>{' '}
    -{' '}
    <Link href="/terms-of-service" className="text-gray-2">
      Terms of Service
    </Link>
  </footer>
);

export default Footer;
