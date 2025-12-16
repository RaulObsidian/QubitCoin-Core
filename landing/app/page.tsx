'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeTab, setActiveTab] = useState('tecnologia');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  useEffect(() => {
    setMounted(true);
    
    // Fecha de lanzamiento de la Testnet Pública: 1 de Junio de 2025
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

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!mounted) return <div className="min-h-screen bg-brand-cyber-black" />;

  // Contenido para las pestañas
  const tabContents = {
    tecnologia: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-brand-accent">RubikPoW: La Complejidad del Cubo de Rubik</h3>
        <p className="text-gray-300 leading-relaxed">
          El algoritmo <strong>RubikPoW</strong> se basa en el Grupo Simétrico <strong>S<sub>48</sub></strong>, que representa las permutaciones posibles de una cara del cubo 4×4×4. 
          El espacio de estados es de aproximadamente <strong>1.57 × 10¹¹⁶</strong>, un número mayor que la cantidad estimada de átomos en el universo observable.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="p-6 rounded-2xl border border-brand-accent/20 bg-brand-cyber-gray/30 backdrop-blur-md">
            <h4 className="text-xl font-bold text-red-400 mb-4">Bitcoin: SHA-256</h4>
            <pre className="bg-black/30 p-4 rounded-lg text-sm overflow-x-auto">
              {`Proof of Work:
Hash = SHA-256(SHA-256(Block_Header))
while Hash > Target:
  Block_Header.Nonce += 1
  Hash = SHA-256(SHA-256(Block_Header))`}
            </pre>
            <p className="text-gray-400 text-sm mt-2">Brute-force computation</p>
          </div>
          
          <div className="p-6 rounded-2xl border border-brand-purple/20 bg-brand-cyber-gray/30 backdrop-blur-md">
            <h4 className="text-xl font-bold text-brand-accent mb-4">QbitCoin: RubikPoW</h4>
            <pre className="bg-black/30 p-4 rounded-lg text-sm overflow-x-auto">
              {`Proof of Work:
Permutation = Solve_Rubik_State(random_state)
while Verification_Fails(Permutation):
  random_state = shuffle_permutation(random_state)
  Permutation = Solve_Rubik_State(random_state)`}
            </pre>
            <p className="text-gray-400 text-sm mt-2">Permutation group theory</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h4 className="text-xl font-bold text-brand-neon-blue mb-4">Criptografía Cuántica Segura</h4>
          <p className="text-gray-300 leading-relaxed">
            QbitCoin implementa estándares NIST como <strong>Dilithium</strong> para firmas digitales y <strong>Kyber</strong> para intercambio de claves post-cuántico. 
            Estos algoritmos están diseñados para resistir ataques de computadoras cuánticas, ofreciendo seguridad a largo plazo.
          </p>
        </div>
      </div>
    ),
    economia: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-brand-accent">Modelo Económico Deflacionario</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-md text-center">
            <div className="text-3xl font-bold text-green-400">21M</div>
            <div className="text-gray-400">Max Supply</div>
          </div>
          <div className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-md text-center">
            <div className="text-3xl font-bold text-yellow-400">4 años</div>
            <div className="text-gray-400">Ciclo de Halving</div>
          </div>
          <div className="p-6 rounded-2xl border border-brand-purple/20 bg-brand-purple/5 backdrop-blur-md text-center">
            <div className="text-3xl font-bold text-brand-purple">0%</div>
            <div className="text-gray-400">Pre-minado</div>
          </div>
        </div>
        
        <div className="mt-8">
          <h4 className="text-xl font-bold text-brand-neon-blue mb-4">Distribución Justa</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-brand-cyber-gray/30 rounded-lg">
              <span className="font-medium">Mineros (Proof of Useful Work)</span>
              <span className="text-brand-accent font-bold">60%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-brand-cyber-gray/30 rounded-lg">
              <span className="font-medium">Tesorería DAO (I+D)</span>
              <span className="text-brand-purple font-bold">25%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-brand-cyber-gray/30 rounded-lg">
              <span className="font-medium">Validadores/Seguridad</span>
              <span className="text-brand-neon-blue font-bold">15%</span>
            </div>
          </div>
        </div>
      </div>
    ),
    estrategia: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-brand-accent">Análisis Estratégico DAFO/SWOT</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-bold text-green-500 mb-4">Fortalezas (Strengths)</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Tecnología Soberana desarrollada en la UE</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Equipo de Elite con experiencia en criptografía avanzada</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Cumplimiento nativo con regulaciones MiCA y GDPR</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-blue-500 mb-4">Oportunidades (Opportunities)</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>El "Día Q" (Colapso de RSA-2048) crea demanda urgente</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Vacío tecnológico actual en soluciones post-cuánticas</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Soberanía digital europea como prioridad política</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-red-500 mb-4">Amenazas (Threats)</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>Gigantes Tecnológicos (Google/IBM) con recursos ilimitados</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>Regulación hostil fuera de la UE</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>Forks no autorizados de la tecnología</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-yellow-500 mb-4">Debilidades (Weaknesses)</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Mayor barrera de entrada por complejidad técnica</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Necesidad de hardware especializado inicialmente</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Educación del mercado sobre beneficios post-cuánticos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    impacto: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-brand-accent">Impacto Económico y Social</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="p-6 rounded-2xl border border-brand-accent/20 bg-brand-cyber-gray/30 backdrop-blur-md cursor-pointer hover:border-brand-accent/50 transition-colors"
            onClick={() => openModal('Minería PoUW', 'La minería Proof of Useful Work (PoUW) no desperdicia energía como en Bitcoin. El calor generado se reutiliza para calefacción urbana, y los cálculos resuelven problemas científicos reales como el plegamiento de proteínas, optimización logística y cálculos climáticos.')}
          >
            <div className="text-4xl mb-4">🏭</div>
            <h4 className="text-xl font-bold mb-2">Minería PoUW</h4>
            <p className="text-gray-400 text-sm">
              El calor generado no se desperdicia, sino que se reutiliza para calefacción urbana.
            </p>
          </div>
          
          <div 
            className="p-6 rounded-2xl border border-brand-purple/20 bg-brand-cyber-gray/30 backdrop-blur-md cursor-pointer hover:border-brand-purple/50 transition-colors"
            onClick={() => openModal('Empleo Europeo', 'QbitCoin Labs GmbH prevé crear más de 200 puestos de alta cualificación en Frankfurt, Múnich y Zúrich. Ingenieros, criptógrafos, expertos en teoría de grupos y matemáticas aplicadas encontrarán oportunidades en nuestra plataforma.')}
          >
            <div className="text-4xl mb-4">👤</div>
            <h4 className="text-xl font-bold mb-2">Empleo Europeo</h4>
            <p className="text-gray-400 text-sm">
              Previsión de crear más de 200 puestos de alta cualificación en Europa.
            </p>
          </div>
          
          <div 
            className="p-6 rounded-2xl border border-brand-neon-blue/20 bg-brand-cyber-gray/30 backdrop-blur-md cursor-pointer hover:border-brand-neon-blue/50 transition-colors"
            onClick={() => openModal('Hardware Soberano', 'Alianzas estratégicas con TSMC, Infineon Technologies y centros de investigación como el Fraunhofer Institute para el diseño de ASICs europeos. Reduciremos la dependencia de proveedores asiáticos y fortaleceremos la cadena de suministro tecnológica europea.')}
          >
            <div className="text-4xl mb-4">🔧</div>
            <h4 className="text-xl font-bold mb-2">Hardware Soberano</h4>
            <p className="text-gray-400 text-sm">
              Alianzas estratégicas para el diseño de ASICs europeos y reducción de dependencia.
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <h4 className="text-xl font-bold text-brand-accent mb-4">Alianzas Estratégicas</h4>
          <p className="text-gray-300 leading-relaxed">
            QbitCoin Labs GmbH establecerá colaboraciones con instituciones tecnológicas líderes europeas como TSMC, Infineon Technologies y centros de investigación como el Fraunhofer Institute. 
            Nuestro objetivo es crear una industria europea de hardware criptográfico resistente a amenazas geopolíticas.
          </p>
        </div>
      </div>
    )
  };

  // Contenido para el modal de Tesis de Inversión
  const thesisContent = `
    TESIS DE INVERSIÓN
    
    Mercado de 50 Billones USD:
    El mercado global de criptomonedas supera los 50 billones de dólares, dominado por Bitcoin y Ethereum.
    
    Colapso RSA-2048:
    La computación cuántica amenaza con hacer obsoletos todos los sistemas criptográficos basados en RSA-2048 en menos de 10 años.
    
    Oportunidad Temprana:
    QbitCoin entra en el mercado con tecnología post-cuántica probada, posicionándose como la opción segura por excelencia.
    
    Soberanía Europea:
    Producto desarrollado íntegramente en Europa, cumpliendo con regulaciones MiCA y GDPR.
  `;

  return (
    <div className="min-h-screen bg-brand-cyber-black text-white font-sans overflow-x-hidden">
      {/* --- BACKGROUND AURORA EFFECT --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-aurora-animated animate-aurora-flow"></div>
      </div>

      {/* --- MODAL GENERAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/70">
          <div className="relative w-full max-w-2xl bg-brand-cyber-gray border border-white/20 rounded-2xl p-8 max-h-[80vh] overflow-y-auto">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-brand-accent mb-4">{modalContent.title}</h3>
            <p className="text-gray-300 whitespace-pre-line">{modalContent.content}</p>
          </div>
        </div>
      )}

      {/* --- A. HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-8 inline-block border border-brand-accent/30 bg-brand-accent/5 px-6 py-2 rounded-full backdrop-blur-md animate-pulse-glow">
          <span className="text-brand-accent text-xs font-mono tracking-[0.3em] font-bold">SOBERANÍA MATEMÁTICA POST-CUÁNTICA</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-brand-neon-green to-brand-purple drop-shadow-2xl animate-glow-pulse">
          LA INFRAESTRUCTURA DE LA
        </h1>
        
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-brand-neon-blue to-brand-purple drop-shadow-2xl animate-glow-pulse">
          SOBERANÍA MATEMÁTICA
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 font-light mb-16 max-w-3xl mx-auto leading-relaxed px-4">
          Mientras la <span className="text-red-500 font-bold">criptografía clásica colapsa</span>, QbitCoin construye el <span className="text-brand-accent font-medium">búnker digital de Europa</span>.
        </p>
        
        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-2xl">
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-brand-accent/20 animate-pulse-glow">{String(timeLeft.days).padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">DÍAS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-brand-accent/20 animate-pulse-glow">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">HORAS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-brand-accent/20 animate-pulse-glow">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">MINUTOS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-brand-accent/20 animate-pulse-glow">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">SEGUNDOS</div>
          </div>
        </div>
        
        {/* Single Button - Opens Thesis Modal */}
        <button 
          className="px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-purple rounded-full text-black font-bold text-lg hover:opacity-90 transition-opacity"
          onClick={() => openModal('Tesis de Inversión', thesisContent)}
        >
          Ver Tesis de Inversión
        </button>
      </section>

      {/* --- B. TABS NAVIGATION SECTION --- */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {[
              { id: 'tecnologia', label: 'TECNOLOGÍA', icon: '🔬' },
              { id: 'economia', label: 'ECONOMÍA', icon: '📈' },
              { id: 'estrategia', label: 'ESTRATEGIA', icon: '🎯' },
              { id: 'impacto', label: 'IMPACTO', icon: '🌐' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-colors flex items-center ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-brand-accent to-brand-purple text-black'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <span className="mr-2">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl min-h-[500px]">
            {tabContents[activeTab]}
          </div>
        </div>
      </section>

      {/* --- C. ROADMAP SECTION --- */}
      <section className="relative z-10 py-24 px-4 bg-gradient-to-b from-transparent to-brand-cyber-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-purple">
            Hoja de Ruta de Ejecución
          </h2>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-brand-accent to-brand-purple"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {roadmapData.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                    <p className="text-xl font-bold text-brand-accent">{item.title}</p>
                    <p className="text-gray-400">{item.period}</p>
                  </div>
                  <div className="md:w-1/2 mx-8 relative">
                    <div 
                      className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center z-10 cursor-pointer"
                      onClick={() => openModal(item.title, item.description)}
                    >
                      <div className="w-3 h-3 rounded-full bg-brand-cyber-black"></div>
                    </div>
                    <div 
                      className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer hover:border-brand-accent/50 transition-colors"
                      onClick={() => openModal(item.title, item.description)}
                    >
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/4 text-center md:text-left">
                    <span className={`px-3 py-1 ${item.statusColor} rounded-full text-sm`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- D. DOWNLOAD SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Documentación Institucional</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { lang: 'EN', flag: '🇬🇧', title: 'Whitepaper Inglés' },
              { lang: 'ES', flag: '🇪🇸', title: 'Whitepaper Español' },
              { lang: 'DE', flag: '🇩🇪', title: 'Whitepaper Alemán' }
            ].map((doc, i) => (
              <a 
                key={doc.lang}
                href={`/whitepaper/QbitCoin-QBC _EU_${doc.lang}_Final.pdf`} 
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all duration-300 hover:border-brand-accent/50 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(0,255,157,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-purple/0 group-hover:from-brand-accent/5 group-hover:to-transparent transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-4xl filter drop-shadow-lg">{doc.flag}</span>
                    <svg className="w-6 h-6 text-brand-accent opacity-40 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">{doc.title}</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-wider">SHA-256: SECURED</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- E. FOOTER INSTITUCIONAL --- */}
      <footer className="relative z-10 py-12 bg-brand-cyber-gray backdrop-blur-xl border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-sm text-gray-400">MiCA Compliant</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-sm text-gray-400">GDPR Ready</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-sm text-gray-400">Made in EU</span>
            </div>
          </div>
          
          <p className="text-gray-400 text-[10px] font-mono tracking-widest uppercase">
            © 2025 QbitCoin Labs GmbH • Frankfurt am Main
          </p>
          <p className="text-brand-accent text-[8px] mt-2">
            <a href="#" className="hover:underline">Iniciativa Europea de Soberanía Digital</a>
          </p>
          <p className="text-gray-500 text-[8px] mt-2">
            La Infraestructura Financiera de la Soberanía Matemática Europea
          </p>
        </div>
      </footer>
    </div>
  );
}