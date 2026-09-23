import React, { useState } from 'react';
import {
  Package,
  PackageCheck,
  Clock,
  TrendingUp,
  Truck,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Phone,
  Building2,
  MessageCircle,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  Layers,
  Sparkles,
  Archive,
  RefreshCw,
  X,
  Check
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminInventario = () => {
  const {
    addReservation,
    fulfillReservation,
    cancelReservation,
    adjustStock,
    receiveTransitBatch,
    supplierData,
    kitProduct,
    supplierOrders,
    reservations,
    inventoryData
  } = useAdminData();

  const [activeTab, setActiveTab] = useState('reservados'); // 'reservados' | 'lotes' | 'componentes'
  const [searchQuery, setSearchQuery] = useState('');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

  // Form state for New Reservation
  const [reserveForm, setReserveForm] = useState({
    doctor: '',
    clinic: '',
    kits: '',
    surgeryDate: '18 Sep 2026 - 10:00 am',
    surgeryType: 'Cirugía de Implantes Dentales',
    paymentStatus: 'Seña 50% Pagada',
    contact: '+54 9 381 ',
  });

  // Form state for Adding Stock
  const [stockAddCount, setStockAddCount] = useState('');

  const stockAvailable = kitProduct?.stock || 0;
  const minThreshold = kitProduct?.minStock || 30;
  const kitPrice = kitProduct?.price || 14500;
  const stockReserved = reservations?.reduce((acc, r) => acc + (r.kits || 1), 0) || 0;
  const stockSoldMonth = 0; // TODO: Calculate from transactions
  const stockInTransit = supplierOrders?.reduce((acc, o) => acc + (o.status === 'En Tránsito' ? (o.kits || 0) : 0), 0) || 0;

  const totalInWarehouse = stockAvailable + stockReserved;
  const totalInCircuit = stockAvailable + stockReserved + stockInTransit;

  const [formError, setFormError] = useState('');

  const handleCreateReservation = async (e) => {
    e.preventDefault();
    setFormError('');
    const kits = Number(reserveForm.kits) || 1;
    try {
      await addReservation({
        ...reserveForm,
        kits,
        total: kits * kitPrice,
        status: 'Confirmado',
      });
      setIsReserveModalOpen(false);
      setReserveForm({
        doctor: '',
        clinic: '',
        kits: '',
        surgeryDate: '18 Sep 2026 - 10:00 am',
        surgeryType: 'Cirugía de Implantes Dentales',
        paymentStatus: 'Seña 50% Pagada',
        contact: '+54 9 381 ',
      });
    } catch (err) {
      setFormError(err?.response?.data?.message || 'No se pudo crear la reserva.');
    }
  };

  const handleAddStockSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      await adjustStock(Number(stockAddCount) || 10);
      setIsStockModalOpen(false);
      setStockAddCount('');
    } catch (err) {
      setFormError(err?.response?.data?.message || 'No se pudo ingresar el stock.');
    }
  };

  const filteredReservations = (reservations || []).filter((r) =>
    r.doctor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.clinic?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full font-geist flex flex-col relative pb-16">

      {formError && (
        <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {formError}
        </div>
      )}

      {/* ── TOP BANNER & ACTIONS ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Control de Inventario y Stock de Kits
            </h1>
            {stockAvailable > 0 ? (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 flex items-center gap-1">
                <CheckCircle2 size={13} /> Stock en Nivel Seguro
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1">
                <AlertTriangle size={13} className="text-amber-500" /> Inventario en 0 (Sin stock)
              </span>
            )}
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1E5A9C]/10 text-[#1E5A9C] border border-[#1E5A9C]/20">
              Depósito Central Tucumán
            </span>
          </div>
          <p className="text-[#64748B] text-xs sm:text-sm">
            Monitoreo en tiempo real de kits listos para entrega, unidades reservadas para cirugías y lotes estériles ANMAT
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsReserveModalOpen(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-orange-500/25 transition-all cursor-pointer active:scale-[0.98]"
          >
            <Clock size={16} />
            <span>Reservar Kits para Cirugía</span>
          </button>

          <button
            onClick={() => setIsStockModalOpen(true)}
            className="flex items-center gap-2 bg-[#1E5A9C] hover:bg-[#16487D] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#1E5A9C]/25 transition-all cursor-pointer active:scale-[0.98]"
          >
            <Plus size={16} />
            <span>Ingresar Stock (+Kits)</span>
          </button>
        </div>
      </div>

      {/* ── 4 KEY METRIC CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* 1. STOCK DISPONIBLE (Por Vender) */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-[#059669]" /> Stock Disponible
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#10B981]/15 text-[#059669]">
              {stockAvailable > 0 ? 'Listo para Entrega' : 'Agotado (0)'}
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">
                {stockAvailable}
              </h2>
              <span className="text-xs text-[#64748B] font-semibold">kits libres</span>
            </div>
            <p className="text-xs text-[#64748B] mt-1.5">
              Valorizable en <strong className="text-[#059669]">${(stockAvailable * kitPrice).toLocaleString('es-AR')}</strong> (PVP regular)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
            <span>Umbral mínimo: {minThreshold} kits</span>
            <span className={stockAvailable >= minThreshold ? "text-[#059669] font-bold" : "text-amber-600 font-bold"}>
              {stockAvailable >= minThreshold ? "Sin quiebre" : "Reponer stock"}
            </span>
          </div>
        </div>

        {/* 2. KITS RESERVADOS (Cirugías Programadas) */}
        <div className="bg-white rounded-2xl p-5 border border-orange-200 shadow-xs flex flex-col justify-between relative overflow-hidden bg-linear-to-br from-white to-orange-50/25">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C2410C] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-500" /> Kits Reservados
            </span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-orange-500 text-white uppercase tracking-wide">
              {reservations?.length || 0} Cirugías
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#C2410C]">
                {stockReserved}
              </h2>
              <span className="text-xs text-[#C2410C] font-semibold">comprometidos</span>
            </div>
            <p className="text-xs text-[#64748B] mt-1.5">
              Facturación asignada: <strong className="text-[#C2410C]">${(stockReserved * kitPrice).toLocaleString('es-AR')}</strong>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-orange-100 flex items-center justify-between text-[11px]">
            <span className="text-[#64748B]">En custodia para turnos</span>
            <span className="text-orange-600 font-bold">Esta semana</span>
          </div>
        </div>

        {/* 3. KITS VENDIDOS (Histórico Mensual) */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#1E5A9C]" /> Kits Vendidos
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#1E5A9C]/10 text-[#1E5A9C]">
              En Septiembre
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">
                {stockSoldMonth}
              </h2>
              <span className="text-xs text-[#64748B] font-semibold">/ 520 meta</span>
            </div>
            <p className="text-xs text-[#64748B] mt-1.5">
              Facturado: <strong className="text-[#0F172A]">${(stockSoldMonth * kitPrice).toLocaleString('es-AR')}</strong> (0% de avance)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
            <span>Rotación: <strong>0 kits/día</strong></span>
            <span className="text-[#1E5A9C] font-bold">A iniciar</span>
          </div>
        </div>

        {/* 4. EN TRÁNSITO / POR RECIBIR */}
        <div className="bg-white rounded-2xl p-5 border border-[#CBD5E1] shadow-xs flex flex-col justify-between relative overflow-hidden bg-linear-to-br from-white to-blue-50/20">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#1E5A9C]" /> En Tránsito (Fábrica)
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              Al día (0)
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#1E5A9C]">
                {stockInTransit}
              </h2>
              <span className="text-xs text-[#64748B] font-semibold">kits en camino</span>
            </div>
            <p className="text-xs text-[#64748B] mt-1.5">
              Sin despachos pendientes en tránsito
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px]">
            <span className="text-[#64748B]">Todos recibidos</span>
            <span className="text-[#64748B]">Total: {totalInCircuit} kits</span>
          </div>
        </div>

      </div>

      {/* ── STOCK BREAKDOWN VISUAL BAR ── */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="font-bold text-sm text-[#0F172A]">Distribución Global del Stock en Circuito</h3>
            <p className="text-xs text-[#64748B]">Capacidad total disponible, reservas activas y abastecimiento</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
              <span className="text-[#334155]">{stockAvailable} Disponibles ({totalInCircuit > 0 ? Math.round((stockAvailable / totalInCircuit) * 100) : 0}%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-[#334155]">{stockReserved} Reservados ({totalInCircuit > 0 ? Math.round((stockReserved / totalInCircuit) * 100) : 0}%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#1E5A9C]"></span>
              <span className="text-[#334155]">{stockInTransit} En Camino ({totalInCircuit > 0 ? Math.round((stockInTransit / totalInCircuit) * 100) : 0}%)</span>
            </span>
          </div>
        </div>

        {/* Progress Strip */}
        <div className="w-full h-3 bg-[#F1F5F9] rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#10B981] transition-all duration-500"
            style={{ width: `${totalInCircuit > 0 ? (stockAvailable / totalInCircuit) * 100 : 0}%` }}
            title={`Disponibles: ${stockAvailable} kits`}
          />
          <div
            className="h-full bg-orange-500 transition-all duration-500"
            style={{ width: `${totalInCircuit > 0 ? (stockReserved / totalInCircuit) * 100 : 0}%` }}
            title={`Reservados: ${stockReserved} kits`}
          />
          <div
            className="h-full bg-[#1E5A9C] transition-all duration-500"
            style={{ width: `${totalInCircuit > 0 ? (stockInTransit / totalInCircuit) * 100 : 0}%` }}
            title={`En Tránsito: ${stockInTransit} kits`}
          />
        </div>
      </div>

      {/* ── TABS NAVIGATION ── */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('reservados')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'reservados'
            ? 'bg-[#1E5A9C] text-white shadow-xs'
            : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
            }`}
        >
          <Clock size={16} />
          <span>Kits Reservados para Cirugías ({inventoryData?.reservedList?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('lotes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'lotes'
            ? 'bg-[#1E5A9C] text-white shadow-xs'
            : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
            }`}
        >
          <ShieldCheck size={16} />
          <span>Lotes y Esterilidad ANMAT</span>
        </button>

        <button
          onClick={() => setActiveTab('componentes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'componentes'
            ? 'bg-[#1E5A9C] text-white shadow-xs'
            : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
            }`}
        >
          <Layers size={16} />
          <span>Insumos del Paquete Cerrado (8)</span>
        </button>
      </div>

      {/* ── TAB 1: KITS RESERVADOS (Detalle por cirugías) ── */}
      {activeTab === 'reservados' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-[#0F172A]">Kits Comprometidos para Cirugías</h3>
              <p className="text-xs text-[#64748B]">Detalle de profesionales, turnos de quirófano y estado de señas</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Buscar doctor o clínica..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs focus:outline-none focus:border-[#1E5A9C]"
                />
              </div>

              <button
                onClick={() => setIsReserveModalOpen(true)}
                className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Plus size={14} />
                <span>Nueva Reserva</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#64748B] font-semibold uppercase tracking-wider text-[10px] border-b border-[#E2E8F0]">
                <tr>
                  <th className="py-3 px-4">Profesional / Clínica</th>
                  <th className="py-3 px-4">Cirugía & Fecha</th>
                  <th className="py-3 px-4 text-center">Kits Reservados</th>
                  <th className="py-3 px-4">Valor / Cobranza</th>
                  <th className="py-3 px-4 text-center">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 px-4 text-center">
                      <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-400 flex items-center justify-center mb-3">
                          <Clock size={24} />
                        </div>
                        <h4 className="font-bold text-sm text-[#0F172A] mb-1">No hay reservas de cirugías registradas</h4>
                        <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                          Cuando un profesional o clínica reserve kits para una intervención quirúrgica, aparecerán aquí para control de turnos y señas.
                        </p>
                        <button
                          onClick={() => setIsReserveModalOpen(true)}
                          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                        >
                          <Plus size={14} />
                          <span>Registrar Primera Reserva</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <strong className="text-[#0F172A] block text-sm">{res.doctor}</strong>
                        <span className="text-[11px] text-[#64748B]">{res.clinic}</span>
                        <a
                          href={`https://wa.me/${res.contact.replace(/\D/g, '')}?text=${encodeURIComponent('Hola ' + res.doctor + ', te escribo de GM Kit Studio para confirmar la entrega de los kits para la cirugía.')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-[#059669] hover:underline font-bold flex items-center gap-1 mt-0.5"
                        >
                          <MessageCircle size={11} /> {res.contact}
                        </a>
                      </td>

                      <td className="py-3.5 px-4">
                        <strong className="text-[#334155] block">{res.surgeryType}</strong>
                        <span className="text-[11px] text-[#1E5A9C] font-semibold flex items-center gap-1 mt-0.5">
                          <Calendar size={12} /> {res.surgeryDate}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-3 py-1 rounded-xl bg-orange-100 text-[#C2410C] font-black text-sm">
                          {res.kits} kits
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-sm font-black text-[#0F172A] block">${res.total.toLocaleString('es-AR')}</span>
                        <span className="text-[11px] text-[#059669] font-semibold">{res.paymentStatus}</span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                          <Clock size={12} />
                          {res.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => fulfillReservation(res.id)}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-[#10B981] hover:bg-[#059669] text-white shadow-xs transition-all cursor-pointer"
                            title="Marcar como Despachado y Vendido"
                          >
                            Despachar
                          </button>
                          <button
                            onClick={() => cancelReservation(res.id)}
                            className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                            title="Liberar kits al stock general"
                          >
                            Liberar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 2: LOTES Y ESTERILIDAD ANMAT ── */}
      {activeTab === 'lotes' && (
        <div>
          {(!inventoryData?.lots || inventoryData.lots.length === 0) ? (
            <div className="bg-white rounded-2xl p-12 border border-[#E2E8F0] shadow-xs text-center flex flex-col items-center justify-center max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E5A9C] flex items-center justify-center mb-3">
                <ShieldCheck size={26} />
              </div>
              <h4 className="font-bold text-base text-[#0F172A] mb-1">No hay lotes de producción registrados</h4>
              <p className="text-xs text-[#64748B] leading-relaxed max-w-md mb-4">
                Aquí se listarán los números de lote oficiales, estado de esterilización por Óxido de Etileno (ETO) y fecha de vencimiento otorgada por ANMAT al ingresar stock.
              </p>
              <button
                onClick={() => setIsStockModalOpen(true)}
                className="flex items-center gap-1.5 bg-[#1E5A9C] hover:bg-[#16487D] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <Plus size={14} />
                <span>Ingresar Stock y Crear Lote</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {inventoryData.lots.map((lot, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono font-bold text-[#1E5A9C] bg-[#1E5A9C]/10 px-2 py-0.5 rounded-md">
                        {lot.lotNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${lot.status.includes('Tránsito')
                        ? 'bg-blue-100 text-[#1E5A9C]'
                        : 'bg-[#10B981]/15 text-[#059669]'
                        }`}>
                        {lot.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#0F172A] mb-1">
                      Lote de Producción Médica
                    </h3>
                    <p className="text-xs text-[#64748B] mb-4">
                      Certificación: <strong className="text-[#059669]">{lot.anmatStatus}</strong>
                    </p>

                    <div className="space-y-2 text-xs py-3 border-y border-[#F1F5F9]">
                      <div className="flex justify-between text-[#64748B]">
                        <span>Kits Fabricados Iniciales:</span>
                        <strong className="text-[#0F172A]">{lot.kitsInitial} kits</strong>
                      </div>
                      <div className="flex justify-between text-[#64748B]">
                        <span>Kits Restantes en Stock:</span>
                        <strong className="text-[#059669]">{lot.kitsRemaining} kits</strong>
                      </div>
                      <div className="flex justify-between text-[#64748B]">
                        <span>Fecha Esterilización ETO:</span>
                        <span className="text-[#0F172A] font-medium">{lot.sterilityDate}</span>
                      </div>
                      <div className="flex justify-between text-[#64748B]">
                        <span>Vencimiento de Barrera:</span>
                        <span className="text-[#0F172A] font-medium">{lot.expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <div className="flex justify-between text-[11px] text-[#64748B] mb-1">
                      <span>Consumo del lote</span>
                      <span>{Math.round(((lot.kitsInitial - lot.kitsRemaining) / (lot.kitsInitial || 1)) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1E5A9C] rounded-full"
                        style={{ width: `${((lot.kitsInitial - lot.kitsRemaining) / (lot.kitsInitial || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: INSUMOS COMPONENTES (8) ── */}
      {activeTab === 'componentes' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#F1F5F9]">
            <h3 className="font-bold text-base text-[#0F172A]">Stock de los 8 Insumos Médicos Certificados</h3>
            <p className="text-xs text-[#64748B]">Unidades individuales de respaldo para el armado y sellado del paquete final</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
            {inventoryData?.componentsStock?.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669]">
                      {item.status}
                    </span>
                    <span className="text-[10px] font-bold text-[#64748B]">
                      {item.perKit} por kit
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] leading-snug mb-2">
                    {item.name}
                  </h4>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-[#64748B] block">Stock Unidades</span>
                    <strong className="text-base font-black text-[#0F172A]">{item.unitStock} u.</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#64748B] block">Capacidad</span>
                    <strong className="text-sm font-bold text-[#1E5A9C]">{item.kitsEquiv} kits</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MODAL: RESERVAR KITS PARA CIRUGÍA ── */}
      <AnimatePresence>
        {isReserveModalOpen && (
          <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-100">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#E2E8F0]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Reservar Kits para Cirugía</h3>
                  <p className="text-xs text-[#64748B]">Compromete kits del stock para un profesional</p>
                </div>
                <button
                  onClick={() => setIsReserveModalOpen(false)}
                  className="text-[#64748B] hover:text-[#0F172A] font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateReservation} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[#64748B] font-semibold mb-1">Nombre del Doctor / Cirujano</label>
                  <input
                    type="text"
                    placeholder="Ej. Dr. Juan Pérez"
                    value={reserveForm.doctor}
                    onChange={(e) => setReserveForm({ ...reserveForm, doctor: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#64748B] font-semibold mb-1">Clínica / Consultorio</label>
                  <input
                    type="text"
                    placeholder="Ej. Consultorios Yerba Buena"
                    value={reserveForm.clinic}
                    onChange={(e) => setReserveForm({ ...reserveForm, clinic: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Cantidad de Kits</label>
                    <input
                      type="number"
                      value={reserveForm.kits}
                      onChange={(e) => setReserveForm({ ...reserveForm, kits: e.target.value === '' ? '' : Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold"
                      min="1"
                      required
                    />
                    <span className="text-[10px] text-[#64748B]">Max disponible: {stockAvailable} kits</span>
                  </div>
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Total a Cobrar ($)</label>
                    <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] font-black text-[#0F172A]">
                      ${((Number(reserveForm.kits) || 0) * kitPrice).toLocaleString('es-AR')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Fecha & Hora Cirugía</label>
                    <input
                      type="text"
                      value={reserveForm.surgeryDate}
                      onChange={(e) => setReserveForm({ ...reserveForm, surgeryDate: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs"
                      placeholder="Ej. 18 Sep 2026 - 10:00 am"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Estado de Pago</label>
                    <select
                      value={reserveForm.paymentStatus}
                      onChange={(e) => setReserveForm({ ...reserveForm, paymentStatus: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold"
                    >
                      <option value="Seña 50% Pagada">Seña 50% Pagada</option>
                      <option value="100% Pagado">100% Pagado</option>
                      <option value="Pago contra entrega">Pago contra entrega</option>
                      <option value="Pendiente">Pendiente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#64748B] font-semibold mb-1">Tipo de Cirugía</label>
                  <input
                    type="text"
                    placeholder="Ej. Implantes / Terceros Molares"
                    value={reserveForm.surgeryType}
                    onChange={(e) => setReserveForm({ ...reserveForm, surgeryType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[#64748B] font-semibold mb-1">Teléfono / WhatsApp de Contacto</label>
                  <input
                    type="text"
                    value={reserveForm.contact}
                    onChange={(e) => setReserveForm({ ...reserveForm, contact: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs"
                    placeholder="Ej. +54 9 381 000 0000"
                    required
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setIsReserveModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] text-xs font-bold text-[#64748B]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md"
                  >
                    Confirmar Reserva
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: INGRESAR STOCK ── */}
      <AnimatePresence>
        {isStockModalOpen && (
          <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-100">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#E2E8F0]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
                <h3 className="text-base font-bold text-[#0F172A]">Ingresar Kits al Stock</h3>
                <button
                  onClick={() => setIsStockModalOpen(false)}
                  className="text-[#64748B] hover:text-[#0F172A] font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddStockSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#64748B] font-semibold mb-1">Cantidad de Kits a Ingresar</label>
                  <input
                    type="number"
                    value={stockAddCount}
                    onChange={(e) => setStockAddCount(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-sm font-black"
                    min="1"
                    required
                  />
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1.5">
                  <div className="flex justify-between text-[#64748B]">
                    <span>Stock actual libre:</span>
                    <strong>{stockAvailable} kits</strong>
                  </div>
                  <div className="flex justify-between text-[#059669] font-bold">
                    <span>Stock tras ingreso:</span>
                    <span>{stockAvailable + (Number(stockAddCount) || 0)} kits</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setIsStockModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] text-xs font-bold text-[#64748B]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1E5A9C] hover:bg-[#16487D] text-white text-xs font-bold shadow-md"
                  >
                    Añadir al Depósito
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminInventario;
