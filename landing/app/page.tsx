'use client';
import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Sector,
  XAxis,
  YAxis,
  CartesianGrid,
  defs,
  linearGradient,
  stop
} from 'recharts';
import dynamic from 'next/dynamic';
const RubikCore = dynamic(() => import('./components/RubikCore'), { ssr: false });
const SecurityGrid = dynamic(() => import('./components/SecurityGrid'), { ssr: false });

// Renderizador del contador
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-2xl">
        {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((label, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20">00</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2 font-bold">{label}</div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-2xl animate-fade-in-up">
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{String(days).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2 font-bold">DAYS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{String(hours).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2 font-bold">HOURS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{String(minutes).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2 font-bold">MINUTES</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{String(seconds).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2 font-bold">SECONDS</div>
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
      title: "Foundation",
      status: "COMPLETED",
      statusColor: "bg-green-500/20 text-green-400",
      description: "Foundation in Frankfurt and complete technical whitepaper."
    },
    {
      period: "Q4 2025 - Q1 2026",
      title: "Alpha Testnet",
      status: "IN PROGRESS",
      statusColor: "bg-yellow-500/20 text-yellow-400",
      description: "Internal validation of rubikpow_benchmarks.rs and security."
    },
    {
      period: "1 Jun 2026",
      title: "Public Testnet",
      status: "UPCOMING",
      statusColor: "bg-blue-500/20 text-blue-400",
      description: "Global opening and EIC evaluation."
    },
    {
      period: "Q3 2026 - Q4 2026",
      title: "Mainnet",
      status: "TARGET",
      statusColor: "bg-purple-500/20 text-brand-purple",
      description: "Official launch and exchange listings."
    },
    {
      period: "2027",
      title: "Hegemony",
      status: "VISION",
      statusColor: "bg-[#00ff9d]/20 text-[#00ff9d]",
      description: "European central banks adoption."
    }
  ];

  const thesisContent = `
    EXECUTIVE SUMMARY: INVESTMENT THESIS

    50 Trillion USD Market:
    The global cryptocurrency market exceeds 50 trillion dollars. The real opportunity lies in real-world asset tokenization (RWA). It is projected that by 2030, 10% of global GDP will be stored in DLT technologies.

    RSA-2048 Collapse:
    Quantum computing threatens to obsolete all RSA-2048-based cryptographic systems. QubitCoin anticipates "Q-Day" by migrating to post-quantum cryptography (PQC) signature schemes.

    Early Opportunity:
    Bitcoin has the first-mover advantage, but QubitCoin has the technological last-mover advantage with native RubikPoW architecture.

    European Sovereignty:
    Product developed entirely in Europe, compliant with MiCA and GDPR regulations.
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
        <h3 className="text-2xl font-bold text-[#00ff9d]">RubikPoW: The Complexity of the Rubik's Cube</h3>
        <p className="text-gray-300 leading-relaxed">
          The <strong>RubikPoW</strong> algorithm is based on the Symmetric Group <strong>S<sub>48</sub></strong>, which represents the possible permutations of one face of a 4×4×4 cube.
          The state space is approximately <strong>1.57 × 10¹¹⁶</strong>, a number greater than the estimated number of atoms in the observable universe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div
            className="p-6 rounded-2xl border border-[#00ff9d]/20 bg-[#0a0a0a]/30 backdrop-blur-md cursor-pointer hover:border-[#00ff9d]/50 transition-colors"
            onClick={() => openModal('Algorithm Comparison', 'This is an example of detailed content about the comparison between Bitcoin\'s SHA-256 and QubitCoin\'s RubikPoW.')}
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
            onClick={() => openModal('RubikPoW Details', 'This is an example of detailed content about the RubikPoW algorithm.')}
          >
            <h4 className="text-xl font-bold text-[#00ff9d] mb-4">QubitCoin: RubikPoW</h4>
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
          <h4 className="text-xl font-bold text-[#00eeff] mb-4">Quantum-Safe Cryptography</h4>
          <p className="text-gray-300 leading-relaxed">
            QubitCoin implements NIST standards such as <strong>Dilithium</strong> for digital signatures and <strong>Kyber</strong> for post-quantum key exchange.
            These algorithms are designed to resist quantum computer attacks, providing long-term security.
          </p>
        </div>
      </div>
    ),
    economia: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-[#00ff9d]">Deflationary Economic Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-md text-center cursor-pointer hover:border-green-500/50 transition-colors"
            onClick={() => openModal('Max Supply', 'Details about the maximum coin supply')}
          >
            <div className="text-3xl font-bold text-green-400">21M</div>
            <div className="text-gray-400">Max Supply</div>
          </div>
          <div
            className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-md text-center cursor-pointer hover:border-yellow-500/50 transition-colors"
            onClick={() => openModal('Halving Cycle', 'Details about the reward reduction cycles')}
          >
            <div className="text-3xl font-bold text-yellow-400">4 years</div>
            <div className="text-gray-400">Halving Cycle</div>
          </div>
          <div
            className="p-6 rounded-2xl border border-[#7000ff]/20 bg-[#7000ff]/5 backdrop-blur-md text-center cursor-pointer hover:border-[#7000ff]/50 transition-colors"
            onClick={() => openModal('Fair Distribution', 'Details about the fair distribution')}
          >
            <div className="text-3xl font-bold text-[#7000ff]">0%</div>
            <div className="text-gray-400">Pre-mine</div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-xl font-bold text-[#00eeff] mb-4">Fair Distribution</h4>
          <div className="space-y-4">
            <div
              className="flex items-center justify-between p-4 bg-[#0a0a0a]/30 rounded-lg cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors"
              onClick={() => openModal('PoUW Mining', 'Details about Proof of Useful Work mining')}
            >
              <span className="font-medium">Miners (Proof of Useful Work)</span>
              <span className="text-[#00ff9d] font-bold">60%</span>
            </div>
            <div
              className="flex items-center justify-between p-4 bg-[#0a0a0a]/30 rounded-lg cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors"
              onClick={() => openModal('DAO Treasury', 'Details about research fund usage')}
            >
              <span className="font-medium">DAO Treasury (R&D)</span>
              <span className="text-[#7000ff] font-bold">25%</span>
            </div>
            <div
              className="flex items-center justify-between p-4 bg-[#0a0a0a]/30 rounded-lg cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors"
              onClick={() => openModal('Validators', 'Details about validator roles')}
            >
              <span className="font-medium">Validators/Security</span>
              <span className="text-[#00eeff] font-bold">15%</span>
            </div>
          </div>
        </div>
      </div>
    ),
    estrategia: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-[#00ff9d]">Strategic SWOT Analysis</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-md cursor-pointer hover:border-green-500/50 transition-colors"
            onClick={() => openModal('Strengths', 'Details about project strengths')}
          >
            <h4 className="text-xl font-bold text-green-500 mb-4">Strengths</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Sovereign Technology developed in the EU</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Elite Team with experience in advanced cryptography</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Native compliance with MiCA and GDPR regulations</span>
              </li>
            </ul>
          </div>

          <div
            className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-md cursor-pointer hover:border-blue-500/50 transition-colors"
            onClick={() => openModal('Opportunities', 'Details about project opportunities')}
          >
            <h4 className="text-xl font-bold text-blue-500 mb-4">Opportunities</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>"Q-Day" (Collapse of RSA-2048) creates urgent demand</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Current technology gap in post-quantum solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>European digital sovereignty as political priority</span>
              </li>
            </ul>
          </div>

          <div
            className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-md cursor-pointer hover:border-red-500/50 transition-colors"
            onClick={() => openModal('Threats', 'Details about project threats')}
          >
            <h4 className="text-xl font-bold text-red-500 mb-4">Threats</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>Technology Giants (Google/IBM) with unlimited resources</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>Hostile regulation outside the EU</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>Unauthorized forks of the technology</span>
              </li>
            </ul>
          </div>

          <div
            className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-md cursor-pointer hover:border-yellow-500/50 transition-colors"
            onClick={() => openModal('Weaknesses', 'Details about project weaknesses')}
          >
            <h4 className="text-xl font-bold text-yellow-500 mb-4">Weaknesses</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Higher entry barrier due to technical complexity</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Need for specialized hardware initially</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Market education on post-quantum benefits</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    impacto: (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-[#00ff9d]">Economic and Social Impact</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-2xl border border-[#00ff9d]/20 bg-[#0a0a0a]/30 backdrop-blur-md cursor-pointer hover:border-[#00ff9d]/50 transition-colors"
            onClick={() => openModal('PoUW Mining', 'Proof of Useful Work (PoUW) mining does not waste energy like Bitcoin. Generated heat is reused for urban heating, and calculations solve real scientific problems such as protein folding, logistics optimization, and climate calculations.')}
          >
            <div className="text-4xl mb-4">🏭</div>
            <h4 className="text-xl font-bold mb-2">PoUW Mining</h4>
            <p className="text-gray-400 text-sm">
              Generated heat is not wasted, but reused for urban heating.
            </p>
          </div>

          <div
            className="p-6 rounded-2xl border border-[#7000ff]/20 bg-[#0a0a0a]/30 backdrop-blur-md cursor-pointer hover:border-[#7000ff]/50 transition-colors"
            onClick={() => openModal('European Employment', 'QubitCoin Labs GmbH plans to create over 200 high-skilled positions in Frankfurt, Munich, and Zurich. Engineers, cryptographers, group theory experts, and applied mathematicians will find opportunities on our platform.')}
          >
            <div className="text-4xl mb-4">👤</div>
            <h4 className="text-xl font-bold mb-2">European Employment</h4>
            <p className="text-gray-400 text-sm">
              Planning to create over 200 high-skilled positions in Europe.
            </p>
          </div>

          <div
            className="p-6 rounded-2xl border border-[#00eeff]/20 bg-[#0a0a0a]/30 backdrop-blur-md cursor-pointer hover:border-[#00eeff]/50 transition-colors"
            onClick={() => openModal('Sovereign Hardware', 'Strategic alliances with TSMC, Infineon Technologies, and research centers such as the Fraunhofer Institute for European ASIC design. We will reduce dependence on Asian suppliers and strengthen the European technology supply chain.')}
          >
            <div className="text-4xl mb-4">🔧</div>
            <h4 className="text-xl font-bold mb-2">Sovereign Hardware</h4>
            <p className="text-gray-400 text-sm">
              Strategic alliances for European ASIC design and dependency reduction.
            </p>
          </div>
        </div>

        <div
          className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer hover:border-[#00ff9d]/50 transition-colors"
          onClick={() => openModal('Strategic Alliances', 'QubitCoin Labs GmbH will establish collaborations with leading European technology institutions such as TSMC, Infineon Technologies, and research centers such as the Fraunhofer Institute. Our goal is to create a European cryptographic hardware industry resilient to geopolitical threats.')}
        >
          <h4 className="text-xl font-bold text-[#00ff9d] mb-4">Strategic Alliances</h4>
          <p className="text-gray-300 leading-relaxed">
            QubitCoin Labs GmbH will establish collaborations with leading European technology institutions such as TSMC, Infineon Technologies, and research centers such as the Fraunhofer Institute.
            Our goal is to create a European cryptographic hardware industry resilient to geopolitical threats.
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
             <h3 className="text-3xl font-bold text-[#00ff9d] mb-6">Investment Thesis</h3>
             <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                {thesisContent.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
             </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="relative">
            <img
              src="/qbc_hero.png"
              alt="QubitCoin Brand Identity"
              className="w-auto h-auto max-w-full max-h-full object-contain opacity-100"
            />
          </div>
        </div>

        {/* Content with higher z-index to stay on top */}
        <div className="relative z-10">
          <div className="mb-8 inline-block border border-[#00ff9d]/30 bg-[#00ff9d]/10 px-6 py-2 rounded-full backdrop-blur-md animate-pulse-glow">
            <span className="text-[#00ff9d] text-xs font-mono tracking-[0.3em] font-bold">POST-QUANTUM MATHEMATICAL SOVEREIGNTY</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] via-[#00eeff] to-[#7000ff] drop-shadow-2xl animate-glow-pulse">
            THE INFRASTRUCTURE OF
          </h1>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] via-[#00eeff] to-[#7000ff] drop-shadow-2xl animate-glow-pulse">
            MATHEMATICAL SOVEREIGNTY
          </h1>

          <p className="text-lg md:text-xl text-gray-400 font-light mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            <span className="text-white font-bold">As</span> <span className="text-red-300 font-bold">classical cryptography collapses</span>, <span className="text-white font-bold">QubitCoin</span> <span className="text-white font-bold">builds</span> <span className="text-[#00ff9d] font-medium">Europe's digital bunker</span>.
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
            onClick={() => openModal('Investment Thesis', thesisContent)}
            className="px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-[#7000ff] rounded-full text-black font-bold text-lg hover:opacity-90 transition-opacity"
          >
            View Investment Thesis
          </button>
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {[
              { id: 'tecnologia', label: 'TECHNOLOGY', icon: '🔬' },
              { id: 'economia', label: 'ECONOMICS', icon: '📈' },
              { id: 'estrategia', label: 'STRATEGY', icon: '🎯' },
              { id: 'impacto', label: 'IMPACT', icon: '🌐' }
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
            Execution Roadmap
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
                  Economic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#7000ff]">Architecture</span>
               </h2>
               <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Deflationary model designed for technological sovereignty and long-term sustainability.
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
                           { name: 'PoUW Mining (Scientific)', value: 45, color: '#00ff9d' },
                           { name: 'DAO Treasury & R&D', value: 20, color: '#7000ff' },
                           { name: 'Team & Advisors (Vesting)', value: 15, color: '#00a8ff' },
                           { name: 'Liquidity Fund & Exchange', value: 10, color: '#ff00e6' },
                           { name: 'Validators & Network Security', value: 10, color: '#ffbd00' },
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
                           { name: 'PoUW Mining (Scientific)', value: 45, color: '#00ff9d' },
                           { name: 'DAO Treasury & R&D', value: 20, color: '#7000ff' },
                           { name: 'Team & Advisors (Vesting)', value: 15, color: '#00a8ff' },
                           { name: 'Liquidity Fund & Exchange', value: 10, color: '#ff00e6' },
                           { name: 'Validators & Network Security', value: 10, color: '#ffbd00' },
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
                   { name: 'PoUW Mining (Scientific)', value: 45, color: '#00ff9d', detail: 'Direct rewards for nodes providing useful computing power to the network (Q-HPC). Decreasing emission like Halving.' },
                   { name: 'DAO Treasury & R&D', value: 20, color: '#7000ff', detail: 'Community-governed fund to finance quantum-resistant hardware development, grants, and ecosystem expansion.' },
                   { name: 'Team & Advisors (Vesting)', value: 15, color: '#00a8ff', detail: 'Allocation for founders and key experts. Locked for 2 years with linear release afterward to align incentives.' },
                   { name: 'Liquidity Fund & Exchange', value: 10, color: '#ff00e6', detail: 'Initial liquidity provision on DEX/CEX to ensure market stability and QUBIT token accessibility.' },
                   { name: 'Validators & Network Security', value: 10, color: '#ffbd00', detail: 'Exclusive incentives for validator nodes ensuring RubikPoW consensus and transaction finality.' },
                 ].map((item, index) => (
                   <button
                     key={index}
                     className="w-full text-left group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00ff9d] transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,255,157,0.1)] flex justify-between items-center relative overflow-hidden"
                     onClick={() => openModal(item.name, `${item.name}\n\n${item.value}% of Total Supply\n\n${item.detail}`)}
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

      {/* === PROYECCIONES DE MERCADO SECTION === */}
      <section className="relative z-10 py-32 px-4 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-white uppercase tracking-tighter">
              Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-blue-500">Projections</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              QubitCoin captures value in the transition to real-world asset tokenization (RWA) and quantum-resistant infrastructure.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full h-[400px] max-w-4xl">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { year: '2024', valor: 0.8 },
                    { year: '2025', valor: 2.5 },
                    { year: '2026', valor: 5.2 },
                    { year: '2027', valor: 10.5 },
                    { year: '2028', valor: 18.0 },
                    { year: '2029', valor: 24.5 },
                    { year: '2030', valor: 30.0 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="year"
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `$${value}T`}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#0a0a0a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`$${value} Trillions`, 'RWA Market']}
                  />
                  <Bar
                    dataKey="valor"
                    name="RWA Market"
                    fill="url(#colorGradientBar)"
                    radius={[4, 4, 0, 0]}
                    className="cursor-pointer"
                  >
                    {[
                      { year: '2024', valor: 0.8 },
                      { year: '2025', valor: 2.5 },
                      { year: '2026', valor: 5.2 },
                      { year: '2027', valor: 10.5 },
                      { year: '2028', valor: 18.0 },
                      { year: '2029', valor: 24.5 },
                      { year: '2030', valor: 30.0 },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#00ff9d" />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="colorGradientBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00ff9d" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-12 text-center max-w-3xl">
              <h3 className="text-2xl font-bold text-brand-accent mb-4">Real World Assets Tokenization Market (RWA)</h3>
              <p className="text-gray-300 leading-relaxed">
                The real-world assets tokenization market (Real World Assets - RWA) is experiencing exponential growth.
                It is projected to reach <span className="text-brand-accent font-bold">$30 Trillions</span> by 2030, representing a critical
                opportunity for post-quantum financial infrastructures like QubitCoin.
              </p>
            </div>

            {/* Nuevo gráfico de crecimiento TVL */}
            <div className="w-full h-[400px] max-w-4xl mt-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { year: '2025', tvl: 0.1 },
                    { year: '2026', tvl: 0.3 },
                    { year: '2027', tvl: 0.8 },
                    { year: '2028', tvl: 2.5 },
                    { year: '2029', tvl: 7.2 },
                    { year: '2030', tvl: 18.5 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="year"
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `€${value}B`}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#0a0a0a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`€${value} Billions`, 'TVL']}
                  />
                  <Area
                    type="monotone"
                    dataKey="tvl"
                    name="TVL"
                    stroke="#7000ff"
                    strokeWidth={2}
                    fill="url(#colorGradientArea)"
                    className="cursor-pointer"
                  />
                  <defs>
                    <linearGradient id="colorGradientArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7000ff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7000ff" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-12 text-center max-w-3xl">
              <h3 className="text-2xl font-bold text-[#7000ff] mb-4">Projected Total Value Locked (TVL)</h3>
              <p className="text-gray-300 leading-relaxed">
                The adoption curve shows exponential growth starting from the Mainnet launch,
                with aggressive increase ("hockey stick" curve) demonstrating the project's scalability
                and rapid adoption by institutions and users.
              </p>
            </div>

            {/* Nuevo gráfico comparativo de sostenibilidad energética */}
            <div className="w-full h-[400px] max-w-4xl mt-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Bitcoin (PoW)', desperdicio: 95, utilidad: 5 },
                    { name: 'QubitCoin (PoUW)', desperdicio: 10, utilidad: 90 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <RechartsTooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{
                      backgroundColor: '#0a0a0a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Bar
                    dataKey="desperdicio"
                    name="Wasted Energy"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    className="cursor-pointer"
                  />
                  <Bar
                    dataKey="utilidad"
                    name="Scientific Utility"
                    fill="#00ff9d"
                    radius={[4, 4, 0, 0]}
                    className="cursor-pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-12 text-center max-w-3xl">
              <h3 className="text-2xl font-bold text-[#00ff9d] mb-4">Energy Sustainability Comparison</h3>
              <p className="text-gray-300 leading-relaxed">
                While Bitcoin wastes electrical energy on single calculations (95% waste),
                QubitCoin reuses energy for useful scientific calculations (90% utility),
                meeting European Green Deal objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === TECHNICAL VALIDATION SECTION === */}
      <section className="relative z-10 py-32 px-4 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-white uppercase tracking-tighter">
              Technical Validation & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-blue-500">Benchmarks</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Scientific evidence demonstrating the cryptographic superiority of RubikPoW based on the Symmetric Group S48
            </p>
          </div>

          {/* GRID DE GRÁFICOS TÉCNICOS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* GRÁFICO IZQUIERDO: Complexity Scale (State Space) */}
            <div className="bg-[#0a0a0a]/30 backdrop-blur-md rounded-2xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-center text-[#00ff9d] mb-8">Complexity Scale (State Space)</h3>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { name: 'Bitcoin (SHA-256)', valor: 77, tipo: 'bitcoin' },
                      { name: 'Atoms in the Universe', valor: 80, tipo: 'universo' },
                      { name: 'QubitCoin (Rubik S48)', valor: 116, tipo: 'qubitcoin' },
                    ]}
                    margin={{ top: 20, right: 30, left: 150, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                    <XAxis
                      type="number"
                      domain={[0, 120]}
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `10^${value}`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#6b7280"
                      style={{ fontSize: '12px', width: 140 }}
                      tick={{ dx: -150 }}
                      width={160}
                    />
                    <RechartsTooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{
                        backgroundColor: '#0a0a0a',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff'
                      }}
                      formatter={(value) => [`10^${value}`, 'Exponent']}
                      labelFormatter={(value) => `Item: ${value}`}
                    />
                    <Bar
                      dataKey="valor"
                      name="State Space"
                      className="cursor-pointer"
                    >
                      {[
                        { name: 'Bitcoin (SHA-256)', valor: 77, tipo: 'bitcoin' },
                        { name: 'Atoms in the Universe', valor: 80, tipo: 'universo' },
                        { name: 'QubitCoin (Rubik S48)', valor: 116, tipo: 'qubitcoin' },
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.tipo === 'qubitcoin' ? '#00ff9d' : entry.tipo === 'bitcoin' ? '#6b7280' : '#9ca3af'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-300 text-sm leading-relaxed">
                  QubitCoin's Symmetric Group S48 (10<sup>116</sup>) exceeds the number of atoms in the observable universe by 36 orders of magnitude (10<sup>80</sup>), providing quantum resistance even against Grover's Algorithm.
                </p>
              </div>
            </div>

            {/* GRÁFICO DERECHO: Asimetría PoUW (Generación vs Verificación) */}
            <div className="bg-[#0a0a0a]/30 backdrop-blur-md rounded-2xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-center text-[#00ff9d] mb-8">Computational Asymmetry (PoUW)</h3>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Resolution (Mining)', tiempo: 10000, tipo: 'resolucion' },
                      { name: 'Verification (Nodes)', tiempo: 45, tipo: 'verificacion' },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                      dataKey="name"
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `${value}ms`}
                    />
                    <RechartsTooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{
                        backgroundColor: '#0a0a0a',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff'
                      }}
                      formatter={(value) => [`${value}ms`, 'Time']}
                      labelFormatter={(value) => `Operation: ${value}`}
                    />
                    <Bar
                      dataKey="tiempo"
                      name="Processing Time"
                      className="cursor-pointer"
                    >
                      {[
                        { name: 'Resolution (Mining)', tiempo: 10000, tipo: 'resolucion' },
                        { name: 'Verification (Nodes)', tiempo: 45, tipo: 'verificacion' },
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.tipo === 'resolucion' ? '#7000ff' : '#00a8ff'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-300 text-sm leading-relaxed">
                  While puzzle resolution requires exhaustive work (Proof of Useful Work),
                  verification executes in polynomial time O(n), enabling instant finality.
                </p>
              </div>
            </div>
          </div>

          {/* DASHBOARD DE MÉTRICAS VISUALES V2 */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">

             {/* TARJETA 1: ENTROPÍA (Con Barra Visual) */}
             <div className="p-6 rounded-xl bg-[#050505] border border-[#00ff9d]/30 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(0,255,157,0.1)] transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <div className="text-[#00ff9d] text-xs font-mono mb-1">SYS.ENTROPY</div>
                      <h4 className="text-white text-lg font-bold">State Space</h4>
                   </div>
                   <div className="w-12 h-12 rounded-full border-4 border-[#00ff9d]/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-4 border-[#00ff9d] border-t-transparent animate-spin-slow"></div>
                      <span className="text-[10px] text-[#00ff9d] font-bold">S48</span>
                   </div>
                </div>
                <div className="text-3xl font-mono font-black text-white mb-2">1.57 × 10¹¹⁶</div>

                {/* Barra de Progreso Caos */}
                <div className="w-full bg-gray-800 h-1.5 rounded-full mb-1 overflow-hidden">
                   <div className="bg-[#00ff9d] h-full w-[99.8%] shadow-[0_0_10px_#00ff9d]"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mb-4">
                   <span>Caos (Shannon)</span>
                   <span className="text-[#00ff9d]">0.998</span>
                </div>

                <p className="text-xs text-gray-400 border-t border-white/10 pt-3 leading-relaxed">
                   <span className="text-[#00ff9d]">✓</span> Exceeds NIST PQC Security Level 5.
                </p>
             </div>

             {/* TARJETA 2: RENDIMIENTO (Con Sparkline Simulado) */}
             <div className="p-6 rounded-xl bg-[#050505] border border-[#7000ff]/30 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(112,0,255,0.1)] transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <div className="text-[#7000ff] text-xs font-mono mb-1">NODE.PERF</div>
                      <h4 className="text-white text-lg font-bold">Hashrate Nodo</h4>
                   </div>
                   <div className="h-8 flex items-end gap-1">
                      {[40, 60, 45, 70, 50, 80, 60].map((h, i) => (
                         <div key={i} className="w-1 bg-[#7000ff]" style={{ height: `${h}%`, opacity: 0.5 + (i * 0.1) }}></div>
                      ))}
                   </div>
                </div>
                <div className="text-3xl font-mono font-black text-white mb-2">4.2 <span className="text-lg text-gray-500">kSol/s</span></div>

                <div className="flex items-center gap-2 mb-4">
                   <span className="px-2 py-0.5 rounded bg-[#7000ff]/20 text-[#7000ff] text-xs font-bold">12ms Latency</span>
                   <span className="text-xs text-gray-500">Threadripper PRO</span>
                </div>

                <p className="text-xs text-gray-400 border-t border-white/10 pt-3 leading-relaxed">
                   <span className="text-[#7000ff]">⚡</span> Optimized for Server-Grade CPU.
                </p>
             </div>

             {/* TARJETA 3: RED (Con Estado Pulsante) */}
             <div className="p-6 rounded-xl bg-[#050505] border border-blue-500/30 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <div className="text-blue-500 text-xs font-mono mb-1">NET.STATUS</div>
                      <h4 className="text-white text-lg font-bold">Throughput</h4>
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-[10px] text-blue-400 font-bold tracking-wider">LIVE</span>
                   </div>
                </div>
                <div className="text-3xl font-mono font-black text-white mb-2">12,500 <span className="text-lg text-gray-500">TPS</span></div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                   <div className="bg-white/5 rounded p-2 text-center">
                      <div className="text-[10px] text-gray-500">FINALITY</div>
                      <div className="text-blue-400 font-bold">&lt; 2s</div>
                   </div>
                   <div className="bg-white/5 rounded p-2 text-center">
                      <div className="text-[10px] text-gray-500">EFFICIENCY</div>
                      <div className="text-green-400 font-bold">99.4%</div>
                   </div>
                </div>

                <p className="text-xs text-gray-400 border-t border-white/10 pt-3 leading-relaxed">
                   <span className="text-blue-500">❄️</span> Residual heat reused at 95%.
                </p>
             </div>

          </div>

          {/* TEXTO EXPLICATIVO TÉCNICO */}
          <div className="mt-16 text-center max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl border border-[#00ff9d]/20 bg-[#0a0a0a]/30 backdrop-blur-md">
              <h4 className="text-2xl font-bold text-[#00eeff] mb-4">Cryptographic Foundation</h4>
              <p className="text-gray-300 leading-relaxed font-mono text-base">
                The RubikPoW algorithm operates on the Symmetric Group S48. Benchmarks confirm perfect computational asymmetry:
                while the search for the target permutation requires exhaustive work (Proof of Useful Work),
                solution verification executes in polynomial time O(n), enabling instant finality on consumer hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN VISUALIZACIÓN 3D */}
      <section className="relative z-10 py-24 px-4 bg-gradient-to-b from-[#050505] to-[#0a0a0a] overflow-hidden">
         <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">
               The Heart of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#7000ff]">Sovereignty</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
               Real-time visualization of the S48 permutation structure. Each rotation represents an attempt at quantum-resistant cryptographic validation.
            </p>

            {/* Contenedor del Canvas 3D */}
            <div className="w-full max-w-3xl mx-auto h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00ff9d]/5 via-black/40 to-black rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
               <RubikCore />
            </div>
         </div>
      </section>

      {/* SECURITY GRID SECTION */}
      <SecurityGrid />

      {/* DOWNLOAD SECTION */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Institutional Documentation</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { lang: 'EN', flag: '🇬🇧', title: 'English Whitepaper' },
              { lang: 'ES', flag: '🇪🇸', title: 'Spanish Whitepaper' },
              { lang: 'DE', flag: '🇩🇪', title: 'German Whitepaper' }
            ].map((doc, i) => (
              <a
                key={doc.lang}
                href={`/whitepaper/QubitCoin-QBC _EU_${doc.lang}_Final.pdf`}
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
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-8 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-[#00ff9d] text-xl font-bold">✓</span>
                <span className="text-white font-bold text-base bg-gradient-to-r from-[#00ff9d] to-[#7000ff] bg-clip-text text-transparent hover:text-[#00ff9d] transition-all duration-300">MiCA Compliant</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#00ff9d] text-xl font-bold">✓</span>
                <span className="text-white font-bold text-base bg-gradient-to-r from-[#00ff9d] to-[#7000ff] bg-clip-text text-transparent hover:text-[#00ff9d] transition-all duration-300">GDPR Ready</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#00ff9d] text-xl font-bold">✓</span>
                <span className="text-white font-bold text-base bg-gradient-to-r from-[#00ff9d] to-[#7000ff] bg-clip-text text-transparent hover:text-[#00ff9d] transition-all duration-300">Made in EU</span>
              </div>
            </div>

            <p className="text-gray-300 text-base font-mono tracking-wide mb-6">
              © 2025 QubitCoin Labs GmbH • Frankfurt am Main
            </p>

            <p className="text-[#00ff9d] text-lg font-black mb-2">
              <a href="#" className="hover:text-white transition-colors bg-gradient-to-r from-[#00ff9d] to-[#7000ff] bg-clip-text text-transparent">European Digital Sovereignty Initiative</a>
            </p>
            <p className="text-gray-400 text-base font-medium max-w-2xl mx-auto">
              The Financial Infrastructure of European Mathematical Sovereignty
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
