import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4 text-xl">{t('description')}</p>
      <div className="mt-8 p-4 bg-gray-100 rounded text-black">
        <a href="/whitepaper/QbitCoin_Whitepaper_v1.0_ES.pdf" download className="block hover:underline">📄 Descargar Whitepaper (ES)</a>
        <a href="/whitepaper/QbitCoin_Whitepaper_v1.0_EN.pdf" download className="block hover:underline">📄 Download Whitepaper (EN)</a>
        <a href="/whitepaper/QbitCoin_Whitepaper_v1.0_DE.pdf" download className="block hover:underline">📄 Whitepaper herunterladen (DE)</a>
      </div>
    </div>
  );
}