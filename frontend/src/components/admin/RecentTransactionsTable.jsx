import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

const RecentTransactionsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // 5 Latest transactions matching GM KIT STUDIO
  const transactions = [
    {
      id: '#GM-04910',
      customer: 'Dr. Roberto Sánchez',
      clinic: 'Centro Odontológico San Miguel',
      product: 'Kit Odontológico Completo',
      status: 'Completado',
      qty: 12,
      unitPrice: '$14.500',
      total: '$174.000',
      date: 'Hoy, 15:30',
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&q=80',
    },
    {
      id: '#GM-04911',
      customer: 'Dra. María Gómez',
      clinic: 'Clínica Quirúrgica Norte',
      product: 'Camisolines SMS Quirúrgicos',
      status: 'Completado',
      qty: 20,
      unitPrice: '$4.200',
      total: '$84.000',
      date: 'Hoy, 11:20',
      img: 'https://images.unsplash.com/photo-1594824436951-7f126f5fb5fb?w=80&h=80&fit=crop&q=80',
    },
    {
      id: '#GM-04912',
      customer: 'Dr. Carlos Ruiz',
      clinic: 'Implantes Tucumán (Yerba Buena)',
      product: 'Kit Odontológico Completo',
      status: 'Enviado',
      qty: 5,
      unitPrice: '$14.500',
      total: '$72.500',
      date: 'Ayer, 18:45',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&h=80&fit=crop&q=80',
    },
    {
      id: '#GM-04913',
      customer: 'Instituto Odontológico NOA',
      clinic: 'Barrio Sur',
      product: 'Campos Quirúrgicos 100x100',
      status: 'En Preparación',
      qty: 22,
      unitPrice: '$3.800',
      total: '$83.600',
      date: 'Ayer, 14:10',
      img: 'https://images.unsplash.com/photo-1537368910025-702800faa86b?w=80&h=80&fit=crop&q=80',
    },
    {
      id: '#GM-04914',
      customer: 'Dra. Valentina Paz',
      clinic: 'Consultorios Médicos Av. Aconquija',
      product: 'Kit Odontológico Completo',
      status: 'Completado',
      qty: 14,
      unitPrice: '$14.500',
      total: '$203.000',
      date: '12 Sep, 10:00',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&q=80',
    },
  ];

  const filteredTransactions = transactions.filter(
    (t) =>
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.product.toLowerCase().includes(searchQuery.toLowerCase())
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
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              <th className="py-3.5 pl-1 pr-3">ID</th>
              <th className="py-3.5 px-3">Cliente / Clínica</th>
              <th className="py-3.5 px-3">Producto</th>
              <th className="py-3.5 px-3">Estado</th>
              <th className="py-3.5 px-3 text-center">Cantidad</th>
              <th className="py-3.5 px-3 text-right">Precio Unit.</th>
              <th className="py-3.5 px-3 text-right">Total</th>
              <th className="py-3.5 pl-3 pr-1 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-xs">
            {filteredTransactions.map((tx) => (
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
                      <div className="text-[11px] text-[#64748B] truncate max-w-[180px]">
                        {tx.clinic}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Producto */}
                <td className="py-3.5 px-3 font-medium text-[#334155]">
                  {tx.product}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer info */}
      <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
        <span>Mostrando las <strong>5 transacciones más recientes</strong></span>
        <span className="text-[11px] font-semibold text-[#0F172A] hover:underline cursor-pointer">
          Ver historial completo →
        </span>
      </div>

    </div>
  );
};

export default RecentTransactionsTable;
