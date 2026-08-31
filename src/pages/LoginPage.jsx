import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, Radio, ArrowRight, Snowflake } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [operatorId, setOperatorId] = useState('OP-MAITRI-402');
  const [stationRole, setStationRole] = useState('maitri');

  const handleLogin = (e) => {
    e.preventDefault();
    // Navigate directly to Mission Control (HQ Overview)
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Polar Glow & Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/30 text-cyan-400 mb-1">
            <Snowflake className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-100 tracking-wider">
            ANTARCTIC <span className="text-cyan-400">STATION CONTROL</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">SIH 26060 — Mission Control Operator Portal</p>
        </div>

        {/* Demo Mode Notification Badge */}
        <div className="p-3 bg-cyan-950/60 border border-cyan-800/60 rounded-xl text-center space-y-1">
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 rounded uppercase">
            DEMO MODE ENABLED
          </span>
          <p className="text-[11px] text-slate-300">
            No password required. Click <strong className="text-cyan-400 font-normal">Authenticate & Enter</strong> to launch Mission Control.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5 font-mono">
              Operator ID / Call Sign
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                placeholder="e.g. OP-MAITRI-402"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5 font-mono">
              Target Station / Sector
            </label>
            <div className="relative">
              <Radio className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <select
                value={stationRole}
                onChange={(e) => setStationRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 font-mono appearance-none transition-colors"
              >
                <option value="hq">HQ Command Operations Center</option>
                <option value="maitri">Maitri Station (70°45′S)</option>
                <option value="bharati">Bharati Station (69°24′S)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5 font-mono">
              Security Authorization Key
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value="••••••••••••"
                readOnly
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-400 font-mono focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 mt-2"
          >
            <span>Authenticate & Enter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-slate-500 text-center font-mono">
          Authorized personnel only. All access logged under SIH 26060 protocol.
        </p>
      </div>
    </div>
  );
}
