const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

/**
 * @desc    Obtener métricas del dashboard (Aggregation Pipelines)
 * @route   GET /api/admin/dashboard
 * @access  Admin
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const { timeframe = 'monthly', startDate, endDate } = req.query;

    // Determinar rango de fechas según timeframe
    const now = new Date();
    let dateFrom;
    let dateTo = now;

    if (timeframe === 'custom' && startDate && endDate) {
      dateFrom = new Date(startDate);
      dateTo = new Date(endDate);
      // Incluir el día completo de endDate
      dateTo.setHours(23, 59, 59, 999);
    } else {
      switch (timeframe) {
        case 'weekly':
          dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'yearly':
          dateFrom = new Date(now.getFullYear(), 0, 1);
          break;
        case 'monthly':
        default:
          dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
      }
    }

    // Aggregation: ventas totales y kits vendidos
    const [salesStats] = await Order.aggregate([
      {
        $match: {
          status: { $nin: ['cancelado'] },
          createdAt: { $gte: dateFrom, $lte: dateTo },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' },
          totalKitsSold: {
            $sum: {
              $reduce: {
                input: '$items',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.quantity'] },
              },
            },
          },
        },
      },
    ]);

    // Conteo de clientes
    const totalClients = await User.countDocuments({ role: 'client', isActive: true });
    const newClientsInPeriod = await User.countDocuments({
      role: 'client',
      createdAt: { $gte: dateFrom },
    });

    // Productos con stock bajo
    const lowStockProducts = await Product.find({
      isActive: true,
      $expr: { $lte: ['$stock', '$minStock'] },
    }).select('name stock minStock');

    // Órdenes pendientes
    const pendingOrders = await Order.countDocuments({ status: 'pendiente' });

    // Distribución por método de pago (en el período)
    const paymentDistribution = await Order.aggregate([
      {
        $match: {
          status: { $nin: ['cancelado'] },
          createdAt: { $gte: dateFrom },
        },
      },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          total: { $sum: '$totalAmount' },
        },
      },
    ]);

    // Ventas recientes — el frontend usa esta lista para armar la tabla de
    // Ventas y los totales de Finanzas, así que el límite tiene que cubrir
    // el volumen real del negocio y no truncar (recortar en 10 hacía que los
    // totales mostrados no coincidieran con la base de datos apenas hubiera
    // más de 10 ventas cargadas).
    const recentOrders = await Order.find({ status: { $nin: ['cancelado'] } })
      .populate('user', 'name email clinicName')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 })
      .limit(500);

    res.json({
      revenue: salesStats?.totalRevenue || 0,
      orders: salesStats?.totalOrders || 0,
      avgOrderValue: Math.round(salesStats?.avgOrderValue || 0),
      kitsSold: salesStats?.totalKitsSold || 0,
      totalClients,
      newClientsInPeriod,
      pendingOrders,
      lowStockProducts,
      lowStockAlerts: lowStockProducts.length,
      paymentDistribution,
      recentOrders,
      timeframe,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener lista de usuarios/clientes
 * @route   GET /api/admin/users
 * @access  Admin
 */
const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;

    const filter = { role: 'client' };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { clinicName: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(filter);

    res.json({
      users,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener detalle de un cliente + historial de compras
 * @route   GET /api/admin/users/:id
 * @access  Admin
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('Usuario no encontrado.');
    }

    const orders = await Order.find({ user: user._id })
      .populate('items.product', 'name price image')
      .sort({ createdAt: -1 });

    const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    res.json({
      user,
      orders,
      totalSpent,
      totalOrders: orders.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Tendencia de ventas (agrupado por día/mes/año)
 * @route   GET /api/admin/sales-trend
 * @access  Admin
 */
// Identidad de comprador: cuenta registrada (user) o venta manual (nombre+teléfono)
const buyerKeyOf = (o) => (o.user ? `u:${String(o.user)}` : `n:${o.customerName || ''}|${o.customerPhone || ''}`);

const getSalesTrend = async (req, res, next) => {
  try {
    const { timeframe = 'monthly', startDate, endDate } = req.query;
    const now = new Date();
    let dateFrom;
    let dateTo = now;
    let bucketOf; // (Date) => number - clave de período que coincide con lo que espera el frontend

    switch (timeframe) {
      case 'weekly':
        dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        // Mongo $dayOfWeek: 1=domingo..7=sábado. JS getDay(): 0=domingo..6=sábado.
        bucketOf = (d) => d.getDay() + 1;
        break;
      case 'yearly':
        dateFrom = new Date(now.getFullYear() - 3, 0, 1);
        bucketOf = (d) => d.getFullYear();
        break;
      case 'custom':
        if (startDate && endDate) {
          dateFrom = new Date(startDate);
          dateTo = new Date(endDate);
          dateTo.setHours(23, 59, 59, 999);
        } else {
          dateFrom = new Date(now.getFullYear(), 0, 1);
        }
        bucketOf = (d) => d.getMonth() + 1;
        break;
      case 'monthly':
      default:
        // "Mensual" en el admin muestra el año completo desglosado por mes (ENE..DIC)
        dateFrom = new Date(now.getFullYear(), 0, 1);
        bucketOf = (d) => d.getMonth() + 1;
        break;
    }

    // Primera compra histórica de cada cliente (para saber si una orden es "nueva" o "recurrente")
    const allOrders = await Order.find({ status: { $ne: 'cancelado' } })
      .select('createdAt user customerName customerPhone')
      .sort({ createdAt: 1 })
      .lean();

    const firstOrderIdByBuyer = new Map();
    for (const o of allOrders) {
      const key = buyerKeyOf(o);
      if (!firstOrderIdByBuyer.has(key)) {
        firstOrderIdByBuyer.set(key, String(o._id));
      }
    }

    const ordersInRange = await Order.find({
      status: { $ne: 'cancelado' },
      createdAt: { $gte: dateFrom, $lte: dateTo },
    })
      .select('createdAt totalAmount items user customerName customerPhone')
      .lean();

    const buckets = new Map();
    for (const o of ordersInRange) {
      const d = new Date(o.createdAt);
      const key = bucketOf(d);
      if (!buckets.has(key)) {
        buckets.set(key, { revenue: 0, orders: 0, kits: 0, newClients: 0, existingClients: 0 });
      }
      const b = buckets.get(key);
      b.revenue += o.totalAmount || 0;
      b.orders += 1;
      b.kits += (o.items || []).reduce((sum, it) => sum + (it.quantity || 0), 0);

      const isFirstOrderEver = firstOrderIdByBuyer.get(buyerKeyOf(o)) === String(o._id);
      if (isFirstOrderEver) b.newClients += 1;
      else b.existingClients += 1;
    }

    const trend = Array.from(buckets.entries()).map(([_id, v]) => ({ _id, ...v }));
    res.json(trend);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener listado de transacciones
 * @route   GET /api/admin/transactions
 * @access  Admin
 */
const getTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, type } = req.query;

    const filter = {};
    if (type) filter.type = type;

    const transactions = await Transaction.find(filter)
      .populate('order', 'orderNumber totalAmount status')
      .populate('user', 'name email clinicName')
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(filter);

    res.json({
      transactions,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reporte financiero
 * @route   GET /api/admin/financial-report
 * @access  Admin
 */
const getFinancialReport = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Ingresos del mes
    const [monthlyIncome] = await Transaction.aggregate([
      { $match: { type: 'income', date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Gastos del mes
    const [monthlyExpenses] = await Transaction.aggregate([
      { $match: { type: 'expense', date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Reembolsos / cancelaciones del mes (ventas que se dieron de baja: hay
    // que restarlas del ingreso, si no una cancelación no bajaba nunca la
    // facturación mostrada en Finanzas).
    const [monthlyRefunds] = await Transaction.aggregate([
      { $match: { type: 'refund', date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Órdenes por estado
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const refunds = monthlyRefunds?.total || 0;
    const income = (monthlyIncome?.total || 0) - refunds;
    const expenses = monthlyExpenses?.total || 0;
    const profit = income - expenses;
    const margin = income > 0 ? ((profit / income) * 100).toFixed(1) : 0;

    // Clínicas activas (clientes que compraron este mes)
    const activeClinics = await Order.distinct('user', {
      createdAt: { $gte: startOfMonth },
      status: { $nin: ['cancelado'] },
    });

    res.json({
      earned: income,
      expenses,
      profit,
      operatingMargin: `${margin}%`,
      pendingOrders: ordersByStatus.find(s => s._id === 'pendiente')?.count || 0,
      deliveryOrders: ordersByStatus.find(s => s._id === 'enviado')?.count || 0,
      completedOrders: ordersByStatus.find(s => s._id === 'entregado')?.count || 0,
      activeClinics: activeClinics.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener la cartera de clientes (compradores reales basados en órdenes)
 * @route   GET /api/admin/buyers
 * @access  Admin
 */
const getBuyers = async (req, res, next) => {
  try {
    // Trae clientes con cuenta registrada (checkout real) Y ventas manuales cargadas
    // por el admin (customerName), en vez de sólo estas últimas.
    const buyers = await Order.aggregate([
      {
        $match: {
          status: { $ne: 'cancelado' },
          $or: [
            { user: { $exists: true, $ne: null } },
            { customerName: { $ne: '' } },
          ],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      { $unwind: { path: '$userInfo', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          buyerKey: {
            $cond: [
              { $ifNull: ['$user', false] },
              { $concat: ['u:', { $toString: '$user' }] },
              { $concat: ['n:', { $ifNull: ['$customerName', ''] }, '|', { $ifNull: ['$customerPhone', ''] }] },
            ],
          },
          buyerName: { $ifNull: ['$userInfo.name', '$customerName'] },
          buyerPhone: { $ifNull: ['$userInfo.phone', '$customerPhone'] },
          buyerClinic: { $ifNull: ['$userInfo.clinicName', '$customerClinic'] },
        },
      },
      {
        $group: {
          _id: '$buyerKey',
          userId: { $first: '$user' },
          name: { $first: '$buyerName' },
          phone: { $first: '$buyerPhone' },
          clinic: { $first: '$buyerClinic' },
          totalSpent: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
          lastPurchaseDate: { $max: '$createdAt' },
          firstPurchaseDate: { $min: '$createdAt' },
          paymentMethods: { $addToSet: '$paymentMethod' },
          shippingMethods: { $addToSet: '$shippingMethod' },
          balance: {
            $sum: {
              $cond: [
                { $in: ['$status', ['pendiente', 'confirmado', 'enviado', 'entregado']] },
                '$totalAmount',
                0
              ]
            }
          },
          totalKits: {
            $sum: {
              $reduce: {
                input: '$items',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.quantity'] },
              },
            },
          },
        }
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          name: 1,
          phone: 1,
          clinic: 1,
          totalSpent: 1,
          totalOrders: 1,
          lastPurchaseDate: 1,
          firstPurchaseDate: 1,
          paymentMethods: 1,
          shippingMethods: 1,
          balance: 1,
          totalKits: 1
        }
      },
      { $sort: { totalSpent: -1 } }
    ]);

    res.json(buyers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  getUserById,
  getSalesTrend,
  getTransactions,
  getFinancialReport,
  getBuyers
};
