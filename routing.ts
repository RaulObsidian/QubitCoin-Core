// routing.ts
// Configuración de rutas para next-intl - separada del código del servidor
export const routing = {
  locales: ['en'],
  defaultLocale: 'en',
} as const;

// Función para validar si un locale es válido
export function isValidLocale(locale: string): boolean {
  return routing.locales.includes(locale as any);
}