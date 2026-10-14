const express = require('express');
const router = express.Router();
const { createPreference, webhook, getPaymentStatus } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

// Cliente autenticado: inicia el pago de su pedido
router.post('/create-preference', authenticate, createPreference);

// Cliente autenticado: consulta el estado de su orden (pantalla de resultado)
router.get('/status/:orderId', authenticate, getPaymentStatus);

// Mercado Pago llama esta ruta directamente (sin cookies de sesión)
router.post('/webhook', webhook);

module.exports = router;
