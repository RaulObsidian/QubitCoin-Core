import {getRequestConfig} from 'next-intl/server';

export const routing = {
  locales: ['en', 'es', 'de'],
  defaultLocale: 'en',
} as const;

export default getRequestConfig(async ({locale}) => ({
  // Load the messages for the specified locale
  // This implementation uses dynamic imports to load the correct JSON file
  messages: (await import(`./messages/${locale}.json`)).default
}));