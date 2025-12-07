import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const routing = {
  locales: ['en', 'es', 'de'],
  defaultLocale: 'en'
};

export default getRequestConfig(async ({locale}) => {
  if (!routing.locales.includes(locale as any)) notFound();

  return {
    // Los mensajes están en la carpeta hermana 'messages'
    messages: (await import(`./messages/${locale}.json`)).default
  };
});