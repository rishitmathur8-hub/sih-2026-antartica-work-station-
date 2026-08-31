import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Radio,
  Wifi,
  User,
  Clock,
  Save,
  Trash2,
  ShieldCheck,
  Zap,
  Flame,
  Droplets,
  BatteryCharging,
  Thermometer,
  Cpu,
  ShieldAlert,
  ChevronRight,
  PlusCircle,
  FileText,
  CheckCircle2
} from 'lucide-react';
import TelemetryCard from '../components/TelemetryCard.jsx';
import SyncStatusPanel from '../components/SyncStatusPanel.jsx';
import AlertItem from '../components/AlertItem.jsx';

export default function StationDashboardPage() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  // 1. Offline & Sync Simulation State
  const [isOnline, setIsOnline] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState('2026-08-31 09:15 UTC');
  const [toastMessage, setToastMessage] = useState(null);

  // 2. Form Input States
  const [parameter, setParameter] = useState('Fuel Level');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('%');
  const [notes, setNotes] = useState('');

  // 3. Initial Recent Readings Dataset (Local React State)
  const [readings, setReadings] = useState([
    {
      id: 1,
      time: '09:10 UTC',
      parameter: 'Fuel Level',
      value: '88.5',
      unit: '%',
      operator: 'OP-MAITRI-402',
      syncStatus: 'SYNCED'
    },
    {
      id: 2,
      time: '08:45 UTC',
      parameter: 'Internal Habitat Temp',
      value: '21.8',
      unit: '°C',
      operator: 'OP-MAITRI-402',
      syncStatus: 'SYNCED'
    },
    {
      id: 3,
      time: '08:00 UTC',
      parameter: 'Power Output',
      value: '480',
      unit: 'kW',
      operator: 'OP-MAITRI-402',
      syncStatus: 'SYNCED'
    },
    {
      id: 4,
      time: '07:15 UTC',
      parameter: 'Potable Water Reserve',
      value: '82.0',
      unit: '%',
      operator: 'OP-MAITRI-402',
      syncStatus: 'SYNCED'
    }
  ]);

  // Maitri Station Active Alerts
  const activeAlerts = [
    {
      id: 'ALT-103',
      severity: 'warning',
      status: 'ACTIVE',
      title: 'Blizzard Weather Alert — High Wind Velocity',
      station: 'Maitri Research Station',
      time: '42 mins ago',
      description: 'Anemometer measured sustained wind gusts exceeding 84 km/h. Outdoor EVA research suspended.'
    }
  ];

  // Parameter Unit Auto-suggest Helper
  const handleParameterChange = (newParam) => {
    setParameter(newParam);
    if (newParam === 'Fuel Level' || newParam === 'Water Level' || newParam === 'Oxygen Level') {
      setUnit('%');
    } else if (newParam === 'Temperature') {
      setUnit('°C');
    } else if (newParam === 'Generator Reading') {
      setUnit('kW');
    }
  };

  // Handle Form Submit / Save Reading
  const handleSaveReading = (e) => {
    e.preventDefault();
    if (!value) return;

    const now = new Date();
    const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} UTC`;

    const newReading = {
      id: Date.now(),
      time: formattedTime,
      parameter,
      value,
      unit,
      operator: 'OP-MAITRI-402',
      syncStatus: isOnline ? 'SYNCED' : 'PENDING SYNC'
    };

    // Prepend new reading to top of array
    setReadings([newReading, ...readings]);

    // Show Confirmation Toast
    setToastMessage(`Reading logged successfully (${parameter}: ${value} ${unit})!`);
    setTimeout(() => setToastMessage(null), 3500);

    // Reset Form Values
    setValue('');
    setNotes('');
  };

  // Handle Clear Form
  const handleClearForm = () => {
    setValue('');
    setNotes('');
  };

  // Toggle Online/Offline State
  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
  };

  // Sync Pending Data Action
  const handleSyncPending = () => {
    const updatedReadings = readings.map((r) => ({
      ...r,
      syncStatus: 'SYNCED'
    }));

    setReadings(updatedReadings);

    const now = new Date();
    const formattedSync = `2026-08-31 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} UTC`;
    setLastSyncTime(formattedSync);

    setToastMessage('All pending local telemetry records successfully synchronized!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Count Pending Records
  const pendingCount = readings.filter((r) => r.syncStatus === 'PENDING SYNC').length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top font-mono text-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Station Operator Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
            <LayoutDashboard className="w-4 h-4" />
            <span>Local Station Operator Console</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-extrabold text-slate-100">Maitri Research Station</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
              IND-MTR-01
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30">
              DEMO OPERATOR MODE
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-2 flex-wrap">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-cyan-400" /> OP-MAITRI-402 (Duty Commander)
            </span>
            <span className="flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5 text-cyan-400" /> INSAT-4B Primary (99.8%)
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" /> 2026-08-31 09:22 UTC
            </span>
          </div>
        </div>

        {/* Dynamic Online/Offline Badge */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold shrink-0 ${
            isOnline
              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
              : 'bg-rose-950/80 text-rose-400 border-rose-800'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`}></span>
          <span>{isOnline ? 'ONLINE / SYNCED' : 'OFFLINE MODE'}</span>
        </div>
      </div>

      {/* 2. Critical Telemetry Status Cards (8 Parameter Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
        <TelemetryCard title="Internal Temp" value="21.8" unit="°C" status="NORMAL" lastUpdated="1 min ago" icon={Thermometer} />
        <TelemetryCard title="External Temp" value="-32.4" unit="°C" status="NORMAL" lastUpdated="1 min ago" icon={Thermometer} />
        <TelemetryCard title="Oxygen Level" value="98" unit="%" status="NORMAL" lastUpdated="2 mins ago" icon={BatteryCharging} />
        <TelemetryCard title="Water Reservoir" value="82" unit="%" status="NORMAL" lastUpdated="2 mins ago" icon={Droplets} />
        <TelemetryCard title="Fuel Reserve" value="88" unit="%" status="NORMAL" lastUpdated="3 mins ago" icon={Flame} />
        <TelemetryCard title="Power Load" value="480" unit="kW" status="NORMAL" lastUpdated="1 min ago" icon={Zap} />
        <TelemetryCard title="Generator Grid" value="Sub-A: OK" unit="" status="NORMAL" lastUpdated="Just now" icon={Cpu} />
        <TelemetryCard title="Comm Link" value="INSAT-4B" unit="99%" status="NORMAL" lastUpdated="Just now" icon={Radio} />
      </div>

      {/* 3. Offline / Data Sync Simulation Panel */}
      <SyncStatusPanel
        isOnline={isOnline}
        pendingCount={pendingCount}
        lastSyncTime={lastSyncTime}
        onToggleOnline={handleToggleOnline}
        onSyncPending={handleSyncPending}
      />

      {/* 4. Manual Telemetry Data Entry Form & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Manual Data Entry Section */}
        <div ref={formRef} className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold border-b border-slate-800 pb-3">
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <span>Log Manual Telemetry Reading</span>
          </div>

          <form onSubmit={handleSaveReading} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Parameter Selector */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                  Select Parameter
                </label>
                <select
                  value={parameter}
                  onChange={(e) => handleParameterChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="Fuel Level">Fuel Level</option>
                  <option value="Water Level">Water Level</option>
                  <option value="Oxygen Level">Oxygen Level</option>
                  <option value="Generator Reading">Generator Reading</option>
                  <option value="Temperature">Temperature</option>
                </select>
              </div>

              {/* Value Input */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                  Measured Value
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g. 88.5"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              {/* Unit Input */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                  Unit
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="%, L, °C, kW"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            {/* Operator Notes */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                Operator Diagnostic Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log secondary observations or sensor calibration notes..."
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Telemetry Reading</span>
              </button>

              <button
                type="button"
                onClick={handleClearForm}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-xl text-xs font-mono transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Form</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Station Quick Actions</span>
          </h2>

          <div className="space-y-2.5">
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs font-mono text-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <PlusCircle className="w-4 h-4 text-cyan-400" />
                <span>Log New Reading</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/alerts')}
              className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs font-mono text-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>View System Alerts</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/station/maitri')}
              className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs font-mono text-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>Maitri Station Details</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs font-mono text-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>View Station Reports</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Recent Logged Telemetry Readings Table */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Recent Station Logged Readings</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">{readings.length} Records In Local Memory</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase">
              <tr>
                <th className="p-3">Time</th>
                <th className="p-3">Parameter</th>
                <th className="p-3">Value</th>
                <th className="p-3">Unit</th>
                <th className="p-3">Operator</th>
                <th className="p-3 text-right">Sync Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {readings.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 text-slate-400">{r.time}</td>
                  <td className="p-3 font-bold text-slate-100">{r.parameter}</td>
                  <td className="p-3 text-cyan-400 font-bold">{r.value}</td>
                  <td className="p-3 text-slate-400">{r.unit}</td>
                  <td className="p-3 text-slate-300">{r.operator}</td>
                  <td className="p-3 text-right">
                    <span
                      className={`px-2 py-0.5 text-[10px] rounded font-bold border ${
                        r.syncStatus === 'SYNCED'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border-amber-800'
                      }`}
                    >
                      {r.syncStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Active Station Alerts Section */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Maitri Active Station Alarms</span>
          </h2>
          <button
            onClick={() => navigate('/alerts')}
            className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"
          >
            <span>View All Station Alerts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <AlertItem
              key={alert.id}
              severity={alert.severity}
              title={alert.title}
              station={alert.station}
              time={alert.time}
              description={alert.description}
              status={alert.status}
              onClick={() => navigate('/alerts')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
