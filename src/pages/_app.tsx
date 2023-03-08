import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from '@/context/UserContext';
import messages, { getLangPackKey, defaultLocale } from '@/locale';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const { locale } = useRouter();
  const msg = messages[getLangPackKey(locale || defaultLocale)];
  const session = pageProps?.session;
  return (
    <SessionProvider session={session}>
      <IntlProvider messages={msg} locale={locale || defaultLocale} defaultLocale="en">
        <UserContextProvider locale={locale || defaultLocale}>
          <div>
            <Component {...pageProps} />
            <ToastContainer />
          </div>
        </UserContextProvider>
      </IntlProvider>
    </SessionProvider>
  );
}
