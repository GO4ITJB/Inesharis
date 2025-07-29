/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: [
      'inesharis.se',
      'localhost', 
      'kaatdm.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inesharis.se',
        pathname: '/wp/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'kaatdm.com',
        pathname: '/sites/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/wp/:path*',
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://inesharis.se/wp'}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig 
