import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreHorizontal, Inbox } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import NewTransactionModal from './modals/NewTransactionModal';

const RecentTransactionsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { transactions = [], addTransaction } = useAdminData();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.newOrderCustomer) {
      setIsModalOpen(true);
      // Remove it from state so it doesn't open on reload
      navigate('.', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const filteredTransactions = (transactions || []).filter(
    (t) =>
      t.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.product?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            Completado
          </span>
        );
      case 'Enviado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#3B82F6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
            Enviado
          </span>
        );
      case 'En Preparación':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#F59E0B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
            En Preparación
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] font-geist">

      {/* Top Header: Title, Search, and Add Transaction Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F1F5F9]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
              ÚLTIMAS TRANSACCIONES
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B]">
              Últimas 5
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Registro en tiempo real de compras y despachos de kits
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Buscar transacción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F172A] focus:bg-white transition-all w-48 sm:w-60"
            />
          </div>

          {/* Add Transaction Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#0F172A] hover:bg-[#1E293B] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">Nueva Transacción</span>
            <span className="sm:hidden">Nuevo</span>
          </button>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-175">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              <th className="py-3.5 pl-1 pr-3">ID</th>
              <th className="py-3.5 px-3">Cliente / Clínica</th>
              <th className="py-3.5 px-3">Producto</th>
              <th className="py-3.5 px-3">Método de Pago</th>
              <th className="py-3.5 px-3">Estado</th>
              <th className="py-3.5 px-3 text-center">Cantidad</th>
              <th className="py-3.5 px-3 text-right">Precio Unit.</th>
              <th className="py-3.5 px-3 text-right">Total</th>
              <th className="py-3.5 px-3">Fecha</th>
              <th className="py-3.5 pl-3 pr-1 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-xs">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-xs text-[#64748B]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#94A3B8]">
                      <Inbox size={20} />
                    </div>
                    <span className="font-bold text-sm text-[#0F172A]">No hay transacciones registradas</span>
                    <p className="text-xs text-[#94A3B8] max-w-sm">
                      El historial se encuentra en 0. Las nuevas ventas y cobros aparecerán aquí en tiempo real.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-[#F8FAFC] transition-colors group cursor-default"
                >
                  {/* ID */}
                  <td className="py-3.5 pl-1 pr-3 font-semibold text-[#0F172A]">
                    {tx.id}
                  </td>

                  {/* Cliente */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={tx.img}
                        alt={tx.customer}
                        className="w-8 h-8 rounded-full object-cover border border-[#E2E8F0] shrink-0"
                      />
                      <div>
                        <div className="font-bold text-[#0F172A]">{tx.customer}</div>
                        <div className="text-[11px] text-[#64748B] truncate max-w-45">
                          {tx.clinic}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Producto */}
                  <td className="py-3.5 px-3 font-medium text-[#334155]">
                    {tx.product}
                  </td>

                  {/* Metodo de Pago */}
                  <td className="py-3.5 px-3 text-[#334155] font-medium whitespace-nowrap">
                    {tx.paymentMethod}
                  </td>

                  {/* Estado */}
                  <td className="py-3.5 px-3">
                    {getStatusBadge(tx.status)}
                  </td>

                  {/* Cantidad */}
                  <td className="py-3.5 px-3 text-center font-bold text-[#0F172A]">
                    {tx.qty}
                  </td>

                  {/* Precio Unitario */}
                  <td className="py-3.5 px-3 text-right text-[#64748B] font-medium">
                    {tx.unitPrice}
                  </td>

                  {/* Total */}
                  <td className="py-3.5 px-3 text-right font-extrabold text-[#0F172A]">
                    {tx.total}
                  </td>

                  {/* Fecha */}
                  <td className="py-3.5 px-3 text-[#64748B] whitespace-nowrap">
                    {tx.date}
                  </td>

                  {/* Acciones */}
                  <td className="py-3.5 pl-3 pr-1 text-center">
                    <button
                      type="button"
                      title="Ver detalle"
                      className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-all cursor-pointer"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer info */}
      <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
        <span>Mostrando <strong>{filteredTransactions.length} transacciones</strong></span>
        <span className="text-[11px] font-semibold text-[#0F172A] hover:underline cursor-pointer">
          Ver historial completo →
        </span>
      </div>

      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addTransaction}
        defaultCustomer={location.state?.newOrderCustomer}
        defaultClinic={location.state?.newOrderClinic}
        defaultPhone={location.state?.newOrderPhone}
      />
    </div>
  );
};

export default RecentTransactionsTable;
