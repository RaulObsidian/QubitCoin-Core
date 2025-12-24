'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Datos simulados de bloque para el tooltip
const generateBlockData = () => ({
  hash: "0x" + Math.random().toString(16).substr(2, 8) + "...",
  nonce: Math.floor(Math.random() * 100000),
  difficulty: "S48-Hard",
  reward: "50 QBC"
});

const Cubie = ({ position, isMining, activeIndices }: { position: [number, number, number], isMining: boolean, activeIndices: [number, number, number] }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [blockData] = useState(generateBlockData());
  
  // Determinar si este bloque está en una fila/columna activa
  const [x, y, z] = position;
  const isActive = activeIndices[0] === x || activeIndices[1] === y || activeIndices[2] === z;
  
  // Color dinámico: Si está validado es verde, si está activo destaca, si no es oscuro
  const dynamicColor = isValidated ? "#00ff9d" : isActive ? "#00ff9d" : "#7000ff";

  return (
    <group>
      <mesh
        ref={mesh}
        position={position}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={isValidated ? "#00ff9d" : "#0a0a0a"} // Cuerpo verde si validado
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.95}
          emissive={isValidated ? "#00ff9d" : isActive ? "#00ff9d" : "#000000"}
          emissiveIntensity={isValidated ? 0.5 : isActive ? 0.3 : 0}
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.9, 0.9, 0.9)]} />
          <lineBasicMaterial color={isValidated ? "#ffffff" : dynamicColor} linewidth={2} transparent opacity={0.6} />
        </lineSegments>
        
        {/* TOOLTIP INTERACTIVO */}
        {hovered && (
          <Html distanceFactor={10}>
            <div className="bg-black/90 border border-[#00ff9d] p-3 rounded-lg w-48 shadow-[0_0_20px_rgba(0,255,157,0.3)] backdrop-blur-md pointer-events-none transform -translate-y-full -translate-x-1/2 mt-[-20px]">
              <div className="text-[#00ff9d] font-bold text-xs mb-1 border-b border-white/20 pb-1 flex justify-between">
                <span>BLOCK INFO</span>
                {isValidated && <span className="animate-pulse">● VALIDATED</span>}
              </div>
              <div className="text-gray-300 text-[10px] font-mono space-y-1">
                <div className="flex justify-between"><span>Hash:</span> <span className="text-white">{blockData.hash}</span></div>
                <div className="flex justify-between"><span>Nonce:</span> <span className="text-purple-400">{blockData.nonce}</span></div>
                <div className="flex justify-between"><span>Diff:</span> <span className="text-blue-400">{blockData.difficulty}</span></div>
              </div>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
};

const RubikGroup = () => {
  const group = useRef<THREE.Group>(null);
  const [activeIndices, setActiveIndices] = useState<[number, number, number]>([0, 0, 0]);
  const [isMining, setIsMining] = useState(true);

  // Simulación de movimiento de filas/columnas
  useEffect(() => {
    if (isMining) {
      const interval = setInterval(() => {
        // Seleccionar aleatoriamente un eje (0=X, 1=Y, 2=Z) y un índice (-1, 0, 1)
        const axis = Math.floor(Math.random() * 3);
        const index = Math.floor(Math.random() * 3) - 1;
        
        // Actualizar los índices activos (solo un eje a la vez)
        const newActiveIndices: [number, number, number] = [0, 0, 0];
        newActiveIndices[axis] = index;
        setActiveIndices(newActiveIndices);
        
        // 3% de probabilidad de validar un bloque
        if (Math.random() > 0.97) {
          // Aquí no podemos controlar directamente el estado de validación de un cubo desde aquí
          // pero mostraremos visualmente la activación de una fila/columna
        }
      }, 800); // Actualizar cada 800ms
      
      return () => clearInterval(interval);
    }
  }, [isMining]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1; // Rotación lenta general
      group.current.rotation.x += delta * 0.05;
    }
  });

  const positions: [number, number, number][] = [];
  const offset = 1;
  for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) positions.push([x, y, z]);

  return (
    <group ref={group}>
      {positions.map((pos, i) => (
        <Cubie key={i} position={pos} isMining={isMining} activeIndices={activeIndices} />
      ))}
    </group>
  );
};

export default function RubikCore() {
  return (
    <div className="w-full">
      <div className="h-[500px] relative">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ff9d" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
             <RubikGroup />
          </Float>
          <Environment preset="city" />
        </Canvas>
        
        <div className="absolute bottom-4 left-0 right-0 text-center px-4">
          <div className="inline-block px-6 py-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 max-w-2xl">
             <p className="text-white text-sm font-mono mb-1">
               <span className="text-[#00ff9d] animate-pulse">● MINING IN PROGRESS</span> | HASHING POWER: 4.2 kSol/s
             </p>
             <p className="text-gray-400 text-xs">
               El núcleo permuta combinaciones del Grupo S48. Pasa el ratón sobre los bloques para inspeccionar el estado de validación en tiempo real.
             </p>
          </div>
        </div>
      </div>
      
      {/* TARJETA DE EXPLICACIÓN TÉCNICA - Fuera del contenedor del cubo */}
      <div className="mt-6 px-4">
        <div className="inline-block px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-md rounded-xl border border-[#00ff9d]/30 max-w-4xl w-full">
          <h4 className="text-[#00ff9d] font-bold text-sm mb-2 font-mono tracking-wider">ARQUITECTURA DE PERMUTACIÓN VECTORIAL</h4>
          <p className="text-gray-300 text-xs font-mono mb-2 leading-relaxed">
            El visualizador muestra una instancia simplificada (3×3×3) del protocolo. En producción, 
            RubikPoW opera sobre matrices multidimensionales escalables (N×N×N), donde N se ajusta 
            dinámicamente según la dificultad de la red.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[8px] text-left">
            <div className="bg-white/5 p-2 rounded border border-white/10">
              <div className="text-[#00ff9d] font-bold mb-1">Mecánica:</div>
              <div className="text-gray-400">Rotación de vectores fila/columna (Slices) para generar entropía.</div>
            </div>
            <div className="bg-white/5 p-2 rounded border border-white/10">
              <div className="text-[#00ff9d] font-bold mb-1">Validación:</div>
              <div className="text-gray-400">Prueba de Trabajo Útil (PoUW) aplicada a investigación científica.</div>
            </div>
            <div className="bg-white/5 p-2 rounded border border-white/10">
              <div className="text-[#00ff9d] font-bold mb-1">Seguridad:</div>
              <div className="text-gray-400">Resistencia cuántica mediante complejidad factorial.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}