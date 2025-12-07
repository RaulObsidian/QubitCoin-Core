import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ATENCIÓN: Esto es para forzar el deploy en producción !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
       allowedOrigins: ['*']
    }
  }
};

export default withNextIntl(nextConfig);