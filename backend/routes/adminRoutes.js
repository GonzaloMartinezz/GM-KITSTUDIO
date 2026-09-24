const express = require('express');
const router = express.Router();
const { getDashboardStats, getUsers, getUserById, getSalesTrend, getTransactions, getFinancialReport, getBuyers, updateUser, deleteUser } = require('../controllers/adminController');
const { authenticate, verifyAdmin } = require('../middleware/auth');

// All admin routes require authentication + admin role
router.use(authenticate, verifyAdmin);

router.get('/dashboard', getDashboardStats);
router.get('/buyers', getBuyers);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/sales-trend', getSalesTrend);
router.get('/transactions', getTransactions);
router.get('/financial-report', getFinancialReport);

module.exports = router;
