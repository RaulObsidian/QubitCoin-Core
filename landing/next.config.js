/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sin assetPrefix, sin basePath, sin trailingSlash.
  // Dejamos que Next.js maneje las rutas nativamente.
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;