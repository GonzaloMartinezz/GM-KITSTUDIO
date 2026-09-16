const rateLimit = require('express-rate-limit');

/**
 * Rate limiter para endpoints de login — previene ataques de brute force.
 * Máximo 5 intentos cada 15 minutos por IP.
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: {
    message: 'Demasiados intentos de inicio de sesión. Intentá de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter general para la API.
 * Máximo 100 requests por minuto por IP.
 */
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100,
  message: {
    message: 'Demasiadas solicitudes. Intentá de nuevo en un momento.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter, apiLimiter };
