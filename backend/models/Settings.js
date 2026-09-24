const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    freeShippingMinKits: {
      type: Number,
      default: 30,
      description: 'Cantidad mínima de kits para envío bonificado',
    },
    shippingDiscountAmount: {
      type: Number,
      default: 15000,
      description: 'Monto de ahorro escalonado que se muestra en la web',
    },
    whatsappNumber: {
      type: String,
      default: '549381XXXXXXX',
      description: 'Número de WhatsApp para contacto y pedidos',
    },
    contactEmail: {
      type: String,
      default: 'contacto@gmkitstudio.com',
    },
    instagramUrl: {
      type: String,
      default: 'https://instagram.com/gmkitstudio',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Settings', settingsSchema);
