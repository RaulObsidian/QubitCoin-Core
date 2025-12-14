import {getRequestConfig} from 'next-intl/server';

export const routing = {
  locales: ['en'],
  defaultLocale: 'en',
} as const;

// Función para validar si un locale es válido
export function isValidLocale(locale: string): boolean {
  return routing.locales.includes(locale as any);
}

// Implementación del sistema de mensajes para el único idioma
export default getRequestConfig(async ({locale}) => {
  // Cargar los mensajes para el locale especificado
  const messages = (await import(`./messages/${locale}.json`)).default;

  return { messages };
});