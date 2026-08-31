import React from 'react';
import { ShieldAlert, AlertTriangle, Info, ChevronRight } from 'lucide-react';

export default function AlertItem({
  severity = 'info',
  title,
  station,
  time,
  description,
  status = 'ACTIVE',
  onClick
}) {
  const styles = {
    critical: {
      bg: 'bg-rose-950/20 border-rose-900/50 hover:border-rose-700/80',
      text: 'text-rose-400',
      icon: ShieldAlert,
      badge: 'CRITICAL',
      badgeClass: 'bg-rose-950 text-rose-400 border-rose-800'
    },
    warning: {
      bg: 'bg-amber-950/20 border-amber-900/50 hover:border-amber-700/80',
      text: 'text-amber-400',
      icon: AlertTriangle,
      badge: 'WARNING',
      badgeClass: 'bg-amber-950 text-amber-400 border-amber-800'
    },
    info: {
      bg: 'bg-cyan-950/20 border-cyan-900/50 hover:border-cyan-700/80',
      text: 'text-cyan-400',
      icon: Info,
      badge: 'INFO',
      badgeClass: 'bg-cyan-950 text-cyan-400 border-cyan-800'
    }
  };

  const config = styles[severity] || styles.info;
  const Icon = config.icon;

  const statusBadge = {
    ACTIVE: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    INVESTIGATING: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    RESOLVED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  }[status] || 'bg-slate-800 text-slate-400 border-slate-700';

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border ${config.bg} flex items-start gap-3 transition-all cursor-pointer group shadow-md`}
    >
      <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${config.text} shrink-0 mt-0.5`}>
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${config.badgeClass}`}>
              {config.badge}
            </span>
            <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors truncate">
              {title}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded border ${statusBadge}`}>
              {status}
            </span>
            <span className="text-[11px] font-mono text-slate-400">{time}</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-1 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mt-2 text-[11px] font-mono text-slate-400">
          <span>Station: <strong className="text-slate-200 font-normal">{station}</strong></span>
          <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
            Inspect Action <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
