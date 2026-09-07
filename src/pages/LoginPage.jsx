import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Snowflake, Lock, User, Radio, ArrowRight, ShieldCheck, Terminal, Compass, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import FloatingLines from '../components/effects/FloatingLines.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [operatorId, setOperatorId] = useState('OP-MAITRI-402');
  const [password, setPassword] = useState('••••••••••••');
  const [targetStation, setTargetStation] = useState('maitri');

  // Determine return URL after successful authentication
  const from = location.state?.from?.pathname || '/overview';
  const redirectedFromProtected = Boolean(location.state?.from);

  useEffect(() => {
    // If user is already authenticated, redirect to command overview
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = (e) => {
    e.preventDefault();
    // 1. Set global authentication state
    login();
    // 2. Navigate back to originally requested route or overview
    navigate(from, { replace: true });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#021215] text-[#E8F5F2] flex flex-col justify-between overflow-x-hidden selection:bg-[#9DECC0]/30 selection:text-[#9DECC0]">
      
      {/* FloatingLines Animated WebGL Background from React Bits */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-75 overflow-hidden">
        <FloatingLines
          linesGradient={['#9DECC0', '#38bdf8', '#0284c7', '#1E3A3A']}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[8, 12, 16]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.6}
          animationSpeed={0.8}
          interactive={true}
          parallax={true}
          parallaxStrength={0.2}
          backgroundColor="#021215"
        />
      </div>
      <div className="absolute inset-0 bg-polar-radial pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-polar-grid opacity-30 pointer-events-none z-0"></div>

      {/* Top Technical Bar / Minimalist Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#0A3032] border border-[#1E3A3A] flex items-center justify-center text-[#9DECC0] group-hover:border-[#9DECC0]/50 transition-colors">
            <Snowflake className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#E8F5F2] uppercase flex items-center gap-2">
              <span>ANTARCTIC MISSION CONTROL</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#0A3032] text-[#9DECC0] border border-[#1E3A3A]">
                SIH 26060
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#7A9A95]">Polar Telemetry & Research Network</p>
          </div>
        </Link>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#7A9A95]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#9DECC0] animate-pulse"></span>
            PORTAL ONLINE
          </span>
          <span className="text-[#1E3A3A]">|</span>
          <Link to="/" className="hover:text-[#9DECC0] transition-colors">
            Public Gateway &rarr;
          </Link>
        </div>
      </header>

      {/* Main Container: 2-Column Desktop Composition */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 my-auto">
        
        {/* LEFT COLUMN: Mission & Brand Messaging */}
        <div className="w-full lg:w-1/2 space-y-8 max-w-xl text-left">
          
          {/* Small Technical Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#062329]/80 border border-[#1E3A3A] text-xs font-mono text-[#7A9A95] tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-[#9DECC0]" />
            <span>SOUTHERN OPERATIONS // 70°45′S</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#E8F5F2]">
              Keep the signal <br />
              <span className="text-[#9DECC0] underline decoration-[#9DECC0]/30 decoration-wavy decoration-1 underline-offset-8">
                in the cold.
              </span>
            </h1>
          </div>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-sans max-w-lg">
            The quiet side of the world is still moving. Enter the command layer for station systems, crew safety, and the research that depends on both.
          </p>

          {/* Status Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#041A1E] border border-[#1E3A3A] text-xs font-mono text-[#E8F5F2]">
              <span className="w-2 h-2 rounded-full bg-[#9DECC0]"></span>
              <span>UPLINK NOMINAL</span>
            </div>
            
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#041A1E] border border-[#1E3A3A] text-xs font-mono text-[#E8F5F2]">
              <Radio className="w-3.5 h-3.5 text-[#9DECC0]" />
              <span>3 STATIONS ONLINE</span>
            </div>
          </div>

          {/* Bottom Left System Identifier */}
          <div className="pt-6 border-t border-[#1E3A3A]/60 flex items-center gap-2 text-xs font-mono text-[#7A9A95]">
            <Snowflake className="w-4 h-4 text-[#9DECC0]/70" />
            <span>SIH 26060 / ANTARCTIC RESEARCH NETWORK</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Glassmorphism Login Card */}
        <div className="w-full lg:w-[460px] shrink-0 my-auto">
          <div className="polar-glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            
            {/* Card Accent Top Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9DECC0]/60 to-transparent"></div>

            {/* Top Branding & Status */}
            <div className="flex items-start justify-between border-b border-[#1E3A3A]/60 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#062329] border border-[#1E3A3A] flex items-center justify-center text-[#9DECC0]">
                  <Snowflake className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-mono font-bold tracking-wider text-[#E8F5F2] uppercase">
                    ANTARCTIC
                  </h2>
                  <p className="text-[11px] font-mono text-[#9DECC0] font-semibold">
                    STATION CONTROL
                  </p>
                  <p className="text-[9px] font-mono text-[#7A9A95]">OPERATOR ACCESS PORTAL</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#062329] border border-[#1E3A3A] text-[10px] font-mono text-[#9DECC0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9DECC0] animate-ping"></span>
                <span>SECURE LINK</span>
              </div>
            </div>

            {/* Heading & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#E8F5F2] tracking-wide">
                Identify your watch.
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Use your assigned call sign to open mission control.
              </p>
            </div>

            {/* Redirected Warning Alert (if user tried accessing a protected route directly) */}
            {redirectedFromProtected ? (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p className="font-mono font-bold text-amber-300 text-[11px] uppercase tracking-wider">
                    AUTHORIZED ACCESS REQUIRED
                  </p>
                  <p className="text-amber-200/90 leading-tight text-[11px]">
                    Access to <strong className="font-mono text-amber-300">{from}</strong> is restricted. Please authenticate to launch mission control.
                  </p>
                </div>
              </div>
            ) : (
              /* Demo Environment Alert Card */
              <div className="p-3.5 rounded-xl bg-[#021215]/80 border border-[#1E3A3A] flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#9DECC0] shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p className="font-mono font-bold text-[#9DECC0] tracking-wider text-[11px]">
                    DEMO ENVIRONMENT
                  </p>
                  <p className="text-[#94A3B8] leading-tight text-[11px]">
                    No password required. Authenticate to launch the control dashboard.
                  </p>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Field 1: Operator ID */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-[#7A9A95] uppercase tracking-wider mb-1.5">
                  OPERATOR ID / CALL SIGN
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#7A9A95]" />
                  <input
                    type="text"
                    value={operatorId}
                    onChange={(e) => setOperatorId(e.target.value)}
                    placeholder="OP-MAITRI-402"
                    className="w-full polar-glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono focus:border-[#9DECC0]/60 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Target Station / Sector */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-[#7A9A95] uppercase tracking-wider mb-1.5">
                  TARGET STATION / SECTOR
                </label>
                <div className="relative">
                  <Radio className="absolute left-3.5 top-3 w-4 h-4 text-[#7A9A95]" />
                  <select
                    value={targetStation}
                    onChange={(e) => setTargetStation(e.target.value)}
                    className="w-full polar-glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono focus:border-[#9DECC0]/60 transition-all cursor-pointer appearance-none"
                  >
                    <option value="hq" className="bg-[#041A1E] text-[#E8F5F2]">HQ Command Operations Center</option>
                    <option value="maitri" className="bg-[#041A1E] text-[#E8F5F2]">Maitri Station (70°45′S)</option>
                    <option value="bharati" className="bg-[#041A1E] text-[#E8F5F2]">Bharati Station (69°24′S)</option>
                    <option value="dakshin" className="bg-[#041A1E] text-[#E8F5F2]">Dakshin Gangotri Relay</option>
                  </select>
                </div>
              </div>

              {/* Field 3: Security Authorization Key */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-[#7A9A95] uppercase tracking-wider mb-1.5">
                  SECURITY AUTHORIZATION KEY
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#7A9A95]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full polar-glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono focus:border-[#9DECC0]/60 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#9DECC0] to-[#76D7A5] text-[#021215] font-extrabold rounded-xl text-sm transition-all duration-200 shadow-[0_0_25px_rgba(157,236,192,0.25)] hover:shadow-[0_0_35px_rgba(157,236,192,0.4)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <span>Authenticate & Enter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Footer Protocol Disclaimer */}
            <p className="text-[10px] font-mono text-[#7A9A95] text-center pt-2 border-t border-[#1E3A3A]/60">
              Authorized personnel only. Access logged under SIH 26060 protocol.
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Technical Footer Bar */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#7A9A95] gap-2 border-t border-[#1E3A3A]/40">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#9DECC0]" />
          <span>POLAR TELEMETRY SYSTEM v2.6.0</span>
        </div>
        <div>
          <span>ANTARCTIC RESEARCH NETWORK — INDIA</span>
        </div>
      </footer>
    </div>
  );
}
