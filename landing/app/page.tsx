'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Fecha Genesis: 1 Marzo 2026
    const targetDate = new Date('2026-03-01T00:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00ff9d] selection:text-black overflow-hidden relative">

      {/* --- CSS ANIMATIONS --- */}
      <style jsx global>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        @keyframes pulse-glow { 0% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } 100% { opacity: 0.5; transform: scale(1); } }
        @keyframes gradient-x { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-glow 8s infinite; }
        .text-gradient { background: linear-gradient(to right, #00ff9d, #7000ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: gradient-x 5s linear infinite; }
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); }
        .glass-card:hover { border-color: rgba(0, 255, 157, 0.3); background: rgba(255, 255, 255, 0.05); box-shadow: 0 0 20px rgba(0, 255, 157, 0.1); transform: translateY(-5px); transition: all 0.3s ease; }
      `}</style>

      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-1/2 h-1/2 bg-[#00ff9d]/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-1/2 h-1/2 bg-[#7000ff]/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute top-[40%] left-[70%] w-[300px] h-[300px] bg-[#00eeff]/5 rounded-full blur-[80px]"></div>
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">

        {/* --- HERO SECTION --- */}
        <section className="text-center py-20">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-gradient">
            QubitCoin (QBC)
          </h1>
          <p className="text-xl md:text-3xl text-gray-400 max-w-3xl mx-auto mb-12">
            The Post-Quantum Financial Infrastructure. <br/>
            Secured by <span className="text-[#7000ff]">RubikPoW</span> & S48 Group Theory.
          </p>

          <div className="relative w-80 h-80 mx-auto animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9d] to-[#7000ff] rounded-2xl transform rotate-45 shadow-2xl flex items-center justify-center blur-sm"></div>
            <div className="absolute inset-4 bg-[#050505] rounded-xl transform rotate-45 flex items-center justify-center">
              <div className="transform -rotate-45 text-white font-bold text-4xl">QBC</div>
            </div>
          </div>
        </section>

        {/* --- COUNTDOWN SECTION --- */}
        <section className="text-center py-16">
          <h2 className="text-4xl font-bold mb-12 text-[#00ff9d]">Genesis Block Countdown</h2>

          <div className="grid grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="glass-card p-6 rounded-xl">
              <div className="text-4xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="text-gray-400 mt-2">Days</div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-4xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-gray-400 mt-2">Hours</div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-4xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-gray-400 mt-2">Minutes</div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-4xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-gray-400 mt-2">Seconds</div>
            </div>
          </div>
        </section>

        {/* --- DOWNLOAD CARDS --- */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-16">Download Technical Papers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ENGLISH */}
            <a href="/whitepaper/QbitCoin-QBC _EU_EN_Final.pdf" target="_blank" className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6">🇬🇧</div>
              <h3 className="text-2xl font-bold mb-4 text-[#00ff9d]">English Whitepaper</h3>
              <p className="text-gray-400 mb-6">Full specification of the RubikPoW consensus mechanism</p>
              <div className="text-center py-3 bg-gradient-to-r from-[#00ff9d] to-[#7000ff] rounded-lg font-bold">
                📄 Download PDF
              </div>
            </a>

            {/* SPANISH */}
            <a href="/whitepaper/QbitCoin-QBC _EU_ES_Final.pdf" target="_blank" className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6">🇪🇸</div>
              <h3 className="text-2xl font-bold mb-4 text-[#00ff9d]">Whitepaper Español</h3>
              <p className="text-gray-400 mb-6">Especificación completa del mecanismo de consenso RubikPoW</p>
              <div className="text-center py-3 bg-gradient-to-r from-[#00ff9d] to-[#7000ff] rounded-lg font-bold">
                📄 Descargar PDF
              </div>
            </a>

            {/* GERMAN */}
            <a href="/whitepaper/QbitCoin-QBC _EU_DE_Final.pdf" target="_blank" className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6">🇩🇪</div>
              <h3 className="text-2xl font-bold mb-4 text-[#00ff9d]">Deutsches Whitepaper</h3>
              <p className="text-gray-400 mb-6">Vollständige Spezifikation des RubikPoW-Konsensmechanismus</p>
              <div className="text-center py-3 bg-gradient-to-r from-[#00ff9d] to-[#7000ff] rounded-lg font-bold">
                📄 PDF Herunterladen
              </div>
            </a>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="py-20">
          <h2 className="text-4xl font-bold text-center mb-16">Quantum-Resistant Architecture</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="text-5xl mb-6 text-[#00ff9d]">🔒</div>
              <h3 className="text-2xl font-bold mb-4">RubikPoW Consensus</h3>
              <p className="text-gray-400">Based on the mathematical complexity of n×n×n permutation groups</p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="text-5xl mb-6 text-[#7000ff]">🧮</div>
              <h3 className="text-2xl font-bold mb-4">Tiered Security</h3>
              <p className="text-gray-400">From 3×3 to 6×6 complexity levels for different security needs</p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="text-5xl mb-6 text-[#00eeff]">🌐</div>
              <h3 className="text-2xl font-bold mb-4">Distributed Network</h3>
              <p className="text-gray-400">Global infrastructure secured by post-quantum mathematics</p>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-12 text-center text-gray-600">
          <p>© 2025 QbitCoin Labs GmbH • Frankfurt am Main • Sovereignty Built on Math</p>
        </footer>
      </div>
    </main>
  );
}