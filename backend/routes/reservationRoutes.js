const express = require('express');
const router = express.Router();
const { getReservations, createReservation, fulfillReservation, cancelReservation } = require('../controllers/reservationController');
const { authenticate, verifyAdmin } = require('../middleware/auth');

router.use(authenticate, verifyAdmin);

router.get('/', getReservations);
router.post('/', createReservation);
router.patch('/:id/fulfill', fulfillReservation);
router.patch('/:id/cancel', cancelReservation);

module.exports = router;
