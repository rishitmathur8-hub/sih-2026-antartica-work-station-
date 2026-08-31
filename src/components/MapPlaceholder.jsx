import React from 'react';
import { Compass, Radio, Crosshair } from 'lucide-react';

export default function MapPlaceholder() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase">
          <Compass className="w-4 h-4" />
          <span>Antarctic Sector Tactical Radar & Digital Twin Map</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Maitri</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Bharati</span>
        </div>
      </div>

      {/* Radar / Grid Canvas Container */}
      <div className="relative h-64 bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden flex items-center justify-center">
        {/* Tactical Grid Background Overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Concentric Radar Target Rings */}
        <div className="absolute w-48 h-48 border border-cyan-500/20 rounded-full"></div>
        <div className="absolute w-32 h-32 border border-cyan-500/30 rounded-full"></div>
        <div className="absolute w-16 h-16 border border-cyan-500/40 rounded-full"></div>
        <div className="absolute w-full h-[1px] bg-cyan-500/10"></div>
        <div className="absolute h-full w-[1px] bg-cyan-500/10"></div>

        {/* Station Markers */}
        {/* Maitri Station Marker */}
        <div className="absolute top-1/3 left-1/3 flex flex-col items-center group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-6 h-6 rounded-full bg-emerald-500/30 animate-ping"></span>
            <Radio className="w-4 h-4 text-emerald-400 relative z-10" />
          </div>
          <div className="bg-slate-900/90 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded shadow mt-1">
            MAITRI (70°45′S)
          </div>
        </div>

        {/* Bharati Station Marker */}
        <div className="absolute bottom-1/3 right-1/3 flex flex-col items-center group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-6 h-6 rounded-full bg-amber-500/30 animate-ping"></span>
            <Radio className="w-4 h-4 text-amber-400 relative z-10" />
          </div>
          <div className="bg-slate-900/90 border border-amber-500/40 text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded shadow mt-1">
            BHARATI (69°24′S)
          </div>
        </div>

        {/* Center Crosshair Overlay */}
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-500 flex items-center gap-1">
          <Crosshair className="w-3 h-3 text-cyan-400" />
          <span>GRID SEC-09 | LAT: -70.7500 | LON: 11.7333</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center font-mono">
        Geospatial 2D/3D Station Map Layer Placeholder (Leaflet / Three.js digital twin integration ready).
      </p>
    </div>
  );
}
