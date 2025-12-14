'use client';

import {NextIntlClientProvider} from 'next-intl/client';
import {ReactNode} from 'react';

export function NextIntlWrapper({
  children,
  locale,
  messages
}: {
  children: ReactNode;
  locale: string;
  messages: {[key: string]: any};
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}