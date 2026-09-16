import React, { useState, useEffect } from 'react';
import { X, Check, Trash2, Plus, Edit3, ShieldAlert, Sparkles } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';

const AdminCardEditModal = ({ isOpen, onClose, modalType, initialData }) => {
  const {
    updateStat,
    paymentMethods,
    updatePaymentMethod,
    addPaymentMethod,
    deletePaymentMethod,
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    salesTrend,
    updateSalesTrendPoint,
    scheduledDispatches,
    addDispatch,
    updateDispatch,
    deleteDispatch,
    timeframe,
  } = useAdminData();

  // Local form states
  const [statForm, setStatForm] = useState({
    title: '',
    value: '',
    unit: '',
    change: '',
    changeDesc: '',
  });

  const [paymentForm, setPaymentForm] = useState({
    id: null,
    name: '',
    percentage: '',
    amount: '',
    numericAmount: '',
    description: '',
  });
  const [isAddingPayment, setIsAddingPayment] = useState(false);

  const [txForm, setTxForm] = useState({
    id: null,
    customer: '',
    clinic: '',
    product: 'Kit Odontológico Completo',
    paymentMethod: 'Transferencia Bancaria',
    status: 'Completado',
    qty: 1,
    unitPrice: '$14.500',
    total: '$14.500',
  });

  const [trendIndex, setTrendIndex] = useState(0);
  const [trendForm, setTrendForm] = useState({
    revenue: '',
    newClients: '',
    existingClients: '',
  });

  const [dispForm, setDispForm] = useState({
    id: null,
    doctor: '',
    clinic: '',
    timeSlot: '10:00 - 10:30 am',
    slotTime: '10:00',
    kits: 1,
    status: 'Programado',
  });

  // Populate data when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (modalType === 'stat' && initialData) {
      setStatForm({
        title: initialData.title || '',
        value: initialData.value || '',
        unit: initialData.unit || '',
        change: initialData.change || '',
        changeDesc: initialData.changeDesc || '',
      });
    }

    if (modalType === 'payment') {
      setIsAddingPayment(false);
      if (initialData?.id) {
        const pm = paymentMethods.find((p) => p.id === initialData.id) || initialData;
        setPaymentForm({
          id: pm.id,
          name: pm.name,
          percentage: pm.percentage,
          amount: pm.amount,
          numericAmount: pm.numericAmount,
          description: pm.description || '',
        });
      } else {
        setPaymentForm({
          id: null,
          name: '',
          percentage: '',
          amount: '',
          numericAmount: '',
          description: '',
        });
      }
    }

    if (modalType === 'transaction') {
      if (initialData?.id) {
        setTxForm({
          id: initialData.id,
          customer: initialData.customer || '',
          clinic: initialData.clinic || '',
          product: initialData.product || 'Kit Odontológico Completo',
          paymentMethod: initialData.paymentMethod || 'Transferencia Bancaria',
          status: initialData.status || 'Completado',
          qty: initialData.qty || 1,
          unitPrice: initialData.unitPrice || '$14.500',
          total: initialData.total || '$14.500',
        });
      } else {
        setTxForm({
          id: null,
          customer: '',
          clinic: '',
          product: 'Kit Odontológico Completo',
          paymentMethod: 'Transferencia Bancaria',
          status: 'Completado',
          qty: 1,
          unitPrice: '$14.500',
          total: '$14.500',
        });
      }
    }

    if (modalType === 'trend' && salesTrend.length > 0) {
      const idx = initialData?.index ?? 0;
      setTrendIndex(idx);
      const pt = salesTrend[idx];
      if (pt) {
        setTrendForm({
          revenue: pt?.revenue || '',
          newClients: pt?.newClients ?? '',
          existingClients: pt?.existingClients ?? '',
        });
      }
    }

    if (modalType === 'dispatch') {
      if (initialData?.id) {
        setDispForm({
          id: initialData.id,
          doctor: initialData.doctor || '',
          clinic: initialData.clinic || '',
          timeSlot: initialData.timeSlot || '10:00 - 10:30 am',
          slotTime: initialData.slotTime || '10:00',
          kits: initialData.kits || 1,
          status: initialData.status || 'Programado',
        });
      } else {
        setDispForm({
          id: null,
          doctor: '',
          clinic: '',
          timeSlot: '10:00 - 10:30 am',
          slotTime: '10:00',
          kits: 1,
          status: 'Programado',
        });
      }
    }
  }, [isOpen, modalType, initialData, paymentMethods, salesTrend]);

  if (!isOpen) return null;

  // Handlers
  const handleSaveStat = (e) => {
    e.preventDefault();
    if (initialData?.id) {
      updateStat(initialData.id, statForm);
    }
    onClose();
  };

  const handleSavePayment = (e) => {
    e.preventDefault();
    const formattedAmount = paymentForm.amount.startsWith('$')
      ? paymentForm.amount
      : `$${paymentForm.amount}`;

    if (paymentForm.id) {
      updatePaymentMethod(paymentForm.id, {
        name: paymentForm.name,
        percentage: Number(paymentForm.percentage),
        amount: formattedAmount,
        numericAmount: Number(paymentForm.numericAmount) || 0,
        description: paymentForm.description,
      });
    } else {
      addPaymentMethod({
        name: paymentForm.name,
        percentage: Number(paymentForm.percentage),
        amount: formattedAmount,
        numericAmount: Number(paymentForm.numericAmount) || 0,
        description: paymentForm.description,
      });
    }
    onClose();
  };

  const handleDeletePayment = (id) => {
    if (window.confirm('¿Eliminar este método de pago?')) {
      deletePaymentMethod(id);
      onClose();
    }
  };

  const handleSaveTransaction = (e) => {
    e.preventDefault();
    const cleanQty = Number(txForm.qty) || 1;
    const cleanUnitNum = 14500; // precio standard
    const calcTotalNum = cleanQty * cleanUnitNum;
    const formattedTotal = `$${calcTotalNum.toLocaleString('es-AR')}`;

    if (txForm.id) {
      updateTransaction(txForm.id, {
        ...txForm,
        qty: cleanQty,
        total: formattedTotal,
        numericTotal: calcTotalNum,
      });
    } else {
      addTransaction({
        ...txForm,
        qty: cleanQty,
        total: formattedTotal,
        numericTotal: calcTotalNum,
      });
    }
    onClose();
  };

  const handleDeleteTransaction = () => {
    if (txForm.id && window.confirm('¿Estás seguro de eliminar este pedido/transacción?')) {
      deleteTransaction(txForm.id);
      onClose();
    }
  };

  const handleSaveTrend = (e) => {
    e.preventDefault();
    updateSalesTrendPoint(trendIndex, trendForm);
    onClose();
  };

  const handleSaveDispatch = (e) => {
    e.preventDefault();
    if (dispForm.id) {
      updateDispatch(dispForm.id, dispForm);
    } else {
      addDispatch(dispForm);
    }
    onClose();
  };

  const handleDeleteDispatch = () => {
    if (dispForm.id && window.confirm('¿Eliminar este despacho programado?')) {
      deleteDispatch(dispForm.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E2E8F0] p-6 z-10 animate-scaleUp font-geist max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1E5A9C]/10 text-[#1E5A9C] flex items-center justify-center font-bold">
              <Edit3 size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                {modalType === 'stat' && 'Modificar Métrica (KPI)'}
                {modalType === 'payment' && 'Gestión de Métodos de Pago — Kit Odontológico'}
                {modalType === 'transaction' && (txForm.id ? `Editar Pedido ${txForm.id}` : 'Nuevo Pedido de Kit')}
                {modalType === 'trend' && `Editar Evolución (${timeframe})`}
                {modalType === 'dispatch' && (dispForm.id ? 'Editar Despacho Programado' : 'Nuevo Despacho / Entrega')}
              </h3>
              <p className="text-xs text-[#64748B]">
                Actualiza los datos mostrados en tiempo real
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. EDIT KPI FORM */}
        {modalType === 'stat' && (
          <form onSubmit={handleSaveStat} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#334155] mb-1">Título de la Tarjeta</label>
              <input
                type="text"
                required
                value={statForm.title}
                onChange={(e) => setStatForm({ ...statForm, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#334155] mb-1">Valor Principal</label>
                <input
                  type="text"
                  required
                  placeholder="$2.845.000"
                  value={statForm.value}
                  onChange={(e) => setStatForm({ ...statForm, value: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] font-bold focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#334155] mb-1">Unidad / Subtítulo</label>
                <input
                  type="text"
                  placeholder="Kits Vendidos / Docs"
                  value={statForm.unit}
                  onChange={(e) => setStatForm({ ...statForm, unit: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#334155] mb-1">Porcentaje de Cambio</label>
                <input
                  type="text"
                  placeholder="+18.4%"
                  value={statForm.change}
                  onChange={(e) => setStatForm({ ...statForm, change: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#10B981] font-bold focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#334155] mb-1">Comparativa Temporal</label>
                <input
                  type="text"
                  placeholder="vs mes anterior"
                  value={statForm.changeDesc}
                  onChange={(e) => setStatForm({ ...statForm, changeDesc: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Check size={14} /> Guardar Cambios
              </button>
            </div>
          </form>
        )}

        {/* 2. EDIT / ADD PAYMENT METHODS */}
        {modalType === 'payment' && (
          <div>
            {!isAddingPayment && !paymentForm.id ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#334155]">Métodos de Pago Actuales ({paymentMethods.length})</span>
                  <button
                    onClick={() => {
                      setIsAddingPayment(true);
                      setPaymentForm({
                        id: null,
                        name: '',
                        percentage: 10,
                        amount: '$200.000',
                        numericAmount: 200000,
                        description: '',
                      });
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-[#1E5A9C] hover:underline cursor-pointer"
                  >
                    <Plus size={13} /> Agregar Método
                  </button>
                </div>

                <div className="space-y-2">
                  {paymentMethods.map((pm) => (
                    <div
                      key={pm.id}
                      className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: pm.color }}
                        />
                        <div>
                          <div className="font-bold text-[#0F172A]">{pm.name}</div>
                          <div className="text-[#64748B] text-[11px]">{pm.amount} ({pm.percentage}%)</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setPaymentForm({
                              id: pm.id,
                              name: pm.name,
                              percentage: pm.percentage,
                              amount: pm.amount,
                              numericAmount: pm.numericAmount,
                              description: pm.description || '',
                            });
                          }}
                          className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-white rounded-lg border border-transparent hover:border-[#E2E8F0] cursor-pointer"
                          title="Modificar"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeletePayment(pm.id)}
                          className="p-1.5 text-[#EF4444] hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSavePayment} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#334155] mb-1">Nombre del Método de Pago</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Transferencia Bancaria Directa"
                    value={paymentForm.name}
                    onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Porcentaje del Total (%)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="100"
                      placeholder="62"
                      value={paymentForm.percentage}
                      onChange={(e) => setPaymentForm({ ...paymentForm, percentage: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] font-bold focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#334155] mb-1">Monto Facturado ($ ARS)</label>
                    <input
                      type="text"
                      required
                      placeholder="$1.763.900"
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] font-bold focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Descripción / Detalle</label>
                  <input
                    type="text"
                    placeholder="Acreditación inmediata con comprobante vía WhatsApp"
                    value={paymentForm.description}
                    onChange={(e) => setPaymentForm({ ...paymentForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                  />
                </div>

                <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                  {paymentForm.id ? (
                    <button
                      type="button"
                      onClick={() => handleDeletePayment(paymentForm.id)}
                      className="px-3 py-2 rounded-xl text-[#EF4444] hover:bg-red-50 font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Eliminar
                    </button>
                  ) : <div></div>}

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingPayment(false);
                        setPaymentForm({ id: null, name: '', percentage: '', amount: '', numericAmount: '', description: '' });
                      }}
                      className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] font-semibold cursor-pointer"
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Check size={14} /> Guardar
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 3. EDIT / ADD TRANSACTION */}
        {modalType === 'transaction' && (
          <form onSubmit={handleSaveTransaction} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#334155] mb-1">Nombre del Cliente / Doctor</label>
              <input
                type="text"
                required
                placeholder="Dr. Roberto Sánchez"
                value={txForm.customer}
                onChange={(e) => setTxForm({ ...txForm, customer: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">Clínica / Consultorio / Ubicación</label>
              <input
                type="text"
                required
                placeholder="Centro Odontológico San Miguel (Tucumán)"
                value={txForm.clinic}
                onChange={(e) => setTxForm({ ...txForm, clinic: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#334155] mb-1">Producto</label>
                <input
                  type="text"
                  disabled
                  value="Kit Odontológico Completo"
                  className="w-full px-3.5 py-2.5 bg-[#E2E8F0]/40 border border-[#E2E8F0] rounded-xl text-[#475569] font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#334155] mb-1">Cantidad de Kits</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={txForm.qty}
                  onChange={(e) => setTxForm({ ...txForm, qty: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] font-bold focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#334155] mb-1">Método de Pago</label>
                <select
                  value={txForm.paymentMethod}
                  onChange={(e) => setTxForm({ ...txForm, paymentMethod: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C]"
                >
                  <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                  <option value="Efectivo / Contra Entrega">Efectivo / Contra Entrega</option>
                  <option value="Mercado Pago">Mercado Pago / Tarjetas</option>
                  <option value="Acordar con Vendedor">Acordar con Vendedor</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#334155] mb-1">Estado de Entrega</label>
                <select
                  value={txForm.status}
                  onChange={(e) => setTxForm({ ...txForm, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C]"
                >
                  <option value="Completado">Completado</option>
                  <option value="Enviado">Enviado</option>
                  <option value="En Preparación">En Preparación</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Total Estimado ($14.500 c/u):</span>
              <strong className="text-base text-[#0F172A] font-extrabold">
                ${((Number(txForm.qty) || 1) * 14500).toLocaleString('es-AR')}
              </strong>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
              {txForm.id ? (
                <button
                  type="button"
                  onClick={handleDeleteTransaction}
                  className="px-3 py-2 rounded-xl text-[#EF4444] hover:bg-red-50 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 size={14} /> Eliminar Pedido
                </button>
              ) : <div></div>}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} /> Guardar Pedido
                </button>
              </div>
            </div>
          </form>
        )}

        {/* 4. EDIT TREND POINT */}
        {modalType === 'trend' && (
          <form onSubmit={handleSaveTrend} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#334155] mb-1">
                Período Seleccionado: <span className="text-[#1E5A9C] font-extrabold">{salesTrend[trendIndex]?.label}</span>
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
                {salesTrend.map((pt, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      setTrendIndex(idx);
                      setTrendForm({
                        revenue: pt.revenue,
                        newClients: pt.newClients,
                        existingClients: pt.existingClients,
                      });
                    }}
                    className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer shrink-0 ${
                      trendIndex === idx
                        ? 'bg-[#0F172A] text-white'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">Facturación del Período</label>
              <input
                type="text"
                required
                value={trendForm.revenue}
                onChange={(e) => setTrendForm({ ...trendForm, revenue: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] font-bold focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#334155] mb-1">Clientes Nuevos</label>
                <input
                  type="number"
                  min="0"
                  value={trendForm.newClients}
                  onChange={(e) => setTrendForm({ ...trendForm, newClients: e.target.value === '' ? '' : Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] font-bold focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#334155] mb-1">Clientes Recurrentes</label>
                <input
                  type="number"
                  min="0"
                  value={trendForm.existingClients}
                  onChange={(e) => setTrendForm({ ...trendForm, existingClients: e.target.value === '' ? '' : Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] font-bold focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Check size={14} /> Guardar Período
              </button>
            </div>
          </form>
        )}

        {/* 5. EDIT / ADD DISPATCH (AGENDA DE ENTREGAS) */}
        {modalType === 'dispatch' && (
          <form onSubmit={handleSaveDispatch} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#334155] mb-1">Doctor / Clínica</label>
              <input
                type="text"
                required
                placeholder="Dr. Roberto Sánchez"
                value={dispForm.doctor}
                onChange={(e) => setDispForm({ ...dispForm, doctor: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">Consultorio / Dirección</label>
              <input
                type="text"
                required
                placeholder="Centro Odontológico San Miguel (Tucumán)"
                value={dispForm.clinic}
                onChange={(e) => setDispForm({ ...dispForm, clinic: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#334155] mb-1">Horario de Entrega</label>
                <input
                  type="text"
                  placeholder="10:45 - 11:00 am"
                  value={dispForm.timeSlot}
                  onChange={(e) => setDispForm({ ...dispForm, timeSlot: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#334155] mb-1">Cantidad de Kits</label>
                <input
                  type="number"
                  min="0"
                  value={dispForm.kits}
                  onChange={(e) => setDispForm({ ...dispForm, kits: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] font-bold focus:outline-none focus:border-[#1E5A9C] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#334155] mb-1">Estado del Despacho</label>
              <select
                value={dispForm.status}
                onChange={(e) => setDispForm({ ...dispForm, status: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#1E5A9C]"
              >
                <option value="Programado">Programado</option>
                <option value="En Ruta">En Ruta / Despacho Activo</option>
                <option value="Entregado">Entregado y Cobrado</option>
                <option value="En Preparación">En Preparación</option>
              </select>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
              {dispForm.id ? (
                <button
                  type="button"
                  onClick={handleDeleteDispatch}
                  className="px-3 py-2 rounded-xl text-[#EF4444] hover:bg-red-50 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 size={14} /> Eliminar
                </button>
              ) : <div></div>}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1E5A9C] hover:bg-[#16467A] text-white font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} /> Guardar Despacho
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminCardEditModal;
