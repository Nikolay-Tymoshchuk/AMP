import { Suspense } from 'react';
import { Montserrat, Overpass, Nunito_Sans } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import Provider from './provider';
import { DESCRIPTION, NEXTAUTH_URL, TITLE } from '@/config';

import type { Metadata } from 'next';
import '../src/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-montserrat',
  display: 'swap',
});
const overpass = Overpass({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-overpass',
  display: 'swap',
});
const nunitoSans = Nunito_Sans({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL as string),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    type: 'website',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: TITLE,
      },
    ],
    url: NEXTAUTH_URL,
    locale: 'uk_UA',
    description: TITLE,
  },
  icons: [
    {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
      rel: 'apple-touch-icon',
    },
    {
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
      rel: 'icon',
    },
    {
      url: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
      rel: 'icon',
    },
    {
      url: '/safari-pinned-tab.svg',
      color: '#5bbad5',
      rel: 'mask-icon',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="uk">
        <body
          className={`${montserrat.variable} ${overpass.variable} ${nunitoSans.variable}`}
        >
          {' '}
          <Suspense>
            <Provider>{children}</Provider>
          </Suspense>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </body>
      </html>
    </Provider>
  );
}
