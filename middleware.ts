// middleware.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n';

export default createMiddleware(routing);

export const config = {
  // Only run on root and locale paths
  matcher: ['/((?!api|_next|.*\\..*).*)']
};