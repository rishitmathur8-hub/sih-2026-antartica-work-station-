import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Radio, ShieldAlert, FileText, Globe, LogOut, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const navItems = [
    { label: 'HQ Overview', path: '/overview', icon: Globe },
    { label: 'Stations', path: '/stations', icon: Radio },
    { label: 'Telemetry Dash', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Alerts', path: '/alerts', icon: ShieldAlert, badge: '3' },
    { label: 'Reports', path: '/reports', icon: FileText },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
      isActive
        ? 'bg-cyan-500/15 text-[#9DECC0] border border-[#9DECC0]/30 shadow-sm shadow-cyan-500/10'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
    }`;

  return (
    <aside className="w-full md:w-64 bg-slate-900/90 border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <p className="px-3 text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase mb-2">
            Navigation Menu
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.path} to={item.path} className={linkClass}>
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Quick Polar Telemetry Overview Widget */}
        <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl space-y-2 hidden md:block">
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Antarctic Conditions</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Ext. Temp:</span>
            <span className="font-mono text-[#9DECC0] font-bold">-32°C</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Wind Velocity:</span>
            <span className="font-mono text-amber-400 font-bold">58 km/h</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Polar Day/Night:</span>
            <span className="font-mono text-slate-300">Winter Darkness</span>
          </div>
        </div>
      </div>

      {/* Footer / Quick Logout & Public Gateway */}
      <div className="pt-4 border-t border-slate-800/80 space-y-1">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
        >
          <Compass className="w-4 h-4 text-[#9DECC0]" />
          <span>Public Gateway</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4 text-slate-500" />
          <span>Exit Mission Control</span>
        </button>
      </div>
    </aside>
  );
}
