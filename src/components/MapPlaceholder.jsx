import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import EarthGlobeCanvas from './EarthGlobeCanvas.jsx';

export default function MapPlaceholder() {
  const navigate = useNavigate();

  const handleSelectStation = (stationId) => {
    navigate(`/station/${stationId}`);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase">
          <Compass className="w-4 h-4" />
          <span>Antarctic Sector Tactical 3D Radar & Digital Twin Map</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#9DECC0]"></span> Maitri</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-400"></span> Bharati</span>
        </div>
      </div>

      {/* 3D Radar Canvas Container (Reduced ~18% for authenticated dashboard view) */}
      <EarthGlobeCanvas onSelectStation={handleSelectStation} className="h-[295px]" globeScale={0.82} />

      <p className="text-xs text-slate-400 text-center font-mono">
        Interactive 3D Geospatial Antarctic Globe with Live Telemetry Links. Hover to inspect, drag to orbit.
      </p>
    </div>
  );
}

