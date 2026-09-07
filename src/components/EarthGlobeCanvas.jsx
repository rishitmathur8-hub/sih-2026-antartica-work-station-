import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Compass, Radio, Lock, Activity, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

// Convert Lat/Lon to 3D Cartesian coordinates on a sphere of given radius
function latLonToVector3(lat, lon, radius = 2.2) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  // In Three.js standard sphere:
  const x = -radius * Math.cos(latRad) * Math.sin(lonRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.cos(lonRad);
  return new THREE.Vector3(x, y, z);
}

// Station definitions with real Antarctic coordinates
const STATIONS = [
  {
    id: 'maitri',
    name: 'Maitri Research Station',
    shortName: 'MAITRI',
    code: 'IND-MTR-01',
    coords: '70°45′57″S 11°44′09″E',
    location: 'Schirmacher Oasis',
    lat: -70.7658,
    lon: 11.7358,
    color: '#9DECC0',
    accentClass: 'text-[#9DECC0]',
    bgClass: 'bg-[#9DECC0]',
    borderClass: 'border-[#9DECC0]',
    status: 'ONLINE',
    temp: '-32.4°C',
    crew: '24 Crew',
    power: '480 kW (94%)'
  },
  {
    id: 'bharati',
    name: 'Bharati Research Station',
    shortName: 'BHARATI',
    code: 'IND-BHT-02',
    coords: '69°24′28″S 76°11′14″E',
    location: 'Larsemann Hills',
    lat: -69.4078,
    lon: 76.1872,
    color: '#38bdf8',
    accentClass: 'text-sky-400',
    bgClass: 'bg-sky-400',
    borderClass: 'border-sky-400',
    status: 'ONLINE',
    temp: '-28.0°C',
    crew: '18 Crew',
    power: '440 kW (78%)'
  }
];

// Procedural High-Detail Icy Antarctic & Tactical Geospatial Texture
function generateGeospatialAntarcticTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep Mission Control Ocean Gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#030c14');
  oceanGrad.addColorStop(0.3, '#081d2e');
  oceanGrad.addColorStop(0.7, '#0d283e');
  oceanGrad.addColorStop(1, '#051422');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Tactical Lat/Long Radar Grid Lines
  ctx.strokeStyle = 'rgba(157, 236, 192, 0.12)';
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

  // Highlight Antarctic Circle (66.5° S -> y ~ 890)
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  const antarcticCircleY = (90 - (-66.5)) / 180 * canvas.height;
  ctx.moveTo(0, antarcticCircleY);
  ctx.lineTo(canvas.width, antarcticCircleY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw Other Continents (Dark Desaturated Polar Landmasses with Glowing Coasts)
  ctx.fillStyle = '#112536';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.lineWidth = 1;

  const drawLandBlob = (cx, cy, rx, ry, angle = 0) => {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, angle, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  };

  // Africa
  drawLandBlob(1150, 480, 140, 190, 0.1);
  // South America
  drawLandBlob(680, 580, 120, 180, -0.2);
  // Australia
  drawLandBlob(1700, 620, 130, 90, 0.1);
  // Indian Subcontinent
  drawLandBlob(1420, 400, 90, 80, -0.1);
  // Eurasia / North America caps
  drawLandBlob(1100, 200, 450, 110, 0);

  // ANTARCTICA (Stark Glacier Ice White, Ice Shelves, Cyan Gradient)
  const antarcticaGrad = ctx.createRadialGradient(
    canvas.width / 2, canvas.height - 110, 30,
    canvas.width / 2, canvas.height - 110, 640
  );
  antarcticaGrad.addColorStop(0, '#ffffff');
  antarcticaGrad.addColorStop(0.35, '#f0fdfa');
  antarcticaGrad.addColorStop(0.65, '#cff4fe');
  antarcticaGrad.addColorStop(0.88, '#7dd3fc');
  antarcticaGrad.addColorStop(1, 'transparent');

  ctx.fillStyle = antarcticaGrad;
  ctx.beginPath();
  // Main Antarctic Continent Body
  ctx.ellipse(canvas.width / 2, canvas.height - 85, 960, 240, 0, 0, Math.PI * 2);
  ctx.fill();

  // Antarctic Peninsula pointing towards South America
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(660, 840, 45, 110, -0.6, 0, Math.PI * 2);
  ctx.fill();

  // Ross & Ronne Ice Shelves (Pure Glacial White)
  ctx.beginPath();
  ctx.ellipse(890, 890, 190, 75, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(1220, 900, 210, 80, -0.15, 0, Math.PI * 2);
  ctx.fill();

  // Tactical Station Coordinates Target Rings on Texture
  STATIONS.forEach((st) => {
    const tx = (st.lon + 180) / 360 * canvas.width;
    const ty = (90 - st.lat) / 180 * canvas.height;

    ctx.strokeStyle = st.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tx, ty, 8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = st.color;
    ctx.beginPath();
    ctx.arc(tx, ty, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  return new THREE.CanvasTexture(canvas);
}

// Single Station Interactive Marker
function StationMarker({ station, onSelectStation, isHovered, setHovered, globeScale = 1.0 }) {
  const radius = 2.22 * globeScale;
  const pos = useMemo(() => latLonToVector3(station.lat, station.lon, radius), [station, radius]);
  const isThisHovered = isHovered === station.id;

  return (
    <group position={[pos.x, pos.y, pos.z]}>
      {/* 3D Pulse Ring */}
      <mesh>
        <ringGeometry args={[0.04 * globeScale, 0.07 * globeScale, 32]} />
        <meshBasicMaterial color={station.color} side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
      
      <mesh position={[0, 0, 0.01]}>
        <sphereGeometry args={[0.03 * globeScale, 16, 16]} />
        <meshBasicMaterial color={station.color} />
      </mesh>

      {/* HTML Interactive Tag & Tooltip */}
      <Html
        distanceFactor={6 * globeScale}
        center
        zIndexRange={[100, 0]}
        className="pointer-events-auto select-none"
      >
        <div
          className="relative flex flex-col items-center group cursor-pointer"
          onMouseEnter={() => setHovered(station.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={(e) => {
            e.stopPropagation();
            onSelectStation(station.id);
          }}
        >
          {/* Pulsing Beacon Dot */}
          <div className="relative flex items-center justify-center">
            <span
              className={`absolute w-7 h-7 rounded-full animate-ping opacity-75 ${
                station.id === 'maitri' ? 'bg-[#9DECC0]' : 'bg-sky-400'
              }`}
            ></span>
            <div
              className={`w-3.5 h-3.5 rounded-full border-2 border-[#021215] shadow-[0_0_12px_rgba(157,236,192,0.9)] flex items-center justify-center ${
                station.id === 'maitri' ? 'bg-[#9DECC0]' : 'bg-sky-400'
              }`}
            >
              <div className="w-1 h-1 rounded-full bg-[#021215]"></div>
            </div>
          </div>

          {/* Compact Station Label Pin */}
          <div className="mt-1 px-2 py-0.5 rounded-md bg-[#041A1E]/95 border border-[#1E3A3A] hover:border-[#9DECC0] text-[10px] font-mono font-bold text-[#E8F5F2] shadow-xl flex items-center gap-1.5 backdrop-blur-md transition-all">
            <span className={station.accentClass}>{station.shortName}</span>
            <span className="text-[9px] text-[#7A9A95]">({Math.abs(Math.round(station.lat))}°S)</span>
          </div>

          {/* Clean Hover Tooltip */}
          {isThisHovered && (
            <div className="absolute bottom-full mb-2 w-56 p-3 rounded-xl bg-[#041A1E]/95 border border-[#9DECC0]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 text-left space-y-2 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-[#1E3A3A] pb-2">
                <div>
                  <h4 className="text-xs font-bold text-[#E8F5F2] font-mono">{station.name}</h4>
                  <p className="text-[9px] font-mono text-[#7A9A95]">{station.code}</p>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-[#0A3032] border border-[#9DECC0]/40 text-[9px] font-mono text-[#9DECC0] font-bold">
                  {station.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                <div className="bg-[#021215] p-1.5 rounded border border-[#1E3A3A]">
                  <span className="text-[8px] text-[#7A9A95] block">EXT TEMP</span>
                  <span className="font-bold text-[#9DECC0]">{station.temp}</span>
                </div>
                <div className="bg-[#021215] p-1.5 rounded border border-[#1E3A3A]">
                  <span className="text-[8px] text-[#7A9A95] block">POWER GRID</span>
                  <span className="font-bold text-[#E8F5F2]">{station.power}</span>
                </div>
              </div>

              <div className="text-[9px] font-mono text-[#7A9A95] flex items-center justify-between pt-1">
                <span>{station.coords}</span>
                <span className="text-[#9DECC0] font-bold flex items-center gap-0.5">
                  Inspect <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

// 3D Antarctic Globe Scene Component
function AntarcticGlobeScene({ onSelectStation, isHovered, setIsHovered, globeScale = 1.0 }) {
  const globeGroupRef = useRef();
  const atmosphereRef = useRef();
  const orbitRingRef = useRef();

  const [hoveredStation, setHoveredStation] = useState(null);

  const earthTexture = useMemo(() => generateGeospatialAntarcticTexture(), []);

  // Frame animation loop: Auto-rotate when not hovered
  useFrame((_, delta) => {
    if (!isHovered && globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.08;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.03;
    }
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.z += delta * 0.05;
    }
  });

  const sphereRadius = 2.2 * globeScale;

  return (
    <>
      <ambientLight intensity={0.9} color="#f0f9ff" />
      <directionalLight position={[6, 5, 5]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-6, -5, -4]} intensity={0.6} color="#38bdf8" />
      <pointLight position={[0, -5, 2]} intensity={1.2} color="#9DECC0" />

      <Stars radius={90} depth={40} count={2400} factor={3} saturation={0} fade speed={1} />

      {/* Main Floating Antarctic Globe Group tilted forward (X ~ 0.65) to reveal Antarctica */}
      <group ref={globeGroupRef} rotation={[0.65, 0, -0.15]}>
        {/* Globe Mesh */}
        <mesh>
          <sphereGeometry args={[sphereRadius, 64, 64]} />
          <meshPhongMaterial
            map={earthTexture}
            shininess={40}
            specular={new THREE.Color('#9DECC0')}
            bumpScale={0.05}
          />
        </mesh>

        {/* Atmosphere Outer Glow Layer */}
        <mesh ref={atmosphereRef} scale={1.07}>
          <sphereGeometry args={[sphereRadius, 64, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.18}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Outer Polar Orbit Ring (INSAT-4B Satellite Orbit) */}
        <mesh ref={orbitRingRef} rotation={[Math.PI / 2.3, 0, 0]}>
          <ringGeometry args={[2.85 * globeScale, 2.87 * globeScale, 64]} />
          <meshBasicMaterial color="#9DECC0" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>

        {/* Render Interactive Station Markers */}
        {STATIONS.map((st) => (
          <StationMarker
            key={st.id}
            station={st}
            onSelectStation={onSelectStation}
            isHovered={hoveredStation}
            setHovered={setHoveredStation}
            globeScale={globeScale}
          />
        ))}
      </group>
    </>
  );
}

export default function EarthGlobeCanvas({ onSelectStation, className = "h-[360px] sm:h-[420px]", globeScale = 1.0 }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleStationClick = (stationId) => {
    if (typeof onSelectStation === 'function') {
      onSelectStation(stationId);
    }
  };

  return (
    <div
      className={`relative w-full ${className} rounded-2xl bg-[#021215] border border-[#1E3A3A]/90 overflow-hidden shadow-2xl group selection:bg-transparent`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Mission Control Header Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-xs font-mono pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#041A1E]/90 border border-[#1E3A3A] backdrop-blur-md text-[#9DECC0]">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-bold tracking-wider text-[11px]">3D GEOSPATIAL RADAR GLOBE</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded border text-[10px] font-mono transition-colors ${
              isHovered
                ? 'bg-amber-950/80 border-amber-800 text-amber-300'
                : 'bg-[#062329]/90 border-[#1E3A3A] text-[#7A9A95]'
            }`}
          >
            {isHovered ? 'PAUSED (INSPECTING)' : 'AUTO-ROTATE: ACTIVE'}
          </span>
        </div>
      </div>

      {/* Quick Station Selector Pills Overlay */}
      <div className="absolute top-12 left-3 z-10 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => handleStationClick('maitri')}
          className="px-2.5 py-1 rounded-md bg-[#041A1E]/90 hover:bg-[#0A3032] border border-[#9DECC0]/40 text-[10px] font-mono text-[#9DECC0] transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#9DECC0] animate-ping"></span>
          <span>MAITRI (70°S)</span>
        </button>
        <button
          onClick={() => handleStationClick('bharati')}
          className="px-2.5 py-1 rounded-md bg-[#041A1E]/90 hover:bg-[#0A3032] border border-sky-400/40 text-[10px] font-mono text-sky-300 transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
          <span>BHARATI (69°S)</span>
        </button>
      </div>

      {/* Three.js Canvas Scene */}
      <Canvas
        camera={{ position: [0, -0.2, 5.0], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <AntarcticGlobeScene
          onSelectStation={handleStationClick}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          globeScale={globeScale}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.5 * globeScale}
          maxDistance={7.5 * globeScale}
          rotateSpeed={0.7}
        />
      </Canvas>

      {/* Bottom Mission Control Footer Overlay */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[10px] font-mono text-[#7A9A95] pointer-events-none">
        <div className="px-2.5 py-1 rounded bg-[#041A1E]/90 border border-[#1E3A3A] backdrop-blur-md flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-[#9DECC0]" />
          <span>ANTARCTIC SECTOR 07 // INSAT-4B LINK</span>
        </div>

        <div className="hidden sm:block px-2.5 py-1 rounded bg-[#041A1E]/90 border border-[#1E3A3A] backdrop-blur-md">
          {isHovered ? '🖱️ Drag to rotate / Scroll to zoom' : 'Hover to pause & inspect'}
        </div>
      </div>
    </div>
  );
}

