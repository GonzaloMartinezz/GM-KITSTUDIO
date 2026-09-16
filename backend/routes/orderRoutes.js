const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { authenticate, verifyAdmin } = require('../middleware/auth');

// Client routes (authenticated)
router.post('/', authenticate, createOrder);
router.get('/my-orders', authenticate, getMyOrders);

// Admin routes
router.get('/', authenticate, verifyAdmin, getAllOrders);

// Authenticated routes (owner or admin)
router.get('/:id', authenticate, getOrderById);
router.patch('/:id/status', authenticate, verifyAdmin, updateOrderStatus);

module.exports = router;
