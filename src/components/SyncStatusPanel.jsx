import React from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertTriangle, Database } from 'lucide-react';

export default function SyncStatusPanel({
  isOnline,
  pendingCount,
  lastSyncTime,
  onToggleOnline,
  onSyncPending
}) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-lg">
      {/* Panel Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
          <Database className="w-4 h-4" />
          <span>Local Telemetry & Data Sync Protocol</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Online/Offline Status Indicator */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
              isOnline
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                : 'bg-rose-950/80 text-rose-400 border-rose-800'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5 animate-pulse" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>{isOnline ? 'ONLINE / SYNCED' : 'OFFLINE MODE'}</span>
          </div>

          {/* DEMO Mode Toggle */}
          <button
            onClick={onToggleOnline}
            className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-400 rounded-lg transition-colors"
          >
            Switch to {isOnline ? 'OFFLINE' : 'ONLINE'}
          </button>
        </div>
      </div>

      {/* Sync Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
          <span className="text-slate-400">CONNECTION STATUS</span>
          <p className={`font-bold mt-0.5 ${isOnline ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isOnline ? 'INSAT Satellite Link Active' : 'Satellite Link Disconnected'}
          </p>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
          <span className="text-slate-400">LAST SUCCESSFUL SYNC</span>
          <p className="font-bold text-slate-200 mt-0.5">{lastSyncTime || '2026-08-31 09:15 UTC'}</p>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
          <span className="text-slate-400">PENDING LOCAL RECORDS</span>
          <p className={`font-bold mt-0.5 ${pendingCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {pendingCount} Record{pendingCount === 1 ? '' : 's'} Pending
          </p>
        </div>
      </div>

      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="p-3.5 bg-rose-950/30 border border-rose-800/60 rounded-xl flex items-center justify-between text-xs text-rose-300 font-mono">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>OFFLINE MODE: Newly logged telemetry will be saved locally as "PENDING SYNC".</span>
          </div>
        </div>
      )}

      {/* Sync Action Trigger when Online */}
      {isOnline && pendingCount > 0 && (
        <div className="p-3.5 bg-amber-950/30 border border-amber-800/60 rounded-xl flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{pendingCount} locally logged reading(s) awaiting cloud synchronization.</span>
          </div>

          <button
            onClick={onSyncPending}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Pending Data</span>
          </button>
        </div>
      )}
    </div>
  );
}
