const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { authenticate, verifyAdmin } = require('../middleware/auth');

router.get('/', getSettings);
router.put('/', authenticate, verifyAdmin, updateSettings);

module.exports = router;
