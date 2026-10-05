import React, { useState } from 'react';
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, Edit3 } from 'lucide-react';
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
      case 'stock':
        return Package;
      case 'extra_income':
        return TrendingUp;
      default:
        return TrendingUp;
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-5 mb-6">
        {stats.map((stat) => {
          const Icon = getIcon(stat.id);
          return (
              <div
              key={stat.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#1E5A9C]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative ${stat.id === 'extra_income' ? 'col-span-2 sm:col-span-1 md:col-span-1 xl:col-span-1' : ''}`}
            >
              {/* Header row: Label + Sparkline */}
              <div className="flex items-start justify-between gap-1 sm:gap-3 mb-2 sm:mb-3 pr-1 sm:pr-4">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#64748B] tracking-wider uppercase leading-tight font-geist line-clamp-2">
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
                <div className="flex items-baseline gap-1 sm:gap-2">
                  <h3 className="text-xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-geist truncate">
                    {stat.value}
                  </h3>
                  {stat.unit && (
                    <span className="text-[10px] sm:text-xs font-semibold text-[#64748B]">
                      {stat.unit}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom row: Trend indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5 pt-2 border-t border-[#F1F5F9] text-[10px] sm:text-xs">
                <span className="inline-flex items-center w-fit gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-[#ECFDF5] text-[#10B981]">
                  <TrendingUp size={12} strokeWidth={2.5} className="shrink-0" />
                  {stat.change}
                </span>
                <span className="text-[#64748B] text-[9px] sm:text-[11px] font-medium truncate">
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
