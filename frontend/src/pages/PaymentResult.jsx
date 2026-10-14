import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, XCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { paymentsAPI } from '../lib/api';

/**
 * Pantalla de resultado del checkout con Mercado Pago. Mercado Pago redirige
 * acá después del pago (back_urls en paymentController.js) y agrega
 * ?external_reference=<orderId> en la URL. Consultamos nuestro backend para
 * mostrar el estado real de la orden (actualizado por el webhook), ya que
 * puede tardar unos segundos más que el redirect del usuario.
 */
const OUTCOME_CONFIG = {
  success: {
    icon: CheckCircle2,
    color: '#10B981',
    title: '¡Pago Aprobado!',
    message: 'Tu pago se acreditó correctamente. Ya estamos preparando tu pedido.',
  },
  pending: {
    icon: Clock,
    color: '#F59E0B',
    title: 'Pago en Proceso',
    message: 'Estamos esperando la confirmación de tu pago. Te avisamos por WhatsApp apenas se acredite.',
  },
  failure: {
    icon: XCircle,
    color: '#EF4444',
    title: 'No Pudimos Procesar el Pago',
    message: 'El pago no se completó. Podés volver a intentarlo o elegir otro método de pago.',
  },
};

const STATUS_TO_OUTCOME = {
  pagado: 'success',
  confirmado: 'success',
  entregado: 'success',
  enviado: 'success',
  pendiente: 'pending',
  cancelado: 'failure',
};

const PaymentResult = ({ outcome: initialOutcome }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState(null);
  const [outcome, setOutcome] = useState(initialOutcome);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('external_reference');

  useEffect(() => {
    let cancelled = false;

    const fetchStatus = async (attempt = 0) => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await paymentsAPI.status(orderId);
        if (cancelled) return;
        setOrderInfo(data);

        const mapped = STATUS_TO_OUTCOME[data.status];
        if (mapped) setOutcome(mapped);

        // El webhook puede demorar unos segundos más que el redirect del
        // usuario — si Mercado Pago ya nos trajo "success" pero la orden
        // todavía figura "pendiente", reintentamos un par de veces.
        if (data.status === 'pendiente' && initialOutcome === 'success' && attempt < 4) {
          setTimeout(() => fetchStatus(attempt + 1), 2000);
          return;
        }
      } catch {
        // Si falla la consulta (red, orden de otro usuario, etc.) nos
        // quedamos con el resultado que vino en la URL de Mercado Pago.
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchStatus();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const config = OUTCOME_CONFIG[outcome] || OUTCOME_CONFIG.pending;
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-[#F4F2EC] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#E1D9CC]/60 p-6 sm:p-8 text-center">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: `${config.color}1A` }}
        >
          <Icon className="w-9 h-9 sm:w-10 sm:h-10" style={{ color: config.color }} />
        </div>

        <h1 className="font-bebas text-2xl sm:text-3xl text-[#364B5D] tracking-wide mb-1">
          {config.title}
        </h1>
        <p className="text-sm text-[#546A7E] mb-5 leading-relaxed">
          {config.message}
        </p>

        {orderInfo?.orderNumber && (
          <div className="bg-[#F4F2EC] rounded-xl px-4 py-3 mb-5 text-left space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-[#8CA0B2]">N° de Orden</span>
              <span className="font-bold text-[#364B5D]">{orderInfo.orderNumber}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#8CA0B2]">Total</span>
              <span className="font-bold text-[#364B5D]">${Math.round(orderInfo.totalAmount).toLocaleString()}</span>
            </div>
          </div>
        )}

        {loading && (
          <p className="text-[11px] text-[#8CA0B2] mb-4">Confirmando el estado de tu pago...</p>
        )}

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-full bg-[#364B5D] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2A3A48] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Volver al Inicio <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={`https://wa.me/5493816242482?text=${encodeURIComponent(
              orderInfo?.orderNumber
                ? `¡Hola! Quiero consultar sobre mi pedido ${orderInfo.orderNumber}.`
                : 'Hola, tengo una consulta sobre mi pago en la web.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 rounded-full bg-white border border-[#D9D1C7] text-[#364B5D] font-bold text-xs uppercase tracking-wider hover:bg-[#EBE7DF] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" /> Hablar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
