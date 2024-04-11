/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '**',
      },
    ],
  },
  env: {
    NEXTAPI_URL: process.env.NEXTAPI_URL,
    TITLE: process.env.CLIENT_TITLE,
    DESCRIPTION: process.env.CLIENT_DOMAIN_NAME,
  },
};

export default nextConfig;
