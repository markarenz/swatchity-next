/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/feed',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // publicRuntimeConfig: {
  //   version,
  // },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

module.exports = nextConfig;
