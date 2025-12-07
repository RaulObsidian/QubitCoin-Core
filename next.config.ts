import createNextIntlPlugin from 'next-intl/plugin';

// Apunta al archivo que acabamos de mover a src/
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  output: 'standalone'
};

export default withNextIntl(nextConfig);
