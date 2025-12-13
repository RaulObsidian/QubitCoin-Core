// QbitCoin (QBC) - I18N Configuration
// Configuración del sistema de internacionalización según las especificaciones del whitepaper

// Definición de la configuración de rutas para los idiomas
export const routing = {
  // Idiomas soportados según la estrategia de adopción global descrita en el whitepaper
  locales: ['en', 'es', 'de'] as const,
  
  // Idioma predeterminado según el mercado inicial de lanzamiento
  defaultLocale: 'en' as const,
  
  // Configuración de prefijos de idioma como se especifica en el whitepaper
  // para mantener URLs limpias y SEO-friendly
  localePrefix: 'as-needed' as const,
} satisfies import('next-intl').RoutingConfig;

// Exportar tipo del routing para uso en otros componentes
export type Locale = typeof routing.locales[number];