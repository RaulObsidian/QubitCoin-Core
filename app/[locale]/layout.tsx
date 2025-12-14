import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from '../../i18n';
import {NextIntlProvider} from 'next-intl';

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

  // Get messages for the current locale
  const config = await getRequestConfig({locale});
  const messages = config.messages;

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gradient-to-br from-nebulae-black to-black">
        <NextIntlProvider locale={locale} messages={messages}>
          {children}
        </NextIntlProvider>
      </body>
    </html>
  );
}