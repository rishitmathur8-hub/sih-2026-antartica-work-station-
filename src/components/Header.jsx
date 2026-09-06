import React from 'react';
import { Link } from 'react-router-dom';
import { Snowflake, Wifi, ShieldCheck, User, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Branding & Sub-title */}
        <Link to="/overview" className="flex items-center gap-3 group">
          <div className="p-2 bg-[#9DECC0]/10 rounded-xl border border-[#9DECC0]/30 text-[#9DECC0] group-hover:border-[#9DECC0]/60 transition-colors">
            <Snowflake className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-wider text-slate-100 uppercase group-hover:text-[#9DECC0] transition-colors">
                Antarctic <span className="text-[#9DECC0]">Mission Control</span>
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A3032] text-[#9DECC0] border border-[#1E3A3A]">
                SIH 26060
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Polar Research Station Telemetry System</p>
          </div>
        </Link>

        {/* Center: System Status & Connection Indicators (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono">
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold tracking-wide">SYSTEMS OPERATIONAL</span>
          </div>

          {/* Satellite Connection */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <Wifi className="w-3.5 h-3.5 text-[#9DECC0] animate-pulse" />
            <span>SATELLITE LINK: <strong className="text-[#9DECC0] font-normal">INSAT-4B (99.8%)</strong></span>
          </div>
        </div>

        {/* Right: Operator Badge & Quick Alert Notification */}
        <div className="flex items-center gap-3">
          <div className="relative p-2 text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-[#9DECC0]/20 border border-[#9DECC0]/40 flex items-center justify-center text-[#9DECC0] font-bold text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-200 leading-tight">OP-MAITRI-402</p>
              <p className="text-[10px] text-slate-400 font-mono">Commander Duty</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
