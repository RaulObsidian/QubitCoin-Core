import createNextIntlPlugin from 'next-intl/plugin';

// Apunta al archivo que ahora está en la raíz
const withNextIntl = createNextIntlPlugin('./i18n.ts');

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  output: 'standalone'
};

export default withNextIntl(nextConfig);
