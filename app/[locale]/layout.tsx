import {notFound} from 'next/navigation';
import {routing} from '../../i18n';
import {NextIntlWrapper} from '../../src/components/ClientWrapper';

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
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gradient-to-br from-nebulae-black to-black">
        <NextIntlWrapper locale={locale} messages={messages}>
          {children}
        </NextIntlWrapper>
      </body>
    </html>
  );
}