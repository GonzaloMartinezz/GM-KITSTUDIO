import React from 'react';
import { Users, DollarSign, RefreshCw, AtSign, TrendingUp } from 'lucide-react';

const StatCards = () => {
  const stats = [
    {
      title: 'Total Employees',
      value: '1,589',
      trend: '+5.6%',
      trendDesc: 'from last month',
      icon: Users,
      iconColor: 'text-[#7A73FF]',
      iconBg: 'bg-[#7A73FF]/10',
    },
    {
      title: 'Sales Revenue',
      value: '$160,000',
      trend: '+7.9%',
      trendDesc: 'Total Revenue',
      icon: DollarSign,
      iconColor: 'text-[#34C759]',
      iconBg: 'bg-[#34C759]/10',
    },
    {
      title: 'Submission Rate',
      value: '67%',
      trend: '+5.6%',
      trendDesc: 'Profile',
      icon: RefreshCw,
      iconColor: 'text-[#FF3B30]',
      iconBg: 'bg-[#FF3B30]/10',
    },
    {
      title: 'Sales Leads',
      value: '56',
      trend: null,
      trendDesc: 'Positions',
      icon: AtSign,
      iconColor: 'text-[#FF9500]',
      iconBg: 'bg-[#FF9500]/10',
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
            <span className="text-[15px] font-medium text-[#8E8E93] group-hover:text-[#1C1C1E] transition-colors">{stat.title}</span>
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-4xl font-bold text-[#1C1C1E]">{stat.value}</h3>
            {stat.trend && (
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#34C759] bg-[#34C759]/10 px-2 py-1 rounded-full">
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
