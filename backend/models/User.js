const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Formato de email inválido'],
  },
  password: {
    type: String,
    required: function () { return !this.googleId; },
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false, // Nunca se envía en queries por defecto
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client',
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Permite nulls sin violar unique
  },
  avatar: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
    trim: true,
  },
  clinicName: {
    type: String,
    default: '',
    trim: true,
  },
  address: {
    type: String,
    default: '',
    trim: true,
  },
  lastLogin: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// 🔒 Pre-save: hashear password con bcrypt (10 rounds)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 🔑 Método de instancia: comparar password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Sanitizar output JSON (remover password y __v)
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

module.exports = mongoose.model('User', userSchema);
