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

    // Ventas recientes (últimas 10)
    const recentOrders = await Order.find({ status: { $nin: ['cancelado'] } })
      .populate('user', 'name email clinicName')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

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
const getSalesTrend = async (req, res, next) => {
  try {
    const { timeframe = 'monthly', startDate, endDate } = req.query;
    const now = new Date();
    let dateFrom;
    let dateTo = now;
    let groupByFormat;

    if (timeframe === 'custom' && startDate && endDate) {
      dateFrom = new Date(startDate);
      dateTo = new Date(endDate);
      dateTo.setHours(23, 59, 59, 999);
      // Si la diferencia es menor a 31 días, agrupar por día, sino por mes
      const diffTime = Math.abs(dateTo - dateFrom);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      groupByFormat = diffDays <= 31 ? '%Y-%m-%d' : '%Y-%m';
    } else {
      switch (timeframe) {
        case 'weekly':
          dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          groupByFormat = '%Y-%m-%d';
          break;
        case 'yearly':
          dateFrom = new Date(now.getFullYear(), 0, 1);
          groupByFormat = '%Y-%m';
          break;
        case 'monthly':
        default:
          dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
          groupByFormat = '%Y-%m-%d';
          break;
      }
    }

    const trend = await Order.aggregate([
      { $match: { status: { $nin: ['cancelado'] }, createdAt: { $gte: dateFrom, $lte: dateTo } } },
      {
        $group: {
          _id: { $dateToString: { format: groupByFormat, date: '$createdAt' } },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
          kits: {
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
      { $sort: { _id: 1 } },
    ]);

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

    // Órdenes por estado
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const income = monthlyIncome?.total || 0;
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
    const buyers = await Order.aggregate([
      // Ignorar órdenes sin customerName o canceladas
      { $match: { customerName: { $ne: '' }, status: { $ne: 'cancelado' } } },
      {
        $group: {
          _id: {
            name: '$customerName',
            phone: '$customerPhone'
          },
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
          clinic: { $first: '$customerClinic' }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id.name',
          phone: '$_id.phone',
          clinic: '$clinic',
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
      { $sort: { lastPurchaseDate: -1 } }
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
