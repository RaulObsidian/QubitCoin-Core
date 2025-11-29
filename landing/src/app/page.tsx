// src/app/page.tsx
import { redirect } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Redirigir al idioma predeterminado
export default async function Page() {
  // Redirigir al idioma español por defecto
  redirect('/es');
}