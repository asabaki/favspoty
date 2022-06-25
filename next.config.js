/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['scontent.fixm3-1.fna.fbcdn.net', 'mosaic.scdn.co'],
  },
  output: 'standalone'
}

module.exports = nextConfig
