import React, { useState } from 'react';
import { Info, MoreHorizontal, Edit3 } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import AdminCardEditModal from './modals/AdminCardEditModal';

const SalesTrendChart = () => {
  const { timeframe, setTimeframe, salesTrend, stats } = useAdminData();
  const [activePointIndex, setActivePointIndex] = useState(
    timeframe === 'Mensual' ? 5 : 2
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Maximum value for chart scaling
  const maxVal = Math.max(
    ...salesTrend.map((d) => Math.max(d.newClients, d.existingClients)),
    timeframe === 'Anual' ? 400 : 50
  );

  const totalFacturado = stats[0]?.value || '$0';
  const totalChange = stats[0]?.change || '0%';

  const handleOpenEdit = (index = 0) => {
    setActivePointIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#1E5A9C]/40 transition-all duration-200 flex flex-col justify-between relative overflow-hidden font-geist group">

        {/* Quick Edit Hint */}
        <button
          onClick={() => handleOpenEdit(activePointIndex)}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E5A9C] text-white p-1.5 rounded-lg shadow-sm flex items-center gap-1 text-[11px] font-semibold cursor-pointer z-20"
        >
          <Edit3 size={12} />
          <span>Editar Datos</span>
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
              TREND DE VENTAS
            </h2>
            <button
              type="button"
              title="Evolución de ventas de Kit Odontológico Completo según tipo de cliente"
              className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"
            >
              <Info size={15} />
            </button>
          </div>

          {/* Timeframe selector: Semanal / Mensual / Anual */}
          <div className="flex items-center gap-2 pr-16 sm:pr-0">
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
              {totalFacturado}{' '}
              <span className="text-xs font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                {totalChange}
              </span>
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
            {salesTrend.map((d, idx) => {
              const isSelected = activePointIndex === idx;
              const newHeight = d.newClients > 0 ? Math.min(100, Math.max(6, (d.newClients / (maxVal * 1.2)) * 100)) : 2;
              const existingHeight = d.existingClients > 0 ? Math.min(100, Math.max(6, (d.existingClients / (maxVal * 1.2)) * 100)) : 2;

              return (
                <div
                  key={d.label}
                  onMouseEnter={() => setActivePointIndex(idx)}
                  onClick={() => handleOpenEdit(idx)}
                  className="flex-1 flex flex-col items-center justify-end h-full group/bar cursor-pointer relative"
                  title="Haz clic para modificar los datos de este período"
                >
                  {/* Floating Tooltip matching reference design */}
                  {isSelected && (
                    <div className="absolute -top-16 z-30 bg-[#0F172A] text-white px-3 py-2 rounded-xl shadow-xl border border-white/10 text-[11px] whitespace-nowrap pointer-events-none animate-fadeIn">
                      <div className="font-bold text-white mb-0.5">{d.label} — {d.revenue}</div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span>• Nuevos: <strong className="text-white">{d.newClients}</strong></span>
                        <span>• Recurrentes: <strong className="text-white">{d.existingClients}</strong></span>
                      </div>
                    </div>
                  )}

                  {/* Bars column */}
                  <div className="w-full max-w-7 flex items-end justify-center gap-0.5 sm:gap-1 h-full pb-2">
                    {/* New Clients Bar */}
                    <div
                      className={`w-1/2 rounded-t-sm transition-all duration-300 ${isSelected
                          ? 'bg-[#0F172A] shadow-sm'
                          : 'bg-[#1E293B] group-hover/bar:bg-[#0F172A]'
                        }`}
                      style={{ height: `${newHeight}%` }}
                    />
                    {/* Existing Clients Bar */}
                    <div
                      className={`w-1/2 rounded-t-sm transition-all duration-300 ${isSelected
                          ? 'bg-[#64748B]'
                          : 'bg-[#94A3B8] group-hover/bar:bg-[#64748B]'
                        }`}
                      style={{ height: `${existingHeight}%` }}
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
