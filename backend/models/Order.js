const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio'],
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La cantidad mínima es 1'],
    },
    priceAtPurchase: {
      type: Number,
      required: true,
    },
  }],
  totalAmount: {
    type: Number,
    required: [true, 'El monto total es obligatorio'],
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  paymentMethod: {
    type: String,
    enum: ['efectivo', 'transferencia', 'tarjeta', 'mercadopago'],
    required: [true, 'El método de pago es obligatorio'],
  },
  shippingMethod: {
    type: String,
    enum: ['domicilio', 'sucursal', 'acordar'],
    default: 'acordar',
  },
  shippingAddress: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmado', 'pagado', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente',
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Pre-save: generar orderNumber automático
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `#GM-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
