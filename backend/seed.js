const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const testKits = [
  {
    name: "Kit de Cirugía Odontológica Básico (Individual)",
    description: "Kit esterilizado y descartable. Incluye: cofia, barbijo, cubrecalzado, camisolín y campo quirúrgico estéril.",
    price: 6500,
    cost: 3200,
    stock: 50,
    image: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Kits Quirúrgicos"
  },
  {
    name: "Kit de Bioseguridad Completo (Doble)",
    description: "Kit para dos personas (Odontólogo y Asistente). Incluye: 2 batas, 2 cofias, 2 barbijos, 2 pares de cubrecalzados y campo quirúrgico.",
    price: 8900,
    cost: 4500,
    stock: 30,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Kits Quirúrgicos"
  },
  {
    name: "Kit de Implante Estéril Premium",
    description: "Diseñado para cirugías complejas de implantes. Máxima barrera bacteriológica.",
    price: 12500,
    cost: 6000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1584308666744-24d5e4a83e0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Implantes"
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gmkitstudio')
  .then(async () => {
    console.log('MongoDB Conectado para Seeding');
    
    // Clear existing
    await Product.deleteMany();
    console.log('Productos anteriores eliminados');
    
    // Insert new
    await Product.insertMany(testKits);
    console.log('Kits de prueba agregados exitosamente');
    
    process.exit();
  })
  .catch(err => {
    console.error('Error durante el seeding:', err);
    process.exit(1);
  });
