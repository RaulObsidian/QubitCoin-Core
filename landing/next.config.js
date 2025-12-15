/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Aseguramos que los assets se carguen desde la raíz relativa
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;