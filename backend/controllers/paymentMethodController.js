const PaymentMethod = require('../models/PaymentMethod');

/**
 * @desc    Listar métodos de pago configurados
 * @route   GET /api/payment-methods
 * @access  Admin
 */
const getPaymentMethods = async (req, res, next) => {
  try {
    // ?all=true devuelve también los métodos desactivados — lo usa el panel
    // de Configuración para poder reactivarlos; el resto de la app (gráficos,
    // dashboard) sigue viendo solo los activos por defecto, sin cambios.
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const methods = await PaymentMethod.find(filter).sort({ isActive: -1, createdAt: 1 });
    res.json(methods);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Crear un método de pago
 * @route   POST /api/payment-methods
 * @access  Admin
 */
const createPaymentMethod = async (req, res, next) => {
  try {
    const method = await PaymentMethod.create(req.body);
    res.status(201).json(method);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Actualizar un método de pago
 * @route   PUT /api/payment-methods/:id
 * @access  Admin
 */
const updatePaymentMethod = async (req, res, next) => {
  try {
    const method = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!method) {
      res.status(404);
      throw new Error('Método de pago no encontrado.');
    }
    res.json(method);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Eliminar (desactivar) un método de pago
 * @route   DELETE /api/payment-methods/:id
 * @access  Admin
 */
const deletePaymentMethod = async (req, res, next) => {
  try {
    const method = await PaymentMethod.findByIdAndUpdate(req.params.id, { isActive: false }, { returnDocument: 'after' });
    if (!method) {
      res.status(404);
      throw new Error('Método de pago no encontrado.');
    }
    res.json({ message: 'Método de pago eliminado.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod };
