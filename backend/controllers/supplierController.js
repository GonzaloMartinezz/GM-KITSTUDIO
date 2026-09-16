const Supplier = require('../models/Supplier');

/**
 * @desc    Listar todos los proveedores activos
 * @route   GET /api/suppliers
 * @access  Admin
 */
const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener un proveedor por ID
 * @route   GET /api/suppliers/:id
 * @access  Admin
 */
const getSupplierById = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      res.status(404);
      throw new Error('Proveedor no encontrado.');
    }
    res.json(supplier);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Crear un nuevo proveedor
 * @route   POST /api/suppliers
 * @access  Admin
 */
const createSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Actualizar un proveedor
 * @route   PUT /api/suppliers/:id
 * @access  Admin
 */
const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      res.status(404);
      throw new Error('Proveedor no encontrado.');
    }

    const updated = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Desactivar proveedor (soft delete)
 * @route   DELETE /api/suppliers/:id
 * @access  Admin
 */
const deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      res.status(404);
      throw new Error('Proveedor no encontrado.');
    }
    supplier.isActive = false;
    await supplier.save();
    res.json({ message: 'Proveedor desactivado correctamente.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier };
