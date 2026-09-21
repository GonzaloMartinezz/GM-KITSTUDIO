const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clinic: { type: String, default: '' },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  status: { 
    type: String, 
    default: 'Contacto Inicial',
    enum: ['Contacto Inicial', 'Presupuesto Enviado', 'Negociación', 'Convertido', 'Perdido']
  },
  probability: { 
    type: String, 
    default: 'Media',
    enum: ['Alta', 'Media', 'Baja']
  },
  nextFollowUp: { type: String, default: '' },
  notes: { type: String, default: '' },
  didBuy: { type: String, default: 'No', enum: ['Sí', 'No'] },
  kitsBought: { type: Number, default: 0 },
  paymentMethod: { type: String, default: '' },
  shippingMethod: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
