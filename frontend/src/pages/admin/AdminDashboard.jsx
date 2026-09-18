import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import StatCards from '../../components/admin/StatCards';
import SalesTrendChart from '../../components/admin/SalesTrendChart';
import PaymentMethodsBreakdown from '../../components/admin/PaymentMethodsBreakdown';
import RecentTransactionsTable from '../../components/admin/RecentTransactionsTable';
import { Calendar, ChevronDown, Sparkles, Truck, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

const AdminDashboard = () => {
  const [userName, setUserName] = useState('Gonzalo');
  const { timeframe, setTimeframe, supplierData } = useAdminData();

  useEffect(() => {
    const savedName = localStorage.getItem('currentUser');
    if (savedName) {
      setUserName(savedName.split(' ')[0]);
    }
  }, []);

  const getDateLabel = () => {
    switch (timeframe) {
      case 'Semanal':
        return 'Semana actual (Sep 2026)';
      case 'Anual':
        return 'Año Fiscal 2026';
      case 'Mensual':
      default:
        return '14 Sep 2026';
    }
  };

  return (
    <div className="w-full font-geist flex flex-col relative pb-12">

      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Bienvenido de nuevo, <span className="text-[#1E5A9C]">{userName}</span>
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
              Admin Único
            </span>
          </div>
          <p className="text-[#64748B] text-xs sm:text-sm mt-0.5">
            Panel de Control Central de GM KIT STUDIO (Tucumán y NOA) • Distribución exclusiva del Kit Odontológico
          </p>
        </div>

        {/* Action Controls: Period & Date */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Period Selector: Semana, Mes, Año */}
          <div className="relative inline-block">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="appearance-none bg-white border border-[#E2E8F0] text-[#0F172A] pl-3 pr-8 py-2 rounded-xl text-xs font-semibold shadow-xs hover:border-[#1E5A9C] transition-all cursor-pointer outline-none"
            >
              <option value="Semanal">Por Semana</option>
              <option value="Mensual">Por Mes</option>
              <option value="Anual">Por Año</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          {/* Current Date Badge */}
          <div className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] text-[#0F172A] px-3 py-2 rounded-xl text-xs font-semibold shadow-xs">
            <Calendar size={13} className="text-[#1E5A9C]" />
            <span>{getDateLabel()}</span>
          </div>
        </div>
      </div>

      {/* 1. Statistics Cards (4 Key Metrics) */}
      <StatCards />

      {/* 2. Middle Grid: Sales Trend + Payment Methods (Kit Odontológico Completo) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 mt-6">
        {/* Trend de Ventas (60% width on desktop) */}
        <div className="lg:col-span-7 flex flex-col">
          <SalesTrendChart />
        </div>

        {/* Vista de Métodos de Pago - Kit Odontológico Completo (40% width on desktop) */}
        <div className="lg:col-span-5 flex flex-col">
          <PaymentMethodsBreakdown />
        </div>
      </div>

      {/* 3. Bottom Section: Últimas Transacciones */}
      <div className="w-full">
        <RecentTransactionsTable />
      </div>

    </div>
  );
};

export default AdminDashboard;
