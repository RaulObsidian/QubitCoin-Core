// src/app/page.tsx
import { getMessages } from 'next-intl/server';
import Link from 'next/link';
import ClientPage from './ClientPage';

export default async function Page({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // Obtener mensajes para el idioma actual
  const messages = await getMessages();
  
  return <ClientPage locale={locale} messages={messages} />;
}