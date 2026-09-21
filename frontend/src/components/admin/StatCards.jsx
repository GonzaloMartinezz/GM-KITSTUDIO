import React, { useState } from 'react';
import { DollarSign, ShoppingCart, Users, UserPlus, TrendingUp, Edit3 } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';


const StatCards = () => {
  const { stats, timeframe } = useAdminData();
  const getIcon = (id) => {
    switch (id) {
      case 'revenue':
        return DollarSign;
      case 'orders':
        return ShoppingCart;
      case 'customers':
        return Users;
      case 'new_customers':
        return UserPlus;
      case 'average_ticket':
        return TrendingUp;
      default:
        return UserPlus;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-5 mb-6">
        {stats.map((stat) => {
          const Icon = getIcon(stat.id);
          return (
            <div
              key={stat.id}
              className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#1E5A9C]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative"
            >
              {/* Header row: Label + Sparkline */}
              <div className="flex items-start justify-between gap-3 mb-3 pr-4">
                <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase leading-tight font-geist">
                  {stat.title}
                </span>

                {/* Mini Sparkline Bar Chart */}
                <div className="flex items-end gap-1 h-8 shrink-0 px-1 pt-1" title="Tendencia reciente">
                  {(stat.sparkline || [30, 40, 50, 60, 70, 80, 90]).map((val, idx) => (
                    <div
                      key={idx}
                      className="w-1 bg-[#CBD5E1] group-hover:bg-[#0F172A] rounded-full transition-all duration-300 min-h-0.75"
                      style={{ height: `${val > 0 ? val : 8}%` }}
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
          );
        })}
      </div>

    </>
  );
};

export default StatCards;
