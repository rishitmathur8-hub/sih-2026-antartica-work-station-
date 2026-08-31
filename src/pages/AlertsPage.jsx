import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Info, Filter, RefreshCw, Radio } from 'lucide-react';
import AlertItem from '../components/AlertItem.jsx';
import AlertModal from '../components/AlertModal.jsx';
import StatCard from '../components/StatCard.jsx';

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [stationFilter, setStationFilter] = useState('ALL');
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Realistic System-wide Static Alert Dataset
  const allAlerts = [
    {
      id: 'ALT-101',
      severity: 'critical',
      status: 'ACTIVE',
      title: 'Abnormal Fuel Consumption Rate — Generator Sub-unit 2',
      station: 'Bharati Research Station',
      time: '14 mins ago',
      timestamp: '2026-08-31 00:58 UTC',
      description: 'Secondary diesel fuel tank burn rate spiked to 14.2 L/hr due to extreme habitat heating demand during sudden polar storm.',
      sopActions: [
        'Engage auxiliary heat exchangers in Sector B living quarters.',
        'Switch Generator Sub-unit 2 to eco-throttle mode.',
        'Verify fuel transfer valve line for sub-zero line freeze.'
      ]
    },
    {
      id: 'ALT-102',
      severity: 'critical',
      status: 'INVESTIGATING',
      title: 'Sub-Zero External Temperature Anomaly (-41.2°C)',
      station: 'Dakshin Gangotri Relay Hub',
      time: '25 mins ago',
      timestamp: '2026-08-31 00:47 UTC',
      description: 'Unmanned automated relay node reported external temperature drop below critical thermal operational threshold.',
      sopActions: [
        'Activate internal enclosure trace-heating elements.',
        'Redirect satellite telemetry relay through Bharati station primary hop.'
      ]
    },
    {
      id: 'ALT-103',
      severity: 'warning',
      title: 'Blizzard Weather Alert — Extreme Wind Velocity',
      station: 'Maitri Research Station',
      time: '42 mins ago',
      timestamp: '2026-08-31 00:30 UTC',
      description: 'Anemometer measured sustained wind gusts exceeding 84 km/h. Outdoor EVA missions & radar maintenance suspended.',
      sopActions: [
        'Enforce mandatory station lockdown SOP-8.',
        'Secure exterior cargo containers and communications dome guy-wires.'
      ]
    },
    {
      id: 'ALT-104',
      severity: 'warning',
      title: 'Primary INSAT-4B Satellite Downlink Degradation',
      station: 'Bharati Research Station',
      time: '1 hour ago',
      timestamp: '2026-08-30 23:55 UTC',
      description: 'Signal-to-noise ratio dropped on primary X-band downlink. Telemetry automatically failing over to Iridium constellation.',
      sopActions: [
        'Re-align parabolic dish feeder horn once wind velocity permits.',
        'Monitor secondary Iridium bandwidth load.'
      ]
    },
    {
      id: 'ALT-105',
      severity: 'warning',
      title: 'Potable Water Melt Reserve Below Threshold (35%)',
      station: 'Dakshin Gangotri Relay Hub',
      time: '2 hours ago',
      timestamp: '2026-08-30 23:10 UTC',
      description: 'Thermal melt unit output slowed due to power conservation mode.',
      sopActions: [
        'Schedule remote thermal melt cycle at next solar window.'
      ]
    },
    {
      id: 'ALT-106',
      severity: 'info',
      title: 'Daily Telemetry Sync & Backup Completed',
      station: 'Maitri Research Station',
      time: '3 hours ago',
      timestamp: '2026-08-30 22:15 UTC',
      description: 'Full 24-hour environmental, power, and life support dataset archived to HQ Mission Control cloud servers.',
      sopActions: [
        'Routine automated event. No operator intervention required.'
      ]
    },
    {
      id: 'ALT-107',
      severity: 'info',
      title: 'Solar Tracking Array Auto-Calibration Success',
      station: 'Himadri Polar Outpost',
      time: '4 hours ago',
      timestamp: '2026-08-30 21:05 UTC',
      description: 'Arctic solar collector array recalibrated pitch angle for low-horizon polar light capture.',
      sopActions: [
        'Log solar angle offset (+2.4°) into daily logbook.'
      ]
    },
    {
      id: 'ALT-108',
      severity: 'info',
      title: 'Fiber Telemetry Link Health Check Passed',
      station: 'Larsemann Support Hub',
      time: '5 hours ago',
      timestamp: '2026-08-30 20:10 UTC',
      description: 'Sub-sea optical telemetry cable ping latency nominal at 1.2ms.',
      sopActions: [
        'Routine diagnostic passed.'
      ]
    }
  ];

  // List of unique stations for filter dropdown
  const stationOptions = [
    { label: 'All Stations', value: 'ALL' },
    { label: 'Maitri Research Station', value: 'Maitri Research Station' },
    { label: 'Bharati Research Station', value: 'Bharati Research Station' },
    { label: 'Dakshin Gangotri Relay Hub', value: 'Dakshin Gangotri Relay Hub' },
    { label: 'Himadri Polar Outpost', value: 'Himadri Polar Outpost' },
    { label: 'Larsemann Support Hub', value: 'Larsemann Support Hub' },
  ];

  // Filtering Logic
  const filteredAlerts = allAlerts.filter((item) => {
    const matchesSeverity =
      severityFilter === 'ALL' ? true : item.severity.toUpperCase() === severityFilter;

    const matchesStation =
      stationFilter === 'ALL' ? true : item.station === stationFilter;

    return matchesSeverity && matchesStation;
  });

  // Calculate Summary Counts
  const totalCount = allAlerts.length;
  const criticalCount = allAlerts.filter((a) => a.severity === 'critical').length;
  const warningCount = allAlerts.filter((a) => a.severity === 'warning').length;
  const infoCount = allAlerts.filter((a) => a.severity === 'info').length;

  return (
    <div className="space-y-6">
      {/* Page Title & Reset Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Mission Control Alarm Center</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">System-Wide Alarms & Alerts</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time anomaly detection, weather warnings, and equipment status updates across polar stations.
          </p>
        </div>

        <button
          onClick={() => { setSeverityFilter('ALL'); setStationFilter('ALL'); }}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs font-mono rounded-xl transition-colors self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Alert Filters</span>
        </button>
      </div>

      {/* Summary KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Active Alerts"
          value={totalCount}
          statusText="System Log"
          statusType="info"
          icon={ShieldAlert}
        />
        <StatCard
          title="Critical Alarms"
          value={criticalCount}
          statusText="Immediate Action Required"
          statusType="critical"
          icon={ShieldAlert}
        />
        <StatCard
          title="Warnings Active"
          value={warningCount}
          statusText="Maintenance Advisory"
          statusType="warning"
          icon={AlertTriangle}
        />
        <StatCard
          title="Informational Updates"
          value={infoCount}
          statusText="System Status OK"
          statusType="normal"
          icon={Info}
        />
      </div>

      {/* Controls Bar: Severity Pills & Station Dropdown Filter */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Severity Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>SEVERITY:</span>
          </span>

          {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                severityFilter === sev
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Station Selection Dropdown Filter */}
        <div className="relative w-full md:w-72">
          <Radio className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
          <select
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500 appearance-none transition-colors cursor-pointer"
          >
            {stationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Alert Items Feed List */}
      {filteredAlerts.length > 0 ? (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <AlertItem
              key={alert.id}
              severity={alert.severity}
              title={alert.title}
              station={alert.station}
              time={alert.time}
              description={alert.description}
              status={alert.status}
              onClick={() => setSelectedAlert(alert)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 border border-dashed border-slate-800 bg-slate-900/30 rounded-2xl text-center space-y-3">
          <div className="inline-flex p-3 bg-slate-800 text-slate-400 rounded-full">
            <Info className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-200">No Alerts Match Selected Filters</h3>
          <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
            No system alarms found for severity <span className="text-cyan-400 font-bold">"{severityFilter}"</span> at station <span className="text-cyan-400 font-bold">"{stationFilter}"</span>.
          </p>
          <button
            onClick={() => { setSeverityFilter('ALL'); setStationFilter('ALL'); }}
            className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold rounded-lg hover:bg-cyan-500/20 transition-colors"
          >
            Clear Active Filters
          </button>
        </div>
      )}

      {/* Alert Detail Inspection Modal */}
      <AlertModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </div>
  );
}
