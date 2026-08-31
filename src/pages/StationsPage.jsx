import React, { useState } from 'react';
import { Search, Radio, ShieldCheck, AlertTriangle, ShieldAlert, Filter, RefreshCw } from 'lucide-react';
import StationCard from '../components/StationCard.jsx';
import StatCard from '../components/StatCard.jsx';

export default function StationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Dummy Static Data for Antarctic Stations
  const stations = [
    {
      id: 'maitri',
      name: 'Maitri Research Station',
      code: 'IND-MTR-01',
      coordinates: '70°45′57″S 11°44′09″E',
      sector: 'Schirmacher Oasis',
      status: 'OPERATIONAL',
      crewCount: '24 Crew',
      powerLevel: '480 kW (94%)',
      extTemp: '-32.4°C',
      commStatus: 'INSAT-4B Primary (99.8%)',
    },
    {
      id: 'bharati',
      name: 'Bharati Research Station',
      code: 'IND-BHT-02',
      coordinates: '69°24′28″S 76°11′14″E',
      sector: 'Larsemann Hills',
      status: 'WARNING',
      crewCount: '18 Crew',
      powerLevel: '440 kW (78%)',
      extTemp: '-28.0°C',
      commStatus: 'Iridium Satellite Backup',
    },
    {
      id: 'dakshin-gangotri',
      name: 'Dakshin Gangotri Relay Hub',
      code: 'IND-DGT-00',
      coordinates: '70°05′37″S 12°00′00″E',
      sector: 'Ice Shelf Sector 4',
      status: 'CRITICAL',
      crewCount: '0 Crew (Automated)',
      powerLevel: '120 kW (42%)',
      extTemp: '-41.2°C',
      commStatus: 'Low Band VHF Repeater',
    },
    {
      id: 'larsemann-substation',
      name: 'Larsemann Support Hub',
      code: 'IND-LSH-03',
      coordinates: '69°23′10″S 76°15′20″E',
      sector: 'Prydz Bay Sector',
      status: 'OPERATIONAL',
      crewCount: '8 Crew',
      powerLevel: '310 kW (89%)',
      extTemp: '-26.5°C',
      commStatus: 'Fiber Telemetry Link',
    },
    {
      id: 'himadri-polar-outpost',
      name: 'Himadri Polar Outpost',
      code: 'IND-HMD-04',
      coordinates: '78°55′00″N 11°56′00″E',
      sector: 'Ny-Ålesund Observatory',
      status: 'OPERATIONAL',
      crewCount: '12 Crew',
      powerLevel: '520 kW (96%)',
      extTemp: '-18.4°C',
      commStatus: 'Optical Satellite Array',
    }
  ];

  // Filtering Logic
  const filteredStations = stations.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.sector.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ? true : st.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Counts
  const totalCount = stations.length;
  const operationalCount = stations.filter((s) => s.status === 'OPERATIONAL').length;
  const warningCount = stations.filter((s) => s.status === 'WARNING').length;
  const criticalCount = stations.filter((s) => s.status === 'CRITICAL').length;

  return (
    <div className="space-y-6">
      {/* Header Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Radio className="w-4 h-4" />
            <span>Polar Fleet Management</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 mt-1">Research Stations Registry</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time telemetry inventory of active and automated polar research stations.
          </p>
        </div>

        <button
          onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs font-mono rounded-xl transition-colors self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* KPI Counts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Stations"
          value={totalCount}
          statusText="Fleet Tracked"
          statusType="info"
          icon={Radio}
        />
        <StatCard
          title="Operational"
          value={operationalCount}
          statusText="Nominal Telemetry"
          statusType="normal"
          icon={ShieldCheck}
        />
        <StatCard
          title="Warnings Active"
          value={warningCount}
          statusText="Maintenance Needed"
          statusType="warning"
          icon={AlertTriangle}
        />
        <StatCard
          title="Critical Status"
          value={criticalCount}
          statusText="Immediate Action"
          statusType="critical"
          icon={ShieldAlert}
        />
      </div>

      {/* Controls Bar: Search & Status Filters */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Bar Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by station name, code, or sector..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER:</span>
          </span>

          {['ALL', 'OPERATIONAL', 'WARNING', 'CRITICAL'].map((filterKey) => (
            <button
              key={filterKey}
              onClick={() => setStatusFilter(filterKey)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                statusFilter === filterKey
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {filterKey}
            </button>
          ))}
        </div>
      </div>

      {/* Stations Cards Grid */}
      {filteredStations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <StationCard
              key={station.id}
              id={station.id}
              name={station.name}
              code={station.code}
              coordinates={station.coordinates}
              sector={station.sector}
              status={station.status}
              crewCount={station.crewCount}
              powerLevel={station.powerLevel}
              extTemp={station.extTemp}
              commStatus={station.commStatus}
            />
          ))}
        </div>
      ) : (
        /* Zero Match Empty State */
        <div className="p-12 border border-dashed border-slate-800 bg-slate-900/30 rounded-2xl text-center space-y-3">
          <div className="inline-flex p-3 bg-slate-800 text-slate-400 rounded-full">
            <Radio className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-200">No Stations Found</h3>
          <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
            No Antarctic stations match the search query "{searchTerm}" under filter "{statusFilter}".
          </p>
          <button
            onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }}
            className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold rounded-lg hover:bg-cyan-500/20 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
