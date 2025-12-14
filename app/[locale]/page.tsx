'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Traducciones manuales para evitar problemas con el hook useTranslations
const translations = {
  en: {
    hero_title: 'The Post-Quantum Standard',
    hero_subtitle: 'Sovereignty through permutation group cryptography',
    countdown_title: 'Genesis Block Countdown',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    download_section_title: 'Download Technical Papers',
    whitepaper_en_desc: 'Full specification of the RubikPoW consensus mechanism',
    whitepaper_es_desc: 'Especificación completa del mecanismo de consenso RubikPoW',
    whitepaper_de_desc: 'Vollständige Spezifikation des RubikPoW-Konsensmechanismus',
    download_cta: 'Download Now',
    features_title: 'Quantum-Resistant Architecture',
    feature_1_title: 'RubikPoW Consensus',
    feature_1_desc: 'Based on the mathematical complexity of n×n×n permutation groups',
    feature_2_title: 'Tiered Security',
    feature_2_desc: 'From 3×3 to 6×6 complexity levels for different security needs',
    feature_3_title: 'Distributed Network',
    feature_3_desc: 'Global infrastructure secured by post-quantum mathematics',
    footer_text: 'Securing the future of finance against quantum threats'
  },
  es: {
    hero_title: 'El Estándar Post-Cuántico',
    hero_subtitle: 'Soberanía a través de la criptografía de grupos de permutación',
    countdown_title: 'Cuenta Regresiva para el Bloque Génesis',
    days: 'Días',
    hours: 'Horas',
    minutes: 'Minutos',
    seconds: 'Segundos',
    download_section_title: 'Descargar Documentos Técnicos',
    whitepaper_en_desc: 'Especificación completa del mecanismo de consenso RubikPoW',
    whitepaper_es_desc: 'Especificación completa del mecanismo de consenso RubikPoW',
    whitepaper_de_desc: 'Vollständige Spezifikation des RubikPoW-Konsensmechanismus',
    download_cta: 'Descargar Ahora',
    features_title: 'Arquitectura Resistente a Cuánticos',
    feature_1_title: 'Consenso RubikPoW',
    feature_1_desc: 'Basado en la complejidad matemática de grupos de permutación n×n×n',
    feature_2_title: 'Seguridad por Niveles',
    feature_2_desc: 'De 3×3 a 6×6 niveles de complejidad para diferentes necesidades de seguridad',
    feature_3_title: 'Red Distribuida',
    feature_3_desc: 'Infraestructura global protegida por matemáticas post-cuánticas',
    footer_text: 'Asegurando el futuro de las finanzas contra amenazas cuánticas'
  },
  de: {
    hero_title: 'Der Post-Quantum-Standard',
    hero_subtitle: 'Souveränität durch Permutationsgruppen-Kryptographie',
    countdown_title: 'Countdown zum Genesis Block',
    days: 'Tage',
    hours: 'Stunden',
    minutes: 'Minuten',
    seconds: 'Sekunden',
    download_section_title: 'Technische Dokumente herunterladen',
    whitepaper_en_desc: 'Vollständige Spezifikation des RubikPoW-Konsensmechanismus',
    whitepaper_es_desc: 'Vollständige Spezifikation des RubikPoW-Konsensmechanismus',
    whitepaper_de_desc: 'Vollständige Spezifikation des RubikPoW-Konsensmechanismus',
    download_cta: 'Jetzt Herunterladen',
    features_title: 'Quantensichere Architektur',
    feature_1_title: 'RubikPoW Konsens',
    feature_1_desc: 'Basierend auf der mathematischen Komplexität von n×n×n Permutationsgruppen',
    feature_2_title: 'Stufige Sicherheit',
    feature_2_desc: 'Von 3×3 bis 6×6 Komplexitätsstufen für unterschiedliche Sicherheitsanforderungen',
    feature_3_title: 'Verteiltes Netzwerk',
    feature_3_desc: 'Globale Infrastruktur gesichert durch Post-Quantum-Mathematik',
    footer_text: 'Sicherung der Zukunft der Finanzen gegen Quantenbedrohungen'
  }
};

export default function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Fecha del Genesis Block (Marzo 2026)
  const genesisDate = new Date('March 1, 2026 00:00:00 GMT+0000').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = genesisDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-nebulae-black to-black text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block">QbitCoin: </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-nebulae-neon-green to-nebulae-quantum-violet mt-2">
              {t.hero_title}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            {t.hero_subtitle}
          </p>

          <div className="mt-10 flex justify-center">
            <div className="relative">
              {/* Placeholder de la moneda QBC en 3D */}
              <div className="w-48 h-48 md:w-64 md:h-64 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-nebulae-neon-green to-nebulae-quantum-violet rounded-full opacity-20 blur-xl animate-pulse"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-32 h-32 md:w-44 md:h-44 bg-gradient-to-br from-nebulae-neon-green to-nebulae-quantum-violet rounded-2xl transform rotate-45 shadow-2xl flex items-center justify-center">
                    <div className="transform -rotate-45 text-black font-bold text-xl md:text-2xl">QBC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-nebulae-neon-green mb-8">
            {t.countdown_title}
          </h2>

          <div className="countdown-container">
            <div className="countdown-box card-glass">
              <div className="countdown-number">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="countdown-label">{t.days}</div>
            </div>
            <div className="countdown-box card-glass">
              <div className="countdown-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="countdown-label">{t.hours}</div>
            </div>
            <div className="countdown-box card-glass">
              <div className="countdown-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="countdown-label">{t.minutes}</div>
            </div>
            <div className="countdown-box card-glass">
              <div className="countdown-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="countdown-label">{t.seconds}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t.download_section_title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card EN */}
            <Link href="/whitepaper/QbitCoin-QBC _EU_EN_Final.pdf" className="download-link card-glass p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🇬🇧</div>
              <h3 className="text-xl font-bold mb-2">English</h3>
              <p className="text-gray-400 mb-4">{t.whitepaper_en_desc}</p>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-nebulae-neon-green to-nebulae-electric-blue rounded-full">
                📄 {t.download_cta}
              </div>
            </Link>

            {/* Card ES */}
            <Link href="/whitepaper/QbitCoin-QBC _EU_ES_Final.pdf" className="download-link card-glass p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🇪🇸</div>
              <h3 className="text-xl font-bold mb-2">Español</h3>
              <p className="text-gray-400 mb-4">{t.whitepaper_es_desc}</p>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-nebulae-neon-green to-nebulae-electric-blue rounded-full">
                📄 {t.download_cta}
              </div>
            </Link>

            {/* Card DE */}
            <Link href="/whitepaper/QbitCoin-QBC _EU_DE_Final.pdf" className="download-link card-glass p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🇩🇪</div>
              <h3 className="text-xl font-bold mb-2">Deutsch</h3>
              <p className="text-gray-400 mb-4">{t.whitepaper_de_desc}</p>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-nebulae-neon-green to-nebulae-electric-blue rounded-full">
                📄 {t.download_cta}
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-nebulae-dark-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t.features_title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="card-glass p-8 text-center">
              <div className="text-nebulae-neon-green text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3">{t.feature_1_title}</h3>
              <p className="text-gray-400">{t.feature_1_desc}</p>
            </div>

            <div className="card-glass p-8 text-center">
              <div className="text-nebulae-quantum-violet text-5xl mb-4">🧮</div>
              <h3 className="text-xl font-bold mb-3">{t.feature_2_title}</h3>
              <p className="text-gray-400">{t.feature_2_desc}</p>
            </div>

            <div className="card-glass p-8 text-center">
              <div className="text-nebulae-electric-blue text-5xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-3">{t.feature_3_title}</h3>
              <p className="text-gray-400">{t.feature_3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} QbitCoin (QBC) - {t.footer_text}
          </p>
        </div>
      </footer>
    </div>
  );
}