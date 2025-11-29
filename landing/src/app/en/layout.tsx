// src/app/en/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import I18nProvider from '../i18n-provider';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <I18nProvider locale={params.locale} messages={messages}>
      {children}
    </I18nProvider>
  );
}