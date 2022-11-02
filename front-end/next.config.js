/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.countryflagicons.com"],
  },
};

module.exports = nextConfig;
