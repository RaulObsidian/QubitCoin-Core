import {notFound} from 'next/navigation';
import {isValidLocale} from '../../i18n';
import '../../app/globals.css';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const {locale} = params;

  // Ensure that the incoming locale is valid
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-[#050505] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}