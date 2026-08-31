import React from 'react';
import { X, FileText, Download, Calendar, MapPin, CheckCircle2, Zap, Flame, Droplets, BatteryCharging } from 'lucide-react';

export default function ReportModal({ report, onClose, onDownload }) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden space-y-6">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/90 flex justify-between items-start gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                  {report.type}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {report.status}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-100">{report.title}</h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Report ID: {report.id}</p>
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
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">STATION LOCATION</p>
                <p className="font-bold text-slate-200">{report.station}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">REPORTING PERIOD</p>
                <p className="font-bold text-slate-200">{report.period || 'Last 7 Days (Aug 24 - Aug 31)'}</p>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Executive Overview</h3>
            <p className="text-xs text-slate-300 leading-relaxed p-4 bg-slate-950 rounded-xl border border-slate-800">
              {report.summary || 'Comprehensive telemetry analysis of resource consumption, generator thermal load, water reserves, and environmental metrics. Station operations remained nominal throughout the reporting period.'}
            </p>
          </div>

          {/* Key Resource Telemetry Metrics Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Key Telemetry Breakdown</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>FUEL BURNED</span>
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <p className="text-sm font-bold text-slate-100 font-mono">{report.fuelUsed || '12,400 L'}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>WATER CONSUMED</span>
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="text-sm font-bold text-slate-100 font-mono">{report.waterUsed || '8,200 L'}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>OXYGEN LEVEL</span>
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-sm font-bold text-slate-100 font-mono">{report.oxygenUsed || '98%'}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>POWER DRAW</span>
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="text-sm font-bold text-slate-100 font-mono">{report.powerUsed || '11,500 kWh'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
          <span className="text-[11px] font-mono text-slate-500">Generated: {report.date || '2026-08-31'}</span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onDownload && onDownload(report)}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
