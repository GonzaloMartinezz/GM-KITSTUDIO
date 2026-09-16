const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['income', 'expense', 'refund'],
    required: [true, 'El tipo de transacción es obligatorio'],
  },
  amount: {
    type: Number,
    required: [true, 'El monto es obligatorio'],
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
  },
  category: {
    type: String,
    enum: ['venta', 'proveedor', 'operativo', 'reembolso'],
    default: 'venta',
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Transaction', transactionSchema);
