const User = require('../models/User');

/**
 * Crea el superusuario Admin si no existe.
 * Se ejecuta automáticamente al iniciar el servidor.
 */
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmkitstudio.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'GmKitAdmin2026!';

      await User.create({
        name: 'Gonzalo Martinez',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        phone: '+54 9 381 624 2482',
        isActive: true,
      });

      console.log(`✅ Admin creado: ${adminEmail}`);
    } else {
      console.log(`ℹ️  Admin ya existe: ${adminExists.email}`);
    }
  } catch (error) {
    console.error('❌ Error creando admin:', error.message);
  }
};

module.exports = seedAdmin;
