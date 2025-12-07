import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
 
export const routing = {
  locales: ['en', 'es', 'de'] as const,
  defaultLocale: 'en' as const
};
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});