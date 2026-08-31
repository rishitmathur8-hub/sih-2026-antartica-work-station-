import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Radio,
  Users,
  Zap,
  Thermometer,
  Flame,
  Droplets,
  BatteryCharging,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Wifi,
  Clock,
  MapPin,
  Cpu,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import AlertItem from '../components/AlertItem.jsx';

export default function StationDetailPage() {
  const { id } = useParams();

  // Normalize station ID key
  const stationKey = id ? id.toLowerCase().trim() : '';

  // 24-Hour Realistic Telemetry Datasets
  const maitriHourlyData = [
    { time: '00:00', extTemp: -33.2, intTemp: 21.5, powerGen: 500, powerLoad: 470, fuelPct: 91 },
    { time: '04:00', extTemp: -34.8, intTemp: 21.2, powerGen: 510, powerLoad: 485, fuelPct: 90 },
    { time: '08:00', extTemp: -32.1, intTemp: 21.8, powerGen: 490, powerLoad: 460, fuelPct: 89.5 },
    { time: '12:00', extTemp: -30.4, intTemp: 22.0, powerGen: 480, powerLoad: 450, fuelPct: 89 },
    { time: '16:00', extTemp: -31.6, intTemp: 21.9, powerGen: 495, powerLoad: 465, fuelPct: 88.5 },
    { time: '20:00', extTemp: -32.9, intTemp: 21.7, powerGen: 505, powerLoad: 478, fuelPct: 88 },
  ];

  const bharatiHourlyData = [
    { time: '00:00', extTemp: -29.5, intTemp: 19.1, powerGen: 460, powerLoad: 440, fuelPct: 24 },
    { time: '04:00', extTemp: -30.8, intTemp: 18.8, powerGen: 470, powerLoad: 455, fuelPct: 22 },
    { time: '08:00', extTemp: -28.2, intTemp: 19.4, powerGen: 450, powerLoad: 430, fuelPct: 21 },
    { time: '12:00', extTemp: -26.9, intTemp: 19.8, powerGen: 440, powerLoad: 420, fuelPct: 20 },
    { time: '16:00', extTemp: -27.6, intTemp: 19.6, powerGen: 455, powerLoad: 435, fuelPct: 19 },
    { time: '20:00', extTemp: -28.4, intTemp: 19.5, powerGen: 465, powerLoad: 442, fuelPct: 18 },
  ];

  const gangotriHourlyData = [
    { time: '00:00', extTemp: -42.5, intTemp: 3.8, powerGen: 130, powerLoad: 125, fuelPct: 16 },
    { time: '04:00', extTemp: -43.8, intTemp: 3.2, powerGen: 135, powerLoad: 130, fuelPct: 15 },
    { time: '08:00', extTemp: -41.9, intTemp: 4.1, powerGen: 125, powerLoad: 118, fuelPct: 14 },
    { time: '12:00', extTemp: -39.8, intTemp: 4.8, powerGen: 120, powerLoad: 112, fuelPct: 13 },
    { time: '16:00', extTemp: -40.6, intTemp: 4.5, powerGen: 128, powerLoad: 120, fuelPct: 12.5 },
    { time: '20:00', extTemp: -41.2, intTemp: 4.2, powerGen: 132, powerLoad: 124, fuelPct: 12 },
  ];

  // Static Station Database
  const stationsData = {
    maitri: {
      name: 'Maitri Research Station',
      code: 'IND-MTR-01',
      coordinates: '70°45′57″S 11°44′09″E',
      sector: 'Schirmacher Oasis',
      status: 'OPERATIONAL',
      commStatus: 'INSAT-4B Primary Satellite (99.8%)',
      lastSync: '1 min ago',
      commander: 'Dr. A. Sharma (Station Commander)',
      telemetry: {
        extTemp: '-32.4°C',
        extTempType: 'normal',
        intTemp: '21.8°C',
        intTempType: 'normal',
        power: '480 kW',
        powerType: 'normal',
        fuelPct: 88,
        fuelStock: '211,200 L Diesel',
        fuelType: 'normal',
        waterPct: 82,
        waterStock: '41,000 L Melt Water',
        waterType: 'normal',
        oxygenPct: 98,
        oxygenStock: 'Internal Recirculation Nominal',
        oxygenType: 'normal',
        crew: '24 Personnel',
        crewType: 'info',
      },
      chartData: maitriHourlyData,
      alerts: [
        {
          id: 101,
          severity: 'warning',
          title: 'Blizzard Advisory — High Wind Gusts',
          station: 'Maitri Station',
          time: '42 mins ago',
          description: 'Wind speeds exceeding 82 km/h detected. Outdoor EVA research missions restricted.'
        },
        {
          id: 102,
          severity: 'info',
          title: 'Solar Array B Angle Auto-Adjusted',
          station: 'Maitri Station',
          time: '3 hours ago',
          description: 'Automated solar tracker locked to polar horizon for maximum winter light capture.'
        }
      ]
    },
    bharati: {
      name: 'Bharati Research Station',
      code: 'IND-BHT-02',
      coordinates: '69°24′28″S 76°11′14″E',
      sector: 'Larsemann Hills',
      status: 'WARNING',
      commStatus: 'Iridium Satellite Backup (84.2%)',
      lastSync: '3 mins ago',
      commander: 'Cap. R. Verma (Expedition Leader)',
      telemetry: {
        extTemp: '-28.0°C',
        extTempType: 'normal',
        intTemp: '19.5°C',
        intTempType: 'warning',
        power: '440 kW',
        powerType: 'warning',
        fuelPct: 18,
        fuelStock: '43,200 L Diesel (CRITICAL LOW)',
        fuelType: 'critical',
        waterPct: 64,
        waterStock: '32,000 L Melt Water',
        waterType: 'normal',
        oxygenPct: 95,
        oxygenStock: 'Internal Recirculation OK',
        oxygenType: 'normal',
        crew: '18 Personnel',
        crewType: 'info',
      },
      chartData: bharatiHourlyData,
      alerts: [
        {
          id: 201,
          severity: 'critical',
          title: 'Critical Fuel Alert — Generator Sub-unit 2',
          station: 'Bharati Station',
          time: '14 mins ago',
          description: 'Secondary diesel reserve dropped below 20% threshold. Emergency heating load high.'
        },
        {
          id: 202,
          severity: 'warning',
          title: 'Primary INSAT Link High Latency',
          station: 'Bharati Station',
          time: '1 hour ago',
          description: 'Switched data downlink to secondary Iridium satellite constellation.'
        }
      ]
    },
    'dakshin-gangotri': {
      name: 'Dakshin Gangotri Relay Hub',
      code: 'IND-DGT-00',
      coordinates: '70°05′37″S 12°00′00″E',
      sector: 'Ice Shelf Sector 4',
      status: 'CRITICAL',
      commStatus: 'Low Band VHF Repeater (62.0%)',
      lastSync: '12 mins ago',
      commander: 'Automated Telemetry Node (Unmanned)',
      telemetry: {
        extTemp: '-41.2°C',
        extTempType: 'critical',
        intTemp: '4.2°C',
        intTempType: 'critical',
        power: '120 kW',
        powerType: 'warning',
        fuelPct: 12,
        fuelStock: '9,600 L Diesel (RESERVE LOW)',
        fuelType: 'critical',
        waterPct: 35,
        waterStock: '7,000 L Reservoir',
        waterType: 'warning',
        oxygenPct: 0,
        oxygenStock: 'Unmanned Relay Hub (N/A)',
        oxygenType: 'info',
        crew: '0 Crew (Automated)',
        crewType: 'info',
      },
      chartData: gangotriHourlyData,
      alerts: [
        {
          id: 301,
          severity: 'critical',
          title: 'Severe Sub-Zero Thermal Drop in Sector 4',
          station: 'Dakshin Gangotri Relay',
          time: '25 mins ago',
          description: 'Unmanned node external temperature dropped below -41°C. Heating elements running at max power.'
        }
      ]
    },
    'larsemann-substation': {
      name: 'Larsemann Support Hub',
      code: 'IND-LSH-03',
      coordinates: '69°23′10″S 76°15′20″E',
      sector: 'Prydz Bay Sector',
      status: 'OPERATIONAL',
      commStatus: 'Fiber Telemetry Link (100%)',
      lastSync: ' Just now',
      commander: 'Dr. S. Nair (Logistics Lead)',
      telemetry: {
        extTemp: '-26.5°C',
        extTempType: 'normal',
        intTemp: '22.1°C',
        intTempType: 'normal',
        power: '310 kW',
        powerType: 'normal',
        fuelPct: 75,
        fuelStock: '180,000 L Diesel',
        fuelType: 'normal',
        waterPct: 90,
        waterStock: '45,000 L Water',
        waterType: 'normal',
        oxygenPct: 99,
        oxygenStock: 'Nominal',
        oxygenType: 'normal',
        crew: '8 Personnel',
        crewType: 'info',
      },
      chartData: maitriHourlyData,
      alerts: []
    },
    'himadri-polar-outpost': {
      name: 'Himadri Polar Outpost',
      code: 'IND-HMD-04',
      coordinates: '78°55′00″N 11°56′00″E',
      sector: 'Ny-Ålesund Observatory',
      status: 'OPERATIONAL',
      commStatus: 'Optical Satellite Array (99.5%)',
      lastSync: '2 mins ago',
      commander: 'Prof. K. Sen (Arctic Lead)',
      telemetry: {
        extTemp: '-18.4°C',
        extTempType: 'normal',
        intTemp: '22.4°C',
        intTempType: 'normal',
        power: '520 kW',
        powerType: 'normal',
        fuelPct: 82,
        fuelStock: '196,000 L Fuel',
        fuelType: 'normal',
        waterPct: 88,
        waterStock: '42,000 L Water',
        waterType: 'normal',
        oxygenPct: 97,
        oxygenStock: 'Nominal',
        oxygenType: 'normal',
        crew: '12 Personnel',
        crewType: 'info',
      },
      chartData: maitriHourlyData,
      alerts: []
    }
  };

  // Lookup target station data
  const station = stationsData[stationKey];

  // If station ID is unknown, render Clean Fallback State
  if (!station) {
    return (
      <div className="space-y-6">
        <Link
          to="/stations"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-mono transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Stations Registry</span>
        </Link>

        <div className="p-12 border border-dashed border-rose-900/50 bg-rose-950/10 rounded-2xl text-center space-y-4 max-w-xl mx-auto my-12">
          <div className="inline-flex p-4 bg-rose-950 text-rose-400 rounded-full border border-rose-800">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Station Telemetry Not Found</h2>
          <p className="text-xs text-slate-400 font-mono leading-relaxed">
            No active telemetry stream or station profile found for ID: <code className="text-rose-400 font-bold bg-slate-950 px-2 py-0.5 rounded">{id}</code>.
          </p>
          <Link
            to="/stations"
            className="inline-block px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
          >
            Return to Stations List
          </Link>
        </div>
      </div>
    );
  }

  // Status Styling Configuration
  const statusStyles = {
    OPERATIONAL: {
      badge: 'bg-emerald-950/80 text-emerald-400 border-emerald-800',
      icon: ShieldCheck,
    },
    WARNING: {
      badge: 'bg-amber-950/80 text-amber-400 border-amber-800',
      icon: AlertTriangle,
    },
    CRITICAL: {
      badge: 'bg-rose-950/80 text-rose-400 border-rose-800',
      icon: ShieldAlert,
    }
  };

  const statusConfig = statusStyles[station.status] || statusStyles.OPERATIONAL;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6">
      {/* Back Button & Station Header */}
      <div className="space-y-4">
        <Link
          to="/stations"
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white rounded-xl text-xs font-mono transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Back to Stations Registry</span>
        </Link>

        {/* Station Title Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-extrabold text-slate-100">{station.name}</h1>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                {station.code}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${statusConfig.badge}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{station.status}</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-2 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {station.coordinates} ({station.sector})
              </span>
              <span className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                {station.commStatus}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Last Sync: {station.lastSync}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Key Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono">
            <span>EXT TEMP</span>
            <Thermometer className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <p className="text-lg font-bold text-slate-100 font-mono">{station.telemetry.extTemp}</p>
          <span className="text-[10px] text-slate-400 font-mono">Polar Outdoor</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono">
            <span>INT TEMP</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-lg font-bold text-slate-100 font-mono">{station.telemetry.intTemp}</p>
          <span className="text-[10px] text-emerald-400 font-mono">Habitat Heated</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono">
            <span>POWER LOAD</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-lg font-bold text-slate-100 font-mono">{station.telemetry.power}</p>
          <span className="text-[10px] text-slate-400 font-mono">Generator Grid</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono">
            <span>FUEL STOCK</span>
            <Flame className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <p className="text-lg font-bold text-slate-100 font-mono">{station.telemetry.fuelPct}%</p>
          <span className={`text-[10px] font-mono ${station.telemetry.fuelPct < 25 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
            {station.telemetry.fuelPct < 25 ? 'Critical Low' : 'Reserve OK'}
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono">
            <span>WATER LEVEL</span>
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <p className="text-lg font-bold text-slate-100 font-mono">{station.telemetry.waterPct}%</p>
          <span className="text-[10px] text-cyan-400 font-mono">Melt Reservoir</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono">
            <span>OXYGEN</span>
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-lg font-bold text-slate-100 font-mono">{station.telemetry.oxygenPct}%</p>
          <span className="text-[10px] text-emerald-400 font-mono">Recirculation</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1 col-span-2 sm:col-span-1">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono">
            <span>CREW ROSTER</span>
            <Users className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <p className="text-lg font-bold text-slate-100 font-mono">{station.telemetry.crew}</p>
          <span className="text-[10px] text-slate-400 font-mono">Active On Duty</span>
        </div>
      </div>

      {/* 2. Resource Monitoring Progress Bars */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Life Support & Consumables Capacity</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fuel Progress */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" /> Fuel Reserve Stock
              </span>
              <span className={`font-bold ${station.telemetry.fuelPct < 25 ? 'text-rose-400' : 'text-cyan-400'}`}>
                {station.telemetry.fuelPct}% ({station.telemetry.fuelStock})
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  station.telemetry.fuelPct < 25 ? 'bg-rose-500' : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                }`}
                style={{ width: `${station.telemetry.fuelPct}%` }}
              ></div>
            </div>
          </div>

          {/* Water Progress */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Potable Water Reservoir
              </span>
              <span className="font-bold text-cyan-400">
                {station.telemetry.waterPct}% ({station.telemetry.waterStock})
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all"
                style={{ width: `${station.telemetry.waterPct}%` }}
              ></div>
            </div>
          </div>

          {/* Oxygen Progress */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" /> Life Support Oxygen Level
              </span>
              <span className="font-bold text-emerald-400">
                {station.telemetry.oxygenPct}% ({station.telemetry.oxygenStock})
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${station.telemetry.oxygenPct}%` }}
              ></div>
            </div>
          </div>

          {/* Power Grid Load Progress */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Generator Power Capacity
              </span>
              <span className="font-bold text-amber-400">
                {station.telemetry.power} (Nominal Load)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all"
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Recharts Telemetry Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Trend Chart */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
              <Thermometer className="w-4 h-4 text-cyan-400" />
              <span>24-Hour Temperature Trends (°C)</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">External vs Habitat</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={station.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="intTemp" name="Habitat Temp (°C)" stroke="#38bdf8" fillOpacity={1} fill="url(#colorInt)" />
                <Line type="monotone" dataKey="extTemp" name="External Temp (°C)" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Power Generation & Consumption Chart */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Power Grid Output & Load (kW)</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">24h Telemetry</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={station.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="powerGen" name="Generated (kW)" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="powerLoad" name="Grid Load (kW)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Fuel Consumption Burn Trend */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>24-Hour Fuel Reserve Burn-Down Trend (%)</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Diesel Consumption Rate</span>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={station.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="fuelPct" name="Fuel Reserve (%)" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Station Information & Active Station Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Station Specs & Information */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Station Technical Profile</span>
          </h2>

          <div className="space-y-3 text-xs font-mono divide-y divide-slate-800">
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Expedition Leader / Commander:</span>
              <span className="text-slate-200 font-bold">{station.commander}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-400">Station Call Sign & Code:</span>
              <span className="text-cyan-400 font-bold">{station.code}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-400">Geographical Coordinates:</span>
              <span className="text-slate-200">{station.coordinates}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-400">Antarctic Research Sector:</span>
              <span className="text-slate-200">{station.sector}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-400">Primary Comms Link:</span>
              <span className="text-emerald-400 font-bold">{station.commStatus}</span>
            </div>
          </div>
        </div>

        {/* Station-Specific Active Alerts */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Station Active Alerts</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">{station.alerts.length} Active Alarms</span>
          </div>

          {station.alerts.length > 0 ? (
            <div className="space-y-3">
              {station.alerts.map((alert) => (
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
          ) : (
            <div className="p-8 border border-dashed border-slate-800 bg-slate-950 rounded-xl text-center">
              <p className="text-xs text-emerald-400 font-mono">No active alarms or warnings logged for this station.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
