'use client';

import React from 'react';

export default function HomePage() {
  return (
    <div style={{
      backgroundColor: '#050505',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem 1rem'
    }}>

      {/* HERO */}
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', color: '#00ff9d' }}>
        QbitCoin (QBC)
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#cccccc', marginBottom: '3rem', textAlign: 'center' }}>
        The Post-Quantum Financial Standard
      </p>

      {/* DOWNLOAD BUTTONS - HTML PURO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px' }}>

        {/* ENGLISH */}
        <a href="/whitepaper/QbitCoin-QBC _EU_EN_Final.pdf" target="_blank" rel="noopener noreferrer"
           style={{ padding: '2rem', border: '1px solid #333', borderRadius: '15px', background: '#111', textDecoration: 'none', color: 'white', textAlign: 'center' }}>
           <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🇬🇧</div>
           <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>English Whitepaper</h3>
           <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>📄 Download PDF</span>
        </a>

        {/* SPANISH */}
        <a href="/whitepaper/QbitCoin-QBC _EU_ES_Final.pdf" target="_blank" rel="noopener noreferrer"
           style={{ padding: '2rem', border: '1px solid #333', borderRadius: '15px', background: '#111', textDecoration: 'none', color: 'white', textAlign: 'center' }}>
           <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🇪🇸</div>
           <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Whitepaper Español</h3>
           <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>📄 Descargar PDF</span>
        </a>

        {/* GERMAN */}
        <a href="/whitepaper/QbitCoin-QBC _EU_DE_Final.pdf" target="_blank" rel="noopener noreferrer"
           style={{ padding: '2rem', border: '1px solid #333', borderRadius: '15px', background: '#111', textDecoration: 'none', color: 'white', textAlign: 'center' }}>
           <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🇩🇪</div>
           <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Deutsches Whitepaper</h3>
           <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>📄 PDF Herunterladen</span>
        </a>

      </div>

      <footer style={{ marginTop: '5rem', color: '#666' }}>
        © 2025 QbitCoin Labs GmbH - Frankfurt am Main
      </footer>
    </div>
  );
}