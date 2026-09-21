import React, { useState, useEffect } from 'react';
import { X, Calendar, DollarSign, Package, MapPin, Truck, Plus, CheckCircle, CreditCard, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../../lib/api';

const CustomerProfileModal = ({ isOpen, onClose, buyer }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && buyer) {
      const fetchHistory = async () => {
        setLoading(true);
        try {
          const { data } = await api.get('/orders', { params: { customerName: buyer.name, limit: 50 } });
          setOrders(data.orders || []);
        } catch (error) {
          console.error("Error fetching customer orders:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }
  }, [isOpen, buyer]);

  if (!isOpen || !buyer) return null;

  const formatMoney = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'entregado': case 'pagado':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#10B981]">COMPLETADO</span>;
      case 'enviado':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#3B82F6]">ENVIADO</span>;
      case 'cancelado':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600">CANCELADO</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#F59E0B]">EN PREPARACIÓN</span>;
    }
  };

  const handleNewOrder = () => {
    navigate('.', {
      state: {
        newOrderCustomer: buyer.name,
        newOrderClinic: buyer.clinicName || '',
        newOrderPhone: buyer.phone || ''
      }
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm p-4 font-geist">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1E5A9C] text-white flex items-center justify-center font-bold text-xl">
                {buyer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">{buyer.name}</h2>
                <p className="text-xs text-[#64748B] flex items-center gap-2">
                  <span>{buyer.phone || 'Sin teléfono'}</span>
                  {buyer.clinicName && (
                    <>
                      <span>•</span>
                      <span>{buyer.clinicName}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-white rounded-lg transition-colors cursor-pointer">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Total Comprado</p>
                <p className="text-lg font-bold text-[#1E5A9C]">{formatMoney(buyer.totalSpent)}</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Kits Llevados</p>
                <p className="text-lg font-bold text-[#0F172A]">{buyer.totalKits} kits</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#FFFBEB]">
                <p className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider mb-1">Saldo Pendiente</p>
                <p className="text-lg font-bold text-[#F59E0B]">{formatMoney(buyer.balance)}</p>
              </div>
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Última Compra</p>
                <p className="text-sm font-bold text-[#0F172A] mt-1">{buyer.lastPurchaseDate ? new Date(buyer.lastPurchaseDate).toLocaleDateString('es-AR') : 'N/A'}</p>
              </div>
            </div>

            {/* History Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#0F172A]">Historial de Órdenes</h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#64748B]">
                  {orders.length} registros
                </span>
              </div>

              {loading ? (
                <div className="py-12 text-center text-sm text-[#64748B]">Cargando historial...</div>
              ) : orders.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-[#E2E8F0] rounded-xl text-sm text-[#64748B]">
                  Este cliente no tiene órdenes registradas.
                </div>
              ) : (
                <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                        <th className="py-3 px-4">Fecha</th>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4 text-center">Kits</th>
                        <th className="py-3 px-4 text-right">Total</th>
                        <th className="py-3 px-4">Método de Pago</th>
                        <th className="py-3 px-4 text-center">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] text-xs">
                      {orders.map((o) => {
                        const qty = (o.items || []).reduce((sum, it) => sum + (it.quantity || 0), 0);
                        return (
                          <tr key={o._id} className="hover:bg-[#F8FAFC] transition-colors">
                            <td className="py-3 px-4 font-medium text-[#64748B] whitespace-nowrap">
                              {new Date(o.createdAt).toLocaleDateString('es-AR')}
                            </td>
                            <td className="py-3 px-4 font-semibold text-[#0F172A]">{o.orderNumber}</td>
                            <td className="py-3 px-4 text-center font-bold text-[#0F172A]">{qty}</td>
                            <td className="py-3 px-4 text-right font-medium text-[#0F172A] whitespace-nowrap">{formatMoney(o.totalAmount)}</td>
                            <td className="py-3 px-4 text-[#64748B] capitalize">{o.paymentMethod}</td>
                            <td className="py-3 px-4 text-center">{getStatusBadge(o.status)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-[#F1F5F9] bg-white flex justify-end gap-3">
            <button
              onClick={handleNewOrder}
              className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus size={18} strokeWidth={2.5} />
              Crear Nuevo Pedido para este Cliente
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CustomerProfileModal;
