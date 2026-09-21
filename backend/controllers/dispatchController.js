const Dispatch = require('../models/Dispatch');

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
    const dispatch = await Dispatch.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!dispatch) {
      res.status(404);
      throw new Error('Despacho no encontrado.');
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
