const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private/Admin
const getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a lead
// @route   POST /api/leads
// @access  Private/Admin
const createLead = async (req, res, next) => {
  try {
    const { name, clinic, phone, email, status, probability, nextFollowUp, notes } = req.body;

    const lead = new Lead({
      name,
      clinic,
      phone,
      email,
      status,
      probability,
      nextFollowUp,
      notes
    });

    const createdLead = await lead.save();
    res.status(201).json(createdLead);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Private/Admin
const updateLead = async (req, res, next) => {
  try {
    const { name, clinic, phone, email, status, probability, nextFollowUp, notes } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (lead) {
      lead.name = name ?? lead.name;
      lead.clinic = clinic ?? lead.clinic;
      lead.phone = phone ?? lead.phone;
      lead.email = email ?? lead.email;
      lead.status = status ?? lead.status;
      lead.probability = probability ?? lead.probability;
      lead.nextFollowUp = nextFollowUp ?? lead.nextFollowUp;
      lead.notes = notes ?? lead.notes;

      const updatedLead = await lead.save();
      res.json(updatedLead);
    } else {
      res.status(404);
      throw new Error('Lead no encontrado');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      await lead.deleteOne();
      res.json({ message: 'Lead eliminado' });
    } else {
      res.status(404);
      throw new Error('Lead no encontrado');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeads,
  createLead,
  updateLead,
  deleteLead
};
