import React, { useState } from 'react';
import { Landmark, Banknote, CreditCard, Sparkles, Edit3, Plus, ChevronRight } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import AdminCardEditModal from './modals/AdminCardEditModal';

const PaymentMethodsBreakdown = () => {
  const { paymentMethods, timeframe, stats } = useAdminData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Current total revenue from stats
  const totalRevenue = stats[0]?.value || '$0';

  const getMethodIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('transferencia')) return Landmark;
    if (lower.includes('efectivo')) return Banknote;
    return CreditCard;
  };

  const handleOpenEdit = (method = null) => {
    setSelectedMethod(method);
    setIsModalOpen(true);
  };

  // Top payment method
  const topMethod = paymentMethods.reduce((prev, curr) =>
    (curr.percentage > (prev?.percentage || 0) ? curr : prev), paymentMethods[0]
  );

  return (
    <>
      <div
        onClick={() => handleOpenEdit(null)}
        className="bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#1E5A9C]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between font-geist relative group cursor-pointer"
        title="Toca para modificar, agregar o eliminar métodos de pago"
      >
        {/* Floating Quick Edit Button */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E5A9C] text-white p-1.5 rounded-lg shadow-sm flex items-center gap-1 text-[11px] font-semibold">
          <Edit3 size={12} />
          <span>Editar</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
                MÉTODOS DE PAGO
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E5A9C]/10 text-[#1E5A9C]">
                Kit Completo
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Distribución de cobranzas por venta del Kit Odontológico
            </p>
          </div>
        </div>

        {/* Total Volume */}
        <div className="py-4 flex items-baseline justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B]">Facturación Total ({timeframe}):</span>
            <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {totalRevenue}
            </div>
          </div>
          <span className="text-xs font-semibold text-[#1E5A9C] bg-[#1E5A9C]/5 px-2.5 py-1 rounded-full border border-[#1E5A9C]/10">
            Único Producto
          </span>
        </div>

        {/* Insight Banner */}
        <div className="mb-5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2.5 text-xs text-[#334155]">
          <div className="w-6 h-6 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shrink-0">
            <Sparkles size={13} />
          </div>
          {Number(topMethod?.percentage || 0) > 0 ? (
            <p className="font-medium leading-snug">
              El <strong className="text-[#0F172A]">{topMethod?.percentage}%</strong> de las compras se realizan mediante <strong className="text-[#0F172A]">{topMethod?.name}</strong>.
            </p>
          ) : (
            <p className="font-medium leading-snug text-[#64748B]">
              Sin cobranzas registradas todavía. Los métodos de pago están listos para computar cobros.
            </p>
          )}
        </div>

        {/* Progress Bars for each Payment Method */}
        <div className="space-y-4 mb-4">
          {paymentMethods.map((method) => {
            const IconComponent = getMethodIcon(method.name);
            return (
              <div
                key={method.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEdit(method);
                }}
                className="flex flex-col gap-1.5 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E293B] flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: method.color }}
                    />
                    <IconComponent size={14} className="text-[#64748B]" />
                    <span>{method.name}</span>
                  </span>
                  <span className="font-bold text-[#0F172A]">
                    {method.amount} <span className="font-normal text-[#64748B]">({method.percentage}%)</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${method.percentage}%`,
                      backgroundColor: method.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Footer: Add Payment Method button & Hint */}
        <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
          <span className="flex items-center gap-1 text-[11px] text-[#1E5A9C] font-semibold">
            <Plus size={13} /> Toca para agregar o modificar
          </span>
          <span className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${paymentMethods.some((m) => Number(m.percentage) > 0)
              ? 'text-[#10B981] bg-[#ECFDF5]'
              : 'text-slate-500 bg-slate-100'
            }`}>
            {paymentMethods.some((m) => Number(m.percentage) > 0) ? '100% Cobranzas' : '0% Registrado'}
          </span>
        </div>
      </div>

      {/* Interactive Modal */}
      <AdminCardEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalType="payment"
        initialData={selectedMethod}
      />
    </>
  );
};

export default PaymentMethodsBreakdown;
