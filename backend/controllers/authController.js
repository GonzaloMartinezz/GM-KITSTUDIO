const User = require('../models/User');
const { generateTokensAndSetCookies, clearAuthCookies } = require('../utils/generateToken');
const jwt = require('jsonwebtoken');

/**
 * @desc    Registrar un nuevo cliente
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, clinicName, address } = req.body;

    // Validar campos obligatorios
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Nombre, email y contraseña son obligatorios.');
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    // Verificar si el email ya existe
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      res.status(400);
      throw new Error('Ya existe una cuenta con ese email.');
    }

    // Crear usuario con rol 'client'
    const user = await User.create({
      name,
      email,
      password,
      role: 'client',
      phone: phone || '',
      clinicName: clinicName || '',
      address: address || '',
    });

    // Generar tokens y setear cookies
    generateTokensAndSetCookies(res, user, false);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      clinicName: user.clinicName,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login con email y password
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Email y contraseña son obligatorios.');
    }

    // Buscar usuario con password (select: false por defecto)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      res.status(401);
      throw new Error('Credenciales inválidas.');
    }

    if (!user.isActive) {
      res.status(401);
      throw new Error('Tu cuenta ha sido desactivada. Contacta al administrador.');
    }

    // Comparar password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Credenciales inválidas.');
    }

    // Actualizar last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generar tokens
    generateTokensAndSetCookies(res, user, rememberMe || false);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      clinicName: user.clinicName,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login/Registro con Google OAuth
 * @route   POST /api/auth/google
 * @access  Public
 */
const googleAuth = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      res.status(400);
      throw new Error('Token de Google no proporcionado.');
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      // Sin esto, verifyIdToken no tiene audience contra qué validar y
      // tira un error genérico. Lo hacemos explícito para no perder tiempo
      // buscando la causa la próxima vez.
      console.error('❌ GOOGLE_CLIENT_ID no está seteado en las variables de entorno del backend.');
      res.status(500);
      throw new Error('Login con Google no está configurado en el servidor (falta GOOGLE_CLIENT_ID).');
    }

    // Verificar el token de Google
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Buscar usuario existente por googleId o email
    let user = await User.findOne({
      $or: [{ googleId }, { email: email.toLowerCase() }],
    });

    if (user) {
      // Actualizar googleId si no lo tenía (usuario que se registró con email)
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture || user.avatar;
      }
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });
    } else {
      // Crear usuario nuevo
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture || '',
        role: 'client',
      });
    }

    // Generar tokens
    generateTokensAndSetCookies(res, user, true);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      clinicName: user.clinicName,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cerrar sesión (limpiar cookies)
 * @route   POST /api/auth/logout
 * @access  Authenticated
 */
const logout = (req, res) => {
  clearAuthCookies(res);
  res.json({ message: 'Sesión cerrada correctamente.' });
};

/**
 * @desc    Obtener datos del usuario autenticado (auto-login)
 * @route   GET /api/auth/me
 * @access  Authenticated
 */
const getMe = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    avatar: req.user.avatar,
    phone: req.user.phone,
    clinicName: req.user.clinicName,
    address: req.user.address,
    createdAt: req.user.createdAt,
  });
};

/**
 * @desc    Renovar access token usando refresh token
 * @route   POST /api/auth/refresh
 * @access  Cookie (refresh token)
 */
const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      res.status(401);
      throw new Error('No hay refresh token. Iniciá sesión de nuevo.');
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      res.status(401);
      throw new Error('Usuario no encontrado o desactivado.');
    }

    // Generar nuevo access token
    generateTokensAndSetCookies(res, user, false);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      clearAuthCookies(res);
      res.status(401);
      return next(new Error('Sesión expirada. Iniciá sesión de nuevo.'));
    }
    next(error);
  }
};

module.exports = { register, login, googleAuth, logout, getMe, refreshToken };
