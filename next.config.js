/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled static export to enable API routes for authentication and production features
  // Server-side features like middleware, API routes, and authentication require dynamic rendering
  
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
