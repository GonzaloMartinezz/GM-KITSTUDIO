const mongoose = require('mongoose');

/**
 * Orden de compra a un proveedor (reposición de stock).
 */
const supplierOrderSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  kits: {
    type: Number,
    required: true,
    min: [1, 'La cantidad mínima es 1'],
  },
  costPerKit: {
    type: Number,
    required: true,
    min: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  paymentDate: {
    type: String,
    default: 'Pendiente de coordinación',
  },
  paymentMethod: {
    type: String,
    default: 'Transferencia Bancaria',
  },
  status: {
    type: String,
    enum: ['Pendiente', 'En Tránsito', 'Recibido'],
    default: 'Pendiente',
  },
  invoiceNumber: {
    type: String,
    default: 'A facturar',
  },
  dueDate: {
    type: String,
    default: 'A coordinar',
  },
  pendingAmount: {
    type: Number,
    default: 0,
  },
  receivedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Mongoose 9 saco el callback "next" en los hooks pre('save', ...);
// ahora son sincronicos/async puros, sin argumento.
supplierOrderSchema.pre('save', function () {
  this.total = (this.kits || 0) * (this.costPerKit || 0);
});

module.exports = mongoose.model('SupplierOrder', supplierOrderSchema);
