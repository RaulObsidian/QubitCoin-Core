'use client';
import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Sector } from 'recharts';

// Renderizador del contador
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-2xl">
        {['DÍAS', 'HORAS', 'MINUTOS', 'SEGUNDOS'].map((label, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20">00</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">{label}</div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-2xl animate-fade-in-up">
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{String(days).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">DÍAS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{String(hours).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">HORAS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{String(minutes).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">MINUTOS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{String(seconds).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">SEGUNDOS</div>
        </div>
      </div>
    );
  }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [investmentModalOpen, setInvestmentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tecnologia');

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openInvestmentModal = () => {
    setInvestmentModalOpen(true);
  };

  const closeInvestmentModal = () => {
    setInvestmentModalOpen(false);
  };

  // DATOS DEL ROADMAP (CORREGIDOS 2025-2027)
  const roadmapData = [
    {
      period: "Jul - Nov 2025",
      title: "Fundación",
      status: "COMPLETADO",
      statusColor: "bg-green-500/20 text-green-400",
      description: "Fundación en Frankfurt y whitepaper técnico completo."
    },
    {
      period: "Q4 2025 - Q1 2026",
      title: "Testnet Alfa",
      status: "EN PROCESO",
      statusColor: "bg-yellow-500/20 text-yellow-400",
      description: "Validación interna de rubikpow_benchmarks.rs y seguridad."
    },
    {
      period: "1 Jun 2026",
      title: "Testnet Público",
      status: "PRÓXIMAMENTE",
      statusColor: "bg-blue-500/20 text-blue-400",
      description: "Apertura global y evaluación EIC."
    },
    {
      period: "Q3 2026 - Q4 2026",
      title: "Mainnet",
      status: "OBJETIVO",
      statusColor: "bg-purple-500/20 text-brand-purple",
      description: "Lanzamiento oficial y listado exchanges."
    },
    {
      period: "2027",
      title: "Hegemonía",
      status: "VISIÓN",
      statusColor: "bg-[#00ff9d]/20 text-[#00ff9d]",
      description: "Adopción bancos centrales europeos."
    }
  ];

  const thesisContent = `
    RESUMEN EJECUTIVO: TESIS DE INVERSIÓN

    Mercado de 50 Billones USD:
    El mercado global de criptomonedas supera los 50 billones de dólares. La verdadera oportunidad reside en la tokenización de activos del mundo real (RWA). Se proyecta que para 2030, el 10% del PIB mundial estará almacenado en tecnologías DLT.

    Colapso RSA-2048:
    La computación cuántica amenaza con hacer obsoletos todos los sistemas criptográficos basados en RSA-2048. QbitCoin se anticipa al "Día Q" migrando a esquemas de firma post-cuántica (PQC).

    Oportunidad Temprana:
    Bitcoin tiene la ventaja del primer movimiento, pero QbitCoin tiene la ventaja del último movimiento tecnológico con arquitectura RubikPoW nativa.

    Soberanía Europea:
    Producto desarrollado íntegramente en Europa, cumpliendo con regulaciones MiCA y GDPR.
  `;

  // Componente Modal Genérico
  const Modal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/70 animate-fade-in">
        <div className="relative w-full max-w-3xl bg-[#0a0a0a] border border-[#00ff9d]/30 rounded-2xl p-8 max-h-[80vh] overflow-y-auto shadow-[0_0_50px_rgba(0,255,157,0.15)]">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
          <h3 className="text-2xl font-bold text-[#00ff9d] mb-4">{title}</h3>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  };

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  // Contenido para las pestañas
  const tabContents = {
    tecnologia: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-[#00ff9d]">RubikPoW: La Complejidad del Cubo de Rubik</h3>
        <p className="text-gray-300 leading-relaxed">
          El algoritmo <strong>RubikPoW</strong> se basa en el Grupo Simétrico <strong>S<sub>48</sub></strong>, que representa las permutaciones posibles de una cara del cubo 4×4×4.
          El espacio de estados es de aproximadamente <strong>1.57 × 10¹¹⁶</strong>, un número mayor que la cantidad estimada de átomos en el universo observable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div
            className="p-6 rounded-2xl border border-[#00ff9d]/20 bg-[#0a0a0a]/30 backdrop-blur-md cursor-pointer hover:border-[#00ff9d]/50 transition-colors"
            onClick={() => openModal('Comparación Algorítmica', 'Este es un ejemplo de contenido detallado sobre la comparación entre SHA-256 de Bitcoin y RubikPoW de QbitCoin.')}
          >
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

          <div
            className="p-6 rounded-2xl border border-[#7000ff]/20 bg-[#0a0a0a]/30 backdrop-blur-md cursor-pointer hover:border-[#7000ff]/50 transition-colors"
            onClick={() => openModal('RubikPoW Detalles', 'Este es un ejemplo de contenido detallado sobre el algoritmo RubikPoW.')}
          >
            <h4 className="text-xl font-bold text-[#00ff9d] mb-4">QbitCoin: RubikPoW</h4>
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
          <h4 className="text-xl font-bold text-[#00eeff] mb-4">Criptografía Cuántica Segura</h4>
          <p className="text-gray-300 leading-relaxed">
            QbitCoin implementa estándares NIST como <strong>Dilithium</strong> para firmas digitales y <strong>Kyber</strong> para intercambio de claves post-cuántico.
            Estos algoritmos están diseñados para resistir ataques de computadoras cuánticas, ofreciendo seguridad a largo plazo.
          </p>
        </div>
      </div>
    ),
    economia: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-[#00ff9d]">Modelo Económico Deflacionario</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-md text-center cursor-pointer hover:border-green-500/50 transition-colors"
            onClick={() => openModal('Oferta Máxima', 'Detalle sobre la oferta máxima de monedas')}
          >
            <div className="text-3xl font-bold text-green-400">21M</div>
            <div className="text-gray-400">Max Supply</div>
          </div>
          <div
            className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-md text-center cursor-pointer hover:border-yellow-500/50 transition-colors"
            onClick={() => openModal('Ciclo de Halving', 'Detalle sobre los ciclos de reducción de recompensas')}
          >
            <div className="text-3xl font-bold text-yellow-400">4 años</div>
            <div className="text-gray-400">Ciclo de Halving</div>
          </div>
          <div
            className="p-6 rounded-2xl border border-[#7000ff]/20 bg-[#7000ff]/5 backdrop-blur-md text-center cursor-pointer hover:border-[#7000ff]/50 transition-colors"
            onClick={() => openModal('Distribución Justa', 'Detalle sobre la distribución equitativa')}
          >
            <div className="text-3xl font-bold text-[#7000ff]">0%</div>
            <div className="text-gray-400">Pre-minado</div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-xl font-bold text-[#00eeff] mb-4">Distribución Justa</h4>
          <div className="space-y-4">
            <div
              className="flex items-center justify-between p-4 bg-[#0a0a0a]/30 rounded-lg cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors"
              onClick={() => openModal('Minería PoUW', 'Detalle sobre la minería Proof of Useful Work')}
            >
              <span className="font-medium">Mineros (Proof of Useful Work)</span>
              <span className="text-[#00ff9d] font-bold">60%</span>
            </div>
            <div
              className="flex items-center justify-between p-4 bg-[#0a0a0a]/30 rounded-lg cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors"
              onClick={() => openModal('Tesorería DAO', 'Detalle sobre el uso de fondos para investigación')}
            >
              <span className="font-medium">Tesorería DAO (I+D)</span>
              <span className="text-[#7000ff] font-bold">25%</span>
            </div>
            <div
              className="flex items-center justify-between p-4 bg-[#0a0a0a]/30 rounded-lg cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors"
              onClick={() => openModal('Validadores', 'Detalle sobre el rol de los validadores')}
            >
              <span className="font-medium">Validadores/Seguridad</span>
              <span className="text-[#00eeff] font-bold">15%</span>
            </div>
          </div>
        </div>
      </div>
    ),
    estrategia: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-[#00ff9d]">Análisis Estratégico DAFO/SWOT</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-md cursor-pointer hover:border-green-500/50 transition-colors"
            onClick={() => openModal('Fortalezas', 'Detalle sobre las fortalezas del proyecto')}
          >
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

          <div
            className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-md cursor-pointer hover:border-blue-500/50 transition-colors"
            onClick={() => openModal('Oportunidades', 'Detalle sobre las oportunidades del proyecto')}
          >
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

          <div
            className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-md cursor-pointer hover:border-red-500/50 transition-colors"
            onClick={() => openModal('Amenazas', 'Detalle sobre las amenazas para el proyecto')}
          >
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

          <div
            className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-md cursor-pointer hover:border-yellow-500/50 transition-colors"
            onClick={() => openModal('Debilidades', 'Detalle sobre las debilidades del proyecto')}
          >
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
        <h3 className="text-2xl font-bold text-[#00ff9d]">Impacto Económico y Social</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-2xl border border-[#00ff9d]/20 bg-[#0a0a0a]/30 backdrop-blur-md cursor-pointer hover:border-[#00ff9d]/50 transition-colors"
            onClick={() => openModal('Minería PoUW', 'La minería Proof of Useful Work (PoUW) no desperdicia energía como en Bitcoin. El calor generado se reutiliza para calefacción urbana, y los cálculos resuelven problemas científicos reales como el plegamiento de proteínas, optimización logística y cálculos climáticos.')}
          >
            <div className="text-4xl mb-4">🏭</div>
            <h4 className="text-xl font-bold mb-2">Minería PoUW</h4>
            <p className="text-gray-400 text-sm">
              El calor generado no se desperdicia, sino que se reutiliza para calefacción urbana.
            </p>
          </div>

          <div
            className="p-6 rounded-2xl border border-[#7000ff]/20 bg-[#0a0a0a]/30 backdrop-blur-md cursor-pointer hover:border-[#7000ff]/50 transition-colors"
            onClick={() => openModal('Empleo Europeo', 'QbitCoin Labs GmbH prevé crear más de 200 puestos de alta cualificación en Frankfurt, Múnich y Zúrich. Ingenieros, criptógrafos, expertos en teoría de grupos y matemáticas aplicadas encontrarán oportunidades en nuestra plataforma.')}
          >
            <div className="text-4xl mb-4">👤</div>
            <h4 className="text-xl font-bold mb-2">Empleo Europeo</h4>
            <p className="text-gray-400 text-sm">
              Previsión de crear más de 200 puestos de alta cualificación en Europa.
            </p>
          </div>

          <div
            className="p-6 rounded-2xl border border-[#00eeff]/20 bg-[#0a0a0a]/30 backdrop-blur-md cursor-pointer hover:border-[#00eeff]/50 transition-colors"
            onClick={() => openModal('Hardware Soberano', 'Alianzas estratégicas con TSMC, Infineon Technologies y centros de investigación como el Fraunhofer Institute para el diseño de ASICs europeos. Reduciremos la dependencia de proveedores asiáticos y fortaleceremos la cadena de suministro tecnológica europea.')}
          >
            <div className="text-4xl mb-4">🔧</div>
            <h4 className="text-xl font-bold mb-2">Hardware Soberano</h4>
            <p className="text-gray-400 text-sm">
              Alianzas estratégicas para el diseño de ASICs europeos y reducción de dependencia.
            </p>
          </div>
        </div>

        <div
          className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer hover:border-[#00ff9d]/50 transition-colors"
          onClick={() => openModal('Alianzas Estratégicas', 'QbitCoin Labs GmbH establecerá colaboraciones con instituciones tecnológicas líderes europeas como TSMC, Infineon Technologies y centros de investigación como el Fraunhofer Institute. Nuestro objetivo es crear una industria europea de hardware criptográfico resistente a amenazas geopolíticas.')}
        >
          <h4 className="text-xl font-bold text-[#00ff9d] mb-4">Alianzas Estratégicas</h4>
          <p className="text-gray-300 leading-relaxed">
            QbitCoin Labs GmbH establecerá colaboraciones con instituciones tecnológicas líderes europeas como TSMC, Infineon Technologies y centros de investigación como el Fraunhofer Institute.
            Nuestro objetivo es crear una industria europea de hardware criptográfico resistente a amenazas geopolíticas.
          </p>
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative">
      
      {/* Background Aurora */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00ff9d]/10 via-[#050505] to-[#050505]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#7000ff]/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00ff9d]/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Modales */}
      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        title={modalContent.title} 
        content={modalContent.content} 
      />
      
      {/* Modal Tesis (Custom) */}
      {investmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/80">
          <div className="relative w-full max-w-3xl bg-[#0a0a0a] border border-[#7000ff]/30 rounded-2xl p-8 max-h-[80vh] overflow-y-auto shadow-[0_0_50px_rgba(112,0,255,0.15)]">
             <button onClick={closeInvestmentModal} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
             <h3 className="text-3xl font-bold text-[#00ff9d] mb-6">Tesis de Inversión</h3>
             <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                {thesisContent.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
             </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-8 inline-block border border-[#00ff9d]/30 bg-[#00ff9d]/10 px-6 py-2 rounded-full backdrop-blur-md animate-pulse-glow">
          <span className="text-[#00ff9d] text-xs font-mono tracking-[0.3em] font-bold">SOBERANÍA MATEMÁTICA POST-CUÁNTICA</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#00ff9d] to-[#7000ff] drop-shadow-2xl animate-glow-pulse">
          LA INFRAESTRUCTURA DE LA
        </h1>

        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#00eeff] to-[#7000ff] drop-shadow-2xl animate-glow-pulse">
          SOBERANÍA MATEMÁTICA
        </h1>

        <p className="text-lg md:text-xl text-gray-400 font-light mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          Mientras la <span className="text-red-500 font-bold">criptografía clásica colapsa</span>, QbitCoin construye el <span className="text-[#00ff9d] font-medium">búnker digital de Europa</span>.
        </p>

        {/* Contador principal */}
        <div className="w-full max-w-2xl mx-auto">
          <Countdown
            date={1780185600000} // Timestamp fijo: 1 de Junio de 2026
            renderer={renderer}
          />
        </div>

        {/* Botón CTA que abre el modal de Tesis */}
        <button
          onClick={() => openModal('Tesis de Inversión', thesisContent)}
          className="px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-[#7000ff] rounded-full text-black font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Ver Tesis de Inversión
        </button>
      </section>

      {/* TABS NAVIGATION */}
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
                    ? 'bg-gradient-to-r from-[#00ff9d] to-[#7000ff] text-black'
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

      {/* ROADMAP SECTION */}
      <section className="relative z-10 py-24 px-4 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#7000ff]">
            Hoja de Ruta de Ejecución
          </h2>

          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#00ff9d] to-[#7000ff]"></div>
            
            <div className="space-y-16">
              {roadmapData.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                    <p className="text-xl font-bold text-[#00ff9d]">{item.title}</p>
                    <p className="text-gray-400">{item.period}</p>
                  </div>
                  <div className="md:w-1/2 mx-8 relative">
                    <div
                      className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-[#00ff9d] flex items-center justify-center z-10 cursor-pointer"
                      onClick={() => openModal(item.title, item.description)}
                    >
                      <div className="w-3 h-3 rounded-full bg-[#050505]"></div>
                    </div>
                    <div
                      className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer hover:border-[#00ff9d]/50 transition-colors"
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

      {/* === TOKENOMICS SECTION PROFESIONAL V2 === */}
      <section className="relative z-10 py-32 px-4 bg-[#0a0a0a] overflow-hidden">
         {/* Fondo sutil de partículas o grid para dar profundidad */}
         <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-5xl md:text-6xl font-black mb-4 text-white uppercase tracking-tighter">
                  Arquitectura <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#7000ff]">Económica</span>
               </h2>
               <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Modelo deflacionario diseñado para la soberanía tecnológica y la sostenibilidad a largo plazo.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
               {/* --- COLUMNA IZQUIERDA: GRÁFICO INTERACTIVO (Recharts) --- */}
               <div className="lg:col-span-7 flex flex-col items-center justify-center">
                 <div className="w-full h-[500px] relative z-20">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={[
                           { name: 'Minería PoUW (Científica)', value: 45, color: '#00ff9d' },
                           { name: 'Tesorería DAO & I+D', value: 20, color: '#7000ff' },
                           { name: 'Equipo & Asesores (Vesting)', value: 15, color: '#00a8ff' },
                           { name: 'Fondo de Liquidez & Exchange', value: 10, color: '#ff00e6' },
                           { name: 'Validadores & Seguridad Red', value: 10, color: '#ffbd00' },
                         ]}
                         cx="50%"
                         cy="50%"
                         innerRadius={140}
                         outerRadius={180}
                         paddingAngle={3}
                         dataKey="value"
                         nameKey="name"
                         label={false}
                         labelLine={false}
                       >
                         {[
                           { name: 'Minería PoUW (Científica)', value: 45, color: '#00ff9d' },
                           { name: 'Tesorería DAO & I+D', value: 20, color: '#7000ff' },
                           { name: 'Equipo & Asesores (Vesting)', value: 15, color: '#00a8ff' },
                           { name: 'Fondo de Liquidez & Exchange', value: 10, color: '#ff00e6' },
                           { name: 'Validadores & Seguridad Red', value: 10, color: '#ffbd00' },
                         ].map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                         ))}
                       </Pie>
                       <RechartsTooltip
                         contentStyle={{
                           backgroundColor: '#0a0a0a',
                           border: '1px solid rgba(255,255,255,0.1)',
                           borderRadius: '12px',
                           boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                           color: '#fff'
                         }}
                         itemStyle={{ color: '#fff' }}
                         formatter={(value, name, props) => [`${value}%`, '']}
                         labelFormatter={(value) => `Distribución: ${value}`}
                       />
                     </PieChart>
                   </ResponsiveContainer>

                   {/* Etiqueta central personalizada */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                     <div className="text-5xl font-black text-white">21M</div>
                     <div className="text-sm text-gray-400 tracking-widest">MAX SUPPLY</div>
                   </div>

                   {/* Círculos decorativos de fondo */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-[#00ff9d]/10 animate-spin-slow"></div>
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-[#7000ff]/10 animate-spin-slow-reverse"></div>
                 </div>
               </div>

               {/* --- COLUMNA DERECHA: LISTA INTERACTIVA (CLICKABLE) --- */}
               <div className="lg:col-span-5 space-y-4">
                 {[
                   { name: 'Minería PoUW (Científica)', value: 45, color: '#00ff9d', detail: 'Recompensas directas para nodos que aportan poder de cálculo útil a la red (Q-HPC). Emisión decreciente tipo Halving.' },
                   { name: 'Tesorería DAO & I+D', value: 20, color: '#7000ff', detail: 'Fondo gobernado por la comunidad para financiar desarrollo de hardware cuántico-resistente, grants y expansión del ecosistema.' },
                   { name: 'Equipo & Asesores (Vesting)', value: 15, color: '#00a8ff', detail: 'Asignación para fundadores y expertos clave. Bloqueado por 2 años con liberación lineal posterior para alinear incentivos.' },
                   { name: 'Fondo de Liquidez & Exchange', value: 10, color: '#ff00e6', detail: 'Provisión de liquidez inicial en DEX/CEX para asegurar estabilidad de mercado y accesibilidad del token QBIT.' },
                   { name: 'Validadores & Seguridad Red', value: 10, color: '#ffbd00', detail: 'Incentivos exclusivos para nodos validadores que aseguran el consenso RubikPoW y la finalidad de las transacciones.' },
                 ].map((item, index) => (
                   <button
                     key={index}
                     className="w-full text-left group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00ff9d] transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,255,157,0.1)] flex justify-between items-center relative overflow-hidden"
                     onClick={() => openModal(item.name, `${item.name}\n\n${item.value}% del Supply Total\n\n${item.detail}`)}
                   >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-0"></div>
                     <div className="flex items-center gap-4 relative z-10">
                       <div className="h-4 w-4 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: item.color }}></div>
                       <span className="font-bold text-lg text-white group-hover:text-gray-100 transition-colors">{item.name}</span>
                     </div>
                     <div className="flex items-center gap-3 relative z-10">
                       <span className="font-mono text-2xl font-black" style={{ color: item.color }}>{item.value}%</span>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-[#00ff9d] transition-colors transform group-hover:translate-x-1 duration-300">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                       </svg>
                     </div>
                   </button>
                 ))}
               </div>
            </div>
         </div>
      </section>

      {/* DOWNLOAD SECTION */}
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
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all duration-300 hover:border-[#00ff9d]/50 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(0,255,157,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/0 to-[#7000ff]/0 group-hover:from-[#00ff9d]/5 group-hover:to-transparent transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-4xl filter drop-shadow-lg">{doc.flag}</span>
                    <svg className="w-6 h-6 text-[#00ff9d] opacity-40 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00ff9d] transition-colors">{doc.title}</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-wider">SHA-256: SECURED</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 bg-[#0a0a0a] backdrop-blur-xl border-t border-white/10">
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
          <p className="text-[#00ff9d] text-[8px] mt-2">
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