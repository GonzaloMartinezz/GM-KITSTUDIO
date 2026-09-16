import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Video,
  Phone,
  Truck,
  CheckCircle2,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  ArrowRight,
  Edit3,
  TrendingUp
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import AdminCardEditModal from '../../components/admin/modals/AdminCardEditModal';

const AdminVentas = () => {
  const {
    scheduledDispatches,
    addDispatch,
    updateDispatch,
    deleteDispatch,
    stats,
    timeframe,
  } = useAdminData();

  const [selectedDay, setSelectedDay] = useState('14 Sep');
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('dispatch');
  const [selectedItem, setSelectedItem] = useState(null);

  // 7 Calendar days selector matching reference image 1
  const daysList = [
    { dayNumber: 14, label: '14 Sep', name: 'Lun', active: true },
    { dayNumber: 15, label: '15 Sep', name: 'Mar', active: false },
    { dayNumber: 16, label: '16 Sep', name: 'Mié', active: false },
    { dayNumber: 17, label: '17 Sep', name: 'Jue', active: false },
    { dayNumber: 18, label: '18 Sep', name: 'Vie', active: false },
    { dayNumber: 19, label: '19 Sep', name: 'Sáb', active: false },
    { dayNumber: 20, label: '20 Sep', name: 'Dom', active: false },
  ];

  // Timeframe and interactive datasets for daily sales curve
  const [chartRange, setChartRange] = useState('30 días');
  const [activePointIndex, setActivePointIndex] = useState(8);

  // Smooth natural Catmull-Rom spline generator
  const getSmoothSvgPath = (pts) => {
    if (!pts || pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x},${pts[0].y}`;

    let path = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) * 0.2;
      const cp1y = p1.y + (p2.y - p0.y) * 0.2;
      const cp2x = p2.x - (p3.x - p1.x) * 0.2;
      const cp2y = p2.y - (p3.y - p1.y) * 0.2;

      path += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return path;
  };

  const salesDatasets = {
    '30 días': {
      label: 'Últimos 30 días',
      totalKits: 0,
      avgKits: 0,
      peakKits: 0,
      growth: '0%',
      points: [
        { date: '01 Sep', dayName: 'Lun', kits: 0 },
        { date: '03 Sep', dayName: 'Mié', kits: 0 },
        { date: '05 Sep', dayName: 'Vie', kits: 0 },
        { date: '07 Sep', dayName: 'Dom', kits: 0 },
        { date: '09 Sep', dayName: 'Mar', kits: 0 },
        { date: '11 Sep', dayName: 'Jue', kits: 0 },
        { date: '12 Sep', dayName: 'Vie', kits: 0 },
        { date: '13 Sep', dayName: 'Sáb', kits: 0 },
        { date: '14 Sep', dayName: 'Lun', kits: 0 },
        { date: '15 Sep', dayName: 'Mar', kits: 0 },
        { date: '17 Sep', dayName: 'Jue', kits: 0 },
        { date: '19 Sep', dayName: 'Sáb', kits: 0 },
        { date: '21 Sep', dayName: 'Lun', kits: 0 },
        { date: '23 Sep', dayName: 'Mié', kits: 0 },
        { date: '25 Sep', dayName: 'Vie', kits: 0 },
        { date: '28 Sep', dayName: 'Lun', kits: 0 },
      ],
    },
    '14 días': {
      label: 'Últimos 14 días',
      totalKits: 0,
      avgKits: 0,
      peakKits: 0,
      growth: '0%',
      points: [
        { date: '11 Sep', dayName: 'Jue', kits: 0 },
        { date: '12 Sep', dayName: 'Vie', kits: 0 },
        { date: '13 Sep', dayName: 'Sáb', kits: 0 },
        { date: '14 Sep', dayName: 'Lun', kits: 0 },
        { date: '15 Sep', dayName: 'Mar', kits: 0 },
        { date: '17 Sep', dayName: 'Jue', kits: 0 },
        { date: '19 Sep', dayName: 'Sáb', kits: 0 },
        { date: '21 Sep', dayName: 'Lun', kits: 0 },
        { date: '23 Sep', dayName: 'Mié', kits: 0 },
        { date: '25 Sep', dayName: 'Vie', kits: 0 },
      ],
    },
    '7 días': {
      label: 'Semana actual',
      totalKits: 0,
      avgKits: 0,
      peakKits: 0,
      growth: '0%',
      points: [
        { date: '14 Sep', dayName: 'Lun', kits: 0 },
        { date: '15 Sep', dayName: 'Mar', kits: 0 },
        { date: '16 Sep', dayName: 'Mié', kits: 0 },
        { date: '17 Sep', dayName: 'Jue', kits: 0 },
        { date: '18 Sep', dayName: 'Vie', kits: 0 },
        { date: '19 Sep', dayName: 'Sáb', kits: 0 },
        { date: '20 Sep', dayName: 'Dom', kits: 0 },
      ],
    },
  };

  const handleOpenEdit = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full font-geist flex flex-col relative pb-12">

      {/* Main Grid: Left Section (68% width) + Right Sidebar (32% width) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">

        {/* === LEFT COLUMN: DASHBOARD METRICS & LINE CURVE (col-span-8) === */}
        <div className="xl:col-span-8 flex flex-col gap-6">

          {/* Greeting Header matching reference image 1 */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                Buen día, <span className="text-[#1E5A9C]">Gonzalo</span>
              </h1>
              <p className="text-xs text-[#64748B] mt-0.5">
                Turno de Despacho y Logística: <strong>08:00 am - 06:00 pm</strong> (Tucumán y NOA)
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#1E5A9C] bg-[#1E5A9C]/10 px-2.5 py-1 rounded-full w-fit">
              Kit Odontológico Completo
            </span>
          </div>

          {/* Top 3 KPI Cards matching reference image 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Card 1: Primary Indigo/Blue Card (Ventas de Hoy) */}
            <div
              onClick={() => handleOpenEdit('stat', { id: 'sales_today', title: 'Ventas de Hoy', value: '0', unit: 'Kits', change: '0%', changeDesc: 'a iniciar hoy' })}
              className="bg-[#2644B2] text-white rounded-2xl p-5 shadow-lg flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform relative group"
              title="Toca para modificar"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-white/80">Ventas de Hoy</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ChevronRight size={14} className="text-white" />
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-2xl font-extrabold tracking-tight">
                    0 <span className="text-xs font-normal text-white/80">/ 20 hoy</span>
                  </div>
                  <span className="text-xs font-bold text-white/90">0%</span>
                </div>

                {/* Progress bar with glowing indicator */}
                <div className="w-full h-2 bg-black/25 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: '0%' }} />
                </div>
              </div>
            </div>

            {/* Card 2: White Card (Ventas del Mes) */}
            <div
              onClick={() => handleOpenEdit('stat', { id: 'sales_month', title: 'Ventas del Mes', value: '0', unit: 'Kits', change: '0%', changeDesc: 'a iniciar el mes' })}
              className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between cursor-pointer hover:border-[#1E5A9C]/40 hover:shadow-md transition-all group"
              title="Toca para modificar"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#64748B]">Ventas del Mes</span>
                <div className="w-6 h-6 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
                  <ChevronRight size={14} />
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                    0 <span className="text-xs font-normal text-[#64748B]">/ 520 en Sep</span>
                  </div>
                  <span className="text-xs font-bold text-[#2644B2]">0%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2644B2] rounded-full transition-all duration-500" style={{ width: '0%' }} />
                </div>
              </div>
            </div>

            {/* Card 3: White Card (Efectividad de Cobro) */}
            <div
              onClick={() => handleOpenEdit('stat', { id: 'retention', title: 'Efectividad de Cobro', value: '0%', unit: 'Cobranza', change: '0%', changeDesc: 'sin deudas pendientes' })}
              className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between cursor-pointer hover:border-[#1E5A9C]/40 hover:shadow-md transition-all group"
              title="Toca para modificar"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#64748B]">Efectividad de Cobro</span>
                <div className="w-6 h-6 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
                  <ChevronRight size={14} />
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                    0% <span className="text-xs font-normal text-[#64748B]">al día</span>
                  </div>
                  <span className="text-xs font-bold text-[#2644B2]">100%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2644B2] rounded-full transition-all duration-500" style={{ width: '0%' }} />
                </div>
              </div>
            </div>

          </div>

          {/* ── Middle Chart Card: Promedio Diario de Ventas ── */}
          {(() => {
            const currentSalesData = salesDatasets[chartRange] || salesDatasets['30 días'];
            const safeActiveIndex = Math.min(activePointIndex, currentSalesData.points.length - 1);

            // Computed 800x220 canvas coordinates
            const computedPoints = currentSalesData.points.map((pt, i, arr) => {
              const x = 50 + (i / (arr.length - 1)) * 710;
              const y = 24 + 150 * (1 - pt.kits / 30);
              return { ...pt, x, y, revenue: pt.kits * 9500 };
            });

            const activePoint = computedPoints[safeActiveIndex] || computedPoints[0];
            const splineLinePath = getSmoothSvgPath(computedPoints);
            const splineAreaPath = computedPoints.length > 0
              ? `${splineLinePath} L ${computedPoints[computedPoints.length - 1].x.toFixed(1)},175 L ${computedPoints[0].x.toFixed(1)},175 Z`
              : '';

            return (
              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs flex flex-col justify-between relative overflow-hidden font-geist">
                {/* Header of Chart */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
                        PROMEDIO DIARIO DE VENTAS
                      </h2>
                      <span className="text-[11px] font-bold text-[#059669] bg-[#10B981]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <TrendingUp size={12} /> {currentSalesData.growth}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Total acumulado: <strong className="text-[#0F172A]">{currentSalesData.totalKits} kits</strong> (${(currentSalesData.totalKits * 9500).toLocaleString('es-AR')} facturados)
                    </p>
                  </div>

                  {/* Timeframe selector pills & Average Stat */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#F1F5F9] p-1 rounded-xl text-xs font-semibold">
                      {['7 días', '14 días', '30 días'].map((range) => (
                        <button
                          key={range}
                          onClick={() => {
                            setChartRange(range);
                            setActivePointIndex(0);
                          }}
                          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            chartRange === range
                              ? 'bg-white text-[#1E5A9C] shadow-xs font-bold'
                              : 'text-[#64748B] hover:text-[#0F172A]'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>

                    <div className="hidden md:flex items-baseline gap-1 text-[#1E5A9C] pl-2 border-l border-[#E2E8F0]">
                      <span className="text-2xl font-black tracking-tight">~{currentSalesData.avgKits}</span>
                      <span className="text-xs font-semibold text-[#64748B]">kits / día</span>
                    </div>
                  </div>
                </div>

                {/* Quick Metrics Sub-bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2.5 px-3.5 my-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/70 text-xs">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold block">Promedio Diario</span>
                    <strong className="text-sm font-black text-[#0F172A]">{currentSalesData.avgKits} kits/día</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold block">Día Récord</span>
                    <strong className="text-sm font-black text-orange-600">{currentSalesData.peakKits} kits (14 Sep)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold block">Facturación Periodo</span>
                    <strong className="text-sm font-black text-[#059669]">${(currentSalesData.totalKits * 9500).toLocaleString('es-AR')}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold block">Tasa de Quirófanos</span>
                    <strong className="text-sm font-black text-[#1E5A9C]">74.8% activos</strong>
                  </div>
                </div>

                {/* Interactive SVG Canvas */}
                <div className="relative w-full h-64 pt-1 select-none">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 800 220"
                  >
                    <defs>
                      {/* Area Gradient */}
                      <linearGradient id="salesAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.26" />
                        <stop offset="65%" stopColor="#00C2CB" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#00C2CB" stopOpacity="0.0" />
                      </linearGradient>

                      {/* Stroke Gradient */}
                      <linearGradient id="salesLineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1E5A9C" />
                        <stop offset="45%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#00C2CB" />
                      </linearGradient>

                      {/* Soft Drop Shadow Filter for Line */}
                      <filter id="salesLineShadow" x="-10%" y="-10%" width="120%" height="130%">
                        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.2" />
                      </filter>
                    </defs>

                    {/* Horizontal Grid lines */}
                    {[
                      { val: 30, y: 24 },
                      { val: 20, y: 74 },
                      { val: 10, y: 124 },
                      { val: 0, y: 175 },
                    ].map((grid, idx) => (
                      <g key={idx}>
                        <line
                          x1="45"
                          y1={grid.y}
                          x2="780"
                          y2={grid.y}
                          stroke="#E2E8F0"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                          opacity="0.8"
                        />
                        <text
                          x="36"
                          y={grid.y + 4}
                          textAnchor="end"
                          fontSize="10"
                          fontWeight="600"
                          fill="#94A3B8"
                        >
                          {grid.val}
                        </text>
                      </g>
                    ))}

                    {/* Shaded Area under spline */}
                    <path
                      d={splineAreaPath}
                      fill="url(#salesAreaGrad)"
                      className="transition-all duration-300"
                    />

                    {/* Vertical Crosshair Guide for Active Point */}
                    {activePoint && (
                      <g>
                        <line
                          x1={activePoint.x}
                          y1="24"
                          x2={activePoint.x}
                          y2="175"
                          stroke="#2563EB"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          opacity="0.6"
                        />
                        <circle
                          cx={activePoint.x}
                          cy="175"
                          r="3"
                          fill="#2563EB"
                          opacity="0.8"
                        />
                      </g>
                    )}

                    {/* Smooth Spline Stroke Line */}
                    <path
                      d={splineLinePath}
                      fill="none"
                      stroke="url(#salesLineGrad)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#salesLineShadow)"
                      className="transition-all duration-300"
                    />

                    {/* Interactive Data Nodes */}
                    {computedPoints.map((pt, idx) => {
                      const isActive = idx === safeActiveIndex;
                      return (
                        <g key={idx} className="cursor-pointer" onClick={() => setActivePointIndex(idx)}>
                          {/* Invisible larger hover hit target */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="16"
                            fill="transparent"
                            onMouseEnter={() => setActivePointIndex(idx)}
                          />

                          {/* Active outer pulse ring */}
                          {isActive && (
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="11"
                              fill="#2563EB"
                              fillOpacity="0.18"
                            />
                          )}

                          {/* Main node */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isActive ? 5.5 : 3.5}
                            fill={isActive ? '#0F172A' : '#FFFFFF'}
                            stroke={isActive ? '#FFFFFF' : '#2563EB'}
                            strokeWidth={isActive ? 2.5 : 2.2}
                            className="transition-all duration-150"
                          />

                          {/* X-axis date labels */}
                          <text
                            x={pt.x}
                            y="198"
                            textAnchor="middle"
                            fontSize={isActive ? "10.5" : "9.5"}
                            fontWeight={isActive ? "700" : "500"}
                            fill={isActive ? "#0F172A" : "#64748B"}
                            className="transition-colors"
                          >
                            {pt.date.split(' ')[0]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Floating Luxury Tooltip */}
                  {activePoint && (
                    <div
                      className="absolute pointer-events-none z-30 transition-all duration-100 ease-out transform -translate-x-1/2 -translate-y-full"
                      style={{
                        left: `${(activePoint.x / 800) * 100}%`,
                        top: `${(activePoint.y / 220) * 100 - 5}%`,
                      }}
                    >
                      <div className="bg-[#0F172A] text-white rounded-2xl p-3 shadow-2xl border border-white/15 min-w-44 flex flex-col gap-1 backdrop-blur-md">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold text-slate-300">
                            {activePoint.dayName} {activePoint.date}, 2026
                          </span>
                          {activePoint.isPeak && (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-orange-500 text-white flex items-center gap-0.5 shadow-xs">
                              🔥 Pico
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline justify-between gap-3 pt-0.5">
                          <span className="text-xl font-black text-white">
                            {activePoint.kits} <span className="text-xs font-normal text-slate-300">kits</span>
                          </span>
                          <span className="text-xs font-bold text-[#10B981]">
                            ${activePoint.revenue.toLocaleString('es-AR')}
                          </span>
                        </div>
                        <div className="pt-1.5 mt-0.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                          <span>Meta: 19 kits/día</span>
                          <span className={activePoint.kits >= 19 ? 'text-[#10B981] font-bold' : 'text-amber-400 font-bold'}>
                            {activePoint.kits >= 19 ? `+${activePoint.kits - 19} kits` : `${activePoint.kits - 19} kits`}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Bottom Card: Phases of Treatment / Logistics matching reference image 1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Fases de Pedidos y Entregas</h3>
                <p className="text-xs text-[#64748B]">Monitoreo activo de pedidos en curso en Tucumán y NOA.</p>
              </div>

              {/* Legend with matching pills */}
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#93C5FD]"></span>
                  <span className="text-[#64748B]">En Preparación (0)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
                  <span className="text-[#64748B]">En Ruta (0)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]"></span>
                  <span className="text-[#0F172A] font-bold">Completados (0)</span>
                </div>
              </div>
            </div>

            {/* Segmented multi-progress bar matching reference */}
            <div className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden flex gap-0.5">
              <div className="h-full bg-slate-200 rounded-full w-full" title="0 pedidos" />
            </div>

            {/* Labels below segments */}
            <div className="flex items-center justify-between pt-3 text-[11px] font-semibold text-[#64748B]">
              <span>0 en preparación</span>
              <span>0 en ruta</span>
              <span>0 completados</span>
            </div>
          </div>

        </div>

        {/* === RIGHT COLUMN: UPCOMING DISPATCHES & SCHEDULE (col-span-4) === */}
        <div className="xl:col-span-4 bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-4">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
                Próximos Despachos
              </h2>
              <p className="text-xs text-[#64748B]">
                {scheduledDispatches.length} entregas programadas hoy
              </p>
            </div>

            {/* + Create Dispatch Button matching + Create Visit */}
            <button
              onClick={() => handleOpenEdit('dispatch', null)}
              className="flex items-center gap-1 text-xs font-bold text-[#2644B2] hover:text-[#1A3290] hover:bg-[#EFF6FF] px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>Programar</span>
            </button>
          </div>

          {/* Horizontal Days Selector matching reference image 1 */}
          <div className="flex items-center justify-between gap-1 pb-5 border-b border-[#F1F5F9] overflow-x-auto">
            {daysList.map((day) => {
              const isSelected = selectedDay === day.label;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDay(day.label)}
                  className={`flex flex-col items-center justify-center w-10 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${isSelected
                      ? 'bg-[#2644B2] text-white shadow-md'
                      : 'text-[#64748B] hover:bg-[#F8FAFC]'
                    }`}
                >
                  <span className="text-[10px] font-medium opacity-80">{day.name}</span>
                  <span className="text-sm">{day.dayNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Schedule Timeline with Time Ticks matching reference image 1 */}
          <div className="pt-4 relative space-y-4">
            {scheduledDispatches.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#64748B] flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#94A3B8]">
                  <Truck size={20} />
                </div>
                <span className="font-bold text-sm text-[#0F172A]">Sin despachos programados</span>
                <p className="text-xs text-[#94A3B8] max-w-xs">
                  No hay entregas registradas para este día. Usa el botón "Programar" para agendar un despacho.
                </p>
              </div>
            ) : (
              scheduledDispatches.map((disp, index) => {
                const isHighlighted = disp.active;
                return (
                  <div key={disp.id} className="relative flex items-start gap-3 group">
                    {/* Time label on the left */}
                    <span className="text-[11px] font-bold text-[#94A3B8] w-12 pt-2 text-right shrink-0">
                      {disp.slotTime}
                    </span>

                    {/* Vertical dotted track */}
                    <div className="absolute left-13.5 top-0 bottom-0 w-px border-l border-dashed border-[#E2E8F0] pointer-events-none" />

                    {/* Delivery Card inside timeline slot */}
                    <div
                      onClick={() => handleOpenEdit('dispatch', disp)}
                      className={`flex-1 p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${isHighlighted
                          ? 'bg-[#EFF6FF] border-[#2644B2] shadow-sm'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-white'
                        }`}
                    >
                      {/* Icon + Doctor & Clinic */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        {disp.isMeeting ? (
                          <div className="w-6 h-6 rounded-lg bg-[#2644B2]/10 text-[#2644B2] flex items-center justify-center shrink-0">
                            <Video size={12} />
                          </div>
                        ) : disp.isCall ? (
                          <div className="w-6 h-6 rounded-lg bg-[#2644B2]/10 text-[#2644B2] flex items-center justify-center shrink-0">
                            <Phone size={12} />
                          </div>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[#2644B2] shrink-0" />
                        )}

                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#0F172A] truncate">
                            {disp.doctor}
                          </div>
                          <div className="text-[10px] text-[#64748B] truncate">
                            {disp.clinic} {disp.kits > 0 && `• ${disp.kits} Kits`}
                          </div>
                        </div>
                      </div>

                      {/* Time slot & Arrow */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] font-semibold text-[#64748B]">
                          {disp.timeSlot.split(' ')[0]}
                        </span>
                        <ChevronRight size={13} className="text-[#94A3B8] group-hover:text-[#0F172A] transition-colors" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="pt-5 mt-4 border-t border-[#F1F5F9] text-center">
            <span className="text-xs text-[#64748B]">
              Logística coordinada vía WhatsApp con motoristas
            </span>
          </div>

        </div>

      </div>

      {/* Edit / Add Modal */}
      <AdminCardEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalType={modalType}
        initialData={selectedItem}
      />

    </div>
  );
};

export default AdminVentas;
