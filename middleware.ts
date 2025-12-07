import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n';

export default createMiddleware(routing);

export const config = {
  // Matcher universal que atrapa todo excepto archivos estáticos
  matcher: ['/((?!api|_next|.*\\..*).*)']
};