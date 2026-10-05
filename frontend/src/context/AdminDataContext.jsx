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
// El modal de "Nueva Venta" ofrece etiquetas más cortas / distintas a las
// de PAYMENT_METHOD_LABELS (p. ej. "Efectivo / Contra Entrega" en vez de
// "...(Tucumán)"). Sin este alias, updateTransaction mandaba esa etiqueta
// tal cual al backend, que no es un valor válido del enum de Order y
// tiraba un error de validación al guardar.
Object.assign(PAYMENT_LABEL_TO_KEY, {
  'Efectivo / Contra Entrega': 'efectivo',
  'Mercado Pago': 'mercadopago',
  'Acordar con Vendedor': 'efectivo',
});

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
        newClients: t?.newClients || 0,
        revenueNum: t?.revenue || 0,
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
        newClients: t?.newClients || 0,
        revenueNum: t?.revenue || 0,
        revenue: fmtMoney(t?.revenue || 0),
      };
    });
  }

  // Mensual (y Personalizado, como fallback): un valor por mes del año actual.
  return MONTH_LABELS.map((label, idx) => {
    const t = byId.get(idx + 1);
    return {
      label,
      newClients: t?.newClients || 0,
      revenueNum: t?.revenue || 0,
      revenue: fmtMoney(t?.revenue || 0),
    };
  });
};

const buildStatCards = (timeframe, dash, kitProduct) => {
  const changeDescByTf = {
    Semanal: 'esta semana',
    Mensual: 'este mes',
    Anual: 'este año',
  };
  const desc = changeDescByTf[timeframe] || 'en el período';

  // Ingreso Extra = ganancia neta real de lo vendido en el período
  // (precio de venta del kit - costo por kit) x kits vendidos. Ej: Gonzalo
  // invierte $1.320.000 en 200 kits (costo ~$6.600/kit) y los vende a
  // $9.500 → gana ~$2.900 por kit vendido.
  const unitCost = Number(kitProduct?.cost) || 0;
  const unitPrice = Number(kitProduct?.price) || 0;
  const unitProfit = Math.max(unitPrice - unitCost, 0);
  const kitsSold = Number(dash?.kitsSold) || 0;
  const extraIncome = unitProfit * kitsSold;

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
      id: 'stock',
      title: 'STOCK ACTUAL DE KITS',
      value: String(kitProduct?.stock ?? 0),
      unit: 'Kits disponibles',
      change: '—',
      changeDesc: 'listos para vender',
      sparkline: [0, 0, 0, 0, 0, 0, 0],
      trend: 'neutral',
    },
    {
      id: 'extra_income',
      title: 'INGRESO EXTRA',
      value: fmtMoney(extraIncome),
      change: '—',
      changeDesc: `ganancia neta ${desc}`,
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
      // El backend devuelve "clinic"; CustomerProfileModal y la búsqueda del
      // dashboard esperan "clinicName" (mismo campo que usan los Leads) para
      // poder tratar compradores y clientes propios de forma uniforme.
      setBuyers((data || []).map((b) => ({ ...b, clinicName: b.clinic || b.clinicName || '' })));
    } catch (err) {
      console.error("Error fetching buyers:", err);
    }
  }, []);

  const fetchAll = useCallback(async (tf) => {
    setLoading(true);
    setError('');
    // Reintenta un par de veces: el backend de Render puede tardar en
    // "despertarse" si nadie lo usaba, y eso antes dejaba todo el panel
    // (kit, leads, compradores, proveedor) en blanco para siempre sin avisar.
    const attempts = 3;
    for (let i = 0; i < attempts; i++) {
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
        setError('');
        break;
      } catch (err) {
        if (i === attempts - 1) {
          setError(err.response?.data?.message || 'No se pudieron cargar los datos del panel. Puede ser que el servidor se esté "despertando" — probá de nuevo en unos segundos.');
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2500));
        }
      }
    }
    setLoading(false);
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

  // Carga inicial: kitProduct, leads, buyers, reservas, proveedor y sus
  // órdenes NO se estaban pidiendo nunca al entrar al panel (sólo se
  // refrescaban después de crear/editar algo desde cada sección). Por eso
  // el buscador del dashboard no encontraba nada, "Mis Clientes" aparecía
  // en 0 y el modal de Inventario mostraba todo vacío/en default hasta
  // que se tocaba otra pantalla primero. fetchAll trae todo eso una vez
  // al entrar al panel de administración.
  useEffect(() => {
    fetchAll(timeframe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const range = timeframe === 'Personalizado' ? dateRange : null;
      if (timeframe === 'Personalizado' && !(dateRange.start && dateRange.end)) return;

      setLoading(true);
      // El backend de Render se "duerme" cuando nadie lo usa un rato y la
      // primera request después de eso puede tardar 20-40s en responder o
      // directamente cortarse (muy común en redes de celular/wifi
      // inestable). Antes, si esta llamada fallaba, no se avisaba nada y
      // el panel quedaba con todo en $0 para siempre. Ahora reintenta sola
      // un par de veces antes de mostrar el error.
      const attempts = 3;
      for (let i = 0; i < attempts; i++) {
        try {
          const dash = await fetchDashboardAndTrend(timeframe, range);
          await fetchPaymentMethods(dash);
          if (mounted) setError('');
          break;
        } catch (err) {
          if (i === attempts - 1) {
            if (mounted) {
              setError(
                err?.response?.data?.message ||
                'No se pudieron cargar los datos del panel. Puede ser que el servidor se esté "despertando" — probá de nuevo en unos segundos.'
              );
            }
          } else {
            await new Promise((resolve) => setTimeout(resolve, 2500));
          }
        }
      }
      if (mounted) setLoading(false);
    };

    load();
    return () => { mounted = false; };
  }, [timeframe, dateRange, fetchDashboardAndTrend, fetchPaymentMethods]);

  // Las stat cards (incluida "Ingreso Extra", que depende del costo/precio
  // del kit) se recalculan en vivo cada vez que cambian el dashboard, el
  // producto kit o el período elegido.
  useEffect(() => {
    if (!dashboard) return;
    setStats((prev) => ({ ...prev, [timeframe]: buildStatCards(timeframe, dashboard, kitProduct) }));
  }, [dashboard, kitProduct, timeframe]);

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
      total: (Number(newDisp.kits) || 1) * (kitProduct?.price || 8500),
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
    // Sacamos los campos que Mongo maneja solo (_id es inmutable: mandarlo de
    // vuelta en el body del PUT tira un error de validación y el guardado
    // queda roto silenciosamente).
    const { _id, __v, createdAt, updatedAt, ...safeFields } = updatedFields;
    await suppliersAPI.update(supplierData._id, safeFields);
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
      // "status" es el estado LOGÍSTICO (Pendiente/En Tránsito/Recibido): siempre
      // arranca en Pendiente al crear la orden; se avanza aparte con "Marcar Recibido".
      status: 'Pendiente',
      // "paymentStatus" es el estado de PAGO (Pendiente/Parcial 50%/Completado),
      // un campo totalmente distinto — antes se guardaba mal en "status" y rompía
      // la validación del modelo apenas se elegía algo distinto de "Pendiente".
      paymentStatus: newOrder.paymentStatus || 'Pendiente',
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
    stockSoldTotal: dashboard?.totalKitsSold ?? dashboard?.kitsSold ?? 0,
    stockInTransit,
    kitsPurchasedTotal: kitProduct?.totalPurchased ?? 0,
    minimumAlertThreshold: kitProduct?.minStock ?? 30,
    kitPrice: kitProduct?.price ?? 9500,
    kitCost: kitProduct?.cost ?? 0,
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
    if (updatedFields.kitCost !== undefined) payload.cost = updatedFields.kitCost;
    if (updatedFields.stockAvailable !== undefined) payload.stock = updatedFields.stockAvailable;
    if (updatedFields.kitsPurchasedTotal !== undefined) payload.totalPurchased = updatedFields.kitsPurchasedTotal;
    if (Object.keys(payload).length > 0) {
      // Usamos directamente el producto que devuelve el PUT en vez de volver
      // a pedir la lista completa: evita que una lectura con un pelín de
      // demora (replicación de Mongo/caché) pise el precio/stock recién
      // guardados con un valor todavía viejo.
      const { data: updated } = await productsAPI.update(kitProduct._id, payload);
      if (updated && updated._id) {
        setKitProduct(updated);
      } else {
        await fetchKitProduct();
      }
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
