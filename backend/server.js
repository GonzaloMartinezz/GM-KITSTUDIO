const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

// Config
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');
const seedBusinessData = require('./utils/seedBusinessData');

// Middleware
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const supplierOrderRoutes = require('./routes/supplierOrderRoutes');
const dispatchRoutes = require('./routes/dispatchRoutes');
const paymentMethodRoutes = require('./routes/paymentMethodRoutes');
const leadRoutes = require('./routes/leadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Render (y la mayoría de PaaS) corren detrás de un proxy/load balancer.
// Sin esto, express-rate-limit puede tirar error con X-Forwarded-For,
// req.secure/cookies "secure" pueden fallar, y Express no detecta bien HTTPS.
app.set('trust proxy', 1);

/* ─── MIDDLEWARE GLOBAL ─────────────────────────── */

// Seguridad HTTP headers
app.use(helmet());

// CORS configurado para el frontend con cookies
// Orígenes permitidos: localhost (dev) + CLIENT_URL (prod, puede tener
// varios separados por coma: "https://gm-kitstudio.vercel.app,https://otro.com")
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  ...(process.env.CLIENT_URL || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
];

app.use(cors({
  origin(origin, callback) {
    // Requests sin origin (curl, health checks, apps móviles) se permiten
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`⚠️  CORS bloqueó origin: ${origin}. Permitidos: ${allowedOrigins.join(', ')}`);
    return callback(new Error('No permitido por CORS'));
  },
  credentials: true,
}));

// Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiter general
app.use('/api', apiLimiter);

/* ─── RUTAS ─────────────────────────────────────── */

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'API de GM Kit Studio funcionando.',
    version: '2.0.0',
    status: 'OK',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/supplier-orders', supplierOrderRoutes);
app.use('/api/dispatches', dispatchRoutes);
app.use('/api/payment-methods', paymentMethodRoutes);
app.use('/api/leads', leadRoutes);

/* ─── ERROR HANDLER ─────────────────────────────── */

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
});

// Error handler centralizado (debe ser el último middleware)
app.use(errorHandler);

/* ─── INICIALIZACIÓN ────────────────────────────── */

const startServer = async () => {
  try {
    // Conectar a MongoDB Atlas
    await connectDB();

    // Crear admin si no existe
    await seedAdmin();

    // Crear datos base del negocio (producto kit, proveedor, métodos de pago)
    await seedBusinessData();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor GM Kit Studio corriendo en puerto ${PORT}`);
      console.log(`📡 API disponible en http://localhost:${PORT}/api`);
      console.log(`🌐 Frontend aceptado: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();
