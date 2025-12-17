'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Github, Twitter, Shield, Zap, Globe, Cpu, Lock, Server, Users, Eye } from 'lucide-react';

export default function Home() {
  // ESTADOS
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [activeTab, setActiveTab] = useState('tecnologia');

  // ESTADO DEL CONTADOR
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // LÓGICA DEL CONTADOR (Simplificada y Robusta)
  useEffect(() => {
    setMounted(true);

    // Fecha objetivo: 1 de Junio de 2025
    const targetDate = new Date('2025-06-01T00:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    // Ejecutar inmediatamente y luego cada segundo
    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  // FUNCIONES MODALES
  const openModal = (title, content) => {
    setModalContent({ title, content });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // DATOS DEL ROADMAP
  const roadmapData = [
    {
      period: "Julio - Nov 2024",
      title: "Fundación",
      status: "COMPLETADO",
      statusColor: "bg-green-500/20 text-green-400",
      description: "Fundación oficial en Frankfurt y publicación del whitepaper técnico."
    },
    {
      period: "Q4 2024 - Q1 2025",
      title: "Testnet Alfa",
      status: "EN PROCESO",
      statusColor: "bg-yellow-500/20 text-yellow-400",
      description: "Validación interna de `rubikpow_benchmarks.rs` y auditoría de seguridad."
    },
    {
      period: "1 Jun 2025",
      title: "Testnet Público",
      status: "PRÓXIMAMENTE",
      statusColor: "bg-blue-500/20 text-blue-400",
      description: "Lanzamiento global para evaluación por el European Innovation Council."
    },
    {
      period: "2026",
      title: "Mainnet",
      status: "OBJETIVO",
      statusColor: "bg-purple-500/20 text-brand-purple",
      description: "Lanzamiento oficial de la red principal y listado en exchanges."
    },
    {
      period: "2027",
      title: "Hegemonía",
      status: "VISIÓN",
      statusColor: "bg-brand-accent/20 text-brand-accent",
      description: "Adopción masiva por bancos centrales europeos y gobierno digital."
    }
  ];

  // RENDERIZADO CONDICIONAL PARA EVITAR FLICKER
  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-brand-accent selection:text-black">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">

        {/* Fondo animado sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/20 via-[#050505] to-[#050505] z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-sm font-mono tracking-[0.3em] mb-4 backdrop-blur-sm">
            🚀 Próximo Hito: Testnet Público v1.0
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
              QBITCOIN
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-brand-accent to-brand-neon-blue">
              POST-QUANTUM STANDARD
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            La infraestructura financiera soberana de <span className="text-brand-accent font-medium">Europa</span> para el futuro post-cuántico.
          </p>

          {/* BOTÓN TESIS DE INVERSIÓN */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => openModal('Tesis de Inversión',
                `<div>
                  <h3 class="font-bold text-xl mb-2 text-brand-accent">Mercado de 50 Billones USD:</h3>
                  <p class="mb-4 text-gray-300">Aunque la capitalización actual fluctúa, la verdadera oportunidad reside en la <strong>tokenización de activos del mundo real (RWA)</strong> y la infraestructura financiera institucional. Se proyecta que para 2030, el 10% del PIB mundial estará almacenado en tecnologías DLT. QbitCoin no solo compite como reserva de valor, sino como la capa de infraestructura segura necesaria para que bancos y entidades europeas operen en este mercado sin riesgo de desencriptación cuántica.</p>

                  <h3 class="font-bold text-xl mb-2 text-brand-accent">Colapso RSA-2048:</h3>
                  <p class="mb-4 text-gray-300">La amenaza 'Harvest Now, Decrypt Later' es real. Los algoritmos actuales (RSA, ECC) son vulnerables al algoritmo de Shor ejecutado en ordenadores cuánticos. QbitCoin se anticipa al <strong>Día Q</strong> migrando a esquemas de firma post-cuántica (PQC) como <strong>CRYSTALS-Dilithium y Kyber</strong>.</p>

                  <h3 class="font-bold text-xl mb-2 text-brand-accent">Oportunidad Temprana:</h3>
                  <p class="mb-4 text-gray-300">Bitcoin tiene la ventaja del primer movimiento, pero QbitCoin tiene la ventaja del <strong>último movimiento tecnológico</strong>. Al entrar en el mercado con una arquitectura rubikpow nativa y resistencia ASIC desde el día cero, evitamos la deuda técnica que paraliza a las redes antiguas.</p>

                  <h3 class="font-bold text-xl mb-2 text-brand-accent">Soberanía Europea:</h3>
                  <p class="text-gray-300">Europa ha perdido la carrera de la Web 2.0. QbitCoin es la respuesta estratégica para la Web 3.0. Alineado estrictamente con el reglamento <strong>MiCA</strong> y la normativa <strong>DORA</strong>, garantizamos que la infraestructura crítica financiera permanezca bajo jurisdicción y valores europeos.</p>
                </div>`
              )}
              className="px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-purple hover:from-brand-accent/90 hover:to-brand-purple/90 text-black font-bold rounded-lg text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(0,255,157,0.4)] flex items-center gap-2"
            >
              Ver Tesis de Inversión <ArrowRight size={20} />
            </button>
          </div>

          {/* --- CUENTA REGRESIVA --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-mono font-bold text-white">
                {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
              </span>
              <span className="text-xs text-gray-400 mt-1 tracking-widest">DÍAS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-mono font-bold text-white">
                {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
              </span>
              <span className="text-xs text-gray-400 mt-1 tracking-widest">HORAS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-mono font-bold text-white">
                {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}
              </span>
              <span className="text-xs text-gray-400 mt-1 tracking-widest">MINS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-mono font-bold text-brand-accent">
                {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
              </span>
              <span className="text-xs text-gray-400 mt-1 tracking-widest">SEGS</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROADMAP SECTION --- */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-neon-blue">
            Hoja de Ruta de Ejecución
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {roadmapData.map((item, index) => (
              <div
                key={index}
                onClick={() => openModal(item.title, `<p class="text-lg text-gray-300">${item.description}</p>`)}
                className="relative p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className={`text-xs font-bold px-2 py-1 rounded mb-3 inline-block ${item.statusColor}`}>
                  {item.status}
                </div>
                <div className="text-sm text-gray-400 mb-1">{item.period}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors">{item.title}</h3>
                <div className="mt-4 text-sm text-gray-500 line-clamp-2">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DOWNLOAD CARDS --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Documentación Estratégica</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { lang: 'EN', flag: '🇬🇧', title: 'Whitepaper Inglés', desc: 'Especificación completa del mecanismo de consenso RubikPoW' },
              { lang: 'ES', flag: '🇪🇸', title: 'Whitepaper Español', desc: 'Especificación completa del mecanismo de consenso RubikPoW' },
              { lang: 'DE', flag: '🇩🇪', title: 'Whitepaper Alemán', desc: 'Vollständige Spezifikation des RubikPoW-Konsensmechanismus' }
            ].map((doc, i) => (
              <a
                key={doc.lang}
                href={`/whitepaper/QbitCoin-QBC _EU_${doc.lang}_Final.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all duration-300 hover:border-brand-accent/50 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(0,255,157,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-purple/0 group-hover:from-brand-accent/5 group-hover:to-transparent transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl filter drop-shadow-lg">{doc.flag}</span>
                    <svg className="w-6 h-6 text-brand-accent opacity-40 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">{doc.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{doc.desc}</p>
                  <div className="text-xs text-gray-500 font-mono tracking-wider">SHA-256: SECURED</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 px-4 bg-gradient-to-t from-[#050505] to-[#0a0a1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Arquitectura Cuántica</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Lock className="w-8 h-8" />, title: 'Post-Quantum', desc: 'Resistencia cuántica demostrable' },
              { icon: <Shield className="w-8 h-8" />, title: 'Soberanía', desc: 'Control europeo de la infraestructura' },
              { icon: <Cpu className="w-8 h-8" />, title: 'Efficiency', desc: 'Usable Work Proof (PoUW)' },
              { icon: <Globe className="w-8 h-8" />, title: 'Scalability', desc: 'Infinita a través de grupos' }
            ].map((feature, i) => (
              <div
                key={i}
                onClick={() => openModal(feature.title, `<p class="text-lg text-gray-300">${feature.desc}</p>`)}
                className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group text-center"
              >
                <div className="text-brand-accent mx-auto mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/80">
          <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-brand-accent/30 rounded-2xl p-8 max-h-[80vh] overflow-y-auto shadow-[0_0_50px_rgba(0,255,157,0.15)] animate-fade-in-up">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-brand-accent mb-4">{modalContent.title}</h3>
            <div
              className="text-gray-300"
              dangerouslySetInnerHTML={{ __html: modalContent.content }}
            />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 QbitCoin Labs GmbH • Frankfurt am Main
        </p>
        <p className="mt-2 text-brand-accent">
          Iniciativa Europea de Soberanía Digital
        </p>
      </footer>
    </div>
  );
}