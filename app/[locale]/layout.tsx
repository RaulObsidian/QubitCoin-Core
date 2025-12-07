import { useTranslations } from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '../../i18n';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations('Index');
  const {locale} = params;

  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}