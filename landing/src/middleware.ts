// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/config';

export default createMiddleware({
  // Lista de idiomas soportados
  locales,
  
  // Idioma predeterminado
  defaultLocale: 'es'
});

export const config = {
  // Matcher para aplicar el middleware a todas las rutas excepto recursos estáticos
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};