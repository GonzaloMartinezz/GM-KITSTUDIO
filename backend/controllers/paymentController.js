const crypto = require('crypto');
const { Preference, Payment } = require('mercadopago');
const mpClient = require('../config/mercadopago');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

/**
 * Devuelve la URL del frontend para armar los back_urls de Mercado Pago.
 * CLIENT_URL puede traer varios orígenes separados por coma (CORS) — para
 * los back_urls usamos el primero (el sitio real en producción).
 */
const getClientUrl = () => {
  const urls = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((u) => u.trim())
    .filter(Boolean);
  return urls[0] || 'http://localhost:5173';
};

/**
 * Verifica la firma del webhook de Mercado Pago (header x-signature) usando
 * el secreto configurado en el panel de MP (Tus integraciones → Webhooks).
 * Si no se configuró MP_WEBHOOK_SECRET, se omite esta validación (se avisa
 * por consola) para no bloquear el flujo antes de tener ese dato.
 */
const verifyMpSignature = (req, dataId) => {
  try {
    const signatureHeader = req.headers['x-signature'];
    const requestId = req.headers['x-request-id'];
    if (!signatureHeader || !requestId || !dataId) return false;

    const parts = {};
    signatureHeader.split(',').forEach((part) => {
      const [key, value] = part.split('=');
      if (key && value) parts[key.trim()] = value.trim();
    });

    const { ts, v1: hash } = parts;
    if (!ts || !hash) return false;

    const manifest = `id:${String(dataId).toLowerCase()};request-id:${requestId};ts:${ts};`;
    const computed = crypto
      .createHmac('sha256', process.env.MP_WEBHOOK_SECRET)
      .update(manifest)
      .digest('hex');

    return computed === hash;
  } catch (error) {
    console.error('❌ Error validando firma de webhook MP:', error.message);
    return false;
  }
};

/**
 * @desc    Crea una orden en estado "pendiente" y una preferencia de pago
 *          de Mercado Pago (Checkout Pro) para esa orden.
 * @route   POST /api/payments/create-preference
 * @access  Client (authenticated)
 */
const createPreference = async (req, res, next) => {
  let createdOrder = null;
  let decrementedItems = [];

  try {
    const {
      quantity,
      cartItems,
      shippingMethod,
      shippingAddress,
      pickupDate,
      pickupTime,
      notes,
    } = req.body;

    const qty = Number(quantity);
    if (!qty || qty < 1) {
      res.status(400);
      throw new Error('La cantidad de kits debe ser al menos 1.');
    }

    // El kit principal es el producto estrella del negocio (seedBusinessData)
    const kitProduct = await Product.findOne({ sku: 'GM-KIT-001', isActive: true })
      || await Product.findOne({ category: 'Kits Quirúrgicos', isActive: true });

    if (!kitProduct) {
      res.status(500);
      throw new Error('El producto principal no está configurado. Contactá al administrador.');
    }

    if (kitProduct.stock < qty) {
      res.status(400);
      throw new Error(`Stock insuficiente de kits. Disponible: ${kitProduct.stock}.`);
    }

    const orderItems = [{
      product: kitProduct._id,
      productName: kitProduct.name,
      quantity: qty,
      priceAtPurchase: kitProduct.price,
    }];
    let totalAmount = kitProduct.price * qty;

    kitProduct.stock -= qty;
    await kitProduct.save();
    decrementedItems.push({ product: kitProduct._id, quantity: qty });

    // Insumos adicionales del carrito (si los hay)
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      for (const ci of cartItems) {
        const prod = await Product.findById(ci._id || ci.product);
        if (!prod || !prod.isActive) {
          res.status(404);
          throw new Error(`Producto no encontrado o no disponible: ${ci.name || ci._id}`);
        }

        const ciQty = Number(ci.quantity) || 1;
        if (prod.stock < ciQty) {
          res.status(400);
          throw new Error(`Stock insuficiente para "${prod.name}". Disponible: ${prod.stock}`);
        }

        orderItems.push({
          product: prod._id,
          productName: prod.name,
          quantity: ciQty,
          priceAtPurchase: prod.price,
        });
        totalAmount += prod.price * ciQty;

        prod.stock -= ciQty;
        await prod.save();
        decrementedItems.push({ product: prod._id, quantity: ciQty });
      }
    }

    createdOrder = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      paymentMethod: 'mercadopago',
      shippingMethod: shippingMethod || 'acordar',
      shippingAddress: shippingAddress || '',
      pickupDate: pickupDate || '',
      pickupTime: pickupTime || '',
      notes: notes || '',
      status: 'pendiente',
      payment: { provider: 'mercadopago' },
    });

    const clientUrl = getClientUrl();
    const backendUrl = `${req.protocol}://${req.get('host')}`;

    const preferenceItems = orderItems.map((it) => ({
      title: it.productName || 'Producto GM Kit Studio',
      quantity: it.quantity,
      unit_price: Number(it.priceAtPurchase),
      currency_id: 'ARS',
    }));

    const preference = new Preference(mpClient);

    let mpResult;
    try {
      mpResult = await preference.create({
        body: {
          items: preferenceItems,
          external_reference: createdOrder._id.toString(),
          payer: {
            name: req.user.name || undefined,
            email: req.user.email || undefined,
            ...(req.user.phone ? { phone: { number: String(req.user.phone) } } : {}),
          },
          back_urls: {
            success: `${clientUrl}/pago/exito`,
            pending: `${clientUrl}/pago/pendiente`,
            failure: `${clientUrl}/pago/error`,
          },
          auto_return: 'approved',
          notification_url: `${backendUrl}/api/payments/webhook`,
          statement_descriptor: 'GM KIT STUDIO',
          metadata: {
            orderId: createdOrder._id.toString(),
            userId: req.user._id.toString(),
          },
        },
      });
    } catch (mpError) {
      // Rollback: la orden quedó huérfana porque Mercado Pago no pudo crear
      // la preferencia (token inválido, corte de red, etc.) — revertimos el
      // stock ya descontado y cancelamos la orden en vez de dejarla colgada.
      for (const item of decrementedItems) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
      }
      createdOrder.status = 'cancelado';
      createdOrder.notes = `${createdOrder.notes ? createdOrder.notes + ' ' : ''}[Cancelada automáticamente: error al crear la preferencia de Mercado Pago]`.trim();
      await createdOrder.save();

      console.error('❌ Error creando preferencia de Mercado Pago:', mpError?.message || mpError);
      res.status(502);
      throw new Error('No pudimos iniciar el pago con Mercado Pago. Intentá de nuevo en un momento o elegí otro método de pago.');
    }

    createdOrder.payment.preferenceId = mpResult.id;
    await createdOrder.save();

    res.status(201).json({
      orderId: createdOrder._id,
      orderNumber: createdOrder.orderNumber,
      preferenceId: mpResult.id,
      init_point: mpResult.init_point,
      sandbox_init_point: mpResult.sandbox_init_point,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Recibe las notificaciones (webhooks) de Mercado Pago y actualiza
 *          el estado de la orden correspondiente.
 * @route   POST /api/payments/webhook
 * @access  Public (llamado por Mercado Pago)
 */
const webhook = async (req, res) => {
  try {
    const topic = req.body?.type || req.query?.type || req.query?.topic;
    const paymentId = req.query?.['data.id'] || req.body?.data?.id || req.query?.id;

    if (!paymentId || (topic && topic !== 'payment')) {
      // Ignoramos otros tópicos (merchant_order, etc.) — solo nos interesan pagos.
      return res.sendStatus(200);
    }

    if (process.env.MP_WEBHOOK_SECRET) {
      const isValid = verifyMpSignature(req, paymentId);
      if (!isValid) {
        console.warn('⚠️  Webhook de Mercado Pago con firma inválida, ignorado.');
        return res.sendStatus(401);
      }
    }

    const payment = new Payment(mpClient);
    const paymentData = await payment.get({ id: paymentId });

    const orderId = paymentData.external_reference;
    if (!orderId) {
      return res.sendStatus(200);
    }

    const order = await Order.findById(orderId);
    if (!order) {
      console.warn(`⚠️  Webhook de Mercado Pago: orden ${orderId} no encontrada.`);
      return res.sendStatus(200);
    }

    const mpStatus = paymentData.status; // approved | rejected | in_process | cancelled | refunded | charged_back
    const wasApproved = order.payment?.status === 'approved';

    order.payment = {
      provider: 'mercadopago',
      preferenceId: order.payment?.preferenceId || '',
      paymentId: String(paymentData.id),
      status: mpStatus,
      statusDetail: paymentData.status_detail || '',
    };

    if (mpStatus === 'approved' && !wasApproved) {
      order.status = 'pagado';
      await Transaction.create({
        order: order._id,
        user: order.user,
        type: 'income',
        amount: order.totalAmount,
        description: `Venta ${order.orderNumber} - Mercado Pago (${paymentData.payment_type_id || 'pago'})`,
        category: 'venta',
      });
    } else if (['rejected', 'cancelled'].includes(mpStatus) && order.status !== 'cancelado') {
      order.status = 'cancelado';
      for (const item of order.items) {
        if (item.product) {
          await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
        }
      }
    } else if (['refunded', 'charged_back'].includes(mpStatus) && order.status !== 'cancelado') {
      order.status = 'cancelado';
      await Transaction.create({
        order: order._id,
        user: order.user,
        type: 'refund',
        amount: order.totalAmount,
        description: `Reembolso ${order.orderNumber} - Mercado Pago`,
        category: 'reembolso',
      });
    } else if (['in_process', 'pending'].includes(mpStatus)) {
      order.status = 'pendiente';
    }

    await order.save();
    return res.sendStatus(200);
  } catch (error) {
    console.error('❌ Error procesando webhook de Mercado Pago:', error?.message || error);
    // 500 para que Mercado Pago reintente la notificación más tarde.
    return res.sendStatus(500);
  }
};

/**
 * @desc    Consulta el estado actual de pago de una orden (para la pantalla
 *          de resultado del checkout, que puede cargar antes que el webhook).
 * @route   GET /api/payments/status/:orderId
 * @access  Client (authenticated, dueño de la orden o admin)
 */
const getPaymentStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .select('orderNumber status payment totalAmount paymentMethod user');

    if (!order) {
      res.status(404);
      throw new Error('Orden no encontrada.');
    }

    if (order.user && order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('No tenés permiso para ver esta orden.');
    }

    res.json({
      orderId: order._id,
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: order.totalAmount,
      payment: order.payment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPreference, webhook, getPaymentStatus };
