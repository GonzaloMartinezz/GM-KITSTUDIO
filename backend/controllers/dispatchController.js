const Dispatch = require('../models/Dispatch');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

/**
 * @desc    Listar despachos programados
 * @route   GET /api/dispatches
 * @access  Admin
 */
const getDispatches = async (req, res, next) => {
  try {
    const dispatches = await Dispatch.find().sort({ createdAt: -1 });
    res.json(dispatches);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Crear un despacho programado
 * @route   POST /api/dispatches
 * @access  Admin
 */
const createDispatch = async (req, res, next) => {
  try {
    const dispatch = await Dispatch.create(req.body);
    res.status(201).json(dispatch);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Actualizar un despacho
 * @route   PUT /api/dispatches/:id
 * @access  Admin
 */
const updateDispatch = async (req, res, next) => {
  try {
    const dispatch = await Dispatch.findById(req.params.id);
    if (!dispatch) {
      res.status(404);
      throw new Error('Despacho no encontrado.');
    }

    const wasDelivered = dispatch.status === 'Entregado';

    Object.assign(dispatch, req.body);

    // Si cambió la cantidad de kits (o el total no vino calculado), lo
    // recalculamos con el precio real del kit para que no quede desfasado.
    if (req.body.kits !== undefined && req.body.total === undefined) {
      const kit = await Product.findOne({ category: 'Kits Quirúrgicos' });
      dispatch.total = (Number(dispatch.kits) || 0) * (kit?.price || 8500);
    }

    await dispatch.save();

    // Un despacho marcado "Entregado" es una venta cobrada en el momento:
    // hay que sumarla a Finanzas y descontar el kit físico del depósito,
    // algo que antes nunca pasaba (el despacho quedaba "Entregado" pero
    // la plata y el stock no se movían en ningún lado).
    if (!wasDelivered && dispatch.status === 'Entregado') {
      if (dispatch.kits > 0) {
        const kit = await Product.findOne({ category: 'Kits Quirúrgicos' });
        if (kit) {
          await Product.findByIdAndUpdate(kit._id, { $inc: { stock: -dispatch.kits } });
        }
      }
      await Transaction.create({
        type: 'income',
        amount: dispatch.total || 0,
        description: `Despacho entregado y cobrado - ${dispatch.doctor} (${dispatch.kits} kits)`,
        category: 'venta',
      });
    }

    res.json(dispatch);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Eliminar un despacho
 * @route   DELETE /api/dispatches/:id
 * @access  Admin
 */
const deleteDispatch = async (req, res, next) => {
  try {
    const dispatch = await Dispatch.findByIdAndDelete(req.params.id);
    if (!dispatch) {
      res.status(404);
      throw new Error('Despacho no encontrado.');
    }
    res.json({ message: 'Despacho eliminado.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDispatches, createDispatch, updateDispatch, deleteDispatch };
