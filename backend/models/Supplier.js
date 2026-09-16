const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'El nombre de la empresa es obligatorio'],
    trim: true,
  },
  contactName: {
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
  bankInfo: {
    bank: { type: String, default: '' },
    cbu: { type: String, default: '' },
    alias: { type: String, default: '' },
  },
  anmatCert: {
    type: String,
    default: '',
    trim: true,
  },
  costPerKit: {
    type: Number,
    default: 0,
    min: 0,
  },
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
