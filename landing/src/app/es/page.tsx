// src/app/es/page.tsx
import { getMessages } from 'next-intl/server';
import ClientPage from '../ClientPage';

export default async function SpanishPage() {
  const messages = await getMessages();
  
  return <ClientPage locale="es" messages={messages} />;
}