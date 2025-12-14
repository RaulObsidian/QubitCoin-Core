import {notFound} from 'next/navigation';
import {routing} from '../../i18n';
import NextIntlProviderWrapper from '../../src/providers/NextIntlProviderWrapper';
import {getMessages} from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const {locale} = params;

  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Load messages for the current locale
  const messages = await getMessages({locale});

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gradient-to-br from-nebulae-black to-black">
        <NextIntlProviderWrapper locale={locale} messages={messages}>
          {children}
        </NextIntlProviderWrapper>
      </body>
    </html>
  );
}