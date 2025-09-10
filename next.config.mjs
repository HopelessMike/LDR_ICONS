// next.config.mjs
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    instrumentationHook: false
  },
  
  // Rewrites per gestire il mounting path
  async rewrites() {
    return [
      { source: '/ldr-icons', destination: '/' },
      { source: '/ldr-icons/:path*', destination: '/:path*' },
    ];
  },
};

// IMPORTANTE: Usa withMicrofrontends invece di export default
export default withMicrofrontends(nextConfig);