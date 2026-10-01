import React, { useState } from 'react';
import { Info, Edit3 } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import AdminCardEditModal from './modals/AdminCardEditModal';

// Escalones "lindos" para el eje vertical en pesos: 100 mil, 200 mil, 300
// mil... hasta 1, 2, 3, 5, 6, 10 millones, como pidió Gonzalo.
const AXIS_STEPS = [
  50000, 100000, 200000, 300000, 500000,
  1000000, 2000000, 3000000, 5000000, 6000000, 10000000, 20000000, 50000000,
];

const pickStep = (maxVal) => {
  for (const step of AXIS_STEPS) {
    if (maxVal <= step * 4) return step;
  }
  return AXIS_STEPS[AXIS_STEPS.length - 1];
};

const formatAxisLabel = (value) => {
  if (value >= 1000000) {
    const millions = value / 1000000;
    return `$${millions % 1 === 0 ? millions : millions.toFixed(1)}M`;
  }
  if (value >= 1000) return `$${Math.round(value / 1000)} mil`;
  return `$${value}`;
};

const SalesTrendChart = () => {
  const { timeframe, setTimeframe, salesTrend } = useAdminData();
  const [activePointIndex, setActivePointIndex] = useState(
    timeframe === 'Mensual' ? 5 : 2
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Escala del gráfico: ahora las barras representan plata facturada por
  // período (antes representaban cantidad de clientes, por eso una barra
  // de $612.000 se veía igual de chica que una de $5.000).
  const maxRevenue = Math.max(...salesTrend.map((d) => d.revenueNum || 0), 1);
  const axisStep = pickStep(maxRevenue);
  const axisTop = Math.max(axisStep * 4, Math.ceil(maxRevenue / axisStep) * axisStep);
  const axisTicks = [4, 3, 2, 1, 0].map((i) => axisStep * i).filter((v) => v <= axisTop);
  if (axisTicks[0] !== axisTop) axisTicks.unshift(axisTop);

  const totalRevenuePeriod = salesTrend.reduce((sum, d) => sum + (d.revenueNum || 0), 0);
  const totalNewClientsPeriod = salesTrend.reduce((sum, d) => sum + (d.newClients || 0), 0);

  const handleOpenEdit = (index = 0) => {
    setActivePointIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#1E5A9C]/40 transition-all duration-200 flex flex-col justify-between relative overflow-hidden font-geist group">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
              TREND DE VENTAS
            </h2>
            <button
              type="button"
              title="Evolución de ingresos facturados y clientes nuevos por período"
              className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"
            >
              <Info size={15} />
            </button>
            {/* Editar Datos: al lado del título, para no taparse con el selector de período */}
            <button
              onClick={() => handleOpenEdit(activePointIndex)}
              className="flex items-center gap-1 text-[#1E5A9C] hover:text-[#16487D] bg-[#1E5A9C]/10 hover:bg-[#1E5A9C]/15 px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <Edit3 size={12} />
              <span className="hidden sm:inline">Editar Datos</span>
            </button>
          </div>

          {/* Timeframe selector: Semanal / Mensual / Anual */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#F1F5F9] p-1 rounded-xl text-xs font-semibold">
              {['Semanal', 'Mensual', 'Anual'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${timeframe === t
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-header: Total summary + Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mb-6">
          <div>
            <span className="text-xs font-medium text-[#64748B]">Total Facturado ({timeframe}):</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              ${totalRevenuePeriod.toLocaleString('es-AR')}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E5A9C]"></span>
              <span className="text-[#334155]">Facturación por período</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F172A]"></span>
              <span className="text-[#334155]">{totalNewClientsPeriod} Clientes Nuevos</span>
            </div>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="relative pt-2 pb-2 w-full flex gap-2">
          {/* Eje vertical con montos en pesos */}
          <div className="flex flex-col justify-between h-52 sm:h-64 text-[10px] font-semibold text-[#94A3B8] text-right shrink-0 w-14 sm:w-16">
            {axisTicks.map((tick) => (
              <span key={tick}>{formatAxisLabel(tick)}</span>
            ))}
          </div>

          <div className="relative flex-1">
            {/* Horizontal background grid lines, una por cada marca del eje */}
            <div className="absolute inset-x-0 top-0 bottom-7 flex flex-col justify-between pointer-events-none opacity-50">
              {axisTicks.map((tick) => (
                <div key={tick} className="border-b border-dashed border-[#E2E8F0] w-full"></div>
              ))}
            </div>

            {/* Columns Grid */}
            <div className="relative z-10 flex items-end justify-between gap-1 sm:gap-2 h-52 sm:h-64 px-1">
              {salesTrend.map((d, idx) => {
                const isSelected = activePointIndex === idx;
                const revenueHeight = d.revenueNum > 0
                  ? Math.min(100, Math.max(2, (d.revenueNum / axisTop) * 100))
                  : 0;

                return (
                  <div
                    key={d.label}
                    onMouseEnter={() => setActivePointIndex(idx)}
                    onClick={() => handleOpenEdit(idx)}
                    className="flex-1 flex flex-col items-center justify-end h-full group/bar cursor-pointer relative"
                    title="Haz clic para modificar los datos de este período"
                  >
                    {/* Floating Tooltip */}
                    {isSelected && (
                      <div className="absolute -top-16 z-30 bg-[#0F172A] text-white px-3 py-2 rounded-xl shadow-xl border border-white/10 text-[11px] whitespace-nowrap pointer-events-none animate-fadeIn">
                        <div className="font-bold text-white mb-0.5">{d.label} — {d.revenue}</div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <span>• Clientes nuevos: <strong className="text-white">{d.newClients}</strong></span>
                        </div>
                      </div>
                    )}

                    {/* Barra única: facturación del período */}
                    <div className="w-full max-w-9 flex items-end justify-center h-full pb-2">
                      <div
                        className={`w-full rounded-t-sm transition-all duration-300 ${isSelected
                            ? 'bg-[#1E5A9C] shadow-sm'
                            : 'bg-[#1E5A9C]/70 group-hover/bar:bg-[#1E5A9C]'
                          }`}
                        style={{ height: `${revenueHeight}%` }}
                      />
                    </div>

                    {/* Period label */}
                    <span
                      className={`text-[10px] sm:text-xs font-semibold transition-colors mt-1 ${isSelected ? 'text-[#0F172A] font-bold' : 'text-[#94A3B8]'
                        }`}
                    >
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Edit Modal */}
      <AdminCardEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalType="trend"
        initialData={{ index: activePointIndex }}
      />
    </>
  );
};

export default SalesTrendChart;
