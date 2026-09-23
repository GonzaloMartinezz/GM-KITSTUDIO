import React, { useState } from 'react';
import {
  DollarSign,
  Clock,
  Truck,
  CheckCircle2,
  TrendingUp,
  Calendar,
  ChevronDown,
  Sparkles,
  PieChart as PieIcon,
  BarChart3,
  MoreHorizontal,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

const AdminFinanzas = () => {
  const {
    timeframe,
    setTimeframe,
    stats,
    transactions,
    paymentMethods,
    salesTrend,
    financialReports,
    buyers,
  } = useAdminData();

  const [activeTab, setActiveTab] = useState('Todos'); // 'Todos' | 'Completado' | 'Enviado' | 'En Preparación'
  const [searchQuery, setSearchQuery] = useState('');

  // Financial summary metrics based on actual transactions
  const totalRevenue = stats[0]?.value || '$0';
  const totalChange = stats[0]?.change || '0%';

  const pendingCount = transactions.filter((t) => t.status === 'En Preparación').length;
  const inDeliveryCount = transactions.filter((t) => t.status === 'Enviado').length;
  const completedCount = transactions.filter((t) => t.status === 'Completado').length;

  // Método de pago con más cobros reales (o null si todavía no hay operaciones)
  const leadingPaymentMethod = (paymentMethods || [])
    .filter((pm) => pm.numericAmount > 0)
    .sort((a, b) => b.numericAmount - a.numericAmount)[0] || null;

  // Retención de clínicas: % de compradores con más de una compra registrada
  const retentionRate = (buyers && buyers.length > 0)
    ? Math.round((buyers.filter((b) => (b.totalOrders || 0) > 1).length / buyers.length) * 100)
    : 0;

  // Filtered transactions for the finance table
  const filteredList = transactions.filter((t) => {
    const matchesTab =
      activeTab === 'Todos' ||
      (activeTab === 'Completados' && t.status === 'Completado') ||
      (activeTab === 'En Entrega' && t.status === 'Enviado') ||
      (activeTab === 'Pendientes' && t.status === 'En Preparación');

    const matchesSearch =
      t.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.clinic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.paymentMethod && t.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });



  return (
    <div className="w-full h-full font-geist flex flex-col relative pb-12">

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Reportes Financieros
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1E5A9C]/10 text-[#1E5A9C]">
              Finanzas & Cobranzas
            </span>
          </div>
          <p className="text-[#64748B] text-xs sm:text-sm mt-0.5">
            Control de ingresos, estados de cobro y efectividad de métodos de pago del Kit Odontológico
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-2.5">
          <div className="relative inline-block">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="appearance-none bg-white border border-[#E2E8F0] text-[#0F172A] pl-3 pr-8 py-2 rounded-xl text-xs font-semibold shadow-xs hover:border-[#1E5A9C] transition-all cursor-pointer outline-none"
            >
              <option value="Semanal">Esta Semana</option>
              <option value="Mensual">Este Mes</option>
              <option value="Anual">Este Año</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] text-[#0F172A] px-3 py-2 rounded-xl text-xs font-semibold shadow-xs">
            <Calendar size={13} className="text-[#1E5A9C]" />
            <span>Sep 2026</span>
          </div>
        </div>
      </div>

      {/* 4 Financial KPI Cards (matching reference image 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        
        {/* Card 1: Facturado / Earned (Dark sleek card from reference) */}
        <div
          onClick={() => handleOpenEdit('stat', stats[0])}
          className="bg-[#0F172A] text-white rounded-2xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform"
          title="Toca para modificar"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-300">Total Facturado</span>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <DollarSign size={16} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold tracking-tight">{totalRevenue}</span>
            </div>
            {/* Sparkline curve visual */}
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <ArrowUpRight size={14} />
              <span>{totalChange} vs período anterior</span>
            </div>
          </div>
        </div>

        {/* Card 2: Pedidos Pendientes */}
        <div
          className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B]">Pedidos Pendientes</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              {pendingCount}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#64748B]">Pedidos en preparación ahora</span>
            </div>
          </div>
        </div>

        {/* Card 3: Pedidos en Entrega */}
        <div
          className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B]">En Envío / Distribución</span>
            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center">
              <Truck size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              {inDeliveryCount}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#64748B]">En camino a la clínica</span>
            </div>
          </div>
        </div>

        {/* Card 4: Pedidos Completados */}
        <div
          className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B]">Pedidos Cobrados</span>
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              {completedCount}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#64748B]">Entregados y cobrados</span>
            </div>
          </div>
        </div>

      </div>

      {/* Middle Financial Analytics Grid (matching reference image 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left: Métodos de Pago Effectiveness (Donut Circular meters) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Efectividad por Medios de Pago</h3>
              <p className="text-xs text-[#64748B]">Porcentaje de cobro sobre el Kit Odontológico Completo</p>
            </div>
          </div>

          {/* Three Circular meters matching reference image 3 */}
          <div className="grid grid-cols-3 gap-3 py-6 text-center">
            {paymentMethods.map((pm) => (
              <div
                key={pm.id}
                className="flex flex-col items-center p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                {/* SVG circular meter */}
                <div className="relative w-20 h-20 mb-2 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#F1F5F9]"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      stroke={pm.color}
                      strokeDasharray={`${pm.percentage}, 100`}
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute font-bold text-sm text-[#0F172A]">{pm.percentage}%</span>
                </div>
                <span className="font-semibold text-xs text-[#0F172A] line-clamp-1">{pm.name.split(' ')[0]}</span>
                <span className="text-[11px] text-[#64748B] font-bold">{pm.amount}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs flex items-center justify-between">
            <span className="text-[#64748B]">Cobranza líder:</span>
            <span className="font-bold text-[#059669] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
              {leadingPaymentMethod ? `${leadingPaymentMethod.name} (${leadingPaymentMethod.percentage}%)` : 'Sin operaciones (0%)'}
            </span>
          </div>
        </div>

        {/* Right: Operational Efficiency & Margins */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Eficiencia y Rendimiento</h3>
              <p className="text-xs text-[#64748B]">Indicadores clave del modelo de distribución</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
              Inicial (En 0)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
              <span className="text-xs font-semibold text-[#64748B]">Margen Operativo</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1">{financialReports?.operatingMargin || '0%'}</div>
              <span className="text-[11px] font-medium text-[#64748B]">Ingresos - gastos del mes</span>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
              <span className="text-xs font-semibold text-[#64748B]">Ticket Promedio</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1">{stats.find(s => s.id === 'average_ticket')?.value || '$0'}</div>
              <span className="text-[11px] font-medium text-[#64748B]">Kit Odontológico c/u</span>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
              <span className="text-xs font-semibold text-[#64748B]">Retención Clínicas</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1">{retentionRate}%</div>
              <span className="text-[11px] font-medium text-[#64748B]">{buyers?.length ? `${buyers.length} clínicas con compras` : 'A iniciar registro'}</span>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
              <span className="text-xs font-semibold text-[#64748B]">Tiempo de Cobro</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1">A convenir</div>
              <span className="text-[11px] font-medium text-[#64748B]">Transferencia / Efectivo</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
            <span>Monitoreo automatizado</span>
            <span className="font-semibold text-[#0F172A]">GM KIT STUDIO Tucumán</span>
          </div>
        </div>

      </div>

      {/* Financial Transactions Table with Filter Tabs (matching reference image 2) */}
      <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
        
        {/* Header with Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F1F5F9]">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Registro de Cobranzas por Clínica</h2>
            <p className="text-xs text-[#64748B]">Facturación y pagos realizados por profesionales odontológicos</p>
          </div>

          {/* Filter Pills Tabs (from reference image 2) */}
          <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl text-xs font-semibold">
            {['Todos', 'Completados', 'En Entrega', 'Pendientes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search bar */}
        <div className="py-4">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Buscar por doctor, clínica o método..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F172A]"
            />
          </div>
        </div>

        {/* Rows List matching reference image 2 format */}
        <div className="divide-y divide-[#F1F5F9]">
          {filteredList.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#64748B]">
              <p className="font-bold text-sm text-[#0F172A] mb-1">No hay cobros registrados todavía</p>
              <p className="text-xs text-[#94A3B8]">Los cobros y entregas de kits odontológicos aparecerán listados aquí.</p>
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.id}
                className="py-3.5 px-2 flex items-center justify-between gap-4 hover:bg-[#F8FAFC] rounded-xl transition-colors group"
              >
                {/* Doctor / Clinic info */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.img}
                    alt={item.customer}
                    className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#0F172A] truncate group-hover:text-[#1E5A9C] transition-colors">
                      {item.customer}
                    </div>
                    <div className="text-[11px] text-[#64748B] truncate">
                      {item.clinic}
                    </div>
                  </div>
                </div>

                {/* Kits Count */}
                <div className="text-center shrink-0">
                  <span className="text-xs font-semibold text-[#475569]">
                    {item.qty} {item.qty === 1 ? 'Kit' : 'Kits'}
                  </span>
                  <div className="text-[10px] text-[#94A3B8]">{item.paymentMethod || 'Transferencia'}</div>
                </div>

                {/* Amount Earned / Cobrado */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-extrabold text-[#0F172A]">
                    {item.total}{' '}
                    <span className="text-[10px] font-normal text-[#64748B]">Cobrado</span>
                  </span>


                </div>
              </div>
            ))
          )}
        </div>

      </div>


    </div>
  );
};

export default AdminFinanzas;
