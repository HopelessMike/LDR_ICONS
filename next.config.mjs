// next.config.mjs — progetto ldr-icons
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  // CONFIGURAZIONE CHIAVE PER MICROFRONTEND
  basePath: '/ldr-icons',
  
  // Opzionale: se hai ancora problemi con gli asset statici, aggiungi:
  // assetPrefix: '/ldr-icons',
  
  // RIMUOVI i rewrites - non servono quando usi basePath
  // I rewrites che avevi configurato sono inutili e possono creare conflitti
};

export default nextConfig;