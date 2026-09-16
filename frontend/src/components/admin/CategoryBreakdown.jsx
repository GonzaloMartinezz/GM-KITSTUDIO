import React, { useState } from 'react';
import { Calendar, Sparkles, MoreHorizontal } from 'lucide-react';

const CategoryBreakdown = () => {
  const [selectedMonth, setSelectedMonth] = useState('Septiembre 2026');

  const categories = [
    {
      name: 'Kits Odontológicos Completos',
      percentage: 58,
      amount: '$1.650.100',
      color: 'bg-[#0F172A]',
      textColor: 'text-[#0F172A]',
    },
    {
      name: 'Camisolines SMS Quirúrgicos',
      percentage: 22,
      amount: '$625.900',
      color: 'bg-[#334155]',
      textColor: 'text-[#334155]',
    },
    {
      name: 'Campos Quirúrgicos 100x100',
      percentage: 12,
      amount: '$341.400',
      color: 'bg-[#64748B]',
      textColor: 'text-[#64748B]',
    },
    {
      name: 'Cubrecalzados y Cofias',
      percentage: 8,
      amount: '$227.600',
      color: 'bg-[#94A3B8]',
      textColor: 'text-[#94A3B8]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between font-geist">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
        <div>
          <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
            VISTA POR CATEGORÍA POR MES
          </h2>
          <p className="text-xs text-[#64748B]">Distribución de ingresos por línea médica</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Month Selector Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F5F9] rounded-xl text-xs font-semibold text-[#0F172A] cursor-pointer">
            <Calendar size={13} className="text-[#64748B]" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent border-none outline-none font-semibold text-xs cursor-pointer"
            >
              <option value="Septiembre 2026">Sep 2026</option>
              <option value="Agosto 2026">Ago 2026</option>
              <option value="Julio 2026">Jul 2026</option>
            </select>
          </div>
          <button 
            type="button" 
            className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-all"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Revenue by category big number */}
      <div className="py-4">
        <span className="text-xs font-medium text-[#64748B]">Facturación en {selectedMonth}:</span>
        <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          $2.845.000
        </div>
      </div>

      {/* Insight banner matching reference mockup */}
      <div className="mb-5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2.5 text-xs text-[#334155]">
        <div className="w-6 h-6 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shrink-0">
          <Sparkles size={13} />
        </div>
        <p className="font-medium leading-snug">
          Los <strong className="text-[#0F172A]">Kits Odontológicos</strong> representan el <strong className="text-[#0F172A]">58%</strong> de la demanda total de este mes.
        </p>
      </div>

      {/* Categories Progress Bars */}
      <div className="space-y-4 mb-4">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1E293B] flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
                {cat.name}
              </span>
              <span className="font-bold text-[#0F172A]">{cat.amount} <span className="font-normal text-[#64748B]">({cat.percentage}%)</span></span>
            </div>
            {/* Progress bar container */}
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div
                className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Comparative columns preview at the bottom */}
      <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
        <span>Balance mensual equilibrado</span>
        <span className="font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">+4.2% margen</span>
      </div>

    </div>
  );
};

export default CategoryBreakdown;
