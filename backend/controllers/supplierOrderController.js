const SupplierOrder = require('../models/SupplierOrder');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

/**
 * @desc    Listar órdenes de compra a proveedores
 * @route   GET /api/supplier-orders
 * @access  Admin
 */
const getSupplierOrders = async (req, res, next) => {
  try {
    const orders = await SupplierOrder.find().populate('supplier', 'company').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Crear una orden de compra a proveedor
 * @route   POST /api/supplier-orders
 * @access  Admin
 */
const createSupplierOrder = async (req, res, next) => {
  try {
    const order = await SupplierOrder.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Actualizar una orden de compra. Si pasa a 'Recibido', suma stock al kit y registra gasto.
 * @route   PUT /api/supplier-orders/:id
 * @access  Admin
 */
const updateSupplierOrder = async (req, res, next) => {
  try {
    const order = await SupplierOrder.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Orden de compra no encontrada.');
    }

    const wasReceived = order.status === 'Recibido';
    Object.assign(order, req.body);
    await order.save();

    if (!wasReceived && order.status === 'Recibido') {
      order.receivedAt = new Date();
      await order.save();

      if (order.product) {
        await Product.findByIdAndUpdate(order.product, { $inc: { stock: order.kits } });
      }

      await Transaction.create({
        type: 'expense',
        amount: order.total,
        description: `Compra a proveedor - Orden ${order._id} - ${order.kits} kits`,
        category: 'proveedor',
      });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Eliminar una orden de compra
 * @route   DELETE /api/supplier-orders/:id
 * @access  Admin
 */
const deleteSupplierOrder = async (req, res, next) => {
  try {
    const order = await SupplierOrder.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Orden de compra no encontrada.');
    }
    res.json({ message: 'Orden de compra eliminada.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSupplierOrders, createSupplierOrder, updateSupplierOrder, deleteSupplierOrder };
