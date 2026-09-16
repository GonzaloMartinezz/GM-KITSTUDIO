const express = require('express');
const router = express.Router();
const { getPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } = require('../controllers/paymentMethodController');
const { authenticate, verifyAdmin } = require('../middleware/auth');

router.use(authenticate, verifyAdmin);

router.get('/', getPaymentMethods);
router.post('/', createPaymentMethod);
router.put('/:id', updatePaymentMethod);
router.delete('/:id', deletePaymentMethod);

module.exports = router;
