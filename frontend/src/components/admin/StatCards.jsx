import React from 'react';
import { Package, DollarSign, TrendingUp, Users } from 'lucide-react';

const StatCards = () => {
  const stats = [
    {
      title: 'Kits en Stock',
      value: '540',
      trend: '+12.5%',
      trendDesc: 'Unidades listas para envío',
      icon: Package,
      iconColor: 'text-[#1E5A9C]',
      iconBg: 'bg-[#1E5A9C]/10',
    },
    {
      title: 'Ingresos Mensuales',
      value: '$425,000',
      trend: '+8.2%',
      trendDesc: 'Flujo de caja',
      icon: DollarSign,
      iconColor: 'text-[#00C2CB]',
      iconBg: 'bg-[#00C2CB]/10',
    },
    {
      title: 'Margen Promedio',
      value: '35%',
      trend: '+2.1%',
      trendDesc: 'Rentabilidad neta',
      icon: TrendingUp,
      iconColor: 'text-[#1E5A9C]',
      iconBg: 'bg-[#F6E2B3]/60',
    },
    {
      title: 'Clínicas Activas',
      value: '14',
      trend: null,
      trendDesc: 'Consultorios en Tucumán',
      icon: Users,
      iconColor: 'text-[#00C2CB]',
      iconBg: 'bg-[#1E5A9C]/5',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-transparent hover:border-[#F0F0F3] hover:shadow-md transition-all cursor-default group">
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.iconBg}`}>
              <stat.icon size={20} className={stat.iconColor} strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-medium text-[#8E8E93] group-hover:text-[#1E5A9C] transition-colors">{stat.title}</span>
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-4xl font-bold text-[#1E5A9C]">{stat.value}</h3>
            {stat.trend && (
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#00C2CB] bg-[#00C2CB]/10 px-2 py-1 rounded-full">
                <TrendingUp size={12} strokeWidth={3} />
                {stat.trend}
              </div>
            )}
          </div>

          <p className="text-xs text-[#8E8E93] font-medium">{stat.trendDesc}</p>
          
        </div>
      ))}
    </div>
  );
};

export default StatCards;
