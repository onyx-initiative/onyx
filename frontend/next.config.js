/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['1000logos.net', 'www.google.com', "onyxinitiative.org"],
  },
}

module.exports = nextConfig
