const jwt = require('jsonwebtoken');

/**
 * Genera access + refresh tokens y los setea como cookies HttpOnly.
 * @param {Object} res - Express response object
 * @param {Object} user - User document de MongoDB
 * @param {Boolean} rememberMe - Si true, refresh token dura 30 días
 */
const generateTokensAndSetCookies = (res, user, rememberMe = false) => {
  // Access Token (vida corta)
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );

  // Refresh Token (vida larga)
  const refreshExpiresIn = rememberMe ? '30d' : (process.env.JWT_REFRESH_EXPIRES_IN || '7d');
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: refreshExpiresIn }
  );

  // Refresh maxAge in milliseconds
  const refreshMaxAge = rememberMe
    ? 30 * 24 * 60 * 60 * 1000  // 30 días
    : 7 * 24 * 60 * 60 * 1000;  // 7 días

  // Set cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutos
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: refreshMaxAge,
    path: '/api/auth', // Solo se envía a rutas de auth
  });

  return { accessToken, refreshToken };
};

/**
 * Limpia ambas cookies de autenticación.
 */
const clearAuthCookies = (res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken', { path: '/api/auth' });
};

module.exports = { generateTokensAndSetCookies, clearAuthCookies };
