'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-hidden relative flex flex-col items-center justify-center">
      {/* BACKGROUND PARTICLES (Simple & Safe) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 inline-block border border-green-500/30 bg-green-500/10 px-4 py-1 rounded-full text-green-400 text-xs font-mono tracking-widest">
          SYSTEM STATUS: ONLINE
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
          QBITCOIN
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          The Post-Quantum Financial Standard.<br/>
          <span className="text-green-400">Sovereignty Built on Mathematics.</span>
        </p>

        {/* DOWNLOAD BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {['EN', 'ES', 'DE'].map((lang) => (
              <a
                key={lang}
                href={`/whitepaper/QbitCoin-QBC _EU_${lang}_Final.pdf`}
                target="_blank"
                className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 text-left group"
              >
                <div className="text-2xl mb-2">{lang === 'EN' ? '🇬🇧' : lang === 'ES' ? '🇪🇸' : '🇩🇪'}</div>
                <div className="font-bold text-white group-hover:text-green-400 transition-colors">Whitepaper {lang}</div>
                <div className="text-xs text-gray-500 font-mono mt-1">DOWNLOAD PDF</div>
              </a>
            ))}
        </div>
      </div>

      <footer className="absolute bottom-8 text-center text-gray-600 text-xs font-mono w-full">
        © 2025 QBITCOIN LABS GMBH • SECURE INFRASTRUCTURE
      </footer>
    </main>
  );
}