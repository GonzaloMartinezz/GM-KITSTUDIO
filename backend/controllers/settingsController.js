const Settings = require('../models/Settings');

/**
 * @desc    Obtener configuración global
 * @route   GET /api/settings
 * @access  Public (porque el frontend la usa para mostrar textos)
 */
const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Si no existe, crear los valores por defecto
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Actualizar configuración global
 * @route   PUT /api/settings
 * @access  Admin
 */
const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    const {
      whatsappNumber,
      contactEmail,
      instagramUrl,
    } = req.body;

    if (whatsappNumber !== undefined) settings.whatsappNumber = whatsappNumber;
    if (contactEmail !== undefined) settings.contactEmail = contactEmail;
    if (instagramUrl !== undefined) settings.instagramUrl = instagramUrl;

    await settings.save();
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
