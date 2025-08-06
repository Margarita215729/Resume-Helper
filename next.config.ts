import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'
const repoName = 'Resume-Helper'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
