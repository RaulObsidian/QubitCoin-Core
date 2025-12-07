import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const routing = {
  locales: ['en', 'es', 'de'],
  defaultLocale: 'en'
};

export default getRequestConfig(async ({locale}) => {
  if (!routing.locales.includes(locale as any)) notFound();

  return {
    // Los mensajes están en la raíz 'messages/', así que subimos un nivel desde src/
    messages: (await import(`../messages/${locale}.json`)).default
  };
});