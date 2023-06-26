/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      '1000logos.net', 
      'www.google.com', 
      "onyxinitiative.org",
      "www.mckinsey.com",
      "media.licdn.com",
      "asset.brandfetch.io",
      "logo.clearbit.com",
      "media.glassdoor.com",
      "upload.wikimedia.org",
      "https://media.licdn.com"
    ],
  }
}

module.exports = nextConfig
