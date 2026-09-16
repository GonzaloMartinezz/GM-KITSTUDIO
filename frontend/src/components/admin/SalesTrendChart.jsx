import React, { useState } from 'react';
import { Info, MoreHorizontal } from 'lucide-react';

const SalesTrendChart = () => {
  const [timeframe, setTimeframe] = useState('Mensual'); // 'Semanal' | 'Mensual' | 'Anual'
  const [activeMonthIndex, setActiveMonthIndex] = useState(5); // Default to Jun

  // 12-Month Sales Trend Data for GM Kit Studio
  const monthlyData = [
    { month: 'ENE', newClients: 18, existingClients: 12, revenue: '$1.420.000' },
    { month: 'FEB', newClients: 22, existingClients: 15, revenue: '$1.680.000' },
    { month: 'MAR', newClients: 26, existingClients: 20, revenue: '$1.950.000' },
    { month: 'ABR', newClients: 20, existingClients: 24, revenue: '$1.820.000' },
    { month: 'MAY', newClients: 35, existingClients: 28, revenue: '$2.450.000' },
    { month: 'JUN', newClients: 38, existingClients: 32, revenue: '$2.845.000' },
    { month: 'JUL', newClients: 30, existingClients: 26, revenue: '$2.290.000' },
    { month: 'AGO', newClients: 28, existingClients: 30, revenue: '$2.380.000' },
    { month: 'SEP', newClients: 36, existingClients: 34, revenue: '$2.845.000' },
    { month: 'OCT', newClients: 24, existingClients: 28, revenue: '$2.120.000' },
    { month: 'NOV', newClients: 32, existingClients: 36, revenue: '$2.650.000' },
    { month: 'DIC', newClients: 42, existingClients: 40, revenue: '$3.240.000' },
  ];

  const maxVal = 75; // chart scale reference

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden font-geist">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
            TREND DE VENTAS
          </h2>
          <button 
            type="button" 
            title="Evolución mensual de volumen de ventas según tipo de cliente"
            className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"
          >
            <Info size={15} />
          </button>
        </div>

        {/* Timeframe selector: Weekly / Monthly / Yearly */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-xl text-xs font-semibold">
            {['Semanal', 'Mensual', 'Anual'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeframe === t
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button 
            type="button" 
            className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-all"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Sub-header: Total summary + Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mb-6">
        <div>
          <span className="text-xs font-medium text-[#64748B]">Total Facturado:</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            $2.845.000 <span className="text-xs font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">+18.4%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F172A]"></span>
            <span className="text-[#334155]">Clientes Nuevos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]"></span>
            <span className="text-[#64748B]">Clientes Recurrentes</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative pt-4 pb-2 w-full">
        {/* Horizontal background grid lines */}
        <div className="absolute inset-x-0 top-4 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="border-b border-dashed border-[#CBD5E1] w-full"></div>
          <div className="border-b border-dashed border-[#CBD5E1] w-full"></div>
          <div className="border-b border-dashed border-[#CBD5E1] w-full"></div>
          <div className="border-b border-dashed border-[#CBD5E1] w-full"></div>
        </div>

        {/* Columns Grid */}
        <div className="relative z-10 flex items-end justify-between gap-1 sm:gap-2 h-52 sm:h-60 px-2">
          {monthlyData.map((d, idx) => {
            const isSelected = activeMonthIndex === idx;
            const newHeight = (d.newClients / maxVal) * 100;
            const existingHeight = (d.existingClients / maxVal) * 100;

            return (
              <div
                key={d.month}
                onMouseEnter={() => setActiveMonthIndex(idx)}
                className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer relative"
              >
                {/* Floating Tooltip matching reference design */}
                {isSelected && (
                  <div className="absolute -top-16 z-30 bg-[#0F172A] text-white px-3 py-2 rounded-xl shadow-xl border border-white/10 text-[11px] whitespace-nowrap pointer-events-none animate-fadeIn">
                    <div className="font-bold text-white mb-0.5">{d.month} 2026 — {d.revenue}</div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <span>• Nuevos: <strong className="text-white">{d.newClients}</strong></span>
                      <span>• Recurrentes: <strong className="text-white">{d.existingClients}</strong></span>
                    </div>
                  </div>
                )}

                {/* Bars column */}
                <div className="w-full max-w-[28px] flex items-end justify-center gap-0.5 sm:gap-1 h-full pb-2">
                  {/* New Clients Bar */}
                  <div
                    className={`w-1/2 rounded-t-sm transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#0F172A] shadow-sm'
                        : 'bg-[#1E293B] group-hover:bg-[#0F172A]'
                    }`}
                    style={{ height: `${newHeight}%` }}
                    title={`Nuevos: ${d.newClients}`}
                  />
                  {/* Existing Clients Bar */}
                  <div
                    className={`w-1/2 rounded-t-sm transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#64748B]'
                        : 'bg-[#94A3B8] group-hover:bg-[#64748B]'
                    }`}
                    style={{ height: `${existingHeight}%` }}
                    title={`Recurrentes: ${d.existingClients}`}
                  />
                </div>

                {/* Month label */}
                <span
                  className={`text-[10px] sm:text-xs font-semibold transition-colors mt-1 ${
                    isSelected ? 'text-[#0F172A] font-bold' : 'text-[#94A3B8]'
                  }`}
                >
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default SalesTrendChart;
