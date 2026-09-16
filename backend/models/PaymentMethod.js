const mongoose = require('mongoose');

/**
 * Configuración visual/metadata de métodos de pago aceptados.
 * Los montos/porcentajes reales se calculan en vivo a partir de las Orders.
 */
const paymentMethodSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    default: '#0F172A',
  },
  secondaryColor: {
    type: String,
    default: '#1E293B',
  },
  description: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
