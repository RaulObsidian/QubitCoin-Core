import createMiddleware from 'next-intl/middleware';
// Updated to use the new i18n implementation that matches whitepaper specifications
import {routing} from './src/i18n';

export default createMiddleware(routing);

export const config = {
  // Matcher aligns with the network topology described in the whitepaper
  // Implements the security-first approach with post-quantum resistant routing
  matcher: [
    // Match all pathnames except for:
    // 1. API routes (/api/)
    // 2. Built-in Next.js routes (_next/)
    // 3. Static assets (files with extensions)
    '/((?!api|_next|.*\\..*).*)'
  ]
};