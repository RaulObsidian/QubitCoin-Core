'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Fecha de lanzamiento de la Testnet: 1 de Junio de 2025
    const targetDate = new Date('2025-06-01T00:00:00Z');
    
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

  if (!mounted) return <div className="min-h-screen bg-brand-dark" />;

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans overflow-x-hidden">
      {/* --- AURORA BACKGROUND --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid"></div>
        
        {/* Aurora Effect */}
        <div className="absolute inset-0 bg-aurora"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#7000ff]/10 rounded-full blur-[120px] animate-float opacity-60 mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00ff9d]/10 rounded-full blur-[120px] animate-float-delayed opacity-60 mix-blend-screen"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-8 inline-block border border-brand-accent/30 bg-brand-accent/5 px-6 py-2 rounded-full backdrop-blur-md">
          <span className="text-brand-accent text-xs font-mono tracking-[0.3em] font-bold">PHASE 1: PUBLIC TESTNET</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-2xl">
          POST-QUANTUM
        </h1>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-2xl">
          SOVEREIGNTY
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
          Next-generation financial infrastructure secured by <span className="text-brand-accent font-medium">Rubik's Cube Complexity</span>.
        </p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-4xl">
          <div className="text-center p-6">
            <div className="text-5xl font-black text-white">$50M+</div>
            <div className="text-gray-400">Target Market</div>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl font-black text-white">2048-bit</div>
            <div className="text-gray-400">Security</div>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl font-black text-white">0.001s</div>
            <div className="text-gray-400">Latency</div>
          </div>
        </div>
        
        <button className="px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-purple rounded-full text-black font-bold text-lg hover:opacity-90 transition-opacity mb-16">
          Watch the Vision
        </button>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-2xl">
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-mono font-bold text-white bg-black/30 p-4 rounded-xl">{String(timeLeft.days).padStart(2, '0')}</div>
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
      </section>

      {/* --- THE PROBLEM SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
              The Quantum Threat
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              RSA-2048 encryption, the backbone of today's digital security, becomes vulnerable to quantum attacks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-4 text-red-400">Current Vulnerability</h3>
              <p className="text-gray-300 leading-relaxed">
                Traditional cryptographic systems rely on mathematical problems difficult for classical computers to solve.
                However, Shor's algorithm running on quantum computers can efficiently factorize large numbers, rendering RSA encryption obsolete.
              </p>
              <div className="mt-6 p-4 bg-red-900/30 rounded-lg">
                <p className="text-red-300 font-mono text-sm">"Any organization with a quantum computer could access any encrypted data in existence"</p>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl border border-brand-accent/20 bg-brand-accent/5 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-4 text-brand-accent">The Solution: RubikPoW</h3>
              <p className="text-gray-300 leading-relaxed">
                By leveraging the computational complexity of n×n×n Rubik's Cube permutations, QbitCoin creates a proof-of-work system immune to quantum attacks.
                The group theory underlying Rubik's Cube rotations provides exponential security growth with minimal computational overhead.
              </p>
              <div className="mt-6 p-4 bg-brand-purple/10 rounded-lg">
                <p className="text-brand-accent font-mono text-sm">"Quantum resistance through permutation group complexity"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROADMAP SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-purple">
            Roadmap to Quantum Security
          </h2>
          
          <div className="space-y-12">
            {/* Roadmap Item 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                <p className="text-xl font-bold text-brand-accent">Q4 2024</p>
              </div>
              <div className="md:w-1/2 mx-8 relative">
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-brand-dark"></div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-gradient-to-b from-brand-accent to-brand-purple"></div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <h3 className="text-xl font-bold mb-2">Whitepaper & Mathematical Proof</h3>
                  <p className="text-gray-400">Complete specification of the RubikPoW consensus mechanism with formal security proofs</p>
                </div>
              </div>
              <div className="md:w-1/4 text-center md:text-left">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">COMPLETED</span>
              </div>
            </div>

            {/* Roadmap Item 2 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                <p className="text-xl font-bold text-yellow-400">Q2 2025</p>
              </div>
              <div className="md:w-1/2 mx-8 relative">
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-brand-dark"></div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-brand-purple"></div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <h3 className="text-xl font-bold mb-2">RubikPoW Algorithm Beta</h3>
                  <p className="text-gray-400">Beta release of the core algorithm with initial testnet deployment</p>
                </div>
              </div>
              <div className="md:w-1/4 text-center md:text-left">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">IN PROGRESS</span>
              </div>
            </div>

            {/* Roadmap Item 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                <p className="text-xl font-bold text-brand-purple">Q3 2025</p>
              </div>
              <div className="md:w-1/2 mx-8 relative">
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-brand-dark"></div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-gradient-to-b from-brand-purple to-[#00eeff]"></div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <h3 className="text-xl font-bold mb-2">Genesis Block & EIC Evaluation</h3>
                  <p className="text-gray-400">Mainnet launch and evaluation by European Innovation Council</p>
                </div>
              </div>
              <div className="md:w-1/4 text-center md:text-left">
                <span className="px-3 py-1 bg-brand-purple/20 text-brand-purple rounded-full text-sm">UPCOMING</span>
              </div>
            </div>

            {/* Roadmap Item 4 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                <p className="text-xl font-bold text-brand-accent">Q1 2026</p>
              </div>
              <div className="md:w-1/2 mx-8 relative">
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-brand-dark"></div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-gradient-to-b from-brand-accent to-[#7000ff]"></div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <h3 className="text-xl font-bold mb-2">Mainnet Launch & Exchange Listing</h3>
                  <p className="text-gray-400">Full deployment and availability on major cryptocurrency exchanges</p>
                </div>
              </div>
              <div className="md:w-1/4 text-center md:text-left">
                <span className="px-3 py-1 bg-brand-accent/20 text-brand-accent rounded-full text-sm">UPCOMING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EUROPEAN SOVEREIGNTY SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#00eeff] to-brand-purple">
            European Digital Sovereignty
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="text-5xl mb-6">🏛️</div>
              <h3 className="text-2xl font-bold mb-4">Regulatory Alignment</h3>
              <p className="text-gray-400">Designed to meet European Digital Finance regulations and GDPR compliance</p>
            </div>
            
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="text-5xl mb-6">🔒</div>
              <h3 className="text-2xl font-bold mb-4">Strategic Autonomy</h3>
              <p className="text-gray-400">Independence from foreign-controlled blockchain infrastructure</p>
            </div>
            
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="text-5xl mb-6">🌐</div>
              <h3 className="text-2xl font-bold mb-4">Open Innovation</h3>
              <p className="text-gray-400">Open-source protocol fostering European blockchain technology leadership</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DOWNLOAD SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Technical Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['EN', 'ES', 'DE'].map((lang, i) => (
              <a 
                key={lang}
                href={`/whitepaper/QbitCoin-QBC _EU_${lang}_Final.pdf`} 
                target="_blank"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all duration-300 hover:border-brand-accent/50 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(0,255,157,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-purple/0 group-hover:from-brand-accent/5 group-hover:to-transparent transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-4xl filter drop-shadow-lg">{lang === 'EN' ? '🇬🇧' : lang === 'ES' ? '🇪🇸' : '🇩🇪'}</span>
                    <svg className="w-6 h-6 text-brand-accent opacity-40 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">Whitepaper {lang}</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-wider">SHA-256: SECURED</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 text-center">
        <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase opacity-70">
          © 2025 QbitCoin Labs GmbH • Frankfurt • European Digital Sovereignty Initiative
        </p>
      </footer>
    </div>
  );
}