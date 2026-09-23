const Lead = require('../models/Lead');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

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
    const {
      name, clinic, phone, email, status, probability, nextFollowUp, notes,
      didBuy, kitsBought, paymentMethod, shippingMethod,
    } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (lead) {
      const wasAlreadyBought = lead.didBuy === 'Sí';

      lead.name = name ?? lead.name;
      lead.clinic = clinic ?? lead.clinic;
      lead.phone = phone ?? lead.phone;
      lead.email = email ?? lead.email;
      lead.status = status ?? lead.status;
      lead.probability = probability ?? lead.probability;
      lead.nextFollowUp = nextFollowUp ?? lead.nextFollowUp;
      lead.notes = notes ?? lead.notes;
      lead.didBuy = didBuy ?? lead.didBuy;
      lead.kitsBought = kitsBought ?? lead.kitsBought;
      lead.paymentMethod = paymentMethod ?? lead.paymentMethod;
      lead.shippingMethod = shippingMethod ?? lead.shippingMethod;

      const updatedLead = await lead.save();

      // Si el lead recién se marca como "Sí compró" (y no lo estaba antes),
      // registramos el ingreso — si no, esta venta nunca aparecía en
      // Finanzas/Ventas aunque quedara anotada acá.
      if (!wasAlreadyBought && updatedLead.didBuy === 'Sí' && Number(updatedLead.kitsBought) > 0) {
        const kit = await Product.findOne({ category: 'Kits Quirúrgicos' });
        const unitPrice = kit?.price || 8500;
        const total = Number(updatedLead.kitsBought) * unitPrice;
        await Transaction.create({
          type: 'income',
          amount: total,
          description: `Venta convertida de lead - ${updatedLead.name} (${updatedLead.kitsBought} kits)`,
          category: 'venta',
        });
      }

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
