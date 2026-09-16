import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminDataContext = createContext();

const STORAGE_KEY = 'gm_admin_data_clean_v1';

const defaultData = {
  timeframe: 'Mensual', // 'Semanal' | 'Mensual' | 'Anual'
  stats: {
    Semanal: [
      {
        id: 'revenue',
        title: 'CANTIDAD DE INGRESOS BRUTOS',
        value: '$0',
        change: '0%',
        changeDesc: 'sin ingresos previos',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
      {
        id: 'orders',
        title: 'CANTIDAD DE VENTAS',
        value: '0',
        unit: 'Kits Vendidos',
        change: '0%',
        changeDesc: 'sin ventas registradas',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
      {
        id: 'customers',
        title: 'CANTIDAD DE CLIENTES',
        value: '0',
        unit: 'Clínicas / Docs',
        change: '0%',
        changeDesc: 'sin clientes activos',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
      {
        id: 'new_customers',
        title: 'CANTIDAD DE NUEVOS CLIENTES',
        value: '0',
        unit: 'Nuevos esta semana',
        change: '0',
        changeDesc: 'sin nuevos clientes',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
    ],
    Mensual: [
      {
        id: 'revenue',
        title: 'CANTIDAD DE INGRESOS BRUTOS',
        value: '$0',
        change: '0%',
        changeDesc: 'sin ingresos este mes',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
      {
        id: 'orders',
        title: 'CANTIDAD DE VENTAS',
        value: '0',
        unit: 'Kits Vendidos',
        change: '0%',
        changeDesc: 'sin ventas este mes',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
      {
        id: 'customers',
        title: 'CANTIDAD DE CLIENTES',
        value: '0',
        unit: 'Clínicas / Docs',
        change: '0%',
        changeDesc: 'sin clientes activos',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
      {
        id: 'new_customers',
        title: 'CANTIDAD DE NUEVOS CLIENTES',
        value: '0',
        unit: 'Nuevos este mes',
        change: '0',
        changeDesc: 'sin nuevos clientes',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
    ],
    Anual: [
      {
        id: 'revenue',
        title: 'CANTIDAD DE INGRESOS BRUTOS',
        value: '$0',
        change: '0%',
        changeDesc: 'sin ingresos en el año',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
      {
        id: 'orders',
        title: 'CANTIDAD DE VENTAS',
        value: '0',
        unit: 'Kits Vendidos',
        change: '0%',
        changeDesc: 'sin ventas en el año',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
      {
        id: 'customers',
        title: 'CANTIDAD DE CLIENTES',
        value: '0',
        unit: 'Clínicas / Docs',
        change: '0%',
        changeDesc: 'sin clientes anuales',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
      {
        id: 'new_customers',
        title: 'CANTIDAD DE NUEVOS CLIENTES',
        value: '0',
        unit: 'Nuevos en el año',
        change: '0',
        changeDesc: 'sin nuevos clientes',
        sparkline: [0, 0, 0, 0, 0, 0, 0],
        trend: 'neutral',
      },
    ],
  },
  paymentMethods: [
    {
      id: 'transfer',
      name: 'Transferencia Bancaria',
      percentage: 0,
      amount: '$0',
      numericAmount: 0,
      color: '#0F172A',
      secondaryColor: '#1E293B',
      description: 'Transferencia inmediata con alias o CBU',
    },
    {
      id: 'cash',
      name: 'Efectivo / Contra Entrega (Tucumán)',
      percentage: 0,
      amount: '$0',
      numericAmount: 0,
      color: '#10B981',
      secondaryColor: '#059669',
      description: 'Abonado al momento de recibir el kit en clínica',
    },
    {
      id: 'mercadopago',
      name: 'Mercado Pago / Tarjetas',
      percentage: 0,
      amount: '$0',
      numericAmount: 0,
      color: '#00C2CB',
      secondaryColor: '#0284C7',
      description: 'Link de pago digital y cuotas',
    },
  ],
  salesTrend: {
    Semanal: [
      { label: 'LUN', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'MAR', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'MIÉ', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'JUE', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'VIE', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'SÁB', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'DOM', newClients: 0, existingClients: 0, revenue: '$0' },
    ],
    Mensual: [
      { label: 'ENE', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'FEB', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'MAR', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'ABR', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'MAY', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'JUN', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'JUL', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'AGO', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'SEP', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'OCT', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'NOV', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: 'DIC', newClients: 0, existingClients: 0, revenue: '$0' },
    ],
    Anual: [
      { label: '2023', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: '2024', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: '2025', newClients: 0, existingClients: 0, revenue: '$0' },
      { label: '2026', newClients: 0, existingClients: 0, revenue: '$0' },
    ],
  },
  transactions: [],
  financialReports: {
    earned: '$0',
    earnedChange: '0%',
    pendingOrders: 0,
    pendingChange: '0%',
    deliveryOrders: 0,
    deliveryChange: '0%',
    completedOrders: 0,
    completedChange: '0%',
    operatingMargin: '0%',
    activeClinics: 0,
  },
  scheduledDispatches: [],
  supplierData: {
    company: 'BioTex Médica S.A.',
    subtitle: 'Fabricante y Envasador Estéril Exclusivo',
    contactName: 'Lic. Martín Rodriguez',
    role: 'Gerente Comercial de Cuentas Quirúrgicas',
    phone: '+54 9 11 5522-8400',
    whatsapp: '5491155228400',
    email: 'pedidos@biotexmedica.com.ar',
    address: 'Parque Industrial Tortuguitas, Buenos Aires (Despachos semanales a Tucumán)',
    cuit: '30-71458920-4',
    taxCondition: 'Responsable Inscripto (Factura A)',
    bank: 'Banco Santander Río',
    cbu: '0720123488000034567890',
    alias: 'BIOTEX.PAGOS.OFICIAL',
    anmatPm: 'PM N° 1450-88 (Esterilidad ETO ANMAT)',
    costPerKit: 5000,
    regularSalePrice: 8500,
    paymentTerms: '50% anticipo al emitir pedido • 50% contra entrega en depósito Tucumán',
    deliveryTime: '48 a 72 hs hábiles post-pago',
    nextPaymentDate: 'Sin pagos pendientes',
    nextPaymentAmount: 0,
    nextPaymentConcept: 'No hay pagos programados pendientes',
    nextPaymentStatus: 'Al día',
    itemsBreakdown: [
      { name: 'Batas Quirúrgicas con Puños Elastizados', qty: '2 unidades', cost: 1600 },
      { name: 'Compresa 1x1 mt Impermeable', qty: '1 unidad', cost: 700 },
      { name: 'Compresa 50x50 cm Impermeable', qty: '1 unidad', cost: 400 },
      { name: 'Campo Fenestrado para Paciente', qty: '1 unidad', cost: 500 },
      { name: 'Cubre Suctores Descartables', qty: '2 unidades', cost: 400 },
      { name: 'Gorros Clásicos con Elástico', qty: '2 unidades', cost: 400 },
      { name: 'Barbijos Triple Capa con Filtro', qty: '2 unidades', cost: 450 },
      { name: 'Cubrecalzados Elastizados', qty: '2 unidades', cost: 350 },
      { name: 'Termosellado y Esterilización ETO ANMAT', qty: '1 empaque cerrado', cost: 200 },
    ],
    tierPricing: [
      { tier: 'Lote Menor (1 a 49 kits)', costPerKit: 5200, unitMargin: 3300, marginPct: '38.8%' },
      { tier: 'Lote Habitual (50 a 99 kits)', costPerKit: 5000, unitMargin: 3500, marginPct: '41.2%' },
      { tier: 'Lote Mayorista (100 a 199 kits)', costPerKit: 4700, unitMargin: 3800, marginPct: '44.7%' },
      { tier: 'Lote Escala (200+ kits)', costPerKit: 4400, unitMargin: 4100, marginPct: '48.2%' },
    ],
  },
  supplierOrders: [],
  inventoryData: {
    stockAvailable: 0,
    stockReserved: 0,
    stockSoldMonth: 0,
    totalSoldYear: 0,
    stockInTransit: 0,
    minimumAlertThreshold: 30,
    kitPrice: 8500,
    warehouseLocation: 'Depósito Central GM - San Miguel de Tucumán',
    reservedList: [],
    lots: [],
    componentsStock: [
      { name: 'Batas Quirúrgicas con Puños', unitStock: 0, kitsEquiv: 0, perKit: 2, status: 'Sin stock' },
      { name: 'Compresas Impermeables 1x1 mt', unitStock: 0, kitsEquiv: 0, perKit: 1, status: 'Sin stock' },
      { name: 'Compresas Impermeables 50x50 cm', unitStock: 0, kitsEquiv: 0, perKit: 1, status: 'Sin stock' },
      { name: 'Campos Fenestrados para Paciente', unitStock: 0, kitsEquiv: 0, perKit: 1, status: 'Sin stock' },
      { name: 'Cubre Suctores Descartables', unitStock: 0, kitsEquiv: 0, perKit: 2, status: 'Sin stock' },
      { name: 'Gorros Clásicos con Elástico', unitStock: 0, kitsEquiv: 0, perKit: 2, status: 'Sin stock' },
      { name: 'Barbijos Triple Capa Bacteriana', unitStock: 0, kitsEquiv: 0, perKit: 2, status: 'Sin stock' },
      { name: 'Cubrecalzados Elastizados', unitStock: 0, kitsEquiv: 0, perKit: 2, status: 'Sin stock' },
    ],
  },
};

export const AdminDataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultData,
          ...parsed,
          supplierData: parsed.supplierData || defaultData.supplierData,
          supplierOrders: parsed.supplierOrders || defaultData.supplierOrders,
          inventoryData: parsed.inventoryData || defaultData.inventoryData,
        };
      }
    } catch (e) {
      console.error('Error reading localStorage for admin data', e);
    }
    return defaultData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error writing localStorage for admin data', e);
    }
  }, [data]);

  // Set timeframe (Semanal / Mensual / Anual)
  const setTimeframe = (tf) => {
    setData((prev) => ({ ...prev, timeframe: tf }));
  };

  // Update a stat card
  const updateStat = (id, updatedFields) => {
    setData((prev) => {
      const currentList = prev.stats[prev.timeframe] || prev.stats.Mensual;
      const updatedList = currentList.map((stat) =>
        stat.id === id ? { ...stat, ...updatedFields } : stat
      );
      return {
        ...prev,
        stats: {
          ...prev.stats,
          [prev.timeframe]: updatedList,
        },
      };
    });
  };

  // Payment methods CRUD
  const updatePaymentMethod = (id, updatedFields) => {
    setData((prev) => {
      const updated = prev.paymentMethods.map((pm) =>
        pm.id === id ? { ...pm, ...updatedFields } : pm
      );
      return { ...prev, paymentMethods: updated };
    });
  };

  const addPaymentMethod = (newMethod) => {
    setData((prev) => ({
      ...prev,
      paymentMethods: [
        ...prev.paymentMethods,
        {
          id: `pm_${Date.now()}`,
          name: newMethod.name || 'Nuevo Método',
          percentage: Number(newMethod.percentage) || 10,
          amount: newMethod.amount || '$150.000',
          numericAmount: Number(newMethod.numericAmount) || 150000,
          color: newMethod.color || '#334155',
          secondaryColor: newMethod.secondaryColor || '#475569',
          description: newMethod.description || '',
        },
      ],
    }));
  };

  const deletePaymentMethod = (id) => {
    setData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((pm) => pm.id !== id),
    }));
  };

  // Sales trend update
  const updateSalesTrendPoint = (index, updatedFields) => {
    setData((prev) => {
      const list = [...(prev.salesTrend[prev.timeframe] || [])];
      if (list[index]) {
        list[index] = { ...list[index], ...updatedFields };
      }
      return {
        ...prev,
        salesTrend: {
          ...prev.salesTrend,
          [prev.timeframe]: list,
        },
      };
    });
  };

  // Transactions CRUD
  const addTransaction = (newTx) => {
    setData((prev) => ({
      ...prev,
      transactions: [
        {
          id: newTx.id || `#GM-${Math.floor(10000 + Math.random() * 90000)}`,
          customer: newTx.customer || 'Nuevo Cliente',
          clinic: newTx.clinic || 'Consultorio Tucumán',
          product: 'Kit Odontológico Completo',
          paymentMethod: newTx.paymentMethod || 'Transferencia Bancaria',
          status: newTx.status || 'Completado',
          qty: Number(newTx.qty) || 1,
          unitPrice: newTx.unitPrice || '$14.500',
          total: newTx.total || '$14.500',
          numericTotal: Number(newTx.numericTotal) || 14500,
          date: 'Reciente',
          img: newTx.img || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&q=80',
        },
        ...prev.transactions,
      ],
    }));
  };

  const updateTransaction = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedFields } : t
      ),
    }));
  };

  const deleteTransaction = (id) => {
    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((t) => t.id !== id),
    }));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Update Financial metrics
  const updateFinancialReports = (updatedFields) => {
    setData((prev) => ({
      ...prev,
      financialReports: {
        ...prev.financialReports,
        ...updatedFields,
      },
    }));
  };

  // Dispatch schedule CRUD
  const addDispatch = (newDisp) => {
    setData((prev) => ({
      ...prev,
      scheduledDispatches: [
        {
          id: `disp_${Date.now()}`,
          timeSlot: newDisp.timeSlot || '10:00 - 10:30 am',
          slotTime: newDisp.slotTime || '10:00',
          doctor: newDisp.doctor || 'Nuevo Profesional',
          clinic: newDisp.clinic || 'Consultorio Tucumán',
          kits: Number(newDisp.kits) || 1,
          total: `$${((Number(newDisp.kits) || 1) * 14500).toLocaleString('es-AR')}`,
          status: newDisp.status || 'Programado',
          active: false,
        },
        ...(prev.scheduledDispatches || []),
      ],
    }));
  };

  const updateDispatch = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      scheduledDispatches: (prev.scheduledDispatches || []).map((d) =>
        d.id === id ? { ...d, ...updatedFields } : d
      ),
    }));
  };

  const deleteDispatch = (id) => {
    setData((prev) => ({
      ...prev,
      scheduledDispatches: (prev.scheduledDispatches || []).filter((d) => d.id !== id),
    }));
  };

  // Supplier CRUD methods
  const updateSupplierData = (updatedFields) => {
    setData((prev) => ({
      ...prev,
      supplierData: {
        ...prev.supplierData,
        ...updatedFields,
      },
    }));
  };

  const addSupplierOrder = (newOrder) => {
    setData((prev) => ({
      ...prev,
      supplierOrders: [
        {
          id: newOrder.id || `OC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
          date: newOrder.date || 'Hoy',
          kits: Number(newOrder.kits) || 50,
          costPerKit: Number(newOrder.costPerKit) || 5000,
          total: (Number(newOrder.kits) || 50) * (Number(newOrder.costPerKit) || 5000),
          paymentDate: newOrder.paymentDate || 'Pendiente de coordinación',
          paymentMethod: newOrder.paymentMethod || 'Transferencia Bancaria CBU',
          status: newOrder.status || 'Pendiente',
          invoiceNumber: newOrder.invoiceNumber || 'A facturar',
          dueDate: newOrder.dueDate || 'A coordinar',
          pendingAmount: Number(newOrder.pendingAmount) || 0,
        },
        ...(prev.supplierOrders || []),
      ],
    }));
  };

  const updateSupplierOrder = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      supplierOrders: (prev.supplierOrders || []).map((o) =>
        o.id === id ? { ...o, ...updatedFields } : o
      ),
    }));
  };

  const deleteSupplierOrder = (id) => {
    setData((prev) => ({
      ...prev,
      supplierOrders: (prev.supplierOrders || []).filter((o) => o.id !== id),
    }));
  };

  // Inventory CRUD and Stock Flow Methods
  const updateInventoryData = (updatedFields) => {
    setData((prev) => ({
      ...prev,
      inventoryData: {
        ...prev.inventoryData,
        ...updatedFields,
      },
    }));
  };

  const addReservation = (newRes) => {
    const kits = Number(newRes.kits) || 1;
    setData((prev) => {
      const inv = prev.inventoryData || defaultData.inventoryData;
      return {
        ...prev,
        inventoryData: {
          ...inv,
          stockAvailable: Math.max(0, inv.stockAvailable - kits),
          stockReserved: inv.stockReserved + kits,
          reservedList: [
            {
              id: `res_${Date.now()}`,
              doctor: newRes.doctor || 'Nuevo Profesional',
              clinic: newRes.clinic || 'Consultorio / Clínica Tucumán',
              surgeryDate: newRes.surgeryDate || 'A coordinar',
              kits,
              total: Number(newRes.total) || kits * 8500,
              status: newRes.status || 'Confirmado',
              paymentStatus: newRes.paymentStatus || 'Pendiente',
              surgeryType: newRes.surgeryType || 'Cirugía Odontológica',
              contact: newRes.contact || '+54 9 381 ...',
            },
            ...(inv.reservedList || []),
          ],
        },
      };
    });
  };

  const fulfillReservation = (id) => {
    setData((prev) => {
      const inv = prev.inventoryData || defaultData.inventoryData;
      const target = (inv.reservedList || []).find((r) => r.id === id);
      if (!target) return prev;
      return {
        ...prev,
        inventoryData: {
          ...inv,
          stockReserved: Math.max(0, inv.stockReserved - target.kits),
          stockSoldMonth: inv.stockSoldMonth + target.kits,
          reservedList: (inv.reservedList || []).filter((r) => r.id !== id),
        },
      };
    });
  };

  const cancelReservation = (id) => {
    setData((prev) => {
      const inv = prev.inventoryData || defaultData.inventoryData;
      const target = (inv.reservedList || []).find((r) => r.id === id);
      if (!target) return prev;
      return {
        ...prev,
        inventoryData: {
          ...inv,
          stockReserved: Math.max(0, inv.stockReserved - target.kits),
          stockAvailable: inv.stockAvailable + target.kits,
          reservedList: (inv.reservedList || []).filter((r) => r.id !== id),
        },
      };
    });
  };

  const adjustStock = (deltaAvailable) => {
    setData((prev) => {
      const inv = prev.inventoryData || defaultData.inventoryData;
      return {
        ...prev,
        inventoryData: {
          ...inv,
          stockAvailable: Math.max(0, inv.stockAvailable + deltaAvailable),
        },
      };
    });
  };

  const receiveTransitBatch = (kitsCount = 100) => {
    setData((prev) => {
      const inv = prev.inventoryData || defaultData.inventoryData;
      return {
        ...prev,
        inventoryData: {
          ...inv,
          stockInTransit: Math.max(0, inv.stockInTransit - kitsCount),
          stockAvailable: inv.stockAvailable + kitsCount,
        },
      };
    });
  };

  return (
    <AdminDataContext.Provider
      value={{
        timeframe: data.timeframe,
        setTimeframe,
        stats: data.stats[data.timeframe] || data.stats.Mensual,
        allStats: data.stats,
        updateStat,
        paymentMethods: data.paymentMethods,
        updatePaymentMethod,
        addPaymentMethod,
        deletePaymentMethod,
        salesTrend: data.salesTrend[data.timeframe] || data.salesTrend.Mensual,
        allSalesTrend: data.salesTrend,
        updateSalesTrendPoint,
        transactions: data.transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        financialReports: data.financialReports,
        updateFinancialReports,
        scheduledDispatches: data.scheduledDispatches || [],
        addDispatch,
        updateDispatch,
        deleteDispatch,
        supplierData: data.supplierData || defaultData.supplierData,
        supplierOrders: data.supplierOrders || defaultData.supplierOrders,
        updateSupplierData,
        addSupplierOrder,
        updateSupplierOrder,
        deleteSupplierOrder,
        inventoryData: data.inventoryData || defaultData.inventoryData,
        updateInventoryData,
        addReservation,
        fulfillReservation,
        cancelReservation,
        adjustStock,
        receiveTransitBatch,
        resetToDefaults,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
