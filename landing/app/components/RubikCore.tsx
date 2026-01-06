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

const Cubie = ({ position, isMining, activeIndices, onClick }: { position: [number, number, number], isMining: boolean, activeIndices: [number, number, number], onClick: (data: any) => void }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [blockData] = useState(generateBlockData());

  // Determinar si este bloque está en una fila/columna activa
  const [x, y, z] = position;
  const isActive = activeIndices[0] === x || activeIndices[1] === y || activeIndices[2] === z;

  // Color dinámico: Si está validado es verde, si está activo destaca, si no es oscuro
  const dynamicColor = isValidated ? "#00ff9d" : isActive ? "#00ff9d" : "#7000ff";

  // Color del material basado en estado
  const materialColor = selected ? "#ffffff" : (isValidated ? "#00ff9d" : "#0a0a0a");
  const emissiveColor = selected ? "#ffffff" : (isValidated ? "#00ff9d" : isActive ? "#00ff9d" : "#000000");
  const emissiveIntensity = selected ? 0.8 : (isValidated ? 0.5 : isActive ? 0.3 : 0);

  return (
    <group>
      <mesh
        ref={mesh}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(!selected);
          onClick({...blockData, position, isValidated});
        }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={selected ? "#ffffff" : (isValidated ? "#00ff9d" : "#0a0a0a")} // Cuerpo blanco si seleccionado, verde si validado, negro si no
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.95}
          emissive={selected ? "#ffffff" : (isValidated ? "#00ff9d" : isActive ? "#00ff9d" : "#000000")}
          emissiveIntensity={selected ? 0.8 : (isValidated ? 0.5 : isActive ? 0.3 : 0)}
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.9, 0.9, 0.9)]} />
          <lineBasicMaterial
            color={selected ? "#ffffff" : (isValidated ? "#ffffff" : dynamicColor)}
            linewidth={selected ? 3 : 2}
            transparent
            opacity={selected ? 0.8 : 0.6}
          />
        </lineSegments>
      </mesh>
    </group>
  );
};

const RubikGroup = ({ onBlockSelect }: { onBlockSelect: (data: any) => void }) => {
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
        <Cubie
          key={i}
          position={pos}
          isMining={isMining}
          activeIndices={activeIndices}
          onClick={onBlockSelect}
        />
      ))}
    </group>
  );
};

export default function RubikCore() {
  const [selectedBlock, setSelectedBlock] = useState<any>(null);

  const handleBlockSelect = (data: any) => {
    setSelectedBlock(data);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* CUBO 3D */}
        <div className="lg:w-2/3">
          <div className="h-[500px] w-full">
            <Canvas dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 6]} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.5}
              />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#00ff9d" />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                 <RubikGroup onBlockSelect={handleBlockSelect} />
              </Float>
              <Environment preset="city" />
            </Canvas>
          </div>
        </div>

        {/* PANEL DE INSPECCIÓN */}
        <div className="lg:w-1/3 flex justify-center items-start">
          <div className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-2xl border border-[#00ff9d]/30 p-6 mt-4 lg:mt-0">
            <h3 className="text-xl font-bold text-[#00ff9d] mb-4 font-mono tracking-wide text-center">BLOCK INSPECTOR MODULE</h3>

            {selectedBlock ? (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-black/40 p-4 rounded-lg border border-[#7000ff]/30">
                  <div className="text-[#00ff9d] font-bold text-sm mb-2 flex justify-between">
                    <span>BLOCK ANALYSIS</span>
                    {selectedBlock.isValidated && <span className="animate-pulse text-green-400">● VALIDATED</span>}
                  </div>
                  <div className="text-gray-300 text-xs font-mono space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Position:</span>
                      <span className="text-white">[{selectedBlock.position?.join(', ')}]</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hash:</span>
                      <span className="text-white">{selectedBlock.hash}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nonce:</span>
                      <span className="text-purple-400">{selectedBlock.nonce}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Difficulty:</span>
                      <span className="text-blue-400">{selectedBlock.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Reward:</span>
                      <span className="text-yellow-400">{selectedBlock.reward}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-xs">Click on any block to inspect its quantum-resistant cryptographic properties</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 font-mono text-sm mb-2">SYSTEM IDLE</div>
                <div className="text-gray-600 text-sm">SELECT A BLOCK TO ANALYZE</div>
                <div className="mt-4 text-gray-700 text-xs">
                  Click on any cube segment to inspect its cryptographic properties
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TARJETA DE ESTADO DE MINERÍA - Movida fuera del contenedor del cubo */}
      <div className="mt-6 px-4">
        <div className="inline-block px-6 py-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 max-w-2xl w-full">
           <p className="text-white text-sm font-mono mb-1">
             <span className="text-[#00ff9d] animate-pulse">● MINING IN PROGRESS</span> | HASHING POWER: 4.2 kSol/s
           </p>
           <p className="text-gray-400 text-xs">
             El núcleo permuta combinaciones del Grupo S48. Pasa el ratón sobre los bloques para inspeccionar el estado de validación en tiempo real.
           </p>
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