import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Icy Antarctic Earth Texture
function generateIcyAntarcticTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Frosty desaturated polar ocean gradient (Icy Blue/Teal)
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#0a1d2e');
  oceanGrad.addColorStop(0.5, '#122c42');
  oceanGrad.addColorStop(1, '#1b3b57');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Tactical Ice Lat/Long Grid (Frosty white/cyan lines)
  ctx.strokeStyle = 'rgba(186, 230, 253, 0.14)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Northern Frost Cap
  ctx.fillStyle = 'rgba(240, 249, 255, 0.55)';
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, 70, 750, 75, 0, 0, Math.PI * 2);
  ctx.fill();

  // Continents (Desaturated icy slate landmasses)
  ctx.fillStyle = '#2b4b6a';
  const drawLand = (cx, cy, rx, ry) => {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0.2, 0, Math.PI * 2);
    ctx.fill();
  };
  drawLand(400, 350, 190, 110);
  drawLand(750, 300, 230, 130);
  drawLand(1300, 400, 270, 160);

  // ANTARCTICA (Stark Glacier White & Crisp Ice Cyan)
  const antarcticaGrad = ctx.createRadialGradient(
    canvas.width / 2, canvas.height - 120, 40,
    canvas.width / 2, canvas.height - 120, 620
  );
  antarcticaGrad.addColorStop(0, '#ffffff');
  antarcticaGrad.addColorStop(0.45, '#f0fdfa');
  antarcticaGrad.addColorStop(0.75, '#cff4fe');
  antarcticaGrad.addColorStop(1, 'transparent');

  ctx.fillStyle = antarcticaGrad;
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, canvas.height - 70, 920, 240, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glacial Ice Shelves (Ross / Ronne details in pure snow white)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(canvas.width * 0.44, canvas.height - 145, 210, 85, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(canvas.width * 0.59, canvas.height - 135, 230, 95, -0.1, 0, Math.PI * 2);
  ctx.fill();

  // Mission Control South Pole Target Marker (Icy Cyan)
  ctx.strokeStyle = '#a5f3fc';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(canvas.width * 0.5, canvas.height - 150, 20, 0, Math.PI * 2);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

function AntarcticGlobe() {
  const globeRef = useRef();
  const atmosphereRef = useRef();

  const earthTexture = useMemo(() => generateIcyAntarcticTexture(), []);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.07;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group rotation={[0.55, 0, -0.2]}> {/* Tilt forward to show Antarctica */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          shininess={35}
          specular={new THREE.Color('#e0f2fe')}
          bumpScale={0.05}
        />
      </mesh>

      {/* Frosty Cyan / Ice-White Atmosphere Glow Rim */}
      <mesh ref={atmosphereRef} scale={1.065}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial
          color="#a5f3fc"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function EarthGlobeCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, -0.3, 5.2], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.85} color="#f0f9ff" />
        <directionalLight position={[5, 4, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-5, -4, -3]} intensity={1.1} color="#a5f3fc" />
        
        <Stars radius={100} depth={50} count={2800} factor={4} saturation={0} fade speed={1} />
        <AntarcticGlobe />
      </Canvas>
    </div>
  );
}
