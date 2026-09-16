const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, adjustStock } = require('../controllers/productController');
const { authenticate, verifyAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', authenticate, verifyAdmin, createProduct);
router.put('/:id', authenticate, verifyAdmin, updateProduct);
router.delete('/:id', authenticate, verifyAdmin, deleteProduct);
router.patch('/:id/stock', authenticate, verifyAdmin, adjustStock);

module.exports = router;
