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
    // Incluye tanto los valores históricos ('En Camino') como los que
    // realmente ofrece el selector del panel ('En Preparación', 'En Ruta'):
    // antes el modelo no los aceptaba y guardar un despacho con esos
    // estados tiraba un error de validación.
    enum: ['Programado', 'En Preparación', 'En Ruta', 'En Camino', 'Entregado', 'Cancelado'],
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
