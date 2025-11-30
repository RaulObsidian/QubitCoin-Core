import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale || !['es', 'en', 'de'].includes(locale)) {
    locale = 'es';
  }

  return {
    locale,
    messages: (await import(`./i18n/messages/${locale}.json`)).default
  };
});