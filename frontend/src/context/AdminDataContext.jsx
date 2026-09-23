import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  adminAPI,
  productsAPI,
  ordersAPI,
  suppliersAPI,
  supplierOrdersAPI,
  dispatchesAPI,
  paymentMethodsAPI,
  reservationsAPI,
  manualOrdersAPI,
  leadsAPI,
} from '../lib/api';

const AdminDataContext = createContext();

/* ─── Helpers de formato / mapeo ──────────────────────────── */

const fmtMoney = (n) => `$${Math.round(Number(n) || 0).toLocaleString('es-AR')}`;

const TIMEFRAME_TO_API = { Semanal: 'weekly', Mensual: 'monthly', Anual: 'yearly' };

const PAYMENT_METHOD_LABELS = {
  efectivo: 'Efectivo / Contra Entrega (Tucumán)',
  transferencia: 'Transferencia Bancaria',
  tarjeta: 'Tarjeta',
  mercadopago: 'Mercado Pago / Tarjetas',
};
const PAYMENT_LABEL_TO_KEY = Object.fromEntries(
  Object.entries(PAYMENT_METHOD_LABELS).map(([k, v]) => [v, k])
);

// La UI de ventas usa 3 estados visibles: En Preparación / Enviado / Completado
const ORDER_STATUS_LABELS = {
  pendiente: 'En Preparación',
  confirmado: 'En Preparación',
  pagado: 'En Preparación',
  enviado: 'Enviado',
  entregado: 'Completado',
  cancelado: 'Cancelado',
};
const ORDER_STATUS_LABEL_TO_KEY = {
  'En Preparación': 'confirmado',
  'Enviado': 'enviado',
  'Completado': 'entregado',
  'Cancelado': 'cancelado',
};

const WEEKDAY_LABELS = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']; // Mongo $dayOfWeek: 1=domingo
const MONTH_LABELS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

const buildSalesTrend = (timeframe, rawTrend) => {
  const byId = new Map((rawTrend || []).map((t) => [t._id, t]));

  if (timeframe === 'Semanal') {
    // Reordenar Lunes..Domingo (Mongo: 1=domingo..7=sábado)
    const order = [2, 3, 4, 5, 6, 7, 1];
    return order.map((dow) => {
      const t = byId.get(dow);
      return {
        label: WEEKDAY_LABELS[dow - 1],
        newClients: 0,
        existingClients: t?.orders || 0,
        revenue: fmtMoney(t?.revenue || 0),
      };
    });
  }

  if (timeframe === 'Anual') {
    const now = new Date().getFullYear();
    const years = [now - 3, now - 2, now - 1, now];
    return years.map((y) => {
      const t = byId.get(y);
      return {
        label: String(y),
        newClients: 0,
        existingClients: t?.orders || 0,
        revenue: fmtMoney(t?.revenue || 0),
      };
    });
  }

  // Mensual
  return MONTH_LABELS.map((label, idx) => {
    const t = byId.get(idx + 1);
    return {
      label,
      newClients: 0,
      existingClients: t?.orders || 0,
      revenue: fmtMoney(t?.revenue || 0),
    };
  });
};

const buildStatCards = (timeframe, dash) => {
  const changeDescByTf = {
    Semanal: 'esta semana',
    Mensual: 'este mes',
    Anual: 'este año',
  };
  const desc = changeDescByTf[timeframe] || 'en el período';

  return [
    {
      id: 'revenue',
      title: 'CANTIDAD DE INGRESOS BRUTOS',
      value: fmtMoney(dash?.revenue || 0),
      change: '—',
      changeDesc: `ingresos ${desc}`,
      sparkline: [0, 0, 0, 0, 0, 0, 0],
      trend: 'neutral',
    },
    {
      id: 'orders',
      title: 'CANTIDAD DE VENTAS',
      value: String(dash?.kitsSold || 0),
      unit: 'Kits Vendidos',
      change: '—',
      changeDesc: `${dash?.orders || 0} ventas ${desc}`,
      sparkline: [0, 0, 0, 0, 0, 0, 0],
      trend: 'neutral',
    },
    {
      id: 'customers',
      title: 'CANTIDAD DE CLIENTES',
      value: String(dash?.totalClients || 0),
      unit: 'Clínicas / Docs',
      change: '—',
      changeDesc: 'clientes activos',
      sparkline: [0, 0, 0, 0, 0, 0, 0],
      trend: 'neutral',
    },
    {
      id: 'new_customers',
      title: 'CANTIDAD DE NUEVOS CLIENTES',
      value: String(dash?.newClientsInPeriod || 0),
      unit: `Nuevos ${desc}`,
      change: '—',
      changeDesc: `nuevos ${desc}`,
      sparkline: [0, 0, 0, 0, 0, 0, 0],
      trend: 'neutral',
    },
    {
      id: 'average_ticket',
      title: 'TICKET PROMEDIO',
      value: fmtMoney(dash?.orders ? dash.revenue / dash.orders : 0),
      change: '—',
      changeDesc: `por venta ${desc}`,
      sparkline: [0, 0, 0, 0, 0, 0, 0],
      trend: 'neutral',
    },
  ];
};

const orderToTransactionRow = (order) => {
  const firstItem = order.items?.[0] || {};
  const qty = (order.items || []).reduce((sum, it) => sum + (it.quantity || 0), 0);
  return {
    id: order._id,
    customer: order.user?.name || order.customerName || 'Cliente',
    clinic: order.user?.clinicName || order.customerClinic || '',
    phone: order.user?.phone || order.customerPhone || '',
    product: firstItem.product?.name || firstItem.productName || 'Kit Odontológico Completo',
    paymentMethod: PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod,
    status: ORDER_STATUS_LABELS[order.status] || order.status,
    qty,
    unitPrice: fmtMoney(firstItem.priceAtPurchase || 0),
    total: fmtMoney(order.totalAmount || 0),
    numericTotal: order.totalAmount || 0,
    date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-AR') : 'Reciente',
    img: firstItem.product?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&q=80',
  };
};

const buildPaymentMethods = (configs, paymentDistribution) => {
  const distByKey = new Map((paymentDistribution || []).map((d) => [d._id, d]));
  const totalAmount = (paymentDistribution || []).reduce((sum, d) => sum + (d.total || 0), 0);

  return (configs || []).map((cfg) => {
    const dist = distByKey.get(cfg.key);
    const amount = dist?.total || 0;
    const percentage = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0;
    return {
      id: cfg._id,
      key: cfg.key,
      name: cfg.name,
      percentage,
      amount: fmtMoney(amount),
      numericAmount: amount,
      color: cfg.color,
      secondaryColor: cfg.secondaryColor,
      description: cfg.description,
    };
  });
};

/* ─── Provider ────────────────────────────────────────────── */

export const AdminDataProvider = ({ children }) => {
  const [timeframe, setTimeframeState] = useState('Mensual');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [dashboard, setDashboard] = useState(null);
  const [stats, setStats] = useState({ Semanal: [], Mensual: [], Anual: [] });
  const [salesTrend, setSalesTrend] = useState({ Semanal: [], Mensual: [], Anual: [] });
  const [transactions, setTransactions] = useState([]);
  const [financialReports, setFinancialReports] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [scheduledDispatches, setScheduledDispatches] = useState([]);
  const [supplierData, setSupplierData] = useState(null);
  const [supplierOrders, setSupplierOrders] = useState([]);
  const [kitProduct, setKitProduct] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [leads, setLeads] = useState([]);
  const [buyers, setBuyers] = useState([]);

  /* ── Fetchers ── */

  const fetchDashboardAndTrend = useCallback(async (tf, range = null) => {
    const apiTf = tf === 'Personalizado' ? 'custom' : (TIMEFRAME_TO_API[tf] || 'monthly');
    const params = { timeframe: apiTf };
    if (apiTf === 'custom' && range?.start && range?.end) {
      params.startDate = range.start;
      params.endDate = range.end;
    }
    
    const [dashRes, trendRes] = await Promise.all([
      adminAPI.dashboard(params),
      adminAPI.salesTrend(params),
    ]);
    setDashboard(dashRes.data);
    setStats((prev) => ({ ...prev, [tf]: buildStatCards(tf, dashRes.data) }));
    setSalesTrend((prev) => ({ ...prev, [tf]: buildSalesTrend(tf, trendRes.data) }));
    setTransactions((dashRes.data.recentOrders || []).map(orderToTransactionRow));
    return dashRes.data;
  }, []);

  const fetchPaymentMethods = useCallback(async (dash) => {
    const { data: configs } = await paymentMethodsAPI.list();
    setPaymentMethods(buildPaymentMethods(configs, dash?.paymentDistribution));
  }, []);

  const fetchFinancialReport = useCallback(async () => {
    const { data } = await adminAPI.financialReport();
    setFinancialReports({
      earned: fmtMoney(data.earned),
      pendingOrders: data.pendingOrders,
      deliveryOrders: data.deliveryOrders,
      completedOrders: data.completedOrders,
      operatingMargin: data.operatingMargin,
      activeClinics: data.activeClinics,
    });
  }, []);

  const fetchSupplier = useCallback(async () => {
    const { data } = await suppliersAPI.list();
    setSupplierData(data?.[0] || null);
  }, []);

  const fetchSupplierOrders = useCallback(async () => {
    const { data } = await supplierOrdersAPI.list();
    setSupplierOrders(data || []);
  }, []);

  const fetchDispatches = useCallback(async () => {
    const { data } = await dispatchesAPI.list();
    setScheduledDispatches(data || []);
  }, []);

  const fetchKitProduct = useCallback(async () => {
    const { data } = await productsAPI.list();
    const kit = (data || []).find((p) => p.category === 'Kits Quirúrgicos') || data?.[0] || null;
    setKitProduct(kit);
    return kit;
  }, []);

  const fetchReservations = useCallback(async () => {
    const { data } = await reservationsAPI.list({ status: 'reservado' });
    setReservations(data || []);
  }, []);

  const fetchLeads = useCallback(async () => {
    const { data } = await leadsAPI.list();
    setLeads(data || []);
  }, []);

  const fetchBuyers = useCallback(async () => {
    try {
      const { data } = await adminAPI.buyers();
      setBuyers(data || []);
    } catch (err) {
      console.error("Error fetching buyers:", err);
    }
  }, []);

  const fetchAll = useCallback(async (tf) => {
    setLoading(true);
    setError('');
    try {
      const dash = await fetchDashboardAndTrend(tf);
      await Promise.all([
        fetchPaymentMethods(dash),
        fetchFinancialReport(),
        fetchSupplier(),
        fetchSupplierOrders(),
        fetchDispatches(),
        fetchKitProduct(),
        fetchReservations(),
        fetchLeads(),
        fetchBuyers(),
      ]);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudieron cargar los datos del panel.');
    } finally {
      setLoading(false);
    }
  }, [
    fetchDashboardAndTrend,
    fetchPaymentMethods,
    fetchFinancialReport,
    fetchSupplier,
    fetchSupplierOrders,
    fetchDispatches,
    fetchKitProduct,
    fetchReservations,
    fetchLeads,
    fetchBuyers,
    dateRange
  ]);

  const setTimeframe = (tf) => {
    if (tf !== 'Personalizado') setTimeframeState(tf);
  };
  
  const setCustomDateRange = (start, end) => {
    setTimeframeState('Personalizado');
    setDateRange({ start, end });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (timeframe === 'Personalizado') {
        if (dateRange.start && dateRange.end) {
          fetchDashboardAndTrend(timeframe, dateRange).then(fetchPaymentMethods).finally(() => setLoading(false));
        }
      } else {
        fetchDashboardAndTrend(timeframe).then(fetchPaymentMethods).finally(() => setLoading(false));
      }
    }
    return () => { mounted = false; };
  }, [timeframe, dateRange, fetchDashboardAndTrend, fetchPaymentMethods]);

  /* ── Stats: derivados en vivo del backend, no editables a mano ── */
  const updateStat = () => {
    console.warn('Las métricas del dashboard se calculan en vivo desde la base de datos y no se editan manualmente.');
  };
  const updateSalesTrendPoint = () => {
    console.warn('La tendencia de ventas se calcula en vivo desde las órdenes reales y no se edita manualmente.');
  };
  const updateFinancialReports = () => {
    console.warn('El reporte financiero se calcula en vivo desde la base de datos y no se edita manualmente.');
  };
  const resetToDefaults = () => {
    fetchAll(timeframe);
  };

  /* ── Payment methods CRUD ── */
  const updatePaymentMethod = async (id, updatedFields) => {
    await paymentMethodsAPI.update(id, updatedFields);
    await fetchPaymentMethods(dashboard);
  };
  const addPaymentMethod = async (newMethod) => {
    await paymentMethodsAPI.create({
      key: newMethod.key || `metodo_${Date.now()}`,
      name: newMethod.name || 'Nuevo Método',
      color: newMethod.color || '#334155',
      secondaryColor: newMethod.secondaryColor || '#475569',
      description: newMethod.description || '',
    });
    await fetchPaymentMethods(dashboard);
  };
  const deletePaymentMethod = async (id) => {
    await paymentMethodsAPI.remove(id);
    await fetchPaymentMethods(dashboard);
  };

  /* ── Transactions (ventas) CRUD → Orders reales ── */
  const addTransaction = async (newTx) => {
    const qty = Number(newTx.qty) || 1;
    const numericTotal = Number(newTx.numericTotal) || 0;
    const unitPrice = numericTotal > 0 ? numericTotal / qty : 14500;
    await manualOrdersAPI.create({
      customerName: newTx.customer || 'Nuevo Cliente',
      customerClinic: newTx.clinic || '',
      customerPhone: newTx.phone || '',
      quantity: qty,
      unitPrice,
      paymentMethod: PAYMENT_LABEL_TO_KEY[newTx.paymentMethod] || 'efectivo',
      status: ORDER_STATUS_LABEL_TO_KEY[newTx.status] || 'confirmado',
    });
    await fetchDashboardAndTrend(timeframe, timeframe === 'Personalizado' ? dateRange : null);
  };
  const updateTransaction = async (id, updatedFields) => {
    const payload = {};
    if (updatedFields.customer !== undefined) payload.customerName = updatedFields.customer;
    if (updatedFields.clinic !== undefined) payload.customerClinic = updatedFields.clinic;
    if (updatedFields.paymentMethod !== undefined) payload.paymentMethod = PAYMENT_LABEL_TO_KEY[updatedFields.paymentMethod] || updatedFields.paymentMethod;
    if (updatedFields.status !== undefined) payload.status = ORDER_STATUS_LABEL_TO_KEY[updatedFields.status] || updatedFields.status;
    if (updatedFields.qty !== undefined) payload.quantity = updatedFields.qty;
    await ordersAPI.update(id, payload);
    await fetchDashboardAndTrend(timeframe, timeframe === 'Personalizado' ? dateRange : null);
  };
  const deleteTransaction = async (id) => {
    await ordersAPI.remove(id);
    await fetchDashboardAndTrend(timeframe, timeframe === 'Personalizado' ? dateRange : null);
  };

  /* ── Dispatches CRUD ── */
  const addDispatch = async (newDisp) => {
    await dispatchesAPI.create({
      doctor: newDisp.doctor || 'Nuevo Profesional',
      clinic: newDisp.clinic || '',
      kits: Number(newDisp.kits) || 1,
      total: (Number(newDisp.kits) || 1) * (kitProduct?.price || 14500),
      timeSlot: newDisp.timeSlot || '10:00 - 10:30 am',
      slotTime: newDisp.slotTime || '10:00',
      status: newDisp.status || 'Programado',
    });
    await fetchDispatches();
  };
  const updateDispatch = async (id, updatedFields) => {
    await dispatchesAPI.update(id, updatedFields);
    await fetchDispatches();
  };
  const deleteDispatch = async (id) => {
    await dispatchesAPI.remove(id);
    await fetchDispatches();
  };

  /* ── Supplier ── */
  const updateSupplierData = async (updatedFields) => {
    if (!supplierData?._id) return;
    await suppliersAPI.update(supplierData._id, updatedFields);
    await fetchSupplier();
  };

  /* ── Supplier Orders (compras) CRUD ── */
  const addSupplierOrder = async (newOrder) => {
    await supplierOrdersAPI.create({
      supplier: supplierData?._id,
      product: kitProduct?._id,
      kits: Number(newOrder.kits) || 50,
      costPerKit: Number(newOrder.costPerKit) || supplierData?.costPerKit || 5000,
      paymentDate: newOrder.paymentDate || 'Pendiente de coordinación',
      paymentMethod: newOrder.paymentMethod || 'Transferencia Bancaria',
      status: newOrder.status || 'Pendiente',
      invoiceNumber: newOrder.invoiceNumber || 'A facturar',
      dueDate: newOrder.dueDate || 'A coordinar',
      pendingAmount: Number(newOrder.pendingAmount) || 0,
    });
    await Promise.all([fetchSupplierOrders(), fetchKitProduct()]);
  };
  const updateSupplierOrder = async (id, updatedFields) => {
    await supplierOrdersAPI.update(id, updatedFields);
    await Promise.all([fetchSupplierOrders(), fetchKitProduct()]);
  };
  const deleteSupplierOrder = async (id) => {
    await supplierOrdersAPI.remove(id);
    await fetchSupplierOrders();
  };

  /* ── Inventario: derivado del Product "kit" + Reservations + SupplierOrders ── */
  const stockInTransit = supplierOrders
    .filter((o) => o.status === 'En Tránsito')
    .reduce((sum, o) => sum + (o.kits || 0), 0);

  const stockReserved = reservations.reduce((sum, r) => sum + (r.kits || 0), 0);

  const inventoryData = {
    stockAvailable: kitProduct?.stock ?? 0,
    stockReserved,
    stockSoldMonth: dashboard?.kitsSold ?? 0,
    stockInTransit,
    minimumAlertThreshold: kitProduct?.minStock ?? 30,
    kitPrice: kitProduct?.price ?? 9500,
    warehouseLocation: 'Depósito Central GM - San Miguel de Tucumán',
    reservedList: reservations.map((r) => ({
      id: r._id,
      doctor: r.doctor,
      clinic: r.clinic,
      surgeryDate: r.surgeryDate,
      kits: r.kits,
      total: r.total,
      status: r.status === 'reservado' ? 'Confirmado' : r.status,
      paymentStatus: r.paymentStatus,
      surgeryType: r.surgeryType,
      contact: r.contact,
    })),
    lots: supplierOrders
      .filter((o) => o.status === 'Recibido')
      .map((o) => ({
        id: o._id,
        lotNumber: o.invoiceNumber && o.invoiceNumber !== 'A facturar' ? o.invoiceNumber : `LOTE-${String(o._id || '').slice(-6).toUpperCase()}`,
        status: 'Recibido',
        anmatStatus: 'Esterilizado (ETO)',
        date: o.receivedAt ? new Date(o.receivedAt).toLocaleDateString('es-AR') : '—',
        kits: o.kits,
        kitsInitial: o.kits || 0,
        kitsRemaining: o.kits || 0,
        sterilityDate: o.receivedAt ? new Date(o.receivedAt).toLocaleDateString('es-AR') : '—',
        expiryDate: o.receivedAt ? new Date(new Date(o.receivedAt).setFullYear(new Date(o.receivedAt).getFullYear() + 3)).toLocaleDateString('es-AR') : '—',
        costPerKit: o.costPerKit,
        total: o.total,
        invoiceNumber: o.invoiceNumber,
      })),
    componentsStock: (kitProduct?.components || []).map((c) => {
      const kitsEquiv = kitProduct?.stock ?? 0;
      const unitStock = kitsEquiv * (c.qty || 1);
      const status = kitsEquiv <= 0 ? 'Sin stock' : kitsEquiv <= (kitProduct?.minStock ?? 30) ? 'Stock bajo' : 'Disponible';
      return { name: c.name, unitStock, kitsEquiv, perKit: c.qty, status };
    }),
  };

  const updateInventoryData = async (updatedFields) => {
    if (!kitProduct?._id) return;
    const payload = {};
    if (updatedFields.minimumAlertThreshold !== undefined) payload.minStock = updatedFields.minimumAlertThreshold;
    if (updatedFields.kitPrice !== undefined) payload.price = updatedFields.kitPrice;
    if (Object.keys(payload).length > 0) {
      await productsAPI.update(kitProduct._id, payload);
      await fetchKitProduct();
    }
  };

  const addReservation = async (newRes) => {
    const kits = Number(newRes.kits) || 1;
    await reservationsAPI.create({
      productId: kitProduct?._id,
      doctor: newRes.doctor,
      clinic: newRes.clinic,
      kits,
      total: Number(newRes.total) || kits * (kitProduct?.price || 9500),
      surgeryDate: newRes.surgeryDate,
      surgeryType: newRes.surgeryType,
      paymentStatus: newRes.paymentStatus,
      contact: newRes.contact,
    });
    await fetchReservations();
  };
  const fulfillReservation = async (id) => {
    await reservationsAPI.fulfill(id);
    await Promise.all([fetchReservations(), fetchKitProduct(), fetchDashboardAndTrend(timeframe, timeframe === 'Personalizado' ? dateRange : null)]);
  };
  const cancelReservation = async (id) => {
    await reservationsAPI.cancel(id);
    await fetchReservations();
  };
  const adjustStock = async (deltaAvailable) => {
    if (!kitProduct?._id) return;
    await productsAPI.adjustStock(kitProduct._id, deltaAvailable);
    await fetchKitProduct();
  };
  const receiveTransitBatch = async (kitsCount = 100) => {
    const candidate = supplierOrders.find((o) => o.status === 'En Tránsito');
    if (candidate) {
      await supplierOrdersAPI.update(candidate._id, { status: 'Recibido' });
    } else if (kitProduct?._id) {
      await productsAPI.adjustStock(kitProduct._id, kitsCount);
    }
    await Promise.all([fetchSupplierOrders(), fetchKitProduct()]);
  };

  /* ── Leads CRUD ── */
  const addLead = async (newLead) => {
    await leadsAPI.create(newLead);
    await fetchLeads();
  };
  const updateLead = async (id, updatedFields) => {
    await leadsAPI.update(id, updatedFields);
    await fetchLeads();
  };
  const deleteLead = async (id) => {
    await leadsAPI.remove(id);
    await fetchLeads();
  };

  const value = {
    loading,
    error,
    timeframe,
    setTimeframe,
    dateRange,
    setCustomDateRange,
    dashboard,
    stats: stats[timeframe] || stats.Mensual,
    allStats: stats,
    updateStat,
    paymentMethods,
    updatePaymentMethod,
    addPaymentMethod,
    deletePaymentMethod,
    salesTrend: salesTrend[timeframe] || salesTrend.Mensual,
    allSalesTrend: salesTrend,
    updateSalesTrendPoint,
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    resetToDefaults,
    financialReports,
    updateFinancialReports,
    scheduledDispatches,
    addDispatch,
    updateDispatch,
    deleteDispatch,
    supplierData: supplierData || {},
    updateSupplierData,
    supplierOrders,
    addSupplierOrder,
    updateSupplierOrder,
    deleteSupplierOrder,
    inventoryData,
    updateInventoryData,
    addReservation,
    fulfillReservation,
    cancelReservation,
    adjustStock,
    receiveTransitBatch,
    leads,
    addLead,
    updateLead,
    deleteLead,
    buyers,
    refreshBuyers: fetchBuyers,
  };

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData debe usarse dentro de un AdminDataProvider');
  }
  return context;
};

export default AdminDataContext;
