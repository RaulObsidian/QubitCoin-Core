// src/components/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames } from '../i18n/config';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    // Extraer la ruta sin el prefijo de idioma actual
    const pathWithoutLocale = pathname.replace(/^\/(es|en|de)/, '');
    // Construir nueva ruta con el nuevo idioma
    const newPath = `/${locale}${pathWithoutLocale || '/'}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => changeLanguage(locale)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            pathname.startsWith(`/${locale}`)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {localeNames[locale as keyof typeof localeNames]}
        </button>
      ))}
    </div>
  );
}