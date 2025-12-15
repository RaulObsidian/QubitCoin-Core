'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Contador regresivo simulado para efecto visual
  const [timeLeft, setTimeLeft] = useState({ d: 89, h: 12, m: 45, s: 10 });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(prev => ({...prev, s: prev.s > 0 ? prev.s - 1 : 59}));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden relative flex flex-col items-center justify-center selection:bg-[#00ff9d] selection:text-black">

      {/* --- NEBULAE BACKGROUND (HIPNÓTICO) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Orbe Violeta */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-float opacity-60 mix-blend-screen"></div>
        {/* Orbe Verde Neón */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00ff9d]/10 rounded-full blur-[120px] animate-float-delayed opacity-60 mix-blend-screen"></div>
        {/* Ruido Estático (Overlay) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}></div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">

        {/* Status Badge */}
        <div className="mb-8 inline-block border border-[#00ff9d]/30 bg-[#00ff9d]/5 px-6 py-2 rounded-full backdrop-blur-md animate-pulse-slow">
          <span className="text-[#00ff9d] text-xs font-mono tracking-[0.3em] font-bold">SYSTEM STATUS: ONLINE</span>
        </div>

        {/* Título Masivo */}
        <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-2xl">
          QBITCOIN
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
          The Post-Quantum Financial Standard.<br/>
          <span className="text-[#00ff9d] font-medium drop-shadow-[0_0_15px_rgba(0,255,157,0.3)]">Sovereignty Built on Mathematics.</span>
        </p>

        {/* Grid de Descargas (Glassmorphism) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 md:px-0">
            {['EN', 'ES', 'DE'].map((lang, i) => (
              <a
                key={lang}
                href={`/whitepaper/QbitCoin-QBC _EU_${lang}_Final.pdf`}
                target="_blank"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all duration-300 hover:border-[#00ff9d]/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/0 to-[#00ff9d]/0 group-hover:from-[#00ff9d]/5 group-hover:to-transparent transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-4xl filter drop-shadow-lg">{lang === 'EN' ? '🇬🇧' : lang === 'ES' ? '🇪🇸' : '🇩🇪'}</span>
                    <svg className="w-6 h-6 text-[#00ff9d] opacity-40 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00ff9d] transition-colors">Whitepaper {lang}</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-wider">SHA-256: SECURED</p>
                </div>
              </a>
            ))}
        </div>
      </div>

      <footer className="absolute bottom-8 w-full text-center">
        <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase opacity-70">
          © 2025 QbitCoin Labs GmbH • Frankfurt • Quantum Secure
        </p>
      </footer>
    </main>
  );
}