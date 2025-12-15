'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  // Contador regresivo para el lanzamiento de la testnet
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Fecha de lanzamiento de la Testnet: 89 días desde hoy
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 89);
    
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    // Calcular inmediatamente
    setTimeLeft(calculateTimeLeft());
    
    // Actualizar cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      
      {/* --- FONDO CYBERPUNK (GRID + ORBES) --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Rejilla de fondo animada */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-grid"></div>
        
        {/* Orbe Violeta */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-float opacity-60 mix-blend-screen"></div>
        {/* Orbe Verde Neón */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00ff9d]/10 rounded-full blur-[120px] animate-float-delayed opacity-60 mix-blend-screen"></div>
        {/* Ruido Estático (Overlay) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-8 inline-block border border-[#00ff9d]/30 bg-[#00ff9d]/5 px-6 py-2 rounded-full backdrop-blur-md animate-pulse-slow">
          <span className="text-[#00ff9d] text-xs font-mono tracking-[0.3em] font-bold">QBC PHASE 1: TESTNET</span>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-2xl">
          QBITCOIN
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
          The First Quantum-Resistant Blockchain based on <span className="text-[#00ff9d] font-medium">Rubik's Cube Complexity</span>.
        </p>
        
        {/* --- COUNTDOWN --- */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-2xl">
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-mono font-bold text-white bg-black/30 p-4 rounded-xl">00</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">DAYS</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-mono font-bold text-white bg-black/30 p-4 rounded-xl">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">HOURS</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-mono font-bold text-white bg-black/30 p-4 rounded-xl">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">MINUTES</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-mono font-bold text-white bg-black/30 p-4 rounded-xl">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">SECONDS</div>
          </div>
        </div>
        
        <button className="px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-[#7000ff] rounded-full text-black font-bold text-lg hover:opacity-90 transition-opacity">
          Watch Teaser
        </button>
      </section>

      {/* --- THE THREAT SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
            Why Now?
          </h2>
          
          <div className="border border-red-500/30 bg-red-500/5 p-8 rounded-2xl backdrop-blur-md max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              The emergence of quantum computers threatens to break traditional encryption methods like RSA-2048. <span className="text-red-400 font-bold">The clock is ticking.</span> Current blockchain security relies on cryptographic algorithms that will become vulnerable.
            </p>
          </div>
        </div>
      </section>

      {/* --- THE SOLUTION SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00eeff]">
            Mathematics as a Shield
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#00ff9d]/50 hover:bg-white/10 transition-all duration-300">
              <div className="text-6xl mb-6 text-center">🛡️</div>
              <h3 className="text-2xl font-bold text-center mb-4 text-[#00ff9d]">Post-Quantum</h3>
              <p className="text-gray-400 text-center">Immune to Shor's Algorithm due to the complexity of Rubik's Cube permutation groups.</p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#00ff9d]/50 hover:bg-white/10 transition-all duration-300">
              <div className="text-6xl mb-6 text-center">⚡</div>
              <h3 className="text-2xl font-bold text-center mb-4 text-[#00ff9d]">Energy Efficient</h3>
              <p className="text-gray-400 text-center">Mining based on permutation solving, not brute force computation.</p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#00ff9d]/50 hover:bg-white/10 transition-all duration-300">
              <div className="text-6xl mb-6 text-center">🌍</div>
              <h3 className="text-2xl font-bold text-center mb-4 text-[#00ff9d]">Euro-Sovereign</h3>
              <p className="text-gray-400 text-center">Strategic autonomy infrastructure for European digital sovereignty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROADMAP SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Roadmap</h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#00ff9d] to-[#7000ff]"></div>
            
            {/* Timeline Item 1 */}
            <div className="flex mb-16">
              <div className="w-1/2 pr-8 text-right">
                <p className="text-xl font-bold text-[#00ff9d]">Q4 2024</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#00ff9d] rounded-full z-10"></div>
              <div className="w-1/2 pl-8">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <p className="text-xl text-gray-300">Whitepaper Publication</p>
                  <p className="text-green-500 font-bold">✅ Done</p>
                </div>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="flex mb-16">
              <div className="w-1/2 pr-8 text-right">
                <p className="text-xl font-bold text-[#00ff9d]">Q1 2025</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full z-10"></div>
              <div className="w-1/2 pl-8">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <p className="text-xl text-gray-300">Testnet Alpha</p>
                  <p className="text-yellow-400">Loading...</p>
                </div>
              </div>
            </div>
            
            {/* Timeline Item 3 */}
            <div className="flex">
              <div className="w-1/2 pr-8 text-right">
                <p className="text-xl font-bold text-[#00ff9d]">Q3 2025</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#7000ff] rounded-full z-10"></div>
              <div className="w-1/2 pl-8">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <p className="text-xl text-gray-300">Public Sale</p>
                  <p className="text-[#7000ff]">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DOWNLOAD SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Get the Technical Specs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['EN', 'ES', 'DE'].map((lang, i) => (
              <a 
                key={lang}
                href={`/whitepaper/QbitCoin-QBC _EU_${lang}_Final.pdf`} 
                target="_blank"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all duration-300 hover:border-[#00ff9d]/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/0 to-[#00ff9d]/0 group-hover:from-[#00ff9d]/5 group-hover:to-transparent transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-4xl filter drop-shadow-lg">{lang === 'EN' ? '🇬🇧' : lang === 'ES' ? '🇪🇸' : '🇩🇪'}</span>
                    <svg className="w-6 h-6 text-[#00ff9d] opacity-40 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00ff9d] transition-colors">Whitepaper {lang}</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-wider">SHA-256: SECURED</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 text-center">
        <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase opacity-70">
          © 2025 QbitCoin Labs GmbH • Frankfurt • Quantum Secure
        </p>
      </footer>
    </div>
  );
}