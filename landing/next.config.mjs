import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @--- {import('next').NextConfig} */
const nextConfig = {
  // Opcional: configuraciones extra si son necesarias
};

export default withNextIntl(nextConfig);