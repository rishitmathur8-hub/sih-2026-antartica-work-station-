import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Zap, Thermometer, Wifi, ChevronRight, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function StationCard({
  id = 'maitri',
  name,
  code,
  coordinates,
  status = 'OPERATIONAL',
  crewCount,
  powerLevel,
  extTemp,
  commStatus = 'INSAT Satellite Link (99%)',
  sector = 'Schirmacher Oasis'
}) {
  const navigate = useNavigate();

  const statusConfig = {
    OPERATIONAL: {
      badgeClass: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80',
      icon: ShieldCheck,
      dot: 'bg-emerald-400'
    },
    WARNING: {
      badgeClass: 'bg-amber-950/80 text-amber-400 border-amber-800/80',
      icon: AlertTriangle,
      dot: 'bg-amber-400'
    },
    CRITICAL: {
      badgeClass: 'bg-rose-950/80 text-rose-400 border-rose-800/80',
      icon: ShieldAlert,
      dot: 'bg-rose-400'
    }
  };

  const currentStatus = statusConfig[status] || statusConfig.OPERATIONAL;
  const StatusIcon = currentStatus.icon;

  return (
    <div
      onClick={() => navigate(`/station/${id}`)}
      className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4 hover:border-cyan-500/50 hover:bg-slate-900 cursor-pointer transition-all shadow-lg group relative overflow-hidden"
    >
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${currentStatus.dot}`}></div>

      {/* Card Header */}
      <div className="flex justify-between items-start pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
              {name}
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              {code}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{coordinates} • {sector}</p>
        </div>

        <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${currentStatus.badgeClass}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{status}</span>
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 font-mono">CREW</p>
            <p className="font-bold text-slate-200 font-mono">{crewCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 font-mono">POWER GRID</p>
            <p className="font-bold text-slate-200 font-mono">{powerLevel}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-blue-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 font-mono">EXT TEMP</p>
            <p className="font-bold text-slate-200 font-mono">{extTemp}</p>
          </div>
        </div>
      </div>

      {/* Footer / Comm Link Indicator */}
      <div className="flex justify-between items-center text-xs pt-1">
        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
          <span className="truncate max-w-[200px]">{commStatus}</span>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-0.5 transition-transform">
          <span>Inspect</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
