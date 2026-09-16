const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'El nombre de la empresa es obligatorio'],
    trim: true,
  },
  subtitle: {
    type: String,
    default: '',
    trim: true,
  },
  contactName: {
    type: String,
    default: '',
    trim: true,
  },
  role: {
    type: String,
    default: '',
    trim: true,
  },
  email: {
    type: String,
    default: '',
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    default: '',
    trim: true,
  },
  whatsapp: {
    type: String,
    default: '',
    trim: true,
  },
  address: {
    type: String,
    default: '',
    trim: true,
  },
  cuit: {
    type: String,
    default: '',
    trim: true,
  },
  taxCondition: {
    type: String,
    default: 'Responsable Inscripto',
    trim: true,
  },
  bank: {
    type: String,
    default: '',
  },
  cbu: {
    type: String,
    default: '',
  },
  alias: {
    type: String,
    default: '',
  },
  anmatPm: {
    type: String,
    default: '',
    trim: true,
  },
  costPerKit: {
    type: Number,
    default: 0,
    min: 0,
  },
  regularSalePrice: {
    type: Number,
    default: 0,
    min: 0,
  },
  nextPaymentDate: {
    type: String,
    default: 'Sin pagos pendientes',
  },
  nextPaymentAmount: {
    type: Number,
    default: 0,
  },
  nextPaymentConcept: {
    type: String,
    default: 'No hay pagos programados pendientes',
  },
  nextPaymentStatus: {
    type: String,
    default: 'Al día',
  },
  itemsBreakdown: [{
    name: { type: String },
    qty: { type: String },
    cost: { type: Number, default: 0 },
  }],
  tierPricing: [{
    tier: { type: String },
    costPerKit: { type: Number, default: 0 },
    unitMargin: { type: Number, default: 0 },
    marginPct: { type: String },
  }],
  paymentTerms: {
    type: String,
    default: '',
  },
  deliveryTime: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Supplier', supplierSchema);
