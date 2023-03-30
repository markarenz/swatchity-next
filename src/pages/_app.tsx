import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from '@/context/UserContext';
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
  const session = pageProps?.session;
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <div>
          <Script
            id="google-analytics-tag"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID}`}
          />
          <Script strategy="lazyOnload" id="google-analytics-stream">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_DATA_STREAM_ID}');
              `}
          </Script>
          <Component {...pageProps} />
          <ToastContainer />
        </div>
      </UserContextProvider>
    </SessionProvider>
  );
}
