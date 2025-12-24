'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Sub-componente para cada "Cubie" (pieza pequeña)
const Cubie = ({ position, color }: { position: [number, number, number], color: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  // Animación suave de escala al pasar el ratón (hover)
  const [hovered, setHover] = useState(false);

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? 1.1 : 1}
    >
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      {/* Material oscuro metálico para el cuerpo */}
      <meshStandardMaterial
        color="#0a0a0a"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.9}
      />
      {/* Bordes brillantes (Wireframe) */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.9, 0.9, 0.9)]} />
        <lineBasicMaterial color={color} linewidth={2} transparent opacity={hovered ? 1 : 0.4} />
      </lineSegments>
    </mesh>
  );
};

// El Grupo que forma el Cubo Rubik
const RubikGroup = () => {
  const group = useRef<THREE.Group>(null);

  // Animación de rotación constante del núcleo completo
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2;
      group.current.rotation.x += delta * 0.1;
    }
  });

  // Generación de la matriz 3x3x3
  const positions: [number, number, number][] = [];
  const offset = 1;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        positions.push([x * offset, y * offset, z * offset]);
      }
    }
  }

  return (
    <group ref={group}>
      {positions.map((pos, i) => (
        <Cubie 
          key={i} 
          position={pos} 
          // Alternar colores entre verde QbitCoin y morado
          color={Math.random() > 0.5 ? "#00ff9d" : "#7000ff"} 
        />
      ))}
    </group>
  );
};

// Componente Principal Exportado
export default function RubikCore() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        
        {/* Iluminación Ambiental Neon */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff9d" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7000ff" />

        {/* Efecto Flotante */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
           <RubikGroup />
        </Float>

        <Environment preset="city" />
      </Canvas>
      
      {/* Overlay de Texto "Holográfico" */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <div className="inline-block px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-[#00ff9d]/30">
           <span className="text-[#00ff9d] font-mono text-xs animate-pulse">● SIMULACIÓN NÚCLEO S48 EN TIEMPO REAL</span>
        </div>
      </div>
    </div>
  );
}