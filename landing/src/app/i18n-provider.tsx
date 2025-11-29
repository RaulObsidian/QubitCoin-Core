// src/app/i18n-provider.tsx
'use client';

import { NextIntlClientProvider } from 'next-intl';

// Proveedor de internacionalización
export default function I18nProvider({ locale, messages, children }: { locale: string; messages: any; children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}