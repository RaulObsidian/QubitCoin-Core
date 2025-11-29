// src/app/i18n-provider.tsx
'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';

// Importar mensajes para cada idioma
import esMessages from '../i18n/messages/es.json';
import enMessages from '../i18n/messages/en.json';
import deMessages from '../i18n/messages/de.json';

// Mapeo de mensajes por idioma
const messages: Record<string, any> = {
  es: esMessages,
  en: enMessages,
  de: deMessages
};

// Proveedor de internacionalización
export default function I18nProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  const currentLocale = useLocale();

  // Validar que el idioma sea soportado
  if (!messages[locale]) {
    notFound();
  }

  return children;
}