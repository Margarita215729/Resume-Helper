/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled static export to enable API routes for authentication and production features
  // Server-side features like middleware, API routes, and authentication require dynamic rendering
  
  // Enable standalone output for Docker optimization
  // This creates a self-contained build with all dependencies included
  output: 'standalone',
  
  // Turbopack configuration (stable in Next.js 15+)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
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
