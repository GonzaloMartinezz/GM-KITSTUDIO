import React from 'react';
import { DollarSign, ShoppingCart, Users, UserPlus, TrendingUp } from 'lucide-react';

const StatCards = () => {
  const stats = [
    {
      id: 'revenue',
      title: 'CANTIDAD DE INGRESOS BRUTOS',
      value: '$2.845.000',
      change: '+18.4%',
      changeDesc: 'vs mes anterior',
      sparkline: [35, 45, 55, 40, 70, 85, 100],
      icon: DollarSign,
      color: '#0F172A',
    },
    {
      id: 'orders',
      title: 'CANTIDAD DE VENTAS',
      value: '342',
      unit: 'Pedidos',
      change: '+12.8%',
      changeDesc: 'vs mes anterior',
      sparkline: [40, 50, 45, 65, 75, 68, 92],
      icon: ShoppingCart,
      color: '#0F172A',
    },
    {
      id: 'customers',
      title: 'CANTIDAD DE CLIENTES',
      value: '128',
      unit: 'Clínicas / Docs',
      change: '+94%',
      changeDesc: 'retención activa',
      sparkline: [55, 62, 68, 74, 82, 88, 96],
      icon: Users,
      color: '#0F172A',
    },
    {
      id: 'new_customers',
      title: 'CANTIDAD DE NUEVOS CLIENTES',
      value: '24',
      unit: 'Nuevos este mes',
      change: '+8',
      changeDesc: 'vs mes anterior',
      sparkline: [20, 32, 38, 48, 58, 70, 88],
      icon: UserPlus,
      color: '#0F172A',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
        >
          {/* Header row: Label + Sparkline */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase leading-tight font-geist">
              {stat.title}
            </span>

            {/* Mini Sparkline Bar Chart */}
            <div className="flex items-end gap-1 h-8 shrink-0 px-1 pt-1" title="Tendencia reciente">
              {stat.sparkline.map((val, idx) => (
                <div
                  key={idx}
                  className="w-1 bg-[#CBD5E1] group-hover:bg-[#0F172A] rounded-full transition-all duration-300"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          </div>

          {/* Main Value */}
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-geist">
                {stat.value}
              </h3>
              {stat.unit && (
                <span className="text-xs font-semibold text-[#64748B]">
                  {stat.unit}
                </span>
              )}
            </div>
          </div>

          {/* Bottom row: Trend indicator */}
          <div className="flex items-center gap-1.5 pt-2 border-t border-[#F1F5F9] text-xs">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-[#ECFDF5] text-[#10B981]">
              <TrendingUp size={12} strokeWidth={2.5} />
              {stat.change}
            </span>
            <span className="text-[#64748B] text-[11px] font-medium truncate">
              {stat.changeDesc}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
