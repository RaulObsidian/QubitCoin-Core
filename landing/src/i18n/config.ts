// src/i18n/config.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Lista de idiomas soportados
export const locales = ['es', 'en', 'de'] as const;

// Mapeo de idiomas para nombres amigables
export const localeNames = {
  es: 'Español',
  en: 'English', 
  de: 'Deutsch'
};

// Configuración de internacionalización
export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale sea soportado
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Importar los mensajes para el locale
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});