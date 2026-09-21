import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import StatCards from '../../components/admin/StatCards';
import SalesTrendChart from '../../components/admin/SalesTrendChart';
import PaymentMethodsBreakdown from '../../components/admin/PaymentMethodsBreakdown';
import RecentTransactionsTable from '../../components/admin/RecentTransactionsTable';
import TopBuyers from '../../components/admin/TopBuyers';
import CustomerProfileModal from '../../components/admin/modals/CustomerProfileModal';
import { Calendar, ChevronDown, Sparkles, Truck, ShieldCheck, MessageCircle, ArrowRight, Search, Plus, UserPlus } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

const AdminDashboard = () => {
  const [userName, setUserName] = useState('Gonzalo');
  const { timeframe, setTimeframe, supplierData, buyers, dateRange, setCustomDateRange } = useAdminData();
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Filter buyers for search dropdown
  const filteredBuyers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return (buyers || []).filter(b => 
      b.name.toLowerCase().includes(query) || 
      (b.phone && b.phone.includes(query)) ||
      (b.clinicName && b.clinicName.toLowerCase().includes(query))
    ).slice(0, 5); // top 5 results
  }, [searchQuery, buyers]);

  const handleSelectBuyer = (buyer) => {
    setSelectedBuyer(buyer);
    setIsProfileModalOpen(true);
    setSearchQuery(''); // clear search after opening
  };

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
          {/* Period Selector: Semana, Mes, Año, Personalizado */}
          <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl p-1 shadow-xs">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="appearance-none bg-transparent text-[#0F172A] pl-3 pr-8 py-1.5 text-xs font-semibold hover:text-[#1E5A9C] transition-all cursor-pointer outline-none"
            >
              <option value="Semanal">Por Semana</option>
              <option value="Mensual">Por Mes</option>
              <option value="Anual">Por Año</option>
              <option value="Personalizado">Rango Personalizado</option>
            </select>
            
            {timeframe === 'Personalizado' && (
              <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0]">
                <input 
                  type="date" 
                  value={dateRange?.start || ''}
                  onChange={(e) => setCustomDateRange(e.target.value, dateRange?.end || '')}
                  className="text-xs bg-transparent outline-none text-[#64748B] font-medium"
                />
                <span className="text-[#94A3B8] text-xs">a</span>
                <input 
                  type="date" 
                  value={dateRange?.end || ''}
                  onChange={(e) => setCustomDateRange(dateRange?.start || '', e.target.value)}
                  className="text-xs bg-transparent outline-none text-[#64748B] font-medium pr-2"
                />
              </div>
            )}
          </div>

          {/* Current Date Badge */}
          <div className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] text-[#0F172A] px-3 py-2 rounded-xl text-xs font-semibold shadow-xs">
            <Calendar size={13} className="text-[#1E5A9C]" />
            <span>{getDateLabel()}</span>
          </div>
        </div>
      </div>
      {/* Quick Actions & Universal Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Buscar cliente por nombre, clínica o teléfono para ver su ficha..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#1E5A9C] focus:ring-2 focus:ring-[#1E5A9C]/20 transition-all shadow-sm"
            />
          </div>
          {/* Dropdown Results */}
          {searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-[#E2E8F0] overflow-hidden z-50">
              {filteredBuyers.length > 0 ? (
                <div className="max-h-64 overflow-y-auto">
                  {filteredBuyers.map(buyer => (
                    <div
                      key={buyer._id}
                      onClick={() => handleSelectBuyer(buyer)}
                      className="px-4 py-3 hover:bg-[#F8FAFC] cursor-pointer border-b border-[#F1F5F9] last:border-b-0 flex items-center gap-3 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#1E5A9C]/10 text-[#1E5A9C] flex items-center justify-center font-bold text-xs shrink-0">
                        {buyer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0F172A]">{buyer.name}</div>
                        <div className="text-xs text-[#64748B]">
                          {buyer.phone || 'Sin teléfono'} {buyer.clinicName && `• ${buyer.clinicName}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-[#64748B]">
                  No se encontraron clientes que coincidan con "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('.', { state: { openNewTransactionModal: true } })}
            className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-4 py-3 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} />
            Nueva Venta
          </button>
          <button
            onClick={() => navigate('/admin/clientes')}
            className="flex items-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] px-4 py-3 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
          >
            <UserPlus size={18} />
            Nuevo Cliente
          </button>
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

      {/* 3. Bottom Section: Últimas Transacciones y Mejores Clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RecentTransactionsTable />
        </div>
        <div className="lg:col-span-1">
          <TopBuyers />
        </div>
      </div>

      <CustomerProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        buyer={selectedBuyer} 
      />
    </div>
  );
};

export default AdminDashboard;
