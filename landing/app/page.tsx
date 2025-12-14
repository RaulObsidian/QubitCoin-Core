import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00ff9d] selection:text-black">

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7000ff]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00ff9d]/10 rounded-full blur-[120px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 flex flex-col items-center text-center">

        {/* HERO */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
          QbitCoin <span className="text-[#00ff9d]">Core</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12">
          The Post-Quantum Financial Infrastructure. <br/>
          Secured by <span className="text-[#7000ff]">RubikPoW</span> & S48 Group Theory.
        </p>

        {/* DOWNLOAD CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12">

          {/* ENGLISH */}
          <a href="/whitepaper/QbitCoin-QBC _EU_EN_Final.pdf" target="_blank" className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00ff9d]/50 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">🇬🇧</div>
            <h3 className="text-xl font-bold mb-2">English Whitepaper</h3>
            <div className="text-[#00ff9d] font-mono text-sm mt-4 group-hover:underline">DOWNLOAD PDF &rarr;</div>
          </a>

          {/* SPANISH */}
          <a href="/whitepaper/QbitCoin-QBC _EU_ES_Final.pdf" target="_blank" className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00ff9d]/50 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">🇪🇸</div>
            <h3 className="text-xl font-bold mb-2">Whitepaper Español</h3>
            <div className="text-[#00ff9d] font-mono text-sm mt-4 group-hover:underline">DESCARGAR PDF &rarr;</div>
          </a>

          {/* GERMAN */}
          <a href="/whitepaper/QbitCoin-QBC _EU_DE_Final.pdf" target="_blank" className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00ff9d]/50 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">🇩🇪</div>
            <h3 className="text-xl font-bold mb-2">Deutsches Whitepaper</h3>
            <div className="text-[#00ff9d] font-mono text-sm mt-4 group-hover:underline">PDF HERUNTERLADEN &rarr;</div>
          </a>

        </div>

        <footer className="mt-24 text-gray-600 text-sm">
          © 2025 QbitCoin Labs GmbH • Frankfurt am Main • Sovereignty Built on Math
        </footer>

      </div>
    </main>
  );
}