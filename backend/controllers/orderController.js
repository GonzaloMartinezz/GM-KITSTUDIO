const Order = require('../models/Order');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

/**
 * @desc    Crear una nueva orden
 * @route   POST /api/orders
 * @access  Client (authenticated)
 */
const createOrder = async (req, res, next) => {
  try {
    const { items, paymentMethod, shippingMethod, shippingAddress, discount, notes } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error('La orden debe tener al menos un producto.');
    }

    // Calcular total y validar stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive) {
        res.status(404);
        throw new Error(`Producto no encontrado o no disponible: ${item.product}`);
      }

      if (product.stock < item.quantity) {
        res.status(400);
        throw new Error(`Stock insuficiente para "${product.name}". Disponible: ${product.stock}`);
      }

      const priceAtPurchase = product.price;
      totalAmount += priceAtPurchase * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase,
      });

      // Descontar stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Aplicar descuento
    const discountAmount = discount || 0;
    totalAmount = Math.max(0, totalAmount - discountAmount);

    // Crear orden
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      discount: discountAmount,
      paymentMethod,
      shippingMethod: shippingMethod || 'acordar',
      shippingAddress: shippingAddress || '',
      notes: notes || '',
    });

    // Crear transacción de ingreso
    await Transaction.create({
      order: order._id,
      user: req.user._id,
      type: 'income',
      amount: totalAmount,
      description: `Venta ${order.orderNumber} - ${orderItems.length} producto(s)`,
      category: 'venta',
    });

    // Populate y responder
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email phone clinicName')
      .populate('items.product', 'name price image');

    res.status(201).json(populatedOrder);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener mis órdenes (cliente logueado)
 * @route   GET /api/orders/my-orders
 * @access  Client (authenticated)
 */
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name price image')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener todas las órdenes (admin)
 * @route   GET /api/orders
 * @access  Admin
 */
const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('user', 'name email phone clinicName')
      .populate('items.product', 'name price image')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener detalle de una orden
 * @route   GET /api/orders/:id
 * @access  Authenticated (dueño o admin)
 */
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone clinicName address')
      .populate('items.product', 'name price image sku');

    if (!order) {
      res.status(404);
      throw new Error('Orden no encontrada.');
    }

    // Solo el dueño o admin pueden ver la orden
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('No tenés permiso para ver esta orden.');
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Actualizar estado de una orden
 * @route   PATCH /api/orders/:id/status
 * @access  Admin
 */
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pendiente', 'confirmado', 'pagado', 'enviado', 'entregado', 'cancelado'];

    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error(`Estado inválido. Opciones: ${validStatuses.join(', ')}`);
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Orden no encontrada.');
    }

    // Si se cancela, devolver stock
    if (status === 'cancelado' && order.status !== 'cancelado') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }

      // Crear transacción de reembolso
      await Transaction.create({
        order: order._id,
        user: order.user,
        type: 'refund',
        amount: order.totalAmount,
        description: `Cancelación ${order.orderNumber}`,
        category: 'reembolso',
      });
    }

    order.status = status;
    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate('user', 'name email phone clinicName')
      .populate('items.product', 'name price image');

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus };
