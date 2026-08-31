import React from 'react';

export default function TelemetryCard({
  title,
  value,
  unit,
  status = 'NORMAL',
  lastUpdated = '1 min ago',
  icon: Icon
}) {
  const statusStyles = {
    NORMAL: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80',
    WARNING: 'text-amber-400 bg-amber-950/60 border-amber-800/80',
    CRITICAL: 'text-rose-400 bg-rose-950/60 border-rose-800/80',
    INFO: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80',
  };

  const badgeStyle = statusStyles[status] || statusStyles.NORMAL;

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-cyan-500/40 transition-colors shadow-md">
      <div className="flex justify-between items-center text-slate-400 text-xs font-mono">
        <span className="uppercase tracking-wider">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-cyan-400 shrink-0" />}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-extrabold text-slate-100 font-mono">{value}</span>
        {unit && <span className="text-xs font-mono text-slate-400">{unit}</span>}
      </div>

      <div className="flex justify-between items-center text-[11px] font-mono pt-1">
        <span className={`px-2 py-0.5 rounded font-semibold border ${badgeStyle}`}>
          {status}
        </span>
        <span className="text-slate-500">Updated: {lastUpdated}</span>
      </div>
    </div>
  );
}
