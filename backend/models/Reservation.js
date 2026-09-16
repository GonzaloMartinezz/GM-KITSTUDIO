const mongoose = require('mongoose');

/**
 * Reserva de kits para una cirugía programada (venta gestionada manualmente
 * por el admin, ej. vía WhatsApp con un profesional/clínica).
 */
const reservationSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
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
  surgeryDate: {
    type: String,
    default: 'A coordinar',
  },
  surgeryType: {
    type: String,
    default: 'Cirugía Odontológica',
  },
  paymentStatus: {
    type: String,
    default: 'Pendiente',
  },
  contact: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['reservado', 'cumplido', 'cancelado'],
    default: 'reservado',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservation', reservationSchema);
