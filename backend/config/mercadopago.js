const { MercadoPagoConfig } = require('mercadopago');

/**
 * Cliente central del SDK de Mercado Pago.
 * MP_ACCESS_TOKEN se configura en .env (modo TEST o Producción, según
 * las credenciales que uses desde el panel de Mercado Pago Developers).
 */
if (!process.env.MP_ACCESS_TOKEN) {
  console.warn('⚠️  MP_ACCESS_TOKEN no configurado — Mercado Pago no va a poder crear pagos hasta que lo agregues al .env');
}

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
  options: { timeout: 8000 },
});

module.exports = mpClient;
