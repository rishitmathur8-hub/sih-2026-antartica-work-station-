import React, { useState, useRef, useEffect } from 'react';
import { getSimulation } from '../services/simulationApi.js';
import { useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Radio,
  Wifi,
  User,
  Clock,
  Save,
  Trash2,
  Zap,
  Flame,
  Droplets,
  BatteryCharging,
  Thermometer,
  Cpu,
  ShieldAlert,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  FileText,
  CheckCircle2,
  SlidersHorizontal,
  Play,
  AlertTriangle
} from 'lucide-react';

import TelemetryCard from '../components/TelemetryCard.jsx';
import SyncStatusPanel from '../components/SyncStatusPanel.jsx';
import AlertItem from '../components/AlertItem.jsx';


export default function StationDashboardPage() {

  const navigate = useNavigate();

  const formRef = useRef(null);


  // ==========================================
  // POLARIS BACKEND STATES
  // ==========================================

  const [simulationData, setSimulationData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [backendError, setBackendError] = useState(null);


  // ==========================================
  // SIMULATION SCENARIOS
  // ==========================================

  const [selectedScenario, setSelectedScenario] =
    useState('normal');


  const [scenarioDropdownOpen, setScenarioDropdownOpen] =
    useState(false);


  const scenarios = {

    normal: {

      name: 'Normal Operations',

      temperature: -35,

      windSpeed: 40,

      primaryGeneratorFailed: false,

      backupGeneratorFailed: false

    },


    severeWeather: {

      name: 'Severe Weather',

      temperature: -60,

      windSpeed: 100,

      primaryGeneratorFailed: false,

      backupGeneratorFailed: false

    },


    primaryFailure: {

      name: 'Primary Generator Failure',

      temperature: -35,

      windSpeed: 40,

      primaryGeneratorFailed: true,

      backupGeneratorFailed: false

    },


    totalFailure: {

      name: 'Total Generator Failure',

      temperature: -35,

      windSpeed: 40,

      primaryGeneratorFailed: true,

      backupGeneratorFailed: true

    }

  };


  // ==========================================
  // DIGITAL TWIN SIMULATION CONTROLS
  // ==========================================

  const [temperature, setTemperature] =
    useState(-35);


  const [windSpeed, setWindSpeed] =
    useState(40);


  const [
    primaryGeneratorFailed,
    setPrimaryGeneratorFailed
  ] = useState(false);


  const [
    backupGeneratorFailed,
    setBackupGeneratorFailed
  ] = useState(false);


  // ==========================================
  // OFFLINE & SYNC STATES
  // ==========================================

  const [isOnline, setIsOnline] =
    useState(true);


  const [lastSyncTime, setLastSyncTime] =
    useState('2026-08-31 09:15 UTC');


  const [toastMessage, setToastMessage] =
    useState(null);


  // ==========================================
  // FORM INPUT STATES
  // ==========================================

  const [parameter, setParameter] =
    useState('Fuel Level');


  const [value, setValue] =
    useState('');


  const [unit, setUnit] =
    useState('%');


  const [notes, setNotes] =
    useState('');


  // ==========================================
  // RECENT READINGS
  // ==========================================

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


  // ==========================================
  // FETCH SIMULATION
  // ==========================================

  const fetchSimulation = async (

    temp = temperature,

    wind = windSpeed,

    primaryFailed = primaryGeneratorFailed,

    backupFailed = backupGeneratorFailed

  ) => {

    try {

      setLoading(true);


      const data = await getSimulation(

        temp,

        wind,

        primaryFailed,

        backupFailed

      );


      console.log(
        'POLARIS Backend Data:',
        data
      );


      setSimulationData(data);


      setBackendError(null);


    } catch (error) {

      console.error(
        'Backend error:',
        error
      );


      setBackendError(
        'Unable to connect to POLARIS backend'
      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // INITIAL SIMULATION
  // ==========================================

  useEffect(() => {

    fetchSimulation();

  }, []);


  // ==========================================
  // RUN DIGITAL TWIN
  // ==========================================

  const handleRunSimulation = () => {

    fetchSimulation(

      temperature,

      windSpeed,

      primaryGeneratorFailed,

      backupGeneratorFailed

    );

  };


  // ==========================================
  // SCENARIO SELECTOR
  // ==========================================

  const handleScenarioChange = (scenarioKey) => {

    setSelectedScenario(scenarioKey);


    const scenario = scenarios[scenarioKey];


    setTemperature(
      scenario.temperature
    );


    setWindSpeed(
      scenario.windSpeed
    );


    setPrimaryGeneratorFailed(
      scenario.primaryGeneratorFailed
    );


    setBackupGeneratorFailed(
      scenario.backupGeneratorFailed
    );


    setScenarioDropdownOpen(false);

  };


  // ==========================================
  // MAITRI ACTIVE ALERTS
  // ==========================================

  const activeAlerts = [

    {

      id: 'ALT-103',

      severity: 'warning',

      status: 'ACTIVE',

      title:
        'Blizzard Weather Alert — High Wind Velocity',

      station:
        'Maitri Research Station',

      time:
        '42 mins ago',

      description:
        'Anemometer measured sustained wind gusts exceeding 84 km/h. Outdoor EVA research suspended.'

    }

  ];


  // ==========================================
  // PARAMETER CHANGE
  // ==========================================

  const handleParameterChange = (newParam) => {

    setParameter(newParam);


    if (

      newParam === 'Fuel Level' ||
      newParam === 'Water Level' ||
      newParam === 'Oxygen Level'

    ) {

      setUnit('%');

    }


    else if (

      newParam === 'Temperature'

    ) {

      setUnit('°C');

    }


    else if (

      newParam === 'Generator Reading'

    ) {

      setUnit('kW');

    }

  };


  // ==========================================
  // SAVE TELEMETRY READING
  // ==========================================

  const handleSaveReading = (e) => {

    e.preventDefault();


    if (!value) return;


    const now = new Date();


    const formattedTime =

      `${String(now.getHours()).padStart(2, '0')}:` +

      `${String(now.getMinutes()).padStart(2, '0')} UTC`;


    const newReading = {

      id: Date.now(),

      time: formattedTime,

      parameter,

      value,

      unit,

      operator: 'OP-MAITRI-402',

      syncStatus:

        isOnline

          ? 'SYNCED'

          : 'PENDING SYNC'

    };


    setReadings(

      [newReading, ...readings]

    );


    setToastMessage(

      `Reading logged successfully (${parameter}: ${value} ${unit})!`

    );


    setTimeout(

      () => setToastMessage(null),

      3500

    );


    setValue('');

    setNotes('');

  };


  // ==========================================
  // CLEAR FORM
  // ==========================================

  const handleClearForm = () => {

    setValue('');

    setNotes('');

  };


  // ==========================================
  // TOGGLE ONLINE/OFFLINE
  // ==========================================

  const handleToggleOnline = () => {

    setIsOnline(!isOnline);

  };


  // ==========================================
  // SYNC DATA
  // ==========================================

  const handleSyncPending = () => {

    const updatedReadings = readings.map(

      (r) => ({

        ...r,

        syncStatus: 'SYNCED'

      })

    );


    setReadings(updatedReadings);


    const now = new Date();


    const formattedSync =

      `2026-08-31 ` +

      `${String(now.getHours()).padStart(2, '0')}:` +

      `${String(now.getMinutes()).padStart(2, '0')} UTC`;


    setLastSyncTime(formattedSync);


    setToastMessage(

      'All pending local telemetry records successfully synchronized!'

    );


    setTimeout(

      () => setToastMessage(null),

      3500

    );

  };


  // ==========================================
  // PENDING RECORD COUNT
  // ==========================================

  const pendingCount = readings.filter(

    (r) =>

      r.syncStatus === 'PENDING SYNC'

  ).length;


  // ==========================================
  // RETURN UI
  // ==========================================

  return (

    <div className="space-y-6">


      {/* =====================================
          DIGITAL TWIN SIMULATION CONTROLS
      ===================================== */}

      <div className="bg-slate-900/80 border border-cyan-900 p-5 rounded-2xl">


        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 border-b border-slate-800 pb-4">


          <div>


            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold">


              <SlidersHorizontal className="w-5 h-5" />


              <span>

                POLARIS DIGITAL TWIN CONTROL

              </span>


            </div>


            <p className="text-xs text-slate-500 font-mono mt-1">

              Configure Antarctic environmental and power system conditions

            </p>


          </div>


          {/* SIMULATION STATUS */}

          <div

            className={`px-3 py-1 rounded-lg text-xs font-mono border flex items-center gap-2 ${

              loading

                ? 'text-yellow-400 border-yellow-800 bg-yellow-950/30'

                : 'text-emerald-400 border-emerald-800 bg-emerald-950/30'

            }`}

          >


            <span

              className={`w-2 h-2 rounded-full ${

                loading

                  ? 'bg-yellow-400 animate-pulse'

                  : 'bg-emerald-400'

              }`}

            />


            {

              loading

                ? 'SIMULATION RUNNING'

                : 'SIMULATION READY'

            }


          </div>


        </div>


        {/* CONTROLS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">


          {/* =====================================
              CUSTOM SCENARIO SELECTOR
          ===================================== */}

          <div className="relative">


            <label className="block text-xs font-mono text-slate-400 uppercase mb-2">

              Simulation Scenario

            </label>


            {/* DROPDOWN BUTTON */}

            <button

              type="button"

              onClick={() =>

                setScenarioDropdownOpen(
                  !scenarioDropdownOpen
                )

              }

              className={`

                w-full
                flex
                items-center
                justify-between
                bg-slate-950
                px-4
                py-2.5
                text-cyan-400
                font-mono
                text-sm
                border
                transition-all
                duration-200
                hover:border-cyan-500
                focus:outline-none

                ${

                  scenarioDropdownOpen

                    ? 'border-cyan-500 rounded-t-xl'

                    : 'border-cyan-900 rounded-xl'

                }

              `}

            >


              <span className="truncate">

                {scenarios[selectedScenario].name}

              </span>


              <ChevronDown

                className={`

                  w-4
                  h-4
                  shrink-0
                  ml-2
                  transition-transform
                  duration-200

                  ${

                    scenarioDropdownOpen

                      ? 'rotate-180'

                      : ''

                  }

                `}

              />


            </button>


            {/* CUSTOM DROPDOWN MENU */}

            {

              scenarioDropdownOpen && (

                <div

                  className="

                    absolute
                    top-full
                    left-0
                    right-0
                    z-50

                    bg-slate-950

                    border
                    border-cyan-500
                    border-t-0

                    rounded-b-xl

                    overflow-hidden

                    shadow-2xl
                    shadow-black/60

                  "

                >


                  {

                    Object.entries(scenarios).map(

                      ([key, scenario]) => (

                        <button

                          key={key}

                          type="button"

                          onClick={() =>

                            handleScenarioChange(key)

                          }

                          className={`

                            w-full
                            text-left

                            px-4
                            py-3

                            font-mono
                            text-sm

                            transition-all
                            duration-150

                            border-b
                            border-slate-800

                            last:border-b-0

                            ${

                              selectedScenario === key

                                ? 'bg-cyan-500/20 text-cyan-300'

                                : 'text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400'

                            }

                          `}

                        >


                          <div className="flex items-center justify-between">


                            <span>

                              {scenario.name}

                            </span>


                            {

                              selectedScenario === key && (

                                <CheckCircle2 className="w-4 h-4 text-cyan-400" />

                              )

                            }


                          </div>


                        </button>

                      )

                    )

                  }


                </div>

              )

            }


          </div>


          {/* =====================================
              TEMPERATURE
          ===================================== */}

          <div>


            <label className="block text-xs font-mono text-slate-400 uppercase mb-2">

              Temperature (°C)

            </label>


            <input

              type="number"

              value={temperature}

              onChange={(e) =>

                setTemperature(
                  Number(e.target.value)
                )

              }

              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-cyan-400 font-mono font-bold focus:outline-none focus:border-cyan-500"

            />


          </div>


          {/* =====================================
              WIND SPEED
          ===================================== */}

          <div>


            <label className="block text-xs font-mono text-slate-400 uppercase mb-2">

              Wind Speed (km/h)

            </label>


            <input

              type="number"

              min="0"

              value={windSpeed}

              onChange={(e) =>

                setWindSpeed(
                  Number(e.target.value)
                )

              }

              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-cyan-400 font-mono font-bold focus:outline-none focus:border-cyan-500"

            />


          </div>


          {/* =====================================
              PRIMARY GENERATOR
          ===================================== */}

          <div className="flex flex-col justify-end">


            <label className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 cursor-pointer hover:border-rose-700 transition-colors">


              <input

                type="checkbox"

                checked={primaryGeneratorFailed}

                onChange={(e) =>

                  setPrimaryGeneratorFailed(
                    e.target.checked
                  )

                }

                className="accent-rose-500 w-4 h-4"

              />


              <span className="text-xs font-mono text-slate-300">

                Primary Generator Failure

              </span>


            </label>


          </div>


          {/* =====================================
              BACKUP GENERATOR
          ===================================== */}

          <div className="flex flex-col justify-end">


            <label className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 cursor-pointer hover:border-amber-700 transition-colors">


              <input

                type="checkbox"

                checked={backupGeneratorFailed}

                onChange={(e) =>

                  setBackupGeneratorFailed(
                    e.target.checked
                  )

                }

                className="accent-amber-500 w-4 h-4"

              />


              <span className="text-xs font-mono text-slate-300">

                Backup Generator Failure

              </span>


            </label>


          </div>


        </div>


        {/* RUN BUTTON */}

        <div className="mt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">


          <button

            onClick={handleRunSimulation}

            disabled={loading}

            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${

              loading

                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'

                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'

            }`}

          >


            <Play className="w-4 h-4" />


            <span>

              {

                loading

                  ? 'Running Simulation...'

                  : 'Run Simulation'

              }

            </span>


          </button>


          {

            (primaryGeneratorFailed ||

              backupGeneratorFailed)

            && (

              <div

                className={`flex items-center gap-2 text-xs font-mono ${

                  primaryGeneratorFailed &&
                  backupGeneratorFailed

                    ? 'text-red-400'

                    : 'text-amber-400'

                }`}

              >


                <AlertTriangle className="w-4 h-4" />


                <span>

                  {

                    primaryGeneratorFailed &&
                    backupGeneratorFailed

                      ? 'CRITICAL: Total generator failure configured'

                      : 'WARNING: Generator failure configured'

                  }

                </span>


              </div>

            )

          }


        </div>


      </div>


      {/* BACKEND ERROR */}

      {

        backendError && (

          <div className="bg-rose-950/30 border border-rose-900 rounded-xl p-4 flex items-center gap-3">


            <ShieldAlert className="w-5 h-5 text-rose-400" />


            <div>


              <p className="text-rose-400 font-bold text-sm">

                POLARIS Backend Connection Error

              </p>


              <p className="text-xs text-rose-300 font-mono mt-1">

                {backendError}

              </p>


            </div>


          </div>

        )

      }


      {/* TOAST */}

      {

        toastMessage && (

          <div className="fixed top-20 right-6 z-50 p-4 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-xl shadow-2xl flex items-center gap-3 font-mono text-xs">


            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />


            <span>

              {toastMessage}

            </span>


          </div>

        )

      }


      {/* STATION HEADER */}

      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">


        <div>


          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">


            <LayoutDashboard className="w-4 h-4" />


            <span>

              Local Station Operator Console

            </span>


          </div>


          <div className="flex items-center gap-3 flex-wrap">


            <h1 className="text-2xl font-extrabold text-slate-100">

              Maitri Research Station

            </h1>


            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">

              IND-MTR-01

            </span>


            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30">

              DEMO OPERATOR MODE

            </span>


          </div>


          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-2 flex-wrap">


            <span className="flex items-center gap-1">

              <User className="w-3.5 h-3.5 text-cyan-400" />

              OP-MAITRI-402 (Duty Commander)

            </span>


            <span className="flex items-center gap-1">

              <Wifi className="w-3.5 h-3.5 text-cyan-400" />

              INSAT-4B Primary (99.8%)

            </span>


            <span className="flex items-center gap-1">

              <Clock className="w-3.5 h-3.5 text-slate-500" />

              2026-08-31 09:22 UTC

            </span>


          </div>


        </div>


        <div

          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold shrink-0 ${

            isOnline

              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'

              : 'bg-rose-950/80 text-rose-400 border-rose-800'

          }`}

        >


          <span

            className={`w-2 h-2 rounded-full ${

              isOnline

                ? 'bg-emerald-400 animate-ping'

                : 'bg-rose-400'

            }`}

          />


          <span>

            {

              isOnline

                ? 'ONLINE / SYNCED'

                : 'OFFLINE MODE'

            }

          </span>


        </div>


      </div>


      {/* TELEMETRY CARDS */}

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">


        <TelemetryCard
          title="Internal Temp"
          value="21.8"
          unit="°C"
          status="NORMAL"
          lastUpdated="1 min ago"
          icon={Thermometer}
        />


        <TelemetryCard

          title="External Temp"

          value={
            simulationData?.environment?.temperature
            ?? "--"
          }

          unit="°C"

          status={
            simulationData?.environment?.temperature_condition ===
            "SEVERE"

              ? "WARNING"

              : "NORMAL"
          }

          lastUpdated="Live"

          icon={Thermometer}

        />


        <TelemetryCard
          title="Oxygen Level"
          value="98"
          unit="%"
          status="NORMAL"
          lastUpdated="2 mins ago"
          icon={BatteryCharging}
        />


        <TelemetryCard
          title="Water Reservoir"
          value="82"
          unit="%"
          status="NORMAL"
          lastUpdated="2 mins ago"
          icon={Droplets}
        />


        <TelemetryCard
          title="Fuel Reserve"
          value="88"
          unit="%"
          status="NORMAL"
          lastUpdated="3 mins ago"
          icon={Flame}
        />


        <TelemetryCard

          title="Power Load"

          value={
            simulationData?.energy?.total_power_kw
            ?? "--"
          }

          unit="kW"

          status="NORMAL"

          lastUpdated="Live"

          icon={Zap}

        />


        <TelemetryCard

          title="Generator Grid"

          value={
            simulationData?.power
              ?.primary_generator_available

              ? "Primary: OK"

              : "Primary: FAILED"
          }

          unit=""

          status={
            simulationData?.power
              ?.primary_generator_available

              ? "NORMAL"

              : "WARNING"
          }

          lastUpdated="Live"

          icon={Cpu}

        />


        <TelemetryCard

          title="Wind Speed"

          value={
            simulationData?.environment?.wind_speed
            ?? "--"
          }

          unit="km/h"

          status={
            simulationData?.environment?.wind_condition ===
            "HIGH"

              ? "WARNING"

              : "NORMAL"
          }

          lastUpdated="Live"

          icon={Radio}

        />


      </div>


      {/* DIGITAL TWIN RISK ANALYSIS */}

      {

        simulationData?.risk && (

          <div

            className={`border p-5 rounded-2xl ${

              simulationData.risk.risk_level ===
              'CRITICAL'

                ? 'bg-red-950/40 border-red-600'

                : simulationData.risk.risk_level ===
                  'HIGH'

                  ? 'bg-rose-950/20 border-rose-800'

                  : simulationData.risk.risk_level ===
                    'MEDIUM'

                    ? 'bg-amber-950/20 border-amber-800'

                    : 'bg-emerald-950/20 border-emerald-800'

            }`}

          >


            <div className="flex flex-col md:flex-row justify-between gap-4">


              <div>


                <div className="flex items-center gap-2 font-mono text-sm font-bold">


                  <ShieldAlert className="w-5 h-5 text-cyan-400" />


                  <span className="text-slate-100">

                    POLARIS RISK ANALYSIS

                  </span>


                </div>


                <p className="text-xs font-mono text-slate-500 mt-2">

                  Digital Twin predictive risk assessment

                </p>


              </div>


              <div className="flex gap-6">


                <div>


                  <p className="text-[10px] font-mono text-slate-500 uppercase">

                    Risk Level

                  </p>


                  <p

                    className={`text-xl font-bold mt-1 ${

                      simulationData.risk.risk_level ===
                      'CRITICAL'

                        ? 'text-red-500'

                        : simulationData.risk.risk_level ===
                          'HIGH'

                          ? 'text-rose-400'

                          : simulationData.risk.risk_level ===
                            'MEDIUM'

                            ? 'text-amber-400'

                            : 'text-emerald-400'

                    }`}

                  >

                    {simulationData.risk.risk_level}

                  </p>


                </div>


                <div>


                  <p className="text-[10px] font-mono text-slate-500 uppercase">

                    Risk Score

                  </p>


                  <p className="text-xl font-bold text-cyan-400 mt-1">

                    {simulationData.risk.risk_score}

                  </p>


                </div>


              </div>


            </div>


            <div className="mt-4 pt-4 border-t border-slate-800">


              <p className="text-xs font-mono text-slate-400 mb-2">

                RISK FACTORS

              </p>


              <div className="space-y-1">


                {

                  simulationData.risk.risk_reasons.map(

                    (reason, index) => (

                      <div

                        key={index}

                        className="flex items-center gap-2 text-xs font-mono text-slate-300"

                      >


                        <span className="text-cyan-400">

                          ›

                        </span>


                        {reason}


                      </div>

                    )

                  )

                }


              </div>


            </div>


          </div>

        )

      }


      {/* SYNC PANEL */}

      <SyncStatusPanel

        isOnline={isOnline}

        pendingCount={pendingCount}

        lastSyncTime={lastSyncTime}

        onToggleOnline={handleToggleOnline}

        onSyncPending={handleSyncPending}

      />


      {/* MANUAL TELEMETRY + QUICK ACTIONS */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


        <div

          ref={formRef}

          className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4"

        >


          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold border-b border-slate-800 pb-3">


            <PlusCircle className="w-4 h-4 text-cyan-400" />


            <span>

              Log Manual Telemetry Reading

            </span>


          </div>


          <form

            onSubmit={handleSaveReading}

            className="space-y-4"

          >


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">


              <div>


                <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">

                  Select Parameter

                </label>


                <select

                  value={parameter}

                  onChange={(e) =>

                    handleParameterChange(
                      e.target.value
                    )

                  }

                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"

                >

                  <option value="Fuel Level">

                    Fuel Level

                  </option>

                  <option value="Water Level">

                    Water Level

                  </option>

                  <option value="Oxygen Level">

                    Oxygen Level

                  </option>

                  <option value="Generator Reading">

                    Generator Reading

                  </option>

                  <option value="Temperature">

                    Temperature

                  </option>

                </select>


              </div>


              <div>


                <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">

                  Measured Value

                </label>


                <input

                  type="number"

                  step="0.1"

                  value={value}

                  onChange={(e) =>

                    setValue(
                      e.target.value
                    )

                  }

                  placeholder="e.g. 88.5"

                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"

                  required

                />


              </div>


              <div>


                <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">

                  Unit

                </label>


                <input

                  type="text"

                  value={unit}

                  onChange={(e) =>

                    setUnit(
                      e.target.value
                    )

                  }

                  placeholder="%, L, °C, kW"

                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"

                  required

                />


              </div>


            </div>


            <div>


              <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">

                Operator Diagnostic Notes (Optional)

              </label>


              <textarea

                value={notes}

                onChange={(e) =>

                  setNotes(
                    e.target.value
                  )

                }

                placeholder="Log secondary observations or sensor calibration notes..."

                rows={2}

                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"

              />


            </div>


            <div className="flex items-center gap-3 pt-1">


              <button

                type="submit"

                className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"

              >


                <Save className="w-4 h-4" />


                <span>

                  Save Telemetry Reading

                </span>


              </button>


              <button

                type="button"

                onClick={handleClearForm}

                className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-xl text-xs font-mono transition-colors"

              >


                <Trash2 className="w-3.5 h-3.5" />


                <span>

                  Clear Form

                </span>


              </button>


            </div>


          </form>


        </div>


        {/* QUICK ACTIONS */}

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">


          <h2 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">


            <Zap className="w-4 h-4 text-cyan-400" />


            <span>

              Station Quick Actions

            </span>


          </h2>


          <div className="space-y-2.5">


            <button

              onClick={() =>

                formRef.current?.scrollIntoView({

                  behavior: 'smooth'

                })

              }

              className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs font-mono text-slate-200 transition-colors group"

            >


              <div className="flex items-center gap-3">


                <PlusCircle className="w-4 h-4 text-cyan-400" />


                <span>

                  Log New Reading

                </span>


              </div>


              <ChevronRight className="w-4 h-4 text-slate-500" />


            </button>


            <button

              onClick={() =>

                navigate('/alerts')

              }

              className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs font-mono text-slate-200"

            >


              <div className="flex items-center gap-3">


                <ShieldAlert className="w-4 h-4 text-rose-400" />


                <span>

                  View System Alerts

                </span>


              </div>


              <ChevronRight className="w-4 h-4 text-slate-500" />


            </button>


            <button

              onClick={() =>

                navigate('/station/maitri')

              }

              className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs font-mono text-slate-200"

            >


              <div className="flex items-center gap-3">


                <Radio className="w-4 h-4 text-emerald-400" />


                <span>

                  Maitri Station Details

                </span>


              </div>


              <ChevronRight className="w-4 h-4 text-slate-500" />


            </button>


            <button

              onClick={() =>

                navigate('/reports')

              }

              className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs font-mono text-slate-200"

            >


              <div className="flex items-center gap-3">


                <FileText className="w-4 h-4 text-amber-400" />


                <span>

                  View Station Reports

                </span>


              </div>


              <ChevronRight className="w-4 h-4 text-slate-500" />


            </button>


          </div>


        </div>


      </div>


      {/* RECENT READINGS TABLE */}

      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">


        <div className="flex justify-between items-center">


          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">


            <Clock className="w-4 h-4 text-cyan-400" />


            <span>

              Recent Station Logged Readings

            </span>


          </h2>


          <span className="text-xs font-mono text-slate-400">

            {readings.length} Records In Local Memory

          </span>


        </div>


        <div className="overflow-x-auto">


          <table className="w-full text-left text-xs font-mono">


            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase">


              <tr>

                <th className="p-3">

                  Time

                </th>

                <th className="p-3">

                  Parameter

                </th>

                <th className="p-3">

                  Value

                </th>

                <th className="p-3">

                  Unit

                </th>

                <th className="p-3">

                  Operator

                </th>

                <th className="p-3 text-right">

                  Sync Status

                </th>

              </tr>


            </thead>


            <tbody className="divide-y divide-slate-800 text-slate-200">


              {

                readings.map((r) => (

                  <tr

                    key={r.id}

                    className="hover:bg-slate-800/40 transition-colors"

                  >


                    <td className="p-3 text-slate-400">

                      {r.time}

                    </td>


                    <td className="p-3 font-bold text-slate-100">

                      {r.parameter}

                    </td>


                    <td className="p-3 text-cyan-400 font-bold">

                      {r.value}

                    </td>


                    <td className="p-3 text-slate-400">

                      {r.unit}

                    </td>


                    <td className="p-3 text-slate-300">

                      {r.operator}

                    </td>


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

                ))

              }


            </tbody>


          </table>


        </div>


      </div>


      {/* ACTIVE ALERTS */}

      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">


        <div className="flex justify-between items-center">


          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">


            <ShieldAlert className="w-4 h-4 text-rose-400" />


            <span>

              Maitri Active Station Alarms

            </span>


          </h2>


          <button

            onClick={() =>

              navigate('/alerts')

            }

            className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"

          >


            <span>

              View All Station Alerts

            </span>


            <ChevronRight className="w-3.5 h-3.5" />


          </button>


        </div>


        <div className="space-y-3">


          {

            activeAlerts.map((alert) => (

              <AlertItem

                key={alert.id}

                severity={alert.severity}

                title={alert.title}

                station={alert.station}

                time={alert.time}

                description={alert.description}

                status={alert.status}

                onClick={() =>

                  navigate('/alerts')

                }

              />

            ))

          }


        </div>


      </div>


    </div>

  );

}