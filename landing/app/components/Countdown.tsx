'use client';
import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ 
    days: '--', 
    hours: '--', 
    minutes: '--', 
    seconds: '--' 
  });

  useEffect(() => {
    // Fecha objetivo: 1 de Junio de 2025 a las 00:00:00 UTC
    const targetDate = new Date('2025-06-01T00:00:00Z').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        // Si la fecha ya pasó, devolvemos ceros
        return { 
          days: '00', 
          hours: '00', 
          minutes: '00', 
          seconds: '00' 
        };
      }

      // Calcular días, horas, minutos y segundos restantes
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { 
        days: String(days).padStart(2, '0'), 
        hours: String(hours).padStart(2, '0'), 
        minutes: String(minutes).padStart(2, '0'), 
        seconds: String(seconds).padStart(2, '0') 
      };
    };

    // Actualizar inmediatamente
    setTimeLeft(calculateTimeLeft());

    // Actualizar cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Limpiar intervalo al desmontar
    return () => clearInterval(timer);
  }, []); // Dependencia vacía para ejecutar solo una vez

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-2xl">
      <div className="text-center">
        <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20">{timeLeft.days}</div>
        <div className="text-xs md:text-sm text-gray-400 mt-2">DÍAS</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20">{timeLeft.hours}</div>
        <div className="text-xs md:text-sm text-gray-400 mt-2">HORAS</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20">{timeLeft.minutes}</div>
        <div className="text-xs md:text-sm text-gray-400 mt-2">MINUTOS</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/30 backdrop-blur-xl p-4 rounded-xl border border-[#00ff9d]/20">{timeLeft.seconds}</div>
        <div className="text-xs md:text-sm text-gray-400 mt-2">SEGUNDOS</div>
      </div>
    </div>
  );
}