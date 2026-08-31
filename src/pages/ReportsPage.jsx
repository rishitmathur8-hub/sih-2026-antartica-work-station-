import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  Radio,
  Zap,
  Flame,
  Droplets,
  ArrowUpDown,
  CheckCircle,
  Clock
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
import StatCard from '../components/StatCard.jsx';
import ReportModal from '../components/ReportModal.jsx';

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStation, setSelectedStation] = useState('ALL');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedReport, setSelectedReport] = useState(null);
  const [sortField, setSortField] = useState('station');
  const [sortAsc, setSortAsc] = useState(true);
  const [generationToast, setGenerationToast] = useState(false);

  // 1. Report Type Categories
  const reportTypes = [
    { label: 'All Reports', value: 'ALL' },
    { label: 'Resource Consumption', value: 'Resource' },
    { label: 'Power & Energy', value: 'Power' },
    { label: 'Fuel Usage', value: 'Fuel' },
    { label: 'Water Consumption', value: 'Water' },
    { label: 'Oxygen Usage', value: 'Oxygen' },
    { label: 'Station Incidents', value: 'Incident' },
    { label: 'Environmental / Weather', value: 'Weather' },
  ];

  // 2. Station Filter Options
  const stationOptions = [
    { label: 'All Stations', value: 'ALL' },
    { label: 'Maitri Research Station', value: 'Maitri' },
    { label: 'Bharati Research Station', value: 'Bharati' },
    { label: 'Dakshin Gangotri Relay Hub', value: 'Dakshin Gangotri' },
    { label: 'Himadri Polar Outpost', value: 'Himadri' },
    { label: 'Larsemann Support Hub', value: 'Larsemann' },
  ];

  // 3. Dummy Resource Consumption Table Dataset
  const initialResourceTable = [
    { id: 1, station: 'Maitri Research Station', fuelUsedNum: 12400, fuelUsed: '12,400 L', waterUsedNum: 8200, waterUsed: '8,200 L', oxygenUsed: '98%', powerUsedNum: 11500, powerUsed: '11,500 kWh', period: 'Last 7 Days' },
    { id: 2, station: 'Bharati Research Station', fuelUsedNum: 18200, fuelUsed: '18,200 L', waterUsedNum: 6400, waterUsed: '6,400 L', oxygenUsed: '95%', powerUsedNum: 10800, powerUsed: '10,800 kWh', period: 'Last 7 Days' },
    { id: 3, station: 'Dakshin Gangotri Relay', fuelUsedNum: 4800, fuelUsed: '4,800 L', waterUsedNum: 1200, waterUsed: '1,200 L', oxygenUsed: 'N/A', powerUsedNum: 3100, powerUsed: '3,100 kWh', period: 'Last 7 Days' },
    { id: 4, station: 'Larsemann Support Hub', fuelUsedNum: 8600, fuelUsed: '8,600 L', waterUsedNum: 9100, waterUsed: '9,100 L', oxygenUsed: '99%', powerUsedNum: 7400, powerUsed: '7,400 kWh', period: 'Last 7 Days' },
    { id: 5, station: 'Himadri Polar Outpost', fuelUsedNum: 10100, fuelUsed: '10,100 L', waterUsedNum: 8800, waterUsed: '8,800 L', oxygenUsed: '97%', powerUsedNum: 12900, powerUsed: '12,900 kWh', period: 'Last 7 Days' },
  ];

  // 4. 7-Day Historical Telemetry Chart Dataset
  const historical7DayData = [
    { day: 'Aug 25', maitriFuel: 1850, bharatiFuel: 2700, maitriWater: 1180, bharatiPower: 1540 },
    { day: 'Aug 26', maitriFuel: 1780, bharatiFuel: 2650, maitriWater: 1160, bharatiPower: 1520 },
    { day: 'Aug 27', maitriFuel: 1750, bharatiFuel: 2600, maitriWater: 1150, bharatiPower: 1500 },
    { day: 'Aug 28', maitriFuel: 1820, bharatiFuel: 2720, maitriWater: 1210, bharatiPower: 1580 },
    { day: 'Aug 29', maitriFuel: 1720, bharatiFuel: 2580, maitriWater: 1140, bharatiPower: 1490 },
    { day: 'Aug 30', maitriFuel: 1760, bharatiFuel: 2620, maitriWater: 1170, bharatiPower: 1530 },
    { day: 'Aug 31', maitriFuel: 1720, bharatiFuel: 2330, maitriWater: 1190, bharatiPower: 1640 },
  ];

  // 5. Recent Generated Reports Table Dataset
  const recentReports = [
    {
      id: 'REP-2026-081',
      title: 'Monthly Life Support & Energy Audit',
      station: 'Maitri Research Station',
      type: 'Resource',
      date: '2026-08-31',
      status: 'COMPLETED',
      period: 'Aug 01 - Aug 31, 2026',
      summary: 'Monthly telemetry audit confirming 98% oxygen recirculation efficiency and solar grid optimization.',
      fuelUsed: '52,400 L',
      waterUsed: '34,200 L',
      oxygenUsed: '98%',
      powerUsed: '48,500 kWh'
    },
    {
      id: 'REP-2026-082',
      title: 'Generator Sub-unit 2 Emergency Fuel Audit',
      station: 'Bharati Research Station',
      type: 'Fuel',
      date: '2026-08-30',
      status: 'COMPLETED',
      period: 'Aug 24 - Aug 30, 2026',
      summary: 'Emergency fuel burn-down investigation for Bharati Station generator sub-unit 2 during polar storm.',
      fuelUsed: '18,200 L',
      waterUsed: '6,400 L',
      oxygenUsed: '95%',
      powerUsed: '10,800 kWh'
    },
    {
      id: 'REP-2026-083',
      title: 'Ice Shelf Sector 4 Thermal Telemetry Summary',
      station: 'Dakshin Gangotri Relay',
      type: 'Weather',
      date: '2026-08-29',
      status: 'ARCHIVED',
      period: 'Aug 20 - Aug 29, 2026',
      summary: 'Sub-zero thermal drop records for unmanned automated repeater node in Sector 4.',
      fuelUsed: '4,800 L',
      waterUsed: '1,200 L',
      oxygenUsed: 'N/A',
      powerUsed: '3,100 kWh'
    },
    {
      id: 'REP-2026-084',
      title: 'Optic Fiber Latency & Power Distribution Log',
      station: 'Larsemann Support Hub',
      type: 'Power',
      date: '2026-08-28',
      status: 'COMPLETED',
      period: 'Aug 21 - Aug 28, 2026',
      summary: 'Prydz Bay telemetry power grid audit confirming 99% fiber uptime.',
      fuelUsed: '8,600 L',
      waterUsed: '9,100 L',
      oxygenUsed: '99%',
      powerUsed: '7,400 kWh'
    },
    {
      id: 'REP-2026-085',
      title: 'Solar Angle & Environmental Weather Report',
      station: 'Himadri Polar Outpost',
      type: 'Weather',
      date: '2026-08-27',
      status: 'COMPLETED',
      period: 'Aug 20 - Aug 27, 2026',
      summary: 'Ny-Ålesund solar tracker pitch calibration data log.',
      fuelUsed: '10,100 L',
      waterUsed: '8,800 L',
      oxygenUsed: '97%',
      powerUsed: '12,900 kWh'
    }
  ];

  // Handling Resource Table Sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedResourceTable = [...initialResourceTable].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (typeof valA === 'string') {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortAsc ? valA - valB : valB - valA;
  });

  // Client-Side CSV File Downloader (No Backend Endpoint Required!)
  const handleCSVDownload = (report) => {
    const csvContent =
      `"Report ID","Report Title","Station","Type","Period","Date Generated","Status","Fuel Used","Water Consumed","Oxygen Level","Power Usage"\n` +
      `"${report.id}","${report.title}","${report.station}","${report.type}","${report.period || 'Last 7 Days'}","${report.date}","${report.status}","${report.fuelUsed || '12,400 L'}","${report.waterUsed || '8,200 L'}","${report.oxygenUsed || '98%'}","${report.powerUsed || '11,500 kWh'}"\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${report.id}_Telemetry_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simulate Report Generation
  const handleGenerateReport = () => {
    setGenerationToast(true);
    setTimeout(() => setGenerationToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {generationToast && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top font-mono text-xs">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>New Telemetry Report Generated & Archived!</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Station Analytics & Logs</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Operational Reports Center</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Review historical fuel, power, water consumption, and generate downloadable station reports.
          </p>
        </div>

        <button
          onClick={() => { setSelectedType('ALL'); setSelectedStation('ALL'); setDateRange('7d'); }}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs font-mono rounded-xl transition-colors self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* 1. Report Overview KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Reports Archived"
          value="48"
          statusText="System Log Database"
          statusType="info"
          icon={FileText}
        />
        <StatCard
          title="Generated This Month"
          value="12"
          statusText="August 2026 Audit"
          statusType="normal"
          icon={Calendar}
        />
        <StatCard
          title="Resource Audits"
          value="34"
          statusText="Fuel & Water Logs"
          statusType="info"
          icon={Flame}
        />
        <StatCard
          title="Incident Reports"
          value="14"
          statusText="Weather & Alarms"
          statusType="warning"
          icon={Clock}
        />
      </div>

      {/* 2. Selectable Report Type Pills Bar */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
        <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          Select Report Category
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {reportTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                selectedType === type.value
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Filters & Report Generation Controls */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
          {/* Station Filter Dropdown */}
          <div className="relative w-full sm:w-56">
            <Radio className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500 appearance-none transition-colors cursor-pointer"
            >
              {stationOptions.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Selector Dropdown */}
          <div className="relative w-full sm:w-48">
            <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500 appearance-none transition-colors cursor-pointer"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="winter">Full Winter Season</option>
            </select>
          </div>
        </div>

        {/* Generate Report Button */}
        <button
          onClick={handleGenerateReport}
          className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>Generate New Report</span>
        </button>
      </div>

      {/* 4. Resource Consumption Table with Sorting */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Station Resource Consumption Table</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Click column header to sort</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase">
              <tr>
                <th onClick={() => handleSort('station')} className="p-3 cursor-pointer hover:text-cyan-400">
                  <div className="flex items-center gap-1">
                    <span>Station</span> <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th onClick={() => handleSort('fuelUsedNum')} className="p-3 cursor-pointer hover:text-cyan-400">
                  <div className="flex items-center gap-1">
                    <span>Fuel Used</span> <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th onClick={() => handleSort('waterUsedNum')} className="p-3 cursor-pointer hover:text-cyan-400">
                  <div className="flex items-center gap-1">
                    <span>Water Used</span> <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-3">Oxygen Used</th>
                <th onClick={() => handleSort('powerUsedNum')} className="p-3 cursor-pointer hover:text-cyan-400">
                  <div className="flex items-center gap-1">
                    <span>Power Used</span> <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-3">Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {sortedResourceTable.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-100">{row.station}</td>
                  <td className="p-3 text-rose-400">{row.fuelUsed}</td>
                  <td className="p-3 text-cyan-400">{row.waterUsed}</td>
                  <td className="p-3 text-emerald-400">{row.oxygenUsed}</td>
                  <td className="p-3 text-amber-400">{row.powerUsed}</td>
                  <td className="p-3 text-slate-400">{row.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Historical Recharts Section (7-Day Trends) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7-Day Fuel Consumption Trend */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>7-Day Station Fuel Usage (Litres)</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Maitri vs Bharati</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historical7DayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fuelGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="bharatiFuel" name="Bharati Fuel (L)" stroke="#f43f5e" fillOpacity={1} fill="url(#fuelGrad)" />
                <Line type="monotone" dataKey="maitriFuel" name="Maitri Fuel (L)" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 7-Day Water & Power Usage Trend */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>7-Day Water (L) & Power (kWh) Trends</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Weekly Summary</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historical7DayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="maitriWater" name="Maitri Water (L)" stroke="#38bdf8" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="bharatiPower" name="Bharati Power (kWh)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="3 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 6. Recent Generated Reports Table */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Recently Generated Reports Log</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">{recentReports.length} Reports Archived</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase">
              <tr>
                <th className="p-3">Report Name & ID</th>
                <th className="p-3">Station</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date Generated</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3">
                    <p className="font-bold text-slate-100">{report.title}</p>
                    <p className="text-[10px] text-cyan-400">{report.id}</p>
                  </td>
                  <td className="p-3 text-slate-300">{report.station}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{report.date}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {report.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleCSVDownload(report)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Report Preview Modal */}
      <ReportModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        onDownload={(rep) => handleCSVDownload(rep)}
      />
    </div>
  );
}
