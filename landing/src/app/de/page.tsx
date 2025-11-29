// src/app/de/page.tsx
import { getMessages } from 'next-intl/server';
import ClientPage from '../ClientPage';

export default async function GermanPage() {
  const messages = await getMessages();
  
  return <ClientPage locale="de" messages={messages} />;
}