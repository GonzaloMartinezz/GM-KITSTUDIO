const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // Datos de venta manual cargada por el admin (cliente sin cuenta registrada)
  customerName: {
    type: String,
    default: '',
    trim: true,
  },
  customerClinic: {
    type: String,
    default: '',
    trim: true,
  },
  customerPhone: {
    type: String,
    default: '',
    trim: true,
  },
  createdByAdmin: {
    type: Boolean,
    default: false,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    productName: {
      type: String,
      default: '',
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
// OJO: con "async function" NO hay que declarar/llamar "next" — Mongoose no
// pasa un callback real cuando la funcion es async (usa la promesa
// devuelta como señal de fin), asi que "next()" tira "next is not a
// function". Con async/await simplemente no se usa next en absoluto.
orderSchema.pre('save', async function () {
  if (!this.orderNumber) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `#GM-${String(count + 1).padStart(5, '0')}`;
  }
});

module.exports = mongoose.model('Order', orderSchema);
