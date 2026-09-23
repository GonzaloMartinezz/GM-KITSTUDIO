const Reservation = require('../models/Reservation');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

/**
 * @desc    Listar reservas de kits (cirugías programadas)
 * @route   GET /api/reservations
 * @access  Admin
 */
const getReservations = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const reservations = await Reservation.find(filter).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Crear una reserva. Descuenta stock disponible del kit (Product) señalado.
 * @route   POST /api/reservations
 * @access  Admin
 */
const createReservation = async (req, res, next) => {
  try {
    const { productId, doctor, clinic, kits, total, surgeryDate, surgeryType, paymentStatus, contact } = req.body;

    if (!doctor || !kits) {
      res.status(400);
      throw new Error('Profesional y cantidad de kits son obligatorios.');
    }

    let product = null;
    if (productId) {
      product = await Product.findById(productId);
      if (product) {
        // El stock del producto no se descuenta al reservar (recien se
        // descuenta al despachar/cumplir), asi que hay que restar tambien
        // lo que ya esta comprometido en otras reservas activas — si no,
        // se podian aceptar mas reservas que kits realmente disponibles.
        const alreadyReserved = await Reservation.aggregate([
          { $match: { status: 'reservado', product: product._id } },
          { $group: { _id: null, total: { $sum: '$kits' } } },
        ]);
        const reservedElsewhere = alreadyReserved[0]?.total || 0;
        const trulyAvailable = product.stock - reservedElsewhere;
        if (trulyAvailable < kits) {
          res.status(400);
          throw new Error(`Stock insuficiente. Disponible para reservar: ${Math.max(trulyAvailable, 0)} (${product.stock} en deposito, ${reservedElsewhere} ya reservados).`);
        }
      }
    }

    const reservation = await Reservation.create({
      product: product?._id,
      doctor,
      clinic,
      kits,
      total: total || 0,
      surgeryDate,
      surgeryType,
      paymentStatus,
      contact,
      status: 'reservado',
    });

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Marcar reserva como cumplida (venta concretada): descuenta stock definitivo.
 * @route   PATCH /api/reservations/:id/fulfill
 * @access  Admin
 */
const fulfillReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      res.status(404);
      throw new Error('Reserva no encontrada.');
    }

    if (reservation.product) {
      await Product.findByIdAndUpdate(reservation.product, { $inc: { stock: -reservation.kits } });
    }

    reservation.status = 'cumplido';
    await reservation.save();

    await Transaction.create({
      type: 'income',
      amount: reservation.total,
      description: `Reserva cumplida - ${reservation.doctor} (${reservation.kits} kits)`,
      category: 'venta',
    });

    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancelar una reserva (no afecta stock, ya que no se había descontado en firme).
 * @route   PATCH /api/reservations/:id/cancel
 * @access  Admin
 */
const cancelReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelado' },
      { returnDocument: 'after' }
    );
    if (!reservation) {
      res.status(404);
      throw new Error('Reserva no encontrada.');
    }
    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

module.exports = { getReservations, createReservation, fulfillReservation, cancelReservation };
