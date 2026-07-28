const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true } // Price at the time of order
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['whatsapp', 'tarjeta', 'efectivo', 'transferencia'], required: true },
  status: { type: String, enum: ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'], default: 'pendiente' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
