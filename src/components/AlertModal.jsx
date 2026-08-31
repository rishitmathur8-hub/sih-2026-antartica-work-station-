import React from 'react';
import { X, ShieldAlert, AlertTriangle, Info, Clock, MapPin, CheckCircle2, Wrench } from 'lucide-react';

export default function AlertModal({ alert, onClose }) {
  if (!alert) return null;

  const styles = {
    critical: {
      badgeClass: 'bg-rose-950 text-rose-400 border-rose-800',
      icon: ShieldAlert,
      iconColor: 'text-rose-400',
      bannerBg: 'bg-rose-950/40 border-rose-800/60'
    },
    warning: {
      badgeClass: 'bg-amber-950 text-amber-400 border-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      bannerBg: 'bg-amber-950/40 border-amber-800/60'
    },
    info: {
      badgeClass: 'bg-cyan-950 text-cyan-400 border-cyan-800',
      icon: Info,
      iconColor: 'text-cyan-400',
      bannerBg: 'bg-cyan-950/40 border-cyan-800/60'
    }
  };

  const config = styles[alert.severity] || styles.info;
  const SeverityIcon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden space-y-6">
        {/* Modal Header */}
        <div className={`p-6 border-b flex justify-between items-start gap-4 ${config.bannerBg}`}>
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${config.iconColor} shrink-0 mt-0.5`}>
              <SeverityIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold rounded border uppercase ${config.badgeClass}`}>
                  {alert.severity} ALARM
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-slate-950 text-slate-300 border border-slate-800">
                  STATUS: {alert.status}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-100">{alert.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 space-y-5">
          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">STATION LOCATION</p>
                <p className="font-bold text-slate-200">{alert.station}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">TIME DETECTED</p>
                <p className="font-bold text-slate-200">{alert.time} ({alert.timestamp || '2026-08-31 01:15 UTC'})</p>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Full Diagnostic Log</h3>
            <p className="text-xs text-slate-200 leading-relaxed p-4 bg-slate-950 rounded-xl border border-slate-800 font-sans">
              {alert.description}
            </p>
          </div>

          {/* Recommended SOP Operator Actions */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="w-4 h-4" /> Standard Operating Protocol (SOP) Action
            </h3>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
              {alert.sopActions && alert.sopActions.length > 0 ? (
                <ul className="space-y-2">
                  {alert.sopActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Acknowledge telemetry event in station operational logbook.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Contact duty station engineer via INSAT voice link to confirm sensor calibration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Monitor secondary thermal/power telemetry for the next 30 minutes.</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
          <span className="text-[11px] font-mono text-slate-500">Incident ID: {alert.id || 'ALT-26060'}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
