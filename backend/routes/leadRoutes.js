const express = require('express');
const router = express.Router();
const { getLeads, createLead, updateLead, deleteLead } = require('../controllers/leadController');
const { authenticate, verifyAdmin } = require('../middleware/auth');

router.route('/')
  .get(authenticate, verifyAdmin, getLeads)
  .post(authenticate, verifyAdmin, createLead);

router.route('/:id')
  .put(authenticate, verifyAdmin, updateLead)
  .delete(authenticate, verifyAdmin, deleteLead);

module.exports = router;
