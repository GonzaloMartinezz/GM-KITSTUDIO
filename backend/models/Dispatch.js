const mongoose = require('mongoose');

/**
 * Despacho / entrega programada de kits.
 */
const dispatchSchema = new mongoose.Schema({
  doctor: {
    type: String,
    required: [true, 'El nombre del profesional es obligatorio'],
    trim: true,
  },
  clinic: {
    type: String,
    default: '',
    trim: true,
  },
  kits: {
    type: Number,
    required: true,
    min: [1, 'La cantidad mínima es 1'],
  },
  total: {
    type: Number,
    default: 0,
  },
  timeSlot: {
    type: String,
    default: 'A coordinar',
  },
  slotTime: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Programado', 'En Camino', 'Entregado', 'Cancelado'],
    default: 'Programado',
  },
  active: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Dispatch', dispatchSchema);
