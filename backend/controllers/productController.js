const Product = require('../models/Product');

/**
 * @desc    Listar todos los productos activos
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate('supplier', 'company')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Obtener un producto por ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier', 'company contactName');
    if (!product) {
      res.status(404);
      throw new Error('Producto no encontrado.');
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Crear un nuevo producto
 * @route   POST /api/products
 * @access  Admin
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, sku, description, price, cost, stock, minStock, image, category, supplier, components } = req.body;
    const product = await Product.create({
      name, sku, description, price, cost, stock, minStock, image, category, supplier, components,
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Actualizar un producto
 * @route   PUT /api/products/:id
 * @access  Admin
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Producto no encontrado.');
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Desactivar producto (soft delete)
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Producto no encontrado.');
    }
    product.isActive = false;
    await product.save();
    res.json({ message: 'Producto desactivado correctamente.' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Ajustar stock de un producto
 * @route   PATCH /api/products/:id/stock
 * @access  Admin
 */
const adjustStock = async (req, res, next) => {
  try {
    const { adjustment } = req.body; // Puede ser positivo o negativo
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Producto no encontrado.');
    }

    product.stock = Math.max(0, product.stock + adjustment);
    await product.save();
    res.json({ message: `Stock actualizado. Nuevo stock: ${product.stock}`, stock: product.stock });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, adjustStock };
