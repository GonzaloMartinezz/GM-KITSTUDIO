const express = require('express');
const router = express.Router();
const { getDispatches, createDispatch, updateDispatch, deleteDispatch } = require('../controllers/dispatchController');
const { authenticate, verifyAdmin } = require('../middleware/auth');

router.use(authenticate, verifyAdmin);

router.get('/', getDispatches);
router.post('/', createDispatch);
router.put('/:id', updateDispatch);
router.delete('/:id', deleteDispatch);

module.exports = router;
