/**
 * Middleware centralizado de manejo de errores.
 * Captura errores de toda la app y envía respuestas limpias al cliente.
 * Nunca expone stack traces en producción.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Error interno del servidor';

  // Loguear el error real en los logs del servidor (Render → pestaña Logs).
  // Antes esto se perdía: el cliente solo veía "500 Internal Server Error"
  // sin ningún rastro de la causa real en ningún lado.
  console.error(`❌ [${req.method} ${req.originalUrl}]`, err);

  // Mongoose: ID inválido (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'ID de recurso inválido.';
  }

  // Mongoose: Duplicate key (11000)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `El campo '${field}' ya está en uso. Valor duplicado: ${err.keyValue[field]}`;
  }

  // Mongoose: Validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const messages = Object.values(err.errors).map(e => e.message);
    message = messages.join('. ');
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
