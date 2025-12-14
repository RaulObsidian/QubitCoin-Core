'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
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
    <div className="min-h-screen bg-gradient-to-br from-[#050505] to-black text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block">QbitCoin: </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#7000ff] mt-2">
              The Post-Quantum Standard
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            Sovereignty through permutation group cryptography
          </p>

          <div className="mt-10 flex justify-center">
            <div className="relative">
              {/* Placeholder de la moneda QBC en 3D */}
              <div className="w-48 h-48 md:w-64 md:h-64 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9d] to-[#7000ff] rounded-full opacity-20 blur-xl animate-pulse"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-32 h-32 md:w-44 md:h-44 bg-gradient-to-br from-[#00ff9d] to-[#7000ff] rounded-2xl transform rotate-45 shadow-2xl flex items-center justify-center">
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
          <h2 className="text-2xl md:text-3xl font-bold text-[#00ff9d] mb-8">
            Genesis Block Countdown
          </h2>

          <div className="countdown-container">
            <div className="countdown-box card-glass">
              <div className="countdown-number">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-box card-glass">
              <div className="countdown-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-box card-glass">
              <div className="countdown-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-box card-glass">
              <div className="countdown-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Download Technical Papers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card EN */}
            <a href="/whitepaper/QbitCoin-QBC _EU_EN_Final.pdf" target="_blank" rel="noopener noreferrer" className="download-link card-glass p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🇬🇧</div>
              <h3 className="text-xl font-bold mb-2">English</h3>
              <p className="text-gray-400 mb-4">Full specification of the RubikPoW consensus mechanism</p>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#00ff9d] to-[#00eeff] rounded-full">
                📄 Download Now
              </div>
            </a>

            {/* Card ES */}
            <a href="/whitepaper/QbitCoin-QBC _EU_ES_Final.pdf" target="_blank" rel="noopener noreferrer" className="download-link card-glass p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🇪🇸</div>
              <h3 className="text-xl font-bold mb-2">Spanish</h3>
              <p className="text-gray-400 mb-4">Especificación completa del mecanismo de consenso RubikPoW</p>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#00ff9d] to-[#00eeff] rounded-full">
                📄 Download Now
              </div>
            </a>

            {/* Card DE */}
            <a href="/whitepaper/QbitCoin-QBC _EU_DE_Final.pdf" target="_blank" rel="noopener noreferrer" className="download-link card-glass p-8 text-center hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🇩🇪</div>
              <h3 className="text-xl font-bold mb-2">German</h3>
              <p className="text-gray-400 mb-4">Vollständige Spezifikation des RubikPoW-Konsensmechanismus</p>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#00ff9d] to-[#00eeff] rounded-full">
                📄 Download Now
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#1a0a1a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Quantum-Resistant Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="card-glass p-8 text-center">
              <div className="text-[#00ff9d] text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3">RubikPoW Consensus</h3>
              <p className="text-gray-400">Based on the mathematical complexity of n×n×n permutation groups</p>
            </div>

            <div className="card-glass p-8 text-center">
              <div className="text-[#7000ff] text-5xl mb-4">🧮</div>
              <h3 className="text-xl font-bold mb-3">Tiered Security</h3>
              <p className="text-gray-400">From 3×3 to 6×6 complexity levels for different security needs</p>
            </div>

            <div className="card-glass p-8 text-center">
              <div className="text-[#00eeff] text-5xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-3">Distributed Network</h3>
              <p className="text-gray-400">Global infrastructure secured by post-quantum mathematics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} QbitCoin (QBC) - Securing the future of finance against quantum threats
          </p>
        </div>
      </footer>
    </div>
  );
}