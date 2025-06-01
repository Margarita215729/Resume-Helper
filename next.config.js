/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server-side features for Azure Container Apps deployment
  // API routes, middleware, and authentication require dynamic rendering
  
  // Enable standalone output for Docker/Container optimization
  // This creates a self-contained build with all dependencies included
  output: 'standalone',
  
  // Disable static export for server-side features
  // output: 'export', // Commented out - incompatible with API routes and auth
  
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
