// next.config.mjs  — progetto ldr-icons
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  async rewrites() {
    return [
      // monta la home dell'app su /ldr-icons
      { source: '/ldr-icons', destination: '/' },

      // e mappa tutte le sottopagine su percorsi equivalenti interni
      { source: '/ldr-icons/:path*', destination: '/:path*' },
    ];
  },
};

export default nextConfig;
