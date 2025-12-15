'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeTab, setActiveTab] = useState('finanzas');

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

  if (!mounted) return <div className="min-h-screen bg-brand-cyber-black" />;

  // Datos para el gráfico de comparativa
  const comparisonData = [
    { category: 'Seguridad', bitcoin: 'RSA-2048 (Vulnerable)', qbitcoin: 'RubikPoW+Dilithium (Blindado)' },
    { category: 'Velocidad', bitcoin: '10 min', qbitcoin: 'Instantáneo (DAG)' },
    { category: 'Consumo', bitcoin: 'Derrochador', qbitcoin: 'PoUW (Reutiliza energía)' },
    { category: 'Algoritmo', bitcoin: 'SHA-256', qbitcoin: 'Permutación Grupos (Matemáticas)' },
  ];

  return (
    <div className="min-h-screen bg-brand-cyber-black text-white font-sans overflow-x-hidden">
      {/* --- BACKGROUND AURORA EFFECT --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[length:400%_400%] animate-aurora-flow" style={{backgroundImage: 'var(--tw-gradient-stops)'}} 
             dangerouslySetInnerHTML={{__html: ''}}
        ></div>
        <div className="absolute inset-0 bg-aurora-animated animate-aurora-flow"></div>
      </div>

      {/* --- A. HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-8 inline-block border border-brand-accent/30 bg-brand-accent/5 px-6 py-2 rounded-full backdrop-blur-md animate-pulse-glow">
          <span className="text-brand-accent text-xs font-mono tracking-[0.3em] font-bold">SOFISTICACIÓN CRÍPTICA POST-CUÁNTICA</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-brand-neon-green to-brand-purple drop-shadow-2xl animate-glow-pulse">
          LA INFRAESTRUCTURA DE LA
        </h1>
        
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-brand-neon-blue to-brand-purple drop-shadow-2xl animate-glow-pulse">
          SOBERANÍA MATEMÁTICA
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 font-light mb-16 max-w-3xl mx-auto leading-relaxed px-4">
          Mientras el mundo duerme ante la amenaza RSA-2048, QbitCoin construye el <span className="text-brand-accent font-medium">búnker digital de Europa</span>.
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
        
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-purple rounded-full text-black font-bold text-lg hover:opacity-90 transition-opacity">
            Leer Whitepaper Institucional
          </button>
          <button className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md rounded-full text-white font-bold text-lg hover:bg-white/10 transition-colors">
            Ver Tesis de Inversión
          </button>
        </div>
      </section>

      {/* --- B. EL PROBLEMA SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
            El Colapso de la Criptografía Clásica
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-4 text-red-400">La Amenaza RSA-2048</h3>
              <p className="text-gray-300 leading-relaxed">
                RSA-2048, el estándar oro de seguridad criptográfica desde hace décadas, se convierte en papel mojado frente a computadoras cuánticas suficientemente grandes. 
                Shor's Algorithm puede factorizar números grandes en tiempo polinomial, invalidando toda la seguridad digital actual.
              </p>
              <div className="mt-6 p-4 bg-red-900/30 rounded-lg">
                <p className="text-red-300 font-mono text-sm">"Cualquier organización con una computadora cuántica podría acceder a cualquier dato encriptado"</p>
              </div>
            </div>
            
            {/* Simple CSS Graph Visualization */}
            <div className="p-8 rounded-2xl border border-brand-purple/20 bg-brand-purple/5 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-4 text-brand-purple">Línea Temporal de la Amenaza</h3>
              
              <div className="relative h-64">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 text-xs text-gray-400">100%</div>
                <div className="absolute left-0 top-1/2 text-xs text-gray-400">50%</div>
                <div className="absolute left-0 bottom-0 text-xs text-gray-400">0%</div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 text-xs text-gray-400">2020</div>
                <div className="absolute bottom-0 left-1/4 text-xs text-gray-400">2025</div>
                <div className="absolute bottom-0 left-1/2 text-xs text-gray-400">2030</div>
                <div className="absolute bottom-0 left-3/4 text-xs text-gray-400">2035</div>
                <div className="absolute bottom-0 right-0 text-xs text-gray-400">2040</div>
                
                {/* Security Line (descending) */}
                <div className="absolute bottom-0 left-0 w-full h-1" style={{background: 'linear-gradient(to right, red, yellow, green)'}}></div>
                
                {/* Qubit Capacity Line (ascending) */}
                <div className="absolute bottom-0 right-0 w-1 h-full" style={{background: 'linear-gradient(to top, red, orange, yellow, green)'}}></div>
                
                {/* "Día Q" marker */}
                <div className="absolute bottom-1/3 left-2/3 w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
                <div className="absolute bottom-1/3 left-2/3 text-xs text-red-400 ml-2">Día Q</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- C. LA SOLUCIÓN: RUBIK POW SECTION --- */}
      <section className="relative z-10 py-24 px-4 bg-gradient-to-b from-transparent to-brand-cyber-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-purple">
            La Solución: RubikPoW
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="p-8 rounded-2xl border border-brand-accent/20 bg-brand-accent/5 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-4 text-brand-accent">Algoritmo de Permutación Cuántica</h3>
              <p className="text-gray-300 leading-relaxed">
                Basado en la complejidad de los grupos de permutación del Cubo de Rubik n×n×n, RubikPoW es resistente a ataques cuánticos. 
                Las permutaciones no abelianas de este sistema crean una complejidad exponencial que incluso Grover's Algorithm no puede resolver eficientemente.
              </p>
              <div className="mt-6 p-4 bg-brand-purple/10 rounded-lg">
                <p className="text-brand-accent font-mono text-sm">"Seguridad matemática pura basada en teoría de grupos"</p>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl border border-brand-neon-blue/20 bg-brand-neon-blue/5 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-4 text-brand-neon-blue">Minería Científica (PoUW)</h3>
              <p className="text-gray-300 leading-relaxed">
                Proof of Useful Work (PoUW) no desperdicia energía en cálculos inútiles. Nuestros mineros resuelven problemas matemáticos reales, 
                como plegamiento de proteínas, optimización logística y cálculos climáticos, mientras aseguran la red. El calor generado es reutilizado para calefacción.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-3xl">🧬</div>
                  <div className="text-sm text-gray-400">Bioinformática</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-3xl">🚚</div>
                  <div className="text-sm text-gray-400">Logística</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-3xl">🌡️</div>
                  <div className="text-sm text-gray-400">Calor Reutilizado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- D. ECOSISTEMA DE IMPACTO SECTION (Tabs) --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-neon-blue to-brand-accent">
            Ecosistema de Impacto
          </h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            <button 
              onClick={() => setActiveTab('finanzas')}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                activeTab === 'finanzas' 
                  ? 'bg-brand-accent text-black' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Finanzas
            </button>
            <button 
              onClick={() => setActiveTab('gobierno')}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                activeTab === 'gobierno' 
                  ? 'bg-brand-purple text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Gobierno y Militar
            </button>
            <button 
              onClick={() => setActiveTab('ciencia')}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                activeTab === 'ciencia' 
                  ? 'bg-brand-neon-blue text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Ciencia y Empleo
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            {activeTab === 'finanzas' && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-brand-accent">Liquidación Instantánea y Cumplimiento</h3>
                <p className="text-gray-300 mb-6">Transferencias de valor en milisegundos con plena conformidad reguladora MiCA</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-brand-cyber-gray/30 rounded-xl">
                    <div className="text-4xl mb-2">⚡</div>
                    <h4 className="text-xl font-bold text-white">Settlement Final</h4>
                    <p className="text-gray-400 mt-2">Liquidación en 0.001 segundos</p>
                  </div>
                  <div className="p-6 bg-brand-cyber-gray/30 rounded-xl">
                    <div className="text-4xl mb-2">🏛️</div>
                    <h4 className="text-xl font-bold text-white">Compliance Built-in</h4>
                    <p className="text-gray-400 mt-2">Conformidad MiCA y KYC/AML</p>
                  </div>
                  <div className="p-6 bg-brand-cyber-gray/30 rounded-xl">
                    <div className="text-4xl mb-2">🔗</div>
                    <h4 className="text-xl font-bold text-white">CBDC Bridges</h4>
                    <p className="text-gray-400 mt-2">Puertos a monedas digitales del banco central</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'gobierno' && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-brand-purple">Trazabilidad y Seguridad Estatal</h3>
                <p className="text-gray-300 mb-6">Identidad soberana inquebrantable y trazabilidad de cadenas críticas de suministro</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-brand-cyber-gray/30 rounded-xl">
                    <div className="text-4xl mb-2">🛡️</div>
                    <h4 className="text-xl font-bold text-white">Identidad Soberana</h4>
                    <p className="text-gray-400 mt-2">Autonomía de identidad digital europea</p>
                  </div>
                  <div className="p-6 bg-brand-cyber-gray/30 rounded-xl">
                    <div className="text-4xl mb-2">🔍</div>
                    <h4 className="text-xl font-bold text-white">Trazabilidad</h4>
                    <p className="text-gray-400 mt-2">Cadena de suministro crítica</p>
                  </div>
                  <div className="p-6 bg-brand-cyber-gray/30 rounded-xl">
                    <div className="text-4xl mb-2">🔒</div>
                    <h4 className="text-xl font-bold text-white">Seguridad Gubernamental</h4>
                    <p className="text-gray-400 mt-2">Comunicaciones blindadas</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'ciencia' && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-brand-neon-blue">Innovación y Empleo Europeo</h3>
                <p className="text-gray-300 mb-6">Creación de la industria europea de hardware criptográfico</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-brand-cyber-gray/30 rounded-xl">
                    <div className="text-4xl mb-2">🔬</div>
                    <h4 className="text-xl font-bold text-white">Centros de Investigación</h4>
                    <p className="text-gray-400 mt-2">Universidades trabajando en criptografía post-cuántica</p>
                  </div>
                  <div className="p-6 bg-brand-cyber-gray/30 rounded-xl">
                    <div className="text-4xl mb-2">🏭</div>
                    <h4 className="text-xl font-bold text-white">Hardware Criptográfico</h4>
                    <p className="text-gray-400 mt-2">Chips ASIC diseñados en la UE</p>
                  </div>
                  <div className="p-6 bg-brand-cyber-gray/30 rounded-xl">
                    <div className="text-4xl mb-2">🎓</div>
                    <h4 className="text-xl font-bold text-white">Empleo de Alta Calidad</h4>
                    <p className="text-gray-400 mt-2">Ingenieros y matemáticos en Europa</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- E. COMPARATIVA SECTION --- */}
      <section className="relative z-10 py-24 px-4 bg-gradient-to-b from-brand-cyber-gray/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
            Comparativa: El Futuro vs. El Pasado
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-4 text-xl font-bold text-center">Característica</th>
                  <th className="p-4 text-xl font-bold text-center text-red-400">Bitcoin (Legacy)</th>
                  <th className="p-4 text-xl font-bold text-center text-green-400">QbitCoin (Futuro)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="p-4 font-bold">{item.category}</td>
                    <td className="p-4 flex items-center justify-center">
                      <span className="text-red-400 flex items-center">
                        <span className="mr-2">✗</span> {item.bitcoin}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-center">
                      <span className="text-green-400 flex items-center">
                        <span className="mr-2">✓</span> {item.qbitcoin}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-block p-6 bg-brand-cyber-gray/30 rounded-xl border border-brand-purple/30">
              <p className="text-brand-purple font-bold text-lg">QbitCoin: La evolución natural del dinero digital</p>
              <p className="text-gray-400 mt-2">Diseñado para Europa, blindado para el futuro</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- F. ROADMAP SECTION --- */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-purple">
            Hoja de Ruta de Ejecución
          </h2>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-brand-accent to-brand-purple"></div>
            
            {/* Timeline Items */}
            <div className="space-y-24">
              {/* Item 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                  <p className="text-xl font-bold text-brand-accent">Fundación</p>
                  <p className="text-gray-400">2024</p>
                </div>
                <div className="md:w-1/2 mx-8 relative">
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-brand-cyber-black"></div>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <h3 className="text-xl font-bold mb-2">QbitCoin Labs GmbH</h3>
                    <p className="text-gray-400">Fundación oficial en Frankfurt, desarrollo del whitepaper y matemáticas de RubikPoW</p>
                  </div>
                </div>
                <div className="md:w-1/4 text-center md:text-left">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">COMPLETADO</span>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                  <p className="text-xl font-bold text-yellow-400">Testnet Alfa</p>
                  <p className="text-gray-400">Q1 2025</p>
                </div>
                <div className="md:w-1/2 mx-8 relative">
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-brand-cyber-black"></div>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <h3 className="text-xl font-bold mb-2">Validación Técnica</h3>
                    <p className="text-gray-400">Pruebas de seguridad con instituciones europeas y validación académica</p>
                  </div>
                </div>
                <div className="md:w-1/4 text-center md:text-left">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">ACTIVO</span>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                  <p className="text-xl font-bold text-brand-purple">Testnet Público</p>
                  <p className="text-gray-400">1 Jun 2025</p>
                </div>
                <div className="md:w-1/2 mx-8 relative">
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-brand-cyber-black"></div>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <h3 className="text-xl font-bold mb-2">Lanzamiento Público</h3>
                    <p className="text-gray-400">Acceso público al testnet, evaluación por parte del EIC y socios estratégicos</p>
                  </div>
                </div>
                <div className="md:w-1/4 text-center md:text-left">
                  <span className="px-3 py-1 bg-brand-purple/20 text-brand-purple rounded-full text-sm">PRÓXIMO</span>
                </div>
              </div>
              
              {/* Item 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                  <p className="text-xl font-bold text-brand-accent">Mainnet</p>
                  <p className="text-gray-400">2026</p>
                </div>
                <div className="md:w-1/2 mx-8 relative">
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-brand-cyber-black"></div>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <h3 className="text-xl font-bold mb-2">Lanzamiento Oficial</h3>
                    <p className="text-gray-400">Bloque génesis, minería PoUW activa y listado en exchanges principales</p>
                  </div>
                </div>
                <div className="md:w-1/4 text-center md:text-left">
                  <span className="px-3 py-1 bg-brand-accent/20 text-brand-accent rounded-full text-sm">OBJETIVO</span>
                </div>
              </div>
              
              {/* Item 5 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-right">
                  <p className="text-xl font-bold text-brand-neon-blue">Hegemonía</p>
                  <p className="text-gray-400">2027</p>
                </div>
                <div className="md:w-1/2 mx-8 relative">
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-brand-neon-blue flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-brand-cyber-black"></div>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <h3 className="text-xl font-bold mb-2">Adopción Masiva</h3>
                    <p className="text-gray-400">Integración con bancos centrales europeos, gobierno digital y ciencia colaborativa</p>
                  </div>
                </div>
                <div className="md:w-1/4 text-center md:text-left">
                  <span className="px-3 py-1 bg-brand-neon-blue/20 text-brand-neon-blue rounded-full text-sm">VISION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- G. FOOTER --- */}
      <footer className="relative z-10 py-12 bg-brand-cyber-gray backdrop-blur-xl border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-[10px] font-mono tracking-widest uppercase">
            © 2025 QbitCoin Labs GmbH • Frankfurt am Main
          </p>
          <p className="text-gray-500 text-[8px] mt-2">
            La Infraestructura Financiera de la Soberanía Matemática Europea
          </p>
          <a href="#" className="inline-block mt-4 text-brand-accent hover:text-brand-purple font-bold text-sm">
            Iniciativa Europea de Soberanía Digital
          </a>
        </div>
      </footer>
    </div>
  );
}