import { useTranslations } from 'next-intl';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Index');
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white overflow-hidden relative selection:bg-cyan-500 selection:text-white">
      {/* Fondo Ambiental */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      {/* Contenido Principal */}
      <div className="z-10 text-center max-w-5xl px-6 animate-fade-in-up">
        <div className="mb-6 inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md">
          <span className="text-cyan-400 text-sm font-mono tracking-widest uppercase">Protocolo Post-Cuántica v1.0</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-slate-400">
          {t('title')}
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('description')}
        </p>

        {/* Cuenta Atrás Simulada (Estética) */}
        <div className="grid grid-cols-4 gap-4 mb-16 max-w-lg mx-auto">
          {['08', '14', '32', '59'].map((num, i) => (
            <div key={i} className="flex flex-col items-center p-4 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm">
              <span className="text-3xl font-bold font-mono text-cyan-400">{num}</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                {['Días', 'Hrs', 'Min', 'Seg'][i]}
              </span>
            </div>
          ))}
        </div>

        {/* Botones de Descarga Premium */}
        <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
          {[
            { lang: 'ES', label: 'Descargar Whitepaper', file: 'QbitCoin_Whitepaper_v1.0_ES.pdf' },
            { lang: 'EN', label: 'Download Whitepaper', file: 'QbitCoin_Whitepaper_v1.0_EN.pdf' },
            { lang: 'DE', label: 'Whitepaper herunterladen', file: 'QbitCoin_Whitepaper_v1.0_DE.pdf' }
          ].map((btn) => (
            <a 
              key={btn.lang}
              href={`/whitepaper/${btn.file}`}
              download
              className="group relative px-8 py-4 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden transition-all hover:border-cyan-500/50 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center gap-3">
                <span className="text-2xl">📄</span>
                <div className="text-left">
                  <div className="text-xs text-cyan-500 font-bold tracking-wider">{btn.lang}</div>
                  <div className="text-sm font-medium text-slate-200">{btn.label}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}