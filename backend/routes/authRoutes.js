const express = require('express');
const router = express.Router();
const { register, login, googleAuth, logout, getMe, refreshToken } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');

// Public routes
router.post('/register', register);
router.post('/login', loginLimiter, login);
router.post('/google', googleAuth);

// Authenticated routes
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.post('/refresh', refreshToken);

module.exports = router;
