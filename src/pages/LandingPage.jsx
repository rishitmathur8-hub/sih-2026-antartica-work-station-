import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Snowflake, Radio, ShieldAlert, Zap, Globe, ArrowRight, ShieldCheck, 
  Wifi, Compass, Activity, Server, Users, Thermometer, Terminal, Layers, Lock, Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Helper for navigating to protected pages from public gateway
  const handleProtectedNavigation = (targetPath) => {
    if (isAuthenticated) {
      navigate(targetPath);
    } else {
      // Unauthenticated: navigate to /login saving the target path in state
      navigate('/login', { state: { from: { pathname: targetPath } } });
    }
  };

  const stationsData = [
    {
      name: 'Maitri Research Station',
      code: 'IND-MTR-01',
      coords: '70°45′57″S 11°44′09″E',
      status: 'ONLINE',
      temp: '-32.4°C',
      crew: '24 Personnel',
      power: '480 kW (94%)',
      location: 'Schirmacher Oasis'
    },
    {
      name: 'Bharati Research Station',
      code: 'IND-BHT-02',
      coords: '69°24′28″S 76°11′14″E',
      status: 'ONLINE',
      temp: '-28.0°C',
      crew: '18 Personnel',
      power: '440 kW (78%)',
      location: 'Larsemann Hills'
    },
    {
      name: 'Dakshin Gangotri Relay',
      code: 'IND-DG-00',
      coords: '70°05′37″S 12°00′00″E',
      status: 'STANDBY',
      temp: '-39.1°C',
      crew: 'Unmanned Relay',
      power: 'Solar/Diesel Battery',
      location: 'Ice Shelf Sector 4'
    }
  ];

  const features = [
    {
      icon: Activity,
      title: 'Real-Time Sensor Telemetry',
      description: 'Continuous monitoring of habitat temperature, oxygen levels, water desalinization, and power grid status.'
    },
    {
      icon: Wifi,
      title: 'INSAT-4B Satellite Uplink',
      description: 'High-availability polar data sync protocol designed to sustain connectivity through severe magnetic storms.'
    },
    {
      icon: Users,
      title: 'Crew Safety & Life Support',
      description: 'Automated telemetry threshold checks for crew quarters, environmental suits, and emergency habitats.'
    },
    {
      icon: ShieldAlert,
      title: 'Automated Blizzard Alerts',
      description: 'Predictive alert triggers for extreme wind gusts, atmospheric drop, and solar flare interference.'
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#021215] text-[#E8F5F2] flex flex-col justify-between overflow-x-hidden selection:bg-[#9DECC0]/30 selection:text-[#9DECC0]">
      
      {/* Background Atmosphere Layers */}
      <div className="absolute inset-0 bg-polar-radial pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-polar-grid opacity-50 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-polar-lines opacity-15 pointer-events-none z-0"></div>

      {/* Top Header Navigation */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#0A3032] border border-[#1E3A3A] flex items-center justify-center text-[#9DECC0] group-hover:border-[#9DECC0]/50 transition-colors">
            <Snowflake className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#E8F5F2] uppercase flex items-center gap-2">
              <span>ANTARCTIC MISSION CONTROL</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#0A3032] text-[#9DECC0] border border-[#1E3A3A]">
                SIH 26060
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#7A9A95]">PUBLIC ACCESS GATEWAY</p>
          </div>
        </Link>

        {/* Center Protected Navigation Links (Protected Access Redirects to Login) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-[#7A9A95]">
          <button 
            onClick={() => handleProtectedNavigation('/stations')}
            className="hover:text-[#9DECC0] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>STATIONS</span>
            <Lock className="w-3 h-3 text-[#7A9A95]" />
          </button>
          <button 
            onClick={() => handleProtectedNavigation('/alerts')}
            className="hover:text-[#9DECC0] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>ALERTS</span>
            <Lock className="w-3 h-3 text-[#7A9A95]" />
          </button>
          <button 
            onClick={() => handleProtectedNavigation('/reports')}
            className="hover:text-[#9DECC0] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>REPORTS</span>
            <Lock className="w-3 h-3 text-[#7A9A95]" />
          </button>
          <button 
            onClick={() => handleProtectedNavigation('/dashboard')}
            className="hover:text-[#9DECC0] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>TELEMETRY</span>
            <Lock className="w-3 h-3 text-[#7A9A95]" />
          </button>
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={() => navigate('/overview')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9DECC0] to-[#76D7A5] text-[#021215] font-mono font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Open Mission Control</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-[#062329] border border-[#1E3A3A] hover:border-[#9DECC0]/50 text-xs font-mono font-bold text-[#E8F5F2] hover:text-[#9DECC0] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Operator Sign In</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9DECC0]" />
            </Link>
          )}
        </div>
      </header>

      {/* Public Gateway Access Status Banner */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-2">
        <div className="p-3 rounded-xl bg-[#041A1E]/80 border border-[#1E3A3A] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#9DECC0]">
            <ShieldCheck className="w-4 h-4 text-[#9DECC0]" />
            <span className="font-bold tracking-wider">PUBLIC ACCESS GATEWAY</span>
            <span className="text-[#1E3A3A]">|</span>
            <span className="text-[#94A3B8]">System Introduction & Information Layer</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-semibold">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>OPERATIONAL TELEMETRY RESTRICTED — AUTHORIZED PERSONNEL ONLY</span>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-10 pb-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Hero Left Content */}
        <div className="w-full lg:w-1/2 space-y-8 text-left">
          
          {/* Technical Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#062329] border border-[#1E3A3A] text-xs font-mono text-[#7A9A95]">
            <span className="w-2 h-2 rounded-full bg-[#9DECC0] animate-ping"></span>
            <span>REMOTE INTELLIGENCE // INDIA'S ANTARCTIC STATIONS</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#E8F5F2]">
            Command the <br />
            <span className="text-[#9DECC0] underline decoration-[#9DECC0]/30 decoration-wavy decoration-1 underline-offset-8">
              edge of the world.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-sans max-w-xl">
            A unified digital platform for monitoring India's Antarctic research stations, telemetry, atmospheric alerts, crew safety, and station operations remotely.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => handleProtectedNavigation('/overview')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9DECC0] to-[#76D7A5] text-[#021215] font-extrabold text-sm transition-all duration-200 shadow-[0_0_30px_rgba(157,236,192,0.25)] hover:shadow-[0_0_40px_rgba(157,236,192,0.4)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enter Mission Control</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleProtectedNavigation('/stations')}
              className="px-6 py-3.5 rounded-xl polar-glass-card hover:border-[#9DECC0]/40 text-[#E8F5F2] font-semibold text-sm transition-all hover:bg-[#062329]/90 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Stations</span>
              <Lock className="w-3.5 h-3.5 text-[#9DECC0]" />
            </button>
          </div>

          {/* Mission Statistics Row */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#1E3A3A]/60">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[#9DECC0]">3</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A9A95] mt-1">ACTIVE STATIONS</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E8F5F2]">24/7</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A9A95] mt-1">REMOTE TELEMETRY</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[#9DECC0]">70°45′S</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A9A95] mt-1">MAITRI STATION</p>
            </div>
          </div>
        </div>

        {/* Hero Right Visual: Technical Polar Network & Satellite Radar */}
        <div className="w-full lg:w-1/2 shrink-0">
          <div className="polar-glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            
            {/* Top Bar inside Radar Card */}
            <div className="flex items-center justify-between text-xs font-mono border-b border-[#1E3A3A]/60 pb-4">
              <div className="flex items-center gap-2 text-[#9DECC0]">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="font-bold tracking-wider">GEOSPATIAL POLAR LINK</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#062329] border border-[#1E3A3A] text-[10px] text-[#7A9A95]">
                INSAT-4B ACTIVE
              </span>
            </div>

            {/* SVG Interactive Polar Map Visualizer */}
            <div className="relative w-full h-[320px] rounded-2xl bg-[#021215] border border-[#1E3A3A]/80 flex items-center justify-center overflow-hidden">
              
              {/* Radar Concentric Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[280px] h-[280px] rounded-full border border-[#1E3A3A]/40 animate-spin" style={{ animationDuration: '40s' }}></div>
                <div className="absolute w-[200px] h-[200px] rounded-full border border-[#1E3A3A]/60"></div>
                <div className="absolute w-[120px] h-[120px] rounded-full border border-[#9DECC0]/20"></div>
                <div className="absolute w-[40px] h-[40px] rounded-full border border-[#9DECC0]/40"></div>
              </div>

              {/* Crosshair Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#1E3A3A]/40"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#1E3A3A]/40"></div>
              </div>

              {/* Vector Station Nodes */}
              <div className="absolute top-[32%] left-[42%] flex flex-col items-center group cursor-pointer" onClick={() => handleProtectedNavigation('/station/maitri')}>
                <span className="w-3 h-3 rounded-full bg-[#9DECC0] shadow-[0_0_12px_#9DECC0] animate-ping"></span>
                <span className="absolute w-2 h-2 rounded-full bg-[#9DECC0]"></span>
                <div className="mt-2 px-2 py-1 rounded bg-[#062329]/90 border border-[#9DECC0]/40 text-[10px] font-mono text-[#9DECC0] whitespace-nowrap shadow-lg flex items-center gap-1">
                  <span>MAITRI (70°45′S)</span>
                  <Lock className="w-2.5 h-2.5 text-[#9DECC0]" />
                </div>
              </div>

              <div className="absolute top-[58%] right-[28%] flex flex-col items-center group cursor-pointer" onClick={() => handleProtectedNavigation('/station/bharati')}>
                <span className="w-3 h-3 rounded-full bg-[#9DECC0] shadow-[0_0_12px_#9DECC0]"></span>
                <span className="w-2 h-2 rounded-full bg-[#9DECC0]"></span>
                <div className="mt-2 px-2 py-1 rounded bg-[#062329]/90 border border-[#1E3A3A] text-[10px] font-mono text-[#E8F5F2] whitespace-nowrap shadow-lg flex items-center gap-1">
                  <span>BHARATI (69°24′S)</span>
                  <Lock className="w-2.5 h-2.5 text-[#7A9A95]" />
                </div>
              </div>

              <div className="absolute bottom-[28%] left-[26%] flex flex-col items-center group cursor-pointer" onClick={() => handleProtectedNavigation('/stations')}>
                <span className="w-2 h-2 rounded-full bg-[#7A9A95]"></span>
                <div className="mt-1 px-2 py-0.5 rounded bg-[#062329]/80 border border-[#1E3A3A] text-[9px] font-mono text-[#7A9A95] whitespace-nowrap">
                  DAKSHIN RELAY
                </div>
              </div>

              {/* Connecting Vector Telemetry Signal Beam */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="42%" y1="32%" x2="72%" y2="58%" stroke="rgba(157, 236, 192, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="42%" y1="32%" x2="26%" y2="72%" stroke="rgba(30, 58, 58, 0.8)" strokeWidth="1" />
              </svg>

              {/* Latitude Badge Overlay */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#041A1E]/90 border border-[#1E3A3A] text-[10px] font-mono text-[#7A9A95]">
                POLAR SECTOR 07 // ANTARCTIC PLATEAU
              </div>
            </div>

            {/* Sub-status Indicator */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#021215] border border-[#1E3A3A] space-y-1">
                <p className="text-[10px] text-[#7A9A95] uppercase">Telemetry Sync</p>
                <p className="font-bold text-[#9DECC0]">100% Signal Nominal</p>
              </div>
              <div className="p-3 rounded-xl bg-[#021215] border border-[#1E3A3A] space-y-1">
                <p className="text-[10px] text-[#7A9A95] uppercase">Average Latency</p>
                <p className="font-bold text-[#E8F5F2]">42 ms (Satellite Link)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 border-t border-[#1E3A3A]/60">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#062329] border border-[#1E3A3A] text-xs font-mono text-[#9DECC0]">
            <Layers className="w-3.5 h-3.5" />
            <span>PLATFORM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#E8F5F2]">
            Engineered for severe polar environments.
          </h2>
          <p className="text-sm text-[#94A3B8] font-sans">
            Built to maintain unbroken operational oversight for India's scientific missions in sub-zero Antarctica.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div key={index} className="polar-glass-card rounded-2xl p-6 space-y-4 hover:border-[#9DECC0]/40 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-[#062329] border border-[#1E3A3A] flex items-center justify-center text-[#9DECC0] group-hover:border-[#9DECC0]/60 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#E8F5F2] font-sans">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Station Preview Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 border-t border-[#1E3A3A]/60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <p className="text-xs font-mono text-[#9DECC0] uppercase tracking-wider mb-1">
              INDIAN RESEARCH NETWORK
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F5F2]">
              Active Antarctic Stations
            </h2>
          </div>
          <button
            onClick={() => handleProtectedNavigation('/stations')}
            className="text-xs font-mono text-[#9DECC0] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Full Station Roster</span>
            <Lock className="w-3.5 h-3.5 text-[#9DECC0]" />
          </button>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stationsData.map((st, idx) => (
            <div key={idx} className="polar-glass-card rounded-2xl p-6 space-y-4 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#1E3A3A]/60 pb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#062329] text-[#9DECC0] border border-[#1E3A3A]">
                    {st.code}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#9DECC0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9DECC0]"></span>
                    {st.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#E8F5F2]">{st.name}</h3>
                  <p className="text-xs font-mono text-[#7A9A95]">{st.coords}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                  <div className="bg-[#021215] p-2 rounded-xl border border-[#1E3A3A]">
                    <span className="text-[10px] text-[#7A9A95] block">EXT TEMP</span>
                    <span className="font-bold text-[#9DECC0]">{st.temp}</span>
                  </div>
                  <div className="bg-[#021215] p-2 rounded-xl border border-[#1E3A3A]">
                    <span className="text-[10px] text-[#7A9A95] block">POWER LOAD</span>
                    <span className="font-bold text-[#E8F5F2]">{st.power}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E3A3A]/60">
                <button
                  onClick={() => handleProtectedNavigation('/stations')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#062329] hover:bg-[#0A3032] border border-[#1E3A3A] text-xs font-mono text-[#E8F5F2] hover:text-[#9DECC0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inspect Station Telemetry</span>
                  <Lock className="w-3.5 h-3.5 text-[#9DECC0]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        <div className="polar-glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-[#041A1E]/90 to-[#021215]">
          <div className="w-12 h-12 rounded-2xl bg-[#062329] border border-[#1E3A3A] flex items-center justify-center text-[#9DECC0] mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#E8F5F2]">
              Ready to assume watch?
            </h2>
            <p className="text-sm text-[#94A3B8] font-sans">
              Authenticate using your operator credentials to launch the central Antarctic telemetry command dashboard.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleProtectedNavigation('/overview')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#9DECC0] to-[#76D7A5] text-[#021215] font-extrabold text-sm transition-all duration-200 shadow-[0_0_35px_rgba(157,236,192,0.3)] hover:shadow-[0_0_45px_rgba(157,236,192,0.5)] hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Mission Control</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-[#1E3A3A]/40 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#7A9A95] gap-4">
        <div className="flex items-center gap-3">
          <Snowflake className="w-4 h-4 text-[#9DECC0]" />
          <span>SIH 26060 / ANTARCTIC RESEARCH NETWORK</span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="hover:text-[#9DECC0] transition-colors">Operator Sign In</Link>
          <button onClick={() => handleProtectedNavigation('/stations')} className="hover:text-[#9DECC0] transition-colors cursor-pointer">Stations</button>
          <button onClick={() => handleProtectedNavigation('/alerts')} className="hover:text-[#9DECC0] transition-colors cursor-pointer">Alerts</button>
        </div>
      </footer>
    </div>
  );
}
