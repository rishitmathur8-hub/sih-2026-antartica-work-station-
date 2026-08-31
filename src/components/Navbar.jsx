import React from 'react';
import { NavLink } from 'react-router-dom';
import { Radio, ShieldAlert, FileText, LayoutDashboard, Building2, LogIn, Snowflake } from 'lucide-react';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
            <Snowflake className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 leading-tight">
              ANTARCTICA <span className="text-cyan-400">STATION CONTROL</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">SIH 26060 Monitoring Platform</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <NavLink to="/" end className={linkClass}>
            <Building2 className="w-4 h-4" />
            <span>HQ Overview</span>
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard className="w-4 h-4" />
            <span>Station Dashboard</span>
          </NavLink>
          <NavLink to="/station/maitri" className={linkClass}>
            <Radio className="w-4 h-4" />
            <span>Station Detail</span>
          </NavLink>
          <NavLink to="/alerts" className={linkClass}>
            <ShieldAlert className="w-4 h-4" />
            <span>Alerts</span>
          </NavLink>
          <NavLink to="/reports" className={linkClass}>
            <FileText className="w-4 h-4" />
            <span>Reports</span>
          </NavLink>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/50 rounded-lg transition-all"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Operator Login</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
