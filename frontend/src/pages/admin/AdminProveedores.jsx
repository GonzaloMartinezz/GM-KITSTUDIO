import React, { useState } from 'react';
import {
  Truck,
  Phone,
  Mail,
  MapPin,
  FileText,
  DollarSign,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MessageCircle,
  Edit3,
  Plus,
  Trash2,
  ExternalLink,
  Package,
  Layers,
  ArrowUpRight,
  Sparkles,
  Building2,
  CreditCard
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProveedores = () => {
  const {
    supplierData,
    updateSupplierData,
    supplierOrders,
    addSupplierOrder,
    updateSupplierOrder,
    deleteSupplierOrder
  } = useAdminData();

  const [copiedField, setCopiedField] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  // Form states for Edit Supplier Modal
  const [editForm, setEditForm] = useState({ ...supplierData });

  // Form states for New Order Modal
  const [newOrderForm, setNewOrderForm] = useState({
    kits: '',
    costPerKit: supplierData?.costPerKit || 5000,
    paymentMethod: 'Transferencia Bancaria CBU',
    paymentDate: '50% Anticipo hoy • 50% contra entrega',
    dueDate: '20 Sep 2026',
    invoiceNumber: '',
    status: 'Pendiente',
    pendingAmount: '',
  });

  if (!supplierData) return <div className="p-8 text-center text-slate-500">Cargando datos del proveedor...</div>;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveSupplier = (e) => {
    e.preventDefault();
    updateSupplierData(editForm);
    setIsEditModalOpen(false);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const total = Number(newOrderForm.kits) * Number(newOrderForm.costPerKit);
    addSupplierOrder({
      ...newOrderForm,
      date: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }),
      total,
      pendingAmount: newOrderForm.status === 'Completado' ? 0 : Number(newOrderForm.pendingAmount || total),
    });
    setIsNewOrderModalOpen(false);
    setNewOrderForm({
      kits: '',
      costPerKit: supplierData?.costPerKit || 5000,
      paymentMethod: 'Transferencia Bancaria CBU',
      paymentDate: '50% Anticipo hoy • 50% contra entrega',
      dueDate: '20 Sep 2026',
      invoiceNumber: '',
      status: 'Pendiente',
      pendingAmount: '',
    });
  };

  const calculateGrossMargin = () => {
    const cost = Number(supplierData?.costPerKit) || 5000;
    const sale = Number(supplierData?.regularSalePrice) || 9500;
    const margin = sale - cost;
    const marginPct = ((margin / sale) * 100).toFixed(1);
    return { margin, marginPct };
  };

  const { margin, marginPct } = calculateGrossMargin();

  return (
    <div className="w-full h-full font-geist flex flex-col relative pb-16">

      {/* ── TOP BANNER & HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Gestión del Proveedor Único
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 flex items-center gap-1">
              <ShieldCheck size={13} /> Proveedor Homologado ANMAT
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1E5A9C]/10 text-[#1E5A9C] border border-[#1E5A9C]/20">
              Suministro Exclusivo GM
            </span>
          </div>
          <p className="text-[#64748B] text-xs sm:text-sm">
            Control directo del único fabricante y armador del Kit Odontológico • Costos de compra, insumos y calendario de pagos
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`https://wa.me/${supplierData.whatsapp}?text=${encodeURIComponent('Hola ' + supplierData.contactName + ', te escribo desde GM Kit Studio sobre la orden de compra del Kit Odontológico.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#25D366]/20 transition-all cursor-pointer active:scale-[0.98]"
          >
            <MessageCircle size={16} />
            <span>WhatsApp Proveedor</span>
          </a>

          <button
            onClick={() => {
              setEditForm({ ...supplierData });
              setIsEditModalOpen(true);
            }}
            className="flex items-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#1E5A9C] border border-[#CBD5E1] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <Edit3 size={15} />
            <span>Editar Datos</span>
          </button>

          <button
            onClick={() => setIsNewOrderModalOpen(true)}
            className="flex items-center gap-2 bg-[#1E5A9C] hover:bg-[#16487D] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#1E5A9C]/25 transition-all cursor-pointer active:scale-[0.98]"
          >
            <Plus size={16} />
            <span>Nueva Compra / Pago</span>
          </button>
        </div>
      </div>

      {/* ── 3 KEY METRICS CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* Metric 1: Costo del Paquete */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#1E5A9C]" /> A Cuánto lo Compramos
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#10B981]/10 text-[#059669]">
              Margen +{marginPct}%
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-[#0F172A]">
                ${Number(supplierData.costPerKit).toLocaleString('es-AR')}
              </h2>
              <span className="text-xs text-[#64748B] font-semibold">/ paquete completo</span>
            </div>
            <p className="text-xs text-[#64748B] mt-1.5">
              Precio de venta al público: <strong className="text-[#0F172A]">${Number(supplierData.regularSalePrice).toLocaleString('es-AR')}</strong> • Ganancia bruta: <strong className="text-[#059669]">+${margin.toLocaleString('es-AR')}</strong> por kit
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
            <span>Lote 100+ kits: <strong>$4.700 c/u</strong></span>
            <span className="text-[#1E5A9C] font-bold">8 insumos estériles</span>
          </div>
        </div>

        {/* Metric 2: Cuándo Pagamos el Paquete */}
        <div className="bg-white rounded-2xl p-5 border border-orange-200 shadow-xs flex flex-col justify-between relative overflow-hidden bg-linear-to-br from-white to-orange-50/30">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C2410C] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-500" /> Cuándo Pagamos el Paquete
            </span>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-orange-500 text-white shadow-xs uppercase tracking-wide">
              {supplierData.nextPaymentStatus || 'Programado'}
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-[#C2410C]">
                ${Number(supplierData.nextPaymentAmount || 235000).toLocaleString('es-AR')}
              </h2>
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                {supplierData.nextPaymentDate || '20 Sep 2026'}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">
              {supplierData.nextPaymentConcept || 'Saldo 50% contra entrega en Tucumán - Lote 100 Kits Odontológicos'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-orange-100 flex items-center justify-between text-[11px]">
            <span className="text-[#64748B]">Vía Transferencia Bancaria</span>
            <span className="text-orange-600 font-bold">En fecha acordada</span>
          </div>
        </div>

        {/* Metric 3: Condición Comercial */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#1E5A9C]" /> Condición y Despacho
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#1E5A9C]/10 text-[#1E5A9C]">
              Factura A Oficial
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] leading-snug">
              50% Anticipo • 50% Entrega
            </h3>
            <p className="text-xs text-[#64748B] mt-1.5">
              Despacho en <strong>48 a 72 hs hábiles</strong> desde acreditación de anticipo. Flete directo Tortuguitas &gt; Depósito Tucumán.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
            <span>Reposición inmediata sin cargo</span>
            <span className="text-[#059669] font-bold">100% Bioseguro</span>
          </div>
        </div>

      </div>

      {/* ── MAIN 2-COLUMN SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: FICHA DEL PROVEEDOR Y DESGLOSE DE COSTOS (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Ficha de Contacto Directo */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#1E5A9C]/10 text-[#1E5A9C] flex items-center justify-center font-bold">
                  <Building2 size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0F172A] leading-tight">
                    {supplierData.company}
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    {supplierData.subtitle || 'Fabricante Homologado Exclusivo'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditForm({ ...supplierData });
                  setIsEditModalOpen(true);
                }}
                className="p-1.5 text-[#64748B] hover:text-[#1E5A9C] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                title="Editar Proveedor"
              >
                <Edit3 size={16} />
              </button>
            </div>

            {/* Datos de Contacto y Representante */}
            <div className="space-y-3.5 text-xs text-[#334155]">
              <div className="flex items-start gap-2.5">
                <div className="w-6 text-[#64748B] pt-0.5"><Phone size={15} /></div>
                <div className="flex-1">
                  <span className="text-[#64748B] block text-[11px]">Contacto Directo Comercial:</span>
                  <strong className="text-[#0F172A]">{supplierData.contactName}</strong>
                  <span className="text-[#64748B] text-[11px] block">{supplierData.role}</span>
                  <a
                    href={`tel:${supplierData.phone}`}
                    className="text-[#1E5A9C] font-bold hover:underline block mt-0.5"
                  >
                    {supplierData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 text-[#64748B] pt-0.5"><Mail size={15} /></div>
                <div className="flex-1">
                  <span className="text-[#64748B] block text-[11px]">Correo para Pedidos y Facturación:</span>
                  <a href={`mailto:${supplierData.email}`} className="text-[#1E5A9C] font-semibold hover:underline">
                    {supplierData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 text-[#64748B] pt-0.5"><MapPin size={15} /></div>
                <div className="flex-1">
                  <span className="text-[#64748B] block text-[11px]">Ubicación de Planta & Despacho:</span>
                  <span className="text-[#0F172A] font-medium">{supplierData.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 text-[#64748B] pt-0.5"><FileText size={15} /></div>
                <div className="flex-1">
                  <span className="text-[#64748B] block text-[11px]">Datos Fiscales & ANMAT:</span>
                  <span className="text-[#0F172A] font-medium">CUIT: {supplierData.cuit} • {supplierData.taxCondition}</span>
                  <span className="text-[#059669] font-bold block text-[11px] mt-0.5">{supplierData.anmatPm}</span>
                </div>
              </div>
            </div>

            {/* Datos Bancarios para Pagos (CBU / Alias) */}
            <div className="mt-5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A] mb-2.5">
                <CreditCard size={15} className="text-[#1E5A9C]" />
                <span>Datos Bancarios para Transferir Pagos:</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-[#CBD5E1]">
                  <div>
                    <span className="text-[10px] text-[#64748B] block uppercase tracking-wider font-bold">Banco</span>
                    <strong className="text-[#0F172A]">{supplierData.bank}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-[#CBD5E1]">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] text-[#64748B] block uppercase tracking-wider font-bold">CBU</span>
                    <span className="font-mono font-bold text-xs text-[#0F172A] truncate block">{supplierData.cbu}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(supplierData.cbu, 'cbu')}
                    className="shrink-0 p-1.5 text-[#64748B] hover:text-[#1E5A9C] transition-colors"
                    title="Copiar CBU"
                  >
                    {copiedField === 'cbu' ? <Check size={14} className="text-[#059669]" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-[#CBD5E1]">
                  <div>
                    <span className="text-[10px] text-[#64748B] block uppercase tracking-wider font-bold">Alias</span>
                    <strong className="text-[#1E5A9C] font-mono text-xs">{supplierData.alias}</strong>
                  </div>
                  <button
                    onClick={() => handleCopy(supplierData.alias, 'alias')}
                    className="shrink-0 p-1.5 text-[#64748B] hover:text-[#1E5A9C] transition-colors"
                    title="Copiar Alias"
                  >
                    {copiedField === 'alias' ? <Check size={14} className="text-[#059669]" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Desglose de Insumos del Paquete ($5.000) */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F1F5F9]">
              <div>
                <h3 className="font-bold text-sm text-[#0F172A]">Desglose de Costo del Paquete</h3>
                <p className="text-xs text-[#64748B]">Qué compone los ${Number(supplierData.costPerKit).toLocaleString('es-AR')} de costo de compra</p>
              </div>
              <span className="text-xs font-black text-[#1E5A9C] bg-[#1E5A9C]/10 px-2 py-0.5 rounded-md">
                8 Insumos
              </span>
            </div>

            <div className="divide-y divide-[#F1F5F9]">
              {supplierData.itemsBreakdown?.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#0F172A] block">{item.name}</span>
                    <span className="text-[11px] text-[#64748B]">{item.qty}</span>
                  </div>
                  <span className="font-bold text-[#334155]">${item.cost.toLocaleString('es-AR')}</span>
                </div>
              ))}
              <div className="pt-3 flex items-center justify-between text-xs font-bold text-[#0F172A]">
                <span>Costo Total Paquete Cerrado:</span>
                <span className="text-sm font-black text-[#0F172A]">${Number(supplierData.costPerKit).toLocaleString('es-AR')}</span>
              </div>
            </div>
          </div>

          {/* Escalas de Precios de Compra por Lote */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs">
            <h3 className="font-bold text-sm text-[#0F172A] mb-1">Precios por Escalas de Compra</h3>
            <p className="text-xs text-[#64748B] mb-3">Precios que obtenemos de fábrica según volumen de pedido</p>

            <div className="space-y-2">
              {supplierData.tierPricing?.map((tier, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-[#0F172A] block">{tier.tier}</strong>
                    <span className="text-[11px] text-[#059669] font-medium">Margen bruto: +{tier.marginPct} (+${tier.unitMargin.toLocaleString('es-AR')})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#0F172A]">${tier.costPerKit.toLocaleString('es-AR')}</span>
                    <span className="text-[10px] text-[#64748B] block">por kit</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CALENDARIO DE PAGOS Y ÓRDENES DE COMPRA (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Banner: Política y Cuándo Pagamos */}
          <div className="bg-[#1E5A9C] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                Esquema Financiero de Compras
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              ¿Cuándo pagamos el paquete del producto?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-4">
              {supplierData.paymentTerms}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/20 text-xs">
              <div>
                <span className="text-white/70 block text-[11px]">1. Emisión de OC</span>
                <strong className="text-white">Pago del 50% anticipo</strong>
              </div>
              <div>
                <span className="text-white/70 block text-[11px]">2. Despacho Fábrica</span>
                <strong className="text-white">48/72 hs hábiles</strong>
              </div>
              <div>
                <span className="text-white/70 block text-[11px]">3. Recepción Tucumán</span>
                <strong className="text-white">Pago 50% saldo restante</strong>
              </div>
            </div>
          </div>

          {/* Tabla de Órdenes de Compra y Estado de Pagos */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-base text-[#0F172A]">Historial de Órdenes y Pagos al Proveedor</h3>
                <p className="text-xs text-[#64748B]">Registro de compras, pagos parciales y fechas de vencimiento</p>
              </div>

              <button
                onClick={() => setIsNewOrderModalOpen(true)}
                className="flex items-center gap-1.5 bg-[#1E5A9C] hover:bg-[#16487D] text-white px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Plus size={14} />
                <span>Registrar Compra</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-[#64748B] font-semibold uppercase tracking-wider text-[10px] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="py-3 px-4">N° Orden / Factura</th>
                    <th className="py-3 px-4">Kits / Costo Unit.</th>
                    <th className="py-3 px-4">Total Compra</th>
                    <th className="py-3 px-4">Cronograma de Pago</th>
                    <th className="py-3 px-4 text-center">Estado</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {supplierOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 px-4 text-center">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E5A9C] flex items-center justify-center mb-3">
                            <Truck size={24} />
                          </div>
                          <h4 className="font-bold text-sm text-[#0F172A] mb-1">No hay órdenes de compra registradas</h4>
                          <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                            Todas las compras de paquetes cerrados emitidas a BioTex Médica S.A. y sus vencimientos de pago se listarán aquí.
                          </p>
                          <button
                            onClick={() => setIsNewOrderModalOpen(true)}
                            className="flex items-center gap-1.5 bg-[#1E5A9C] hover:bg-[#16487D] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                          >
                            <Plus size={14} />
                            <span>Registrar Primera Compra</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    supplierOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <strong className="text-[#0F172A] block">{order.id}</strong>
                          <span className="text-[11px] text-[#64748B]">{order.invoiceNumber || 'Factura A'}</span>
                          <span className="text-[10px] text-[#94A3B8] block">{order.date}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <strong className="text-[#0F172A]">{order.kits} kits</strong>
                          <span className="text-[11px] text-[#64748B] block">${order.costPerKit.toLocaleString('es-AR')} c/u</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="text-sm font-black text-[#0F172A]">${order.total.toLocaleString('es-AR')}</span>
                          <span className="text-[10px] text-[#64748B] block">{order.paymentMethod}</span>
                        </td>

                        <td className="py-3.5 px-4 max-w-56">
                          <span className="text-[#334155] font-medium leading-snug block">
                            {order.paymentDate}
                          </span>
                          {order.pendingAmount > 0 && (
                            <span className="text-[11px] text-[#C2410C] font-bold block mt-0.5">
                              Vence Saldo: {order.dueDate} (${order.pendingAmount.toLocaleString('es-AR')})
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${order.status === 'Completado'
                              ? 'bg-[#10B981]/15 text-[#059669]'
                              : order.status === 'Parcial 50%'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                            {order.status === 'Completado' ? (
                              <CheckCircle2 size={12} />
                            ) : (
                              <Clock size={12} />
                            )}
                            {order.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {order.status !== 'Completado' && (
                              <button
                                onClick={() => updateSupplierOrder(order.id, { status: 'Completado', pendingAmount: 0, paymentDate: `100% Pagado (${new Date().toLocaleDateString('es-AR')})` })}
                                className="px-2 py-1 text-[11px] font-bold rounded-lg bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#059669] transition-colors"
                                title="Marcar como 100% Pagado"
                              >
                                Marcar Pagado
                              </button>
                            )}
                            <button
                              onClick={() => deleteSupplierOrder(order.id)}
                              className="p-1.5 text-[#94A3B8] hover:text-red-600 rounded-lg transition-colors"
                              title="Eliminar Orden"
                            >
                              <Trash2 size={14} />
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

        </div>

      </div>

      {/* ── MODAL: EDITAR DATOS DEL PROVEEDOR ── */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-100">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E2E8F0]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
                <h3 className="text-lg font-bold text-[#0F172A]">Editar Información del Proveedor</h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-[#64748B] hover:text-[#0F172A] font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveSupplier} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[#64748B] font-semibold mb-1">Razón Social de Empresa</label>
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Contacto Comercial</label>
                    <input
                      type="text"
                      value={editForm.contactName}
                      onChange={(e) => setEditForm({ ...editForm, contactName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Teléfono / WhatsApp</label>
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Email de Pedidos</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">CUIT</label>
                    <input
                      type="text"
                      value={editForm.cuit}
                      onChange={(e) => setEditForm({ ...editForm, cuit: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Costo por Kit ($)</label>
                    <input
                      type="number"
                      value={editForm.costPerKit}
                      onChange={(e) => setEditForm({ ...editForm, costPerKit: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs font-bold text-[#0F172A]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Precio Venta Público ($)</label>
                    <input
                      type="number"
                      value={editForm.regularSalePrice}
                      onChange={(e) => setEditForm({ ...editForm, regularSalePrice: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs font-bold text-[#059669]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#64748B] font-semibold mb-1">Condición de Pago Acordada</label>
                  <input
                    type="text"
                    value={editForm.paymentTerms}
                    onChange={(e) => setEditForm({ ...editForm, paymentTerms: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Próxima Fecha de Pago</label>
                    <input
                      type="text"
                      value={editForm.nextPaymentDate}
                      onChange={(e) => setEditForm({ ...editForm, nextPaymentDate: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Monto Próximo Pago ($)</label>
                    <input
                      type="number"
                      value={editForm.nextPaymentAmount}
                      onChange={(e) => setEditForm({ ...editForm, nextPaymentAmount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">CBU Bancario</label>
                    <input
                      type="text"
                      value={editForm.cbu}
                      onChange={(e) => setEditForm({ ...editForm, cbu: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Alias Bancario</label>
                    <input
                      type="text"
                      value={editForm.alias}
                      onChange={(e) => setEditForm({ ...editForm, alias: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] text-xs font-bold text-[#64748B]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1E5A9C] text-white text-xs font-bold shadow-md hover:bg-[#16487D]"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: REGISTRAR NUEVA COMPRA O PAGO ── */}
      <AnimatePresence>
        {isNewOrderModalOpen && (
          <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-100">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#E2E8F0]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
                <h3 className="text-lg font-bold text-[#0F172A]">Registrar Compra a Proveedor</h3>
                <button
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="text-[#64748B] hover:text-[#0F172A] font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateOrder} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Kits a Comprar</label>
                    <input
                      type="number"
                      value={newOrderForm.kits}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, kits: e.target.value === '' ? '' : Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs font-bold"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Costo Unitario ($)</label>
                    <input
                      type="number"
                      value={newOrderForm.costPerKit}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, costPerKit: e.target.value === '' ? '' : Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs font-bold"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-[#64748B] font-semibold">Total a Pagar de Compra:</span>
                  <strong className="text-base font-black text-[#0F172A]">
                    ${((Number(newOrderForm.kits) || 0) * (Number(newOrderForm.costPerKit) || 0)).toLocaleString('es-AR')}
                  </strong>
                </div>

                <div>
                  <label className="block text-[#64748B] font-semibold mb-1">Condición / Fechas de Pago</label>
                    <input
                    type="text"
                    value={newOrderForm.paymentDate}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, paymentDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs"
                    placeholder="Ej. 50% anticipo hoy • 50% saldo al recibir"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Fecha Límite Saldo</label>
                    <input
                      type="text"
                      value={newOrderForm.dueDate}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, dueDate: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs"
                      placeholder="Ej. 20 Sep 2026"
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748B] font-semibold mb-1">Estado del Pago</label>
                    <select
                      value={newOrderForm.status}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, status: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Parcial 50%">Parcial 50% (Anticipo)</option>
                      <option value="Completado">100% Pagado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#64748B] font-semibold mb-1">N° de Factura / Remito (Opcional)</label>
                    <input
                    type="text"
                    value={newOrderForm.invoiceNumber}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, invoiceNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] text-xs"
                    placeholder="Ej. FC-A 0012-00050110"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setIsNewOrderModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#CBD5E1] text-xs font-bold text-[#64748B]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1E5A9C] text-white text-xs font-bold shadow-md hover:bg-[#16487D]"
                  >
                    Guardar Orden
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

export default AdminProveedores;
