const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware: Verifica que el request tiene un JWT válido en las cookies.
 * Adjunta el usuario al req.user.
 */
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'No autenticado. Iniciá sesión.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Usuario no encontrado o desactivado.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Sesión expirada. Renovar token.', expired: true });
    }
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

/**
 * Middleware: Verifica que el usuario autenticado tiene rol 'admin'.
 * SIEMPRE consulta la DB, no confía solo en el payload del JWT.
 */
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de Administrador.' });
  }
  next();
};

/**
 * Middleware: Verifica que el usuario autenticado tiene rol 'client'.
 */
const verifyClient = (req, res, next) => {
  if (!req.user || req.user.role !== 'client') {
    return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de Cliente.' });
  }
  next();
};

module.exports = { authenticate, verifyAdmin, verifyClient };
