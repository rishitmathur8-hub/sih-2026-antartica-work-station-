import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>SIH 26060 — Antarctic Station Management & Telemetry Platform</p>
        <p className="font-mono text-slate-400">System Status: <span className="text-emerald-400">NORMAL OPERATIONAL</span></p>
      </div>
    </footer>
  );
}
