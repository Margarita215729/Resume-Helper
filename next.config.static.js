/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration for GitHub Pages
  output: 'export',
  
  // Disable server-side features for static hosting
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Configure for GitHub Pages subdirectory
  basePath: '/Resume-Helper',
  assetPrefix: '/Resume-Helper/',
  
  // Image optimization for static export
  images: {
    unoptimized: true,
  },
  
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
  
  // Disable server-side features
  // API routes and middleware won't work with static export
}

export default nextConfig
