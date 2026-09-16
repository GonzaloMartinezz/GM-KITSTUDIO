const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
    uppercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo'],
  },
  cost: {
    type: Number,
    required: [true, 'El costo es obligatorio'],
    min: [0, 'El costo no puede ser negativo'],
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'El stock no puede ser negativo'],
  },
  minStock: {
    type: Number,
    default: 10,
    min: 0,
  },
  image: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'Kits Quirúrgicos',
    trim: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  components: [{
    name: { type: String },
    qty: { type: Number, default: 1 },
    costPer: { type: Number, default: 0 },
  }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual: margen de ganancia en $
productSchema.virtual('margin').get(function () {
  return this.price - this.cost;
});

// Virtual: porcentaje de margen
productSchema.virtual('marginPct').get(function () {
  return this.price > 0 ? ((this.price - this.cost) / this.price * 100).toFixed(1) + '%' : '0%';
});

// Virtual: alerta de stock bajo
productSchema.virtual('lowStock').get(function () {
  return this.stock <= this.minStock;
});

module.exports = mongoose.model('Product', productSchema);
