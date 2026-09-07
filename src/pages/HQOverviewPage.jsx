import React from 'react';
import { Globe, Radio, ShieldAlert, Zap, Flame, Droplets, BatteryCharging } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import StationCard from '../components/StationCard.jsx';
import AlertItem from '../components/AlertItem.jsx';
import MapPlaceholder from '../components/MapPlaceholder.jsx';
import Particles from '../components/effects/Particles.jsx';

export default function HQOverviewPage() {
  // Dummy Telemetry Summary Data
  const telemetrySummary = {
    systemStatus: 'OPERATIONAL',
    activeStations: '2 / 2 Active',
    totalAlerts: '3 Active (1 Critical)',
    avgTemp: '-30.2°C',
  };

  // Dummy Resource Breakdown Data
  const resources = [
    { name: 'Total Power Output', value: '920 kW', detail: 'Solar & Diesel Grid Nominal', icon: Zap, color: 'text-cyan-400' },
    { name: 'Fuel Reserves', value: '84%', detail: '240,000 L Diesel Stock', icon: Flame, color: 'text-amber-400' },
    { name: 'Life Support Oxygen', value: '98%', detail: 'Internal Recirculation OK', icon: BatteryCharging, color: 'text-emerald-400' },
    { name: 'Potable Water Stock', value: '76%', detail: 'Desalination Melt Plant OK', icon: Droplets, color: 'text-blue-400' },
  ];

  // Dummy Recent Alerts Data
  const recentAlerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'Fuel Level Warning — Generator Sub-unit 2',
      station: 'Bharati Station',
      time: '14 mins ago',
      description: 'Secondary diesel reserve tank dropped below 20% due to emergency habitat heating.'
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Blizzard Weather Alert — High Wind Gusts',
      station: 'Maitri Station',
      time: '42 mins ago',
      description: 'Wind speeds exceeding 82 km/h. Outdoor research & satellite array maintenance suspended.'
    },
    {
      id: 3,
      severity: 'info',
      title: 'Daily Telemetry Sync Completed',
      station: 'HQ Operations & INSAT-4B Link',
      time: '2 hours ago',
      description: 'Environmental & life support log data successfully synced to central database.'
    }
  ];

  return (
    <div className="relative space-y-6">
      {/* Fixed Full-Viewport React Bits Particles WebGL Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Particles
          particleColors={["#7dd3fc", "#9DECC0", "#ffffff", "#38bdf8"]}
          particleCount={220}
          particleSpread={12}
          speed={0.12}
          particleBaseSize={110}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
        {/* Dark Navy Overlay to preserve 100% KPI card contrast and telemetry text readability */}
        <div className="absolute inset-0 bg-slate-950/65 pointer-events-none"></div>
      </div>

      {/* Foreground Mission Control Content */}
      <div className="relative z-10 space-y-6">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
              <Globe className="w-4 h-4" />
              <span>Mission Control Command Overview</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-100">Antarctic Station Monitoring Platform</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl font-mono">
              Centralized telemetry, life support oversight, and emergency response management for Indian Antarctic Research Operations.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-emerald-400 text-xs font-mono shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold">STATUS: ALL STATIONS ONLINE</span>
          </div>
        </div>

        {/* KPI Stat Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Overall System Status"
            value={telemetrySummary.systemStatus}
            statusText="Nominal Telemetry"
            statusType="normal"
            icon={Globe}
          />
          <StatCard
            title="Active Stations"
            value={telemetrySummary.activeStations}
            statusText="Maitri & Bharati Online"
            statusType="info"
            icon={Radio}
          />
          <StatCard
            title="Active Alarms"
            value={telemetrySummary.totalAlerts}
            statusText="Action Required"
            statusType="critical"
            icon={ShieldAlert}
          />
          <StatCard
            title="Average Polar Temp"
            value={telemetrySummary.avgTemp}
            statusText="Winter Night Cycle"
            statusType="warning"
            icon={Flame}
          />
        </div>

        {/* Main Grid: Station Status & Radar Map Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Stations Overview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <span>Research Stations Status</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">2 Registered Stations</span>
            </div>

            <div className="space-y-4">
              <StationCard
                id="maitri"
                name="Maitri Research Station"
                code="IND-MTR-01"
                coordinates="70°45′57″S 11°44′09″E (Schirmacher Oasis)"
                status="OPERATIONAL"
                crewCount="24 Crew"
                powerLevel="480 kW (94%)"
                extTemp="-32.4°C"
              />

              <StationCard
                id="bharati"
                name="Bharati Research Station"
                code="IND-BHT-02"
                coordinates="69°24′28″S 76°11′14″E (Larsemann Hills)"
                status="WARNING"
                crewCount="18 Crew"
                powerLevel="440 kW (78%)"
                extTemp="-28.0°C"
              />
            </div>
          </div>

          {/* Antarctic Digital Map Placeholder */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Geospatial Radar & Layout</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Tactical View</span>
            </div>

            <MapPlaceholder />
          </div>
        </div>

        {/* Resource Availability Summary Grid */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Station Resources & Consumables Summary</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((res, index) => {
              const Icon = res.icon;
              return (
                <div key={index} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-mono">{res.name}</span>
                    <Icon className={`w-4 h-4 ${res.color}`} />
                  </div>
                  <p className="text-xl font-bold text-slate-100 font-mono">{res.value}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{res.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Alerts Feed Section */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Recent System Alerts & Alarms</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Last 24 Hours</span>
          </div>

          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                severity={alert.severity}
                title={alert.title}
                station={alert.station}
                time={alert.time}
                description={alert.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
