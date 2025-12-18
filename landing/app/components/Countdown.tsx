'use client';
import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';

// Componente de renderizado para el contador
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Renderizado cuando se completa la cuenta regresiva
    return (
      <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-2xl">
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20">00</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">DÍAS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20">00</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">HORAS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20">00</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">MINUTOS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20">00</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">SEGUNDOS</div>
        </div>
      </div>
    );
  } else {
    // Renderizado durante la cuenta regresiva
    return (
      <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-2xl animate-fade-in-up">
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{zeroPad(days)}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">DÍAS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{zeroPad(hours)}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">HORAS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{zeroPad(minutes)}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">MINUTOS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20 animate-pulse-glow">{zeroPad(seconds)}</div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">SEGUNDOS</div>
        </div>
      </div>
    );
  }
};

export default function CountdownComponent() {
  // Fecha objetivo: 1 de junio de 2025 a las 00:00:00 UTC
  const targetDate = new Date(2025, 5, 1, 0, 0, 0); // Mes 5 es junio (0-indexed)
  
  return (
    <Countdown
      date={targetDate}
      renderer={renderer}
    />
  );
}