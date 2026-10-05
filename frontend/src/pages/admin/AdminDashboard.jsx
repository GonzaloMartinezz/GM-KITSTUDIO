import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import StatCards from '../../components/admin/StatCards';
import SalesTrendChart from '../../components/admin/SalesTrendChart';
import PaymentMethodsBreakdown from '../../components/admin/PaymentMethodsBreakdown';
import RecentTransactionsTable from '../../components/admin/RecentTransactionsTable';
import CustomerProfileModal from '../../components/admin/modals/CustomerProfileModal';
import { Calendar, ChevronDown, Sparkles, Truck, ShieldCheck, MessageCircle, ArrowRight, Search, Plus, UserPlus, Phone, AlertTriangle } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

const AdminDashboard = () => {
  const [userName, setUserName] = useState('Gonzalo');
  const { timeframe, setTimeframe, supplierData, buyers, leads, dateRange, setCustomDateRange, dashboard, loading, error, resetToDefaults } = useAdminData();
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Buscador unificado: compradores reales (con órdenes) + clientes propios
  // (Leads cargados a mano, todavía sin comprar por la web). Antes esto
  // rompía silenciosamente si algún registro no tenía "name" cargado.
  const searchableClients = useMemo(() => {
    const fromBuyers = (buyers || []).map((b) => ({
      _id: b._id,
      name: b.name || 'Sin nombre',
      phone: b.phone || '',
      clinicName: b.clinicName || b.clinic || '',
      totalSpent: b.totalSpent || 0,
      totalKits: b.totalKits || 0,
      balance: b.balance || 0,
      lastPurchaseDate: b.lastPurchaseDate || null,
      isLead: false,
    }));
    const fromLeads = (leads || []).map((l) => ({
      _id: l._id,
      name: l.name || 'Sin nombre',
      phone: l.phone || '',
      clinicName: l.clinic || '',
      totalSpent: 0,
      totalKits: l.kitsBought || 0,
      balance: 0,
      lastPurchaseDate: null,
      isLead: true,
    }));
    return [...fromBuyers, ...fromLeads];
  }, [buyers, leads]);

  const filteredBuyers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return searchableClients.filter(b =>
      b.name.toLowerCase().includes(query) ||
      (b.phone && b.phone.includes(query)) ||
      (b.clinicName && b.clinicName.toLowerCase().includes(query))
    ).slice(0, 8); // top resultados
  }, [searchQuery, searchableClients]);

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
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonthStr = today.toLocaleString('es-AR', { month: 'short' }); // ej 'oct'
    const capitalizedMonth = currentMonthStr.charAt(0).toUpperCase() + currentMonthStr.slice(1);
    
    switch (timeframe) {
      case 'Semanal':
        return `Semana actual (${capitalizedMonth} ${currentYear})`;
      case 'Anual':
        return `Año Fiscal ${currentYear}`;
      case 'Mensual':
      default:
        // Ej: 4 Oct 2026
        return `${today.getDate()} ${capitalizedMonth} ${currentYear}`;
    }
  };

  return (
    <div className="w-full font-geist flex flex-col relative pb-12">

      {/* Error al cargar datos: antes esto fallaba en silencio y el panel
          quedaba con todo en $0/0 sin ninguna explicación, sobre todo en
          redes de celular más lentas donde el backend tarda en responder. */}
      {error && (
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold">
          <AlertTriangle size={16} className="shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            onClick={resetToDefaults}
            disabled={loading}
            className="shrink-0 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            {loading ? 'Reintentando...' : 'Reintentar'}
          </button>
        </div>
      )}

      {/* Low Stock Alert Banner */}
      {dashboard?.lowStockAlerts > 0 && (
        <div className="mb-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold">
          <AlertTriangle size={16} className="shrink-0" />
          <span>
            {dashboard.lowStockAlerts === 1
              ? `${dashboard.lowStockProducts?.[0]?.name || 'Un producto'} está por debajo del stock mínimo (${dashboard.lowStockProducts?.[0]?.stock ?? 0} de ${dashboard.lowStockProducts?.[0]?.minStock ?? 0}).`
              : `${dashboard.lowStockAlerts} productos están por debajo del stock mínimo.`}
          </span>
          <button
            onClick={() => navigate('/admin/inventario')}
            className="ml-auto shrink-0 text-[11px] font-bold underline hover:no-underline"
          >
            Ver Inventario
          </button>
        </div>
      )}

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
                        {(buyer.name || '?').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                          {buyer.name}
                          {buyer.isLead && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B]">MI CLIENTE</span>
                          )}
                        </div>
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
        <div className="flex flex-wrap items-center gap-3 shrink-0">
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
          {supplierData?.phone && (
            <a
              href={`tel:${supplierData.phone}`}
              className="flex items-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] px-4 py-3 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
              title={`Llamar a ${supplierData.company || 'Proveedor'}`}
            >
              <Phone size={18} className="text-[#1E5A9C]" />
              Llamar Proveedor
            </a>
          )}
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
      <div className="mb-6">
        <RecentTransactionsTable />
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
