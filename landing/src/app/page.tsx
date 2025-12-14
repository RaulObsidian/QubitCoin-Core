'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date('2026-03-01T00:00:00Z').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) { clearInterval(interval); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div style={{background: '#050505', minHeight: '100vh'}} />;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00ff9d] selection:text-black overflow-hidden relative">
      <style jsx global>{`
        @keyframes float { 0% { transform: translate(0, 0); } 50% { transform: translate(-20px, 20px); } 100% { transform: translate(0, 0); } }
        @keyframes pulse-glow { 0% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } 100% { opacity: 0.4; transform: scale(1); } }
        .orb { position: absolute; border-radius: 50%; filter: blur(100px); animation: float 10s infinite ease-in-out; }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); }
        .text-glow { text-shadow: 0 0 20px rgba(0, 255, 157, 0.5); }
        .btn-neon { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-neon:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(0, 255, 157, 0.3); border-color: #00ff9d; }
      `}</style>

      {/* BACKGROUND AMBIENT */}
      <div className="fixed inset-0 z-0">
        <div className="orb w-[600px] h-[600px] bg-[#7000ff]/20 top-[-10%] left-[-10%] animate-pulse-slow" />
        <div className="orb w-[500px] h-[500px] bg-[#00ff9d]/10 bottom-[-10%] right-[-10%] animate-pulse-slow" style={{animationDelay: '2s'}} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">

        {/* HERO HEADER */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full border border-[#00ff9d]/30 bg-[#00ff9d]/5 text-[#00ff9d] text-xs font-mono tracking-[0.3em] mb-4">
            SYSTEM STATUS: SECURE
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 mb-2">
            QBITCOIN
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
            The Post-Quantum Financial Standard. <br/>
            <span className="text-[#00ff9d]">Sovereignty Built on Mathematics.</span>
          </p>
        </div>

        {/* COUNTDOWN SYSTEM */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-32">
          {[
            { l: 'DAYS', v: timeLeft.days }, { l: 'HOURS', v: timeLeft.hours },
            { l: 'MINUTES', v: timeLeft.minutes }, { l: 'SECONDS', v: timeLeft.seconds }
          ].map((t, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center min-h-[140px]">
              <span className="text-5xl font-mono font-bold text-white mb-2">{t.v.toString().padStart(2,'0')}</span>
              <span className="text-xs font-bold text-[#7000ff] tracking-widest">{t.l}</span>
            </div>
          ))}
        </div>

        {/* DOWNLOAD SECTION */}
        <div className="w-full max-w-5xl">
          <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-bold text-white">Technical Intelligence</h2>
            <span className="font-mono text-xs text-gray-500">INITIATING DOWNLOAD PROTOCOL...</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* ENGLISH */}
            <a href="/whitepaper/QbitCoin-QBC _EU_EN_Final.pdf" target="_blank" className="glass-panel rounded-xl p-8 group hover:bg-white/5 transition-all duration-500 cursor-pointer btn-neon block text-left">
              <div className="flex justify-between items-start mb-12">
                <span className="text-4xl">🇬🇧</span>
                <svg className="w-6 h-6 text-[#00ff9d] opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00ff9d] transition-colors">English Core</h3>
              <p className="text-sm text-gray-500 font-mono">SHA-256: SECURED</p>
            </a>

            {/* SPANISH */}
            <a href="/whitepaper/QbitCoin-QBC _EU_ES_Final.pdf" target="_blank" className="glass-panel rounded-xl p-8 group hover:bg-white/5 transition-all duration-500 cursor-pointer btn-neon block text-left">
              <div className="flex justify-between items-start mb-12">
                <span className="text-4xl">🇪🇸</span>
                <svg className="w-6 h-6 text-[#00ff9d] opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00ff9d] transition-colors">Edición Español</h3>
              <p className="text-sm text-gray-500 font-mono">SHA-256: SECURED</p>
            </a>

            {/* GERMAN */}
            <a href="/whitepaper/QbitCoin-QBC _EU_DE_Final.pdf" target="_blank" className="glass-panel rounded-xl p-8 group hover:bg-white/5 transition-all duration-500 cursor-pointer btn-neon block text-left">
              <div className="flex justify-between items-start mb-12">
                <span className="text-4xl">🇩🇪</span>
                <svg className="w-6 h-6 text-[#00ff9d] opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00ff9d] transition-colors">Deutsche Ausgabe</h3>
              <p className="text-sm text-gray-500 font-mono">SHA-256: SECURED</p>
            </a>

          </div>
        </div>

        <footer className="mt-32 border-t border-white/5 pt-8 text-center text-xs text-gray-600 font-mono">
          <p>© 2025 QBITCOIN LABS GMBH • FRANKFURT AM MAIN</p>
          <p className="mt-2">REGULATED BY EUROPEAN DIGITAL SOVEREIGNTY ACT</p>
        </footer>

      </div>
    </main>
  );
}