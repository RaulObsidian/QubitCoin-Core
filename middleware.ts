// middleware.ts
export {default} from 'next-intl/middleware';

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};