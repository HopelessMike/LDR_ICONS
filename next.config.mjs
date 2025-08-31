// next.config.mjs — ldr-icons (micro app)
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // (Opzionale ma consigliato) Prefissa gli asset JS/CSS quando l'app vive sotto /ldr-icons
  // Next applicherà questo prefisso ai file sotto /_next/static
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/assetPrefix
  assetPrefix: '/ldr-icons',

  // Rewrites per gestire il montaggio sotto /ldr-icons sia
  // quando l'app è raggiunta via portfolio sia quando la visiti direttamente
  async rewrites() {
    return [
      { source: '/ldr-icons', destination: '/' },
      { source: '/ldr-icons/:path*', destination: '/:path*' },
    ];
  },
};

export default nextConfig;
