/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    // Disabilita il tracing che causa il file bloccato
    instrumentationHook: false
  },
  // per servire correttamente JS/CSS quando il child vive sotto /ldr-icons
  assetPrefix: '/ldr-icons', // opzionale ma consigliato (/_next/*)
  async rewrites() {
    return [
      { source: '/ldr-icons', destination: '/' },
      { source: '/ldr-icons/:path*', destination: '/:path*' },
    ];
  },
};
export default nextConfig;
