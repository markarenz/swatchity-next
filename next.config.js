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
  images: {
    domains: ['localhost:3033', 'swatchity-assets.s3.amazonaws.com'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    // loader: 'imgix',
    // path: 'https://swatchity.imgix.net/',
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

module.exports = nextConfig;
