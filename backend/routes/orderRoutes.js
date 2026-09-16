const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus, createManualOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { authenticate, verifyAdmin } = require('../middleware/auth');

// Client routes (authenticated)
router.post('/', authenticate, createOrder);
router.get('/my-orders', authenticate, getMyOrders);

// Admin routes
router.get('/', authenticate, verifyAdmin, getAllOrders);
router.post('/manual', authenticate, verifyAdmin, createManualOrder);

// Authenticated routes (owner o admin)
router.get('/:id', authenticate, getOrderById);
router.patch('/:id/status', authenticate, verifyAdmin, updateOrderStatus);
router.put('/:id', authenticate, verifyAdmin, updateOrder);
router.delete('/:id', authenticate, verifyAdmin, deleteOrder);

module.exports = router;
