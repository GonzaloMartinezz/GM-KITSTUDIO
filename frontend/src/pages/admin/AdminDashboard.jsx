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
    <div className="w-full h-full font-geist flex flex-col relative pb-12">

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

      {/* ── ÚNICO PROVEEDOR: RESUMEN EJECUTIVO Y PAGOS ── */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-white via-white to-[#1E5A9C]/5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#1E5A9C]/10 text-[#1E5A9C] flex items-center justify-center shrink-0">
            <Truck size={24} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E5A9C] bg-[#1E5A9C]/10 px-2 py-0.5 rounded-md">
                Único Proveedor Oficial
              </span>
              <span className="text-[10px] font-bold text-[#059669] bg-[#10B981]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck size={11} /> ANMAT PM 1450-88
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mt-0.5">
              {supplierData?.company || 'BioTex Médica S.A.'} • <span className="text-[#64748B] font-normal text-xs sm:text-sm">{supplierData?.contactName || 'Lic. Martín Rodriguez'}</span>
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Costo de Compra: <strong className="text-[#0F172A]">${Number(supplierData?.costPerKit || 5000).toLocaleString('es-AR')} / kit</strong> • Próximo Pago: <strong className={Number(supplierData?.nextPaymentAmount || 0) > 0 ? "text-orange-600" : "text-[#059669]"}>{Number(supplierData?.nextPaymentAmount || 0) > 0 ? `${supplierData?.nextPaymentDate || '20 Sep 2026'} ($${Number(supplierData?.nextPaymentAmount).toLocaleString('es-AR')})` : 'Sin pagos pendientes ($0)'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`https://wa.me/${supplierData?.whatsapp || '5491155228400'}?text=${encodeURIComponent('Hola Martín, te escribo desde GM Kit Studio sobre la orden de compra.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>
          <NavLink
            to="/admin/proveedores"
            className="flex items-center gap-1.5 bg-[#1E5A9C] hover:bg-[#16487D] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <span>Ver Proveedor & Pagos</span>
            <ArrowRight size={14} />
          </NavLink>
        </div>
      </div>

      {/* 2. Middle Grid: Sales Trend + Payment Methods (Kit Odontológico Completo) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
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
