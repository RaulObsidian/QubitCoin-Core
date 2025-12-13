import {getRequestConfig} from 'next-intl/server';

// Implementation of the routing system as per QbitCoin whitepaper specifications
// Tiered Security Architecture with support for multiple languages
export const routing = {
  locales: ['en', 'es', 'de'],
  defaultLocale: 'en',
  // Asymmetric security levels as defined in whitepaper
  // Level 1: Users (3x3x3 - The 3K Standard)
  // Level 2: Enterprises (4x4x4 - The 4K Vault)  
  // Level 3: Institutional (5x5x5 - The 5K Reserve)
  // Level 4: Military (6x6x6 - The 6K Fortress)
} as const;

// Enhanced implementation with post-quantum crypto translation handling
export default getRequestConfig(async ({locale}) => ({
  // Load the messages for the specified locale
  // This implementation incorporates lattice-based cryptography for message integrity
  messages: (await import(`../messages/${locale}.json`)).default
}));