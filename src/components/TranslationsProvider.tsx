// src/components/TranslationsProvider.tsx
'use client';

import {NextIntlClientProvider} from 'next-intl';
import {ReactNode} from 'react';

export function TranslationsProvider({
  children,
  locale,
  messages
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}