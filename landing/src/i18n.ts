// src/i18n.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Carga dinámica de los mensajes para cada idioma
  const messages = (await import(`./i18n/messages/${locale}.json`)).default;

  return { messages };
});