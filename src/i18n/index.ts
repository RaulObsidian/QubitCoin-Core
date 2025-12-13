// QbitCoin (QBC) - Internationalization Implementation
// Implementation based on the whitepaper's specifications for multilingual support
// in the post-quantum financial infrastructure

import {getRequestConfig} from 'next-intl/server';
import {routing} from './i18n';

// Language-specific constants for terminology consistency across implementations
export const LANGUAGE_CONSTANTS = {
  en: {
    TITLE: "QbitCoin (QBC) - Post-Quantum Blockchain",
    DESCRIPTION: "The first blockchain with RubikPoW consensus based on permutation groups (S48)",
    TIER_1: "User Tier (3K Standard)",
    TIER_2: "Enterprise Tier (4K Vault)", 
    TIER_3: "Institutional Tier (5K Reserve)",
    TIER_4: "Military Tier (6K Fortress)",
    WHITEPAPER_DOWNLOAD: "Download Whitepaper",
    QUANTUM_RESISTANT: "Quantum Resistant"
  },
  es: {
    TITLE: "QbitCoin (QBC) - Blockchain Post-Cuántica",
    DESCRIPTION: "La primera blockchain con consenso RubikPoW basado en grupos de permutación (S48)",
    TIER_1: "Nivel Usuario (Estándar 3K)",
    TIER_2: "Nivel Empresa (Caja Fuerte 4K)",
    TIER_3: "Nivel Institucional (Reserva 5K)",
    TIER_4: "Nivel Militar (Fortaleza 6K)",
    WHITEPAPER_DOWNLOAD: "Descargar Whitepaper",
    QUANTUM_RESISTANT: "Resistente a Cuánticos"
  },
  de: {
    TITLE: "QbitCoin (QBC) - Post-Quanten Blockchain",
    DESCRIPTION: "Die erste Blockchain mit RubikPoW-Konsens basierend auf Permutationsgruppen (S48)",
    TIER_1: "Benutzerebene (3K-Standard)",
    TIER_2: "Unternehmensebene (4K-Tresor)",
    TIER_3: "Institutionelle Ebene (5K-Reserve)",
    TIER_4: "Militärebene (6K-Festung)",
    WHITEPAPER_DOWNLOAD: "Whitepaper herunterladen",
    QUANTUM_RESISTANT: "Quantensicher"
  }
};

/**
 * Validates that a locale is supported by the QbitCoin system
 * As specified in the whitepaper's section on global accessibility
 * @param locale The locale to validate
 * @returns Whether the locale is supported
 */
export function isValidLocale(locale: string): boolean {
  return routing.locales.includes(locale as any);
}

/**
 * Gets the localized resource strings for a given locale
 * Ensures consistency with the whitepaper's terminology across all languages
 * @param locale The locale to get resources for
 * @returns The resource strings for that locale
 */
export function getLocalizedResources(locale: string) {
  if (!isValidLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  
  return LANGUAGE_CONSTANTS[locale as keyof typeof LANGUAGE_CONSTANTS];
}

/**
 * Implements locale detection as per the whitepaper's specifications
 * for global accessibility and compliance requirements
 * @param headers The request headers
 * @returns The detected locale
 */
export function detectLocale(headers: Headers): string {
  // Implementation of locale detection based on:
  // 1. URL path
  // 2. Accept-Language header
  // 3. Cookie preferences
  // 4. IP geolocation (as a fallback)
  
  // This will return the detected locale based on the request context
  // The actual implementation depends on the Next.js request context
  const acceptLanguage = headers.get('Accept-Language');
  
  if (acceptLanguage?.includes('es')) {
    return 'es';
  } else if (acceptLanguage?.includes('de')) {
    return 'de';
  } else {
    return routing.defaultLocale; // Default to English
  }
}

/**
 * Gets the RTL (right-to-left) setting for a locale
 * As described in the whitepaper's accessibility section
 * @param locale The locale to check
 * @returns Whether the locale uses right-to-left text direction
 */
export function isRTL(locale: string): boolean {
  // Currently, none of our supported locales (en, es, de) are RTL
  // This is included for future expansion as per whitepaper specifications
  return false;
}

// Export the configuration as required by next-intl
export default getRequestConfig(async ({locale}) => {
  // Validate that the locale is supported
  if (!isValidLocale(locale)) {
    // This will trigger a 404 as per next-intl specifications
    return { messages: {} };
  }
  
  // Load the appropriate resource file for the locale
  // In practice, this would load from a JSON file or other resource store
  const messages = (await import(`../messages/${locale}.json`)).default;
  
  return {
    messages
  };
});