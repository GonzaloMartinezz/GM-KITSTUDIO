const express = require('express');
const router = express.Router();
const { getSupplierOrders, createSupplierOrder, updateSupplierOrder, deleteSupplierOrder } = require('../controllers/supplierOrderController');
const { authenticate, verifyAdmin } = require('../middleware/auth');

router.use(authenticate, verifyAdmin);

router.get('/', getSupplierOrders);
router.post('/', createSupplierOrder);
router.put('/:id', updateSupplierOrder);
router.delete('/:id', deleteSupplierOrder);

module.exports = router;
