import React from 'react';

export default function StatCard({ title, value, statusText, statusType = 'normal', icon: Icon }) {
  const statusColors = {
    normal: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50',
    warning: 'text-amber-400 bg-amber-950/40 border-amber-800/50',
    critical: 'text-rose-400 bg-rose-950/40 border-rose-800/50',
    info: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50',
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800/90 p-5 rounded-2xl backdrop-blur-md flex justify-between items-start hover:border-slate-700 transition-colors">
      <div className="space-y-2">
        <p className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-100 font-mono">{value}</h3>
        {statusText && (
          <span className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-md border ${statusColors[statusType] || statusColors.normal}`}>
            {statusText}
          </span>
        )}
      </div>
      {Icon && (
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
