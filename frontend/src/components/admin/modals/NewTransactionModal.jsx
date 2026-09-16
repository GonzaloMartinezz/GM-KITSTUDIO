import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NewTransactionModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customer: '',
    clinic: '',
    qty: 1,
    numericTotal: 8500,
    paymentMethod: 'Transferencia Bancaria',
    status: 'En Preparación'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-update total based on qty if they only change qty
      if (name === 'qty') {
        const parsedQty = parseInt(value, 10) || 1;
        updated.numericTotal = parsedQty * 8500;
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden font-geist"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F8FAFC]">
            <h3 className="font-bold text-[#0F172A]">Nueva Transacción</h3>
            <button onClick={onClose} type="button" className="p-1 text-[#64748B] hover:text-[#0F172A] transition-colors rounded-lg hover:bg-white cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#64748B]">Cliente / Doctor</label>
              <input
                required
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="Ej. Dra. Ana Pérez"
                className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#64748B]">Clínica (Opcional)</label>
              <input
                name="clinic"
                value={formData.clinic}
                onChange={handleChange}
                placeholder="Ej. Centro Odontológico Norte"
                className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#64748B]">Cantidad (Kits)</label>
                <input
                  required
                  type="number"
                  min="1"
                  name="qty"
                  value={formData.qty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#64748B]">Monto Total ($)</label>
                <input
                  required
                  type="number"
                  min="0"
                  name="numericTotal"
                  value={formData.numericTotal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#64748B]">Método de Pago</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
              >
                <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                <option value="Mercado Pago / Tarjetas">Mercado Pago / Tarjetas</option>
                <option value="Efectivo / Contra Entrega (Tucumán)">Efectivo / Contra Entrega (Tucumán)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#64748B]">Estado de la Orden</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
              >
                <option value="En Preparación">En Preparación</option>
                <option value="Enviado">Enviado</option>
                <option value="Completado">Completado</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-[#F1F5F9] mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Guardar Transacción
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NewTransactionModal;
