// src/app/en/page.tsx
import { getMessages } from 'next-intl/server';
import ClientPage from '../ClientPage';

export default async function EnglishPage() {
  const messages = await getMessages();
  
  return <ClientPage locale="en" messages={messages} />;
}