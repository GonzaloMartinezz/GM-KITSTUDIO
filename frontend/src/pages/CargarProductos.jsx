import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  MapPin,
  User,
  ChevronRight,
  UserCircle,
  ShoppingCart,
  Package,
  Plus,
  Minus,
  CreditCard,
  Wallet,
  Banknote,
  ArrowLeft,
  Check,
  Sparkles,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

/* ─── DATA ─────────────────────────────────────────── */
const kitItems = [
  { title: 'Batas con Puños', desc: 'Batas quirúrgicas con puños elastizados.', tag: 'CANTIDAD 2', qty: 2 },
  { title: 'Compresa 1x1 mt', desc: 'Compresa impermeable estéril de 1×1 mt.', tag: 'Cant. 1', qty: 1 },
  { title: 'Compresa 50x50 cm', desc: 'Compresa impermeable estéril de 50×50 cm.', tag: 'Cant. 1', qty: 1 },
  { title: 'Campo Fenestrado Paciente', desc: 'Campo fenestrado estéril para paciente.', tag: 'Cant. 1', qty: 1 },
  { title: 'Cubre Suctores', desc: 'Fundas descartables protectoras para suctor.', tag: 'CANTIDAD 2', qty: 2 },
  { title: 'Gorros Clásicos', desc: 'Gorros quirúrgicos clásicos descartables con elástico.', tag: 'CANTIDAD 2', qty: 2 },
  { title: 'Barbijos', desc: 'Barbijos descartables con filtro bacteriano.', tag: 'CANTIDAD 2', qty: 2 },
  { title: 'Cubre Calzados Elastizados', desc: 'Protección descartable con ajuste anatómico.', tag: 'CANTIDAD 2', qty: 2 },
];

const shippingOptions = [
  {
    id: 'domicilio',
    icon: Truck,
    title: 'ENVÍO A DOMICILIO',
    desc: 'Entrega puerta a puerta en consultorio o domicilio.',
    badge: 'Tucumán',
  },
  {
    id: 'sucursal',
    icon: MapPin,
    title: 'RETIRO EN SUCURSAL',
    desc: 'Retiro en punto designado. Te enviamos la ubicación exacta.',
    badge: 'Ubicación vía WhatsApp',
  },
  {
    id: 'acordar',
    icon: User,
    title: 'ACORDAR CON VENDEDOR',
    desc: 'Coordinamos entrega en persona y horario según tu conveniencia.',
    badge: 'Tucumán',
  },
];

const paymentOptions = [
  {
    id: 'efectivo',
    icon: Banknote,
    title: 'EFECTIVO',
    desc: 'Abonas en efectivo al momento de recibir el pedido.',
    badge: 'Contra entrega',
  },
  {
    id: 'transferencia',
    icon: Wallet,
    title: 'TRANSFERENCIA',
    desc: 'Alias / CBU inmediato con comprobante digital.',
    discountBadge: '10% OFF EXTRA',
  },
  {
    id: 'tarjeta',
    icon: CreditCard,
    title: 'TARJETA',
    desc: 'Débito o crédito a través de link de pago seguro.',
    surchargeBadge: '+15% recargo',
  },
];

const getPromo = (qty, isTrial = false) => {
  if (isTrial && qty === 1) {
    return {
      label: 'Kit de Muestra Trial',
      sublabel: 'Precio de costo ($6.500) para evaluación clínica',
      discount: (8500 - 6500) / 8500,
      unitPrice: 6500,
      freeShipping: false,
      isTrial: true,
      tag: 'Precio Costo'
    };
  }
  if (qty >= 20) {
    return {
      label: '¡Descuento Mayorista!',
      sublabel: '15% OFF ($144.500) + Envío Gratis',
      discount: 0.15,
      unitPrice: 7225,
      freeShipping: true,
      isTrial: false,
      tag: '15% OFF'
    };
  }
  if (qty >= 10) {
    return {
      label: '¡Pack Clínico Recomendado!',
      sublabel: '10% OFF ($76.500) + Envío 100% Bonificado Gratis',
      discount: 0.10,
      unitPrice: 7650,
      freeShipping: true,
      isTrial: false,
      tag: '10% OFF + Envío Gratis'
    };
  }
  if (qty >= 5) {
    return {
      label: '¡Incentivo Inicial!',
      sublabel: '5% OFF ($40.375 en 5 kits)',
      discount: 0.05,
      unitPrice: 8075,
      freeShipping: false,
      isTrial: false,
      tag: '5% OFF'
    };
  }
  return {
    label: 'Precio Regular',
    sublabel: 'Comprando 5 kits o más accedés a descuentos.',
    discount: 0,
    unitPrice: 8500,
    freeShipping: false,
    isTrial: false,
    tag: 'Base'
  };
};

const TOTAL_STEPS = 6;
const stepLabels = ['Contenido', 'El Kit', 'Cantidad', 'Envío', 'Pago', 'Confirmar'];

/* ─── COMPONENT ─────────────────────────────────────── */
const CargarProductos = () => {
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();

  const [step, setStep] = useState(1);
  const [personalization, setPersonalization] = useState('Completo');
  const [quantity, setQuantity] = useState(5);
  const [isTrial, setIsTrial] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const basePrice = 8500;
  const promo = getPromo(quantity, isTrial);
  const unitPrice = promo.unitPrice;
  const total = unitPrice * quantity;
  const savings = (basePrice - unitPrice) * quantity;

  const totalCartItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  const canAdvance = () => {
    if (step === 4) return !!selectedShipping;
    if (step === 5) return !!selectedPayment;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS && canAdvance()) {
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/productos');
    }
  };

  const handleFinalize = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cargarproductos' } });
      return;
    }

    const shippingMap = {
      domicilio: promo.freeShipping ? 'Envío a Domicilio (¡Bonificado Gratis!)' : 'Envío a Domicilio (Tucumán)',
      sucursal: promo.freeShipping ? 'Retiro en Sucursal (¡Bonificado Gratis!)' : 'Retiro en Sucursal (Punto designado)',
      acordar: 'Acordar con vendedor (En persona)'
    };
    const paymentMap = {
      efectivo: 'Efectivo al recibir',
      transferencia: 'Transferencia bancaria / CBU',
      tarjeta: 'Tarjeta (Débito / Crédito)'
    };

    const shippingLabel = shippingMap[selectedShipping] || 'A coordinar';
    const paymentLabel = paymentMap[selectedPayment] || 'A coordinar';

    let msg = `¡Hola GM Kit Studio! 👋\nQuiero confirmar mi pedido desde la web:\n\n`;

    if (isTrial && quantity === 1) {
      msg += `🧪 *Pedido:* Kit Odontológico Completo (Muestra Trial - 1 kit)\n`;
      msg += `🔬 *Detalle:* Evaluación de calidad médica (SMS 45g y esterilidad ETO)\n`;
    } else {
      msg += `📦 *Producto:* Kit Odontológico Completo (8 Insumos)\n`;
      msg += `🔢 *Cantidad:* ${quantity} ${quantity === 1 ? 'kit' : 'kits'}\n`;
    }

    msg += `🚚 *Entrega:* ${shippingLabel}\n`;
    msg += `💳 *Forma de Pago:* ${paymentLabel}\n`;

    if (isTrial && quantity === 1) {
      msg += `\n🎁 *Beneficio aplicado:* Precio especial de costo de evaluación\n`;
    } else if (promo.discount > 0 || promo.freeShipping) {
      msg += `\n🎁 *Beneficio aplicado:* ${promo.label}`;
      if (promo.freeShipping) msg += ` + Envío 100% Bonificado Gratis`;
      msg += `\n`;
      if (savings > 0) {
        msg += `💵 *Ahorro en tu compra:* $${Math.round(savings).toLocaleString()}\n`;
      }
    }

    if (cartItems.length > 0) {
      msg += `\n🛒 *Insumos adicionales del carrito:*\n`;
      cartItems.forEach(item => {
        msg += `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString()})\n`;
      });
    }

    msg += `\n💰 *TOTAL DE COMPRA:* $${Math.round(total).toLocaleString()}\n\n`;
    msg += `Quedo a la espera de su confirmación para coordinar la entrega. ¡Muchas gracias!`;

    window.open(`https://wa.me/5493816242482?text=${encodeURIComponent(msg)}`, '_blank');
    navigate('/');
  };

  const nextLabel = step < TOTAL_STEPS ? 'Continuar' : 'Enviar por WhatsApp';

  return (
    <div className="min-h-screen bg-[#F4F2EC] text-[#364B5D] font-geist flex flex-col justify-between selection:bg-[#88C9C4] selection:text-[#0C3B45]">

      {/* ── TOP NAV HEADER ── */}
      <header className="w-full px-3.5 sm:px-6 md:px-10 lg:px-14 pt-3.5 sm:pt-5 pb-2.5 z-30 relative bg-[#F4F2EC]/95 backdrop-blur-md border-b border-[#E1D9CC]/50">
        <div className="w-full max-w-425 mx-auto flex items-center justify-between gap-3 sm:gap-6">

          {/* Left: Salir button + GM KIT STUDIO Logo (Pinned to Left) */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <Link
              to="/productos"
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#EBE7DF] hover:bg-white text-[#364B5D] text-xs font-semibold shadow-xs transition-all hover:scale-105 border border-[#E1D9CC]/50 cursor-pointer"
              title="Volver a productos"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Salir</span>
            </Link>

            <div className="h-4 w-px bg-[#D9D1C7] hidden xs:block" />

            <Link to="/" className="font-bebas text-xl sm:text-2xl text-[#364B5D] tracking-wider flex items-center gap-1.5 hover:opacity-85 transition-opacity">
              GM KIT <span className="text-[9px] sm:text-[10px] font-geist font-bold bg-[#88C9C4]/20 text-[#0C3B45] px-1.5 py-0.5 rounded uppercase">STUDIO</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation pills (Centered with breathing room) */}
          <div className="hidden lg:flex items-center bg-[#EBE7DF] rounded-full p-1 shadow-xs border border-[#E1D9CC]/50 gap-1">
            {[['/', 'Inicio'], ['/productos', 'Productos'], ['/nosotros', 'Nosotros']].map(([to, label]) => (
              <Link key={to} to={to} className="px-4 py-1.5 rounded-full text-xs font-medium text-[#364B5D] hover:bg-white hover:shadow-xs transition-all">
                {label}
              </Link>
            ))}
          </div>

          {/* Right: Step pill & Icons (Pinned to Right) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Mini Stepper */}
            <div className="hidden md:flex items-center gap-1">
              {stepLabels.map((lbl, i) => (
                <React.Fragment key={lbl}>
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${step === i + 1
                      ? 'bg-[#364B5D] text-white shadow-xs'
                      : step > i + 1
                        ? 'bg-[#88C9C4]/30 text-[#0C3B45]'
                        : 'bg-[#EBE7DF] text-[#8CA0B2]'
                      }`}
                  >
                    <span>{i + 1}</span>
                    {step === i + 1 && <span className="hidden lg:inline">{lbl}</span>}
                  </div>
                  {i < TOTAL_STEPS - 1 && (
                    <div className={`w-2.5 h-0.5 rounded-full ${step > i + 1 ? 'bg-[#88C9C4]' : 'bg-[#D9D1C7]'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* User Profile */}
            <button
              onClick={() => navigate('/login')}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#364B5D] flex items-center justify-center text-white hover:bg-[#2A3A48] active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Mi Cuenta"
            >
              <UserCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Cart Drawer */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#364B5D] flex items-center justify-center text-white relative hover:bg-[#2A3A48] active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Ver Carrito"
            >
              <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#88C9C4] text-[#0C3B45] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#364B5D]">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* ── PROGRESS BAR & STEP TITLE ── */}
        <div className="w-full max-w-425 mx-auto pt-2.5 pb-0.5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[11px] sm:text-xs font-bold text-[#364B5D] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#364B5D] text-white flex items-center justify-center text-[10px] font-bold">
                {step}
              </span>
              Paso {step} de {TOTAL_STEPS}: <b className="text-[#0C3B45] font-extrabold">{stepLabels[step - 1]}</b>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-[#8CA0B2]">
              {Math.round((step / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="w-full bg-[#E1D9CC]/70 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-[#364B5D] via-[#546A7E] to-[#88C9C4] rounded-full"
              initial={false}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="flex-1 flex flex-col justify-start md:justify-center max-w-5xl mx-auto w-full px-3.5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 z-10 relative pb-14 md:pb-12">
        <AnimatePresence mode="wait">

          {/* ════════════ PASO 1: Contenido del Kit ════════════ */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center w-full"
            >
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-1.5 border border-[#E1D9CC]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#88C9C4]" /> 8 Insumos Médicos Certificados
              </span>
              <h1 className="font-bebas text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#364B5D] leading-none mb-1 tracking-wide">
                ¿QUÉ INCLUYE EL KIT?
              </h1>
              <p className="text-xs text-[#546A7E] max-w-lg mb-4 sm:mb-6 leading-relaxed px-2">
                Cada kit GM contiene los insumos de bioseguridad esenciales, envasados bajo normas de esterilidad y listos para su uso clínico.
              </p>

              {/* Symmetrical 4x2 Grid on desktop / 2-col on mobile */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 w-full text-left">
                {kitItems.map((item, i) => {
                  const isQty2 = item.qty === 2 || item.tag?.includes('2');
                  return (
                    <div
                      key={i}
                      className={`rounded-xl sm:rounded-2xl p-3 flex items-start gap-2.5 sm:gap-3 shadow-xs border transition-all overflow-hidden group ${item.isBadge
                        ? 'bg-[#88C9C4]/15 border-[#88C9C4]/60 ring-1 ring-[#88C9C4]/30'
                        : isQty2
                          ? 'bg-white border-orange-200/90 hover:border-orange-400 hover:shadow-md'
                          : 'bg-white border-[#E1D9CC]/60 hover:border-[#88C9C4]/70'
                        }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${item.isBadge
                        ? 'bg-[#88C9C4]/30 text-[#0C3B45]'
                        : isQty2
                          ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-100'
                          : 'bg-[#F4F2EC] text-[#364B5D] group-hover:bg-[#88C9C4]/20'
                        }`}>
                        {item.isBadge ? (
                          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#0C3B45]" />
                        ) : (
                          <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <p className="font-bebas text-base sm:text-[17px] text-[#364B5D] leading-tight">
                            {item.title}
                          </p>
                          {isQty2 ? (
                            <span className="inline-flex items-center justify-center text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-md bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-sm shadow-orange-500/25 ring-1 ring-orange-400 shrink-0 uppercase tracking-wide">
                              CANTIDAD 2
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center text-[10px] sm:text-[11px] font-semibold px-1.5 py-0.5 rounded-md text-[#546A7E] bg-[#F4F2EC] border border-[#E1D9CC]/80 shrink-0">
                              Cant. 1
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#8CA0B2] leading-snug line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ════════════ PASO 2: El Kit Completo ════════════ */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center w-full"
            >
              <span className="inline-flex items-center gap-1.5 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/70 px-3 py-1 rounded-full mb-1.5 border border-[#E1D9CC]/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#88C9C4]" /> Kit Quirúrgico Único
              </span>
              <h1 className="font-bebas text-2xl xs:text-3xl sm:text-4xl text-[#364B5D] leading-none mb-1 tracking-wide">
                KIT ODONTOLÓGICO COMPLETO
              </h1>
              <p className="text-xs text-[#546A7E] max-w-md mb-3.5 leading-relaxed px-2">
                Un solo kit integral con los 8 insumos estériles indispensables. <span className="font-bold text-[#0C3B45]">No se comercializan insumos sueltos.</span>
              </p>

              {/* Compact & Refined Card for mobile & desktop */}
              <div className="w-full max-w-xl md:max-w-2xl text-left bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#88C9C4]/60 shadow-lg ring-1 ring-[#88C9C4]/20 relative">

                {/* Card Top: Title & Price side-by-side */}
                <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-[#F4F2EC]">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-full bg-[#88C9C4] text-[#0C3B45] flex items-center justify-center font-bold shrink-0">
                        <Check className="w-3 h-3 stroke-3" />
                      </div>
                      <h3 className="font-bebas text-xl sm:text-2xl text-[#364B5D] leading-none tracking-wide">
                        KIT CIRUGÍA ODONTOLÓGICA
                      </h3>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#0C3B45] text-[#88C9C4] uppercase inline-block">
                      100% ESTÉRIL • CERTIFICADO ANMAT
                    </span>
                  </div>

                  <div className="text-right shrink-0 bg-[#88C9C4]/10 px-3 py-1.5 rounded-xl border border-[#88C9C4]/30">
                    <div className="text-2xl sm:text-3xl font-bebas text-[#0C3B45] leading-none">
                      $8.500
                    </div>
                    <div className="text-[9px] text-[#546A7E] font-semibold">
                      por kit (8 insumos)
                    </div>
                  </div>
                </div>

                {/* Insumos List in compact 2-column grid */}
                <div className="bg-[#F8F9FA] rounded-xl p-3 mb-3 border border-[#EBE7DF]/80">
                  <p className="text-[10px] font-bold text-[#364B5D] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#88C9C4]" /> Insumos incluidos en el kit:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[#546A7E]">
                    {[
                      '2x Batas quirúrgicas con puños',
                      '1x Compresa impermeable 1x1 mt',
                      '1x Compresa impermeable 50x50 cm',
                      '1x Campo fenestrado para paciente',
                      '2x Cubre suctores descartables',
                      '2x Gorros clásicos con elástico',
                      '2x Barbijos con filtro bacteriano',
                      '2x Cubrecalzados elastizados',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#0C3B45] shrink-0 stroke-2.5" />
                        <span className="font-medium text-[11px] leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro-badges footer */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 text-[10px] text-[#546A7E]">
                  <span className="px-2 py-0.5 rounded-md bg-[#F4F2EC] font-medium border border-[#E1D9CC]/50">SMS 45g Tricapa</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F4F2EC] font-medium border border-[#E1D9CC]/50">Óxido de Etileno</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F4F2EC] font-medium border border-[#E1D9CC]/50">Barrera &gt; 99%</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F4F2EC] font-medium border border-[#E1D9CC]/50">Libre de látex</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════ PASO 3: Cantidad ════════════ */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center w-full"
            >
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-1.5 border border-[#E1D9CC]/60">
                <Package className="w-3.5 h-3.5 text-[#88C9C4]" /> Volumen y Descuentos
              </span>
              <h1 className="font-bebas text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#364B5D] leading-none mb-1 tracking-wide">
                CANTIDAD DE KITS
              </h1>
              <p className="text-xs text-[#546A7E] max-w-lg mb-3.5 leading-relaxed px-2">
                A mayor volumen, mayor porcentaje de descuento directo en tu compra.
              </p>

              {/* 2-Column Desktop Grid / Mobile Stack */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 w-full max-w-4xl text-left items-start">

                {/* Left Column: Interactive Selector */}
                <div className="md:col-span-7 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#E1D9CC]/80 shadow-xs flex flex-col items-center text-center">

                  {/* Quantity Counter Control */}
                  <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
                    <button
                      onClick={() => {
                        setQuantity(q => {
                          const next = Math.max(1, q - 1);
                          if (next > 1) setIsTrial(false);
                          return next;
                        });
                      }}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xs border border-[#E1D9CC]/60 flex items-center justify-center text-[#364B5D] hover:bg-[#EBE7DF] active:scale-95 transition-all cursor-pointer"
                      aria-label="Restar kit"
                    >
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <div className="w-24 sm:w-28 text-center select-none">
                      <span className="font-bebas text-5xl sm:text-6xl text-[#1e2f3e] leading-none block">
                        {quantity}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold uppercase text-[#8CA0B2] tracking-wider block -mt-1">
                        {isTrial && quantity === 1 ? 'Kit Trial' : quantity === 1 ? 'Unidad' : 'Unidades'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setQuantity(q => {
                          setIsTrial(false);
                          return q + 1;
                        });
                      }}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xs border border-[#E1D9CC]/60 flex items-center justify-center text-[#364B5D] hover:bg-[#EBE7DF] active:scale-95 transition-all cursor-pointer"
                      aria-label="Sumar kit"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Quick Presets */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3.5 w-full">
                    {[
                      { q: 1, lbl: '1 kit (Trial)', trial: true },
                      { q: 5, lbl: '5 kits (5%)', trial: false },
                      { q: 10, lbl: '10 kits (10% + Envío)', trial: false },
                      { q: 20, lbl: '20 kits (15% OFF)', trial: false }
                    ].map(preset => (
                      <button
                        key={preset.q}
                        onClick={() => {
                          setQuantity(preset.q);
                          setIsTrial(preset.trial);
                        }}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${quantity === preset.q && isTrial === preset.trial
                          ? 'bg-[#364B5D] text-white shadow-xs scale-105'
                          : 'bg-white/80 text-[#546A7E] hover:bg-white border border-[#E1D9CC]/60'
                          }`}
                      >
                        {preset.lbl}
                      </button>
                    ))}
                  </div>

                  {/* Discount Tiers (Escala Recomendada Fase Inicial) */}
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[10px] font-bold text-[#8CA0B2] uppercase tracking-wider text-left">
                        Escala de Descuentos (Fase Inicial)
                      </p>
                      <span className="text-[9px] font-semibold text-[#0C3B45] bg-[#88C9C4]/25 px-2 py-0.5 rounded-full">
                        Incentivo Real
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {[
                        { qty: 5, label: '5 kits', off: '5% OFF', total: '$40.375', ahorro: 'Ahorro $2.125', bonus: 'Incentivo' },
                        { qty: 10, label: '10 kits', off: '10% OFF', total: '$76.500', ahorro: 'Ahorro $8.500', bonus: '+ Envío Gratis' },
                        { qty: 20, label: '20+ kits', off: '15% OFF', total: '$144.500', ahorro: 'Ahorro $25.500', bonus: '+ Envío Gratis' }
                      ].map(t => {
                        const isUnlocked = !isTrial && quantity >= t.qty;
                        return (
                          <div
                            key={t.qty}
                            onClick={() => {
                              setQuantity(t.qty);
                              setIsTrial(false);
                            }}
                            className={`cursor-pointer rounded-xl p-2 sm:p-2.5 text-center border transition-all ${isUnlocked
                              ? 'border-[#88C9C4] bg-[#88C9C4]/15 shadow-xs ring-1 ring-[#88C9C4]/30'
                              : 'border-[#E1D9CC]/60 bg-white/50 hover:bg-white/70'
                              }`}
                          >
                            <p className={`font-bebas text-lg leading-tight ${isUnlocked ? 'text-[#0C3B45]' : 'text-[#546A7E]'}`}>
                              {t.off}
                            </p>
                            <p className="text-[10px] text-[#546A7E] font-medium leading-tight">
                              {t.label}
                            </p>
                            <p className="text-[9px] text-[#8CA0B2]">
                              {t.total}
                            </p>
                            <p className="text-[9px] text-emerald-700 font-bold mt-0.5 leading-tight">
                              {t.ahorro}
                            </p>
                            <span className={`inline-block mt-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full ${isUnlocked ? 'text-[#0C3B45] bg-[#88C9C4]/40' : 'text-[#8CA0B2] bg-[#EBE7DF]'
                              }`}>
                              {t.bonus}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Price & Summary Box */}
                <div className="md:col-span-5 flex flex-col gap-2.5">
                  {/* Promo Banner */}
                  <div className={`w-full px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${promo.discount > 0 || isTrial
                    ? 'bg-[#88C9C4]/25 text-[#0C3B45] border border-[#88C9C4]/50'
                    : 'bg-[#EBE7DF] text-[#8CA0B2]'
                    }`}>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`w-2 h-2 rounded-full ${promo.discount > 0 || isTrial ? 'bg-[#0C3B45]' : 'bg-[#D9D1C7]'}`} />
                      <span className="font-bold">{promo.label}</span>
                      <span>— {promo.sublabel}</span>
                    </div>
                  </div>

                  {/* Total Summary Preview Box */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#88C9C4]/50 shadow-sm text-left">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F4F2EC] mb-2.5">
                      <span className="font-bebas text-lg text-[#364B5D]">Resumen de Inversión</span>
                      <span className="text-[10px] font-bold text-[#0C3B45] bg-[#88C9C4]/20 px-2 py-0.5 rounded-full">
                        {isTrial && quantity === 1 ? '1 kit (Trial Costo)' : `${quantity} ${quantity === 1 ? 'kit' : 'kits'}`}
                      </span>
                    </div>

                    <div className="space-y-1.5 mb-2.5 text-xs">
                      <div className="flex justify-between items-center text-[#546A7E]">
                        <span>Precio unitario regular</span>
                        <span className="font-semibold text-[#364B5D]">$8.500</span>
                      </div>
                      <div className="flex justify-between items-center text-[#546A7E]">
                        <span>Precio por kit</span>
                        <span className="font-semibold text-[#0C3B45]">${Math.round(unitPrice).toLocaleString()}</span>
                      </div>
                      {promo.discount > 0 && !isTrial && (
                        <div className="flex justify-between items-center text-emerald-700 font-semibold">
                          <span>Descuento aplicado</span>
                          <span>-{(promo.discount * 100)}%</span>
                        </div>
                      )}
                      {isTrial && (
                        <div className="flex justify-between items-center text-emerald-700 font-semibold">
                          <span>Beneficio Muestra Trial</span>
                          <span>Precio de Costo</span>
                        </div>
                      )}
                      {savings > 0 && (
                        <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                          <span>Ahorro total</span>
                          <span>${Math.round(savings).toLocaleString()}</span>
                        </div>
                      )}
                      {promo.freeShipping && (
                        <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                          <span>Envío a Domicilio</span>
                          <span className="uppercase">¡100% Bonificado Gratis!</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#F4F2EC] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#8CA0B2] uppercase font-bold block">Total Estimado</span>
                        <span className="text-[9px] text-[#8CA0B2]">Directo de fábrica</span>
                      </div>
                      <span className="font-bebas text-3xl sm:text-4xl text-[#0C3B45] leading-none">
                        ${Math.round(total).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Clinical Assurance Pills */}
                  <div className="flex items-center justify-between gap-1 text-[10px] text-[#546A7E] px-1">
                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#0C3B45]" /> Despacho seguro</span>
                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#0C3B45]" /> Reposición sin cargo</span>
                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#0C3B45]" /> Factura A/B</span>
                  </div>
                </div>

              </div>

              {/* ── ESTRATEGIAS DE CONFIANZA & VALOR PERCIBIDO ── */}
              <div className="w-full max-w-4xl mt-6 pt-5 border-t border-[#E1D9CC]/70 text-left">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#88C9C4] uppercase tracking-wider bg-[#0C3B45] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#88C9C4]" /> Confianza Clínica Sin Riesgo
                    </span>
                    <h3 className="font-bebas text-xl sm:text-2xl text-[#364B5D] mt-1 leading-tight">
                      Beneficios Reales para Tu Consultorio
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#8CA0B2] hidden sm:inline font-medium">
                    Valor percibido sin bajar la calidad
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                  {/* 1. Kit de Muestra (Trial) */}
                  <div className={`rounded-2xl p-3.5 border transition-all flex flex-col justify-between ${isTrial && quantity === 1
                    ? 'bg-[#88C9C4]/20 border-[#88C9C4] shadow-sm ring-1 ring-[#88C9C4]'
                    : 'bg-white border-[#E1D9CC]/70 hover:border-[#88C9C4]/50'
                    }`}>
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0C3B45] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#88C9C4]" /> Kit de Muestra
                        </span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#0C3B45] text-[#88C9C4]">
                          $6.500 (Costo)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#546A7E] leading-relaxed mb-3">
                        ¿Primera compra o dudas sobre la calidad? Llevá 1 kit a precio de costo para evaluar en tu quirófano la tela SMS 45g, la esterilidad ANMAT y el empaque.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setQuantity(1);
                        setIsTrial(true);
                      }}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${isTrial && quantity === 1
                        ? 'bg-[#0C3B45] text-[#88C9C4] shadow-xs'
                        : 'bg-[#F4F2EC] text-[#0C3B45] hover:bg-[#88C9C4]/30 border border-[#E1D9CC]'
                        }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isTrial && quantity === 1 ? 'Kit Trial Seleccionado' : 'Pedir Kit de Muestra ($6.500)'}</span>
                    </button>
                  </div>

                  {/* 2. Envío Bonificado */}
                  <div className={`rounded-2xl p-3.5 border transition-all flex flex-col justify-between ${promo.freeShipping
                    ? 'bg-[#88C9C4]/20 border-[#88C9C4] shadow-sm ring-1 ring-[#88C9C4]'
                    : 'bg-white border-[#E1D9CC]/70'
                    }`}>
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0C3B45] flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-[#88C9C4]" /> Envío Bonificado
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${promo.freeShipping ? 'bg-emerald-600 text-white' : 'bg-[#88C9C4]/20 text-[#0C3B45]'
                          }`}>
                          {promo.freeShipping ? '¡100% Gratis!' : 'Desde 10 kits'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#546A7E] leading-relaxed mb-3">
                        En lugar de sacrificar calidad, a partir de 10 kits te regalamos el flete directo a tu clínica en San Miguel de Tucumán. Retenés máxima ganancia con entrega puerta a puerta.
                      </p>
                    </div>
                    <div className="text-[10px] font-semibold text-[#0C3B45] bg-[#F4F2EC] p-2 rounded-xl border border-[#E1D9CC]/50 text-center">
                      {promo.freeShipping
                        ? '✓ ¡Envío Gratis Bonificado Activo!'
                        : `Agregá ${Math.max(1, 10 - quantity)} kit(s) más para envío gratis`}
                    </div>
                  </div>

                  {/* 3. Garantía de Recambio */}
                  <div className="rounded-2xl p-3.5 bg-white border border-[#E1D9CC]/70 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0C3B45] flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#88C9C4]" /> Garantía de Recambio
                        </span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#88C9C4]/20 text-[#0C3B45]">
                          Sin Costo
                        </span>
                      </div>
                      <p className="text-[11px] text-[#546A7E] leading-relaxed mb-3">
                        Si cualquier empaque estéril llega vulnerado, roto o dañado por el traslado, lo reponemos de inmediato sin cargo alguno. Tu bioseguridad quirúrgica está asegurada.
                      </p>
                    </div>
                    <div className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-100 flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Reposición inmediata garantizada</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════ PASO 4: Envío ════════════ */}
          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center w-full"
            >
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-1.5 border border-[#E1D9CC]/60">
                <Truck className="w-3.5 h-3.5 text-[#88C9C4]" /> Logística y Despacho
              </span>
              <h1 className="font-bebas text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#364B5D] leading-none mb-1 tracking-wide">
                OPCIONES DE ENVÍO
              </h1>
              <p className="text-xs text-[#546A7E] max-w-lg mb-4 sm:mb-6 leading-relaxed px-2">
                Seleccioná cómo deseas recibir tus insumos. Despachamos con embalaje estéril protegido.
              </p>

              {/* Free Shipping Alert if 10+ kits */}
              {promo.freeShipping && (
                <div className="mb-4 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center gap-2 max-w-md shadow-xs">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold">¡Tu compra de {quantity} kits incluye Envío 100% Bonificado Gratis!</span>
                </div>
              )}

              {/* Responsive Cards for mobile and desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-4xl text-left">
                {shippingOptions.map(opt => {
                  const isSelected = selectedShipping === opt.id;
                  const isFree = promo.freeShipping && (opt.id === 'domicilio' || opt.id === 'sucursal');
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt.id)}
                      className={`relative cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all flex items-center md:block gap-3.5 select-none ${isSelected
                        ? 'border-[#88C9C4] bg-white shadow-md ring-2 ring-[#88C9C4]/20 scale-[1.01]'
                        : 'border-white/60 bg-white/80 hover:bg-white shadow-xs hover:border-[#88C9C4]/40'
                        }`}
                    >
                      {/* Radio checkmark visible on BOTH mobile and desktop */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 md:absolute md:top-4 md:right-4 transition-all ${isSelected ? 'border-[#88C9C4] bg-[#88C9C4] text-[#0C3B45]' : 'border-[#D9D1C7]'
                        }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-3" />}
                      </div>

                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 md:mb-3.5 transition-colors ${isSelected ? 'bg-[#88C9C4]/20 text-[#0C3B45]' : 'bg-[#F4F2EC] text-[#8CA0B2]'
                        }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0 pr-0 md:pr-4">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <h3 className="font-bebas text-lg sm:text-xl text-[#364B5D] tracking-wide leading-tight">
                            {opt.title}
                          </h3>
                          {opt.badge && (
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${isFree
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-[#0C3B45] bg-[#88C9C4]/25 border border-[#88C9C4]/40'
                              }`}>
                              {isFree ? '¡BONIFICADO GRATIS!' : opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#8CA0B2] leading-snug">
                          {isFree ? 'Despacho bonificado sin cargo para tu consultorio.' : opt.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ════════════ PASO 5: Pago ════════════ */}
          {step === 5 && (
            <motion.div
              key="s5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center w-full"
            >
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-1.5 border border-[#E1D9CC]/60">
                <CreditCard className="w-3.5 h-3.5 text-[#88C9C4]" /> Métodos de Pago
              </span>
              <h1 className="font-bebas text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#364B5D] leading-none mb-1 tracking-wide">
                MÉTODO DE PAGO
              </h1>
              <p className="text-xs text-[#546A7E] max-w-lg mb-4 sm:mb-6 leading-relaxed px-2">
                Elegí cómo abonar. Abonando con transferencia accedés a beneficios adicionales.
              </p>

              {/* Mobile and Desktop responsive cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-4xl text-left">
                {paymentOptions.map(opt => {
                  const isSelected = selectedPayment === opt.id;
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedPayment(opt.id)}
                      className={`relative cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all flex items-center md:block gap-3.5 select-none ${isSelected
                        ? 'border-[#88C9C4] bg-white shadow-md ring-2 ring-[#88C9C4]/20 scale-[1.01]'
                        : 'border-white/60 bg-white/80 hover:bg-white shadow-xs hover:border-[#88C9C4]/40'
                        }`}
                    >
                      {/* Radio checkmark visible on BOTH mobile and desktop */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 md:absolute md:top-4 md:right-4 transition-all ${isSelected ? 'border-[#88C9C4] bg-[#88C9C4] text-[#0C3B45]' : 'border-[#D9D1C7]'
                        }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-3" />}
                      </div>

                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 md:mb-3.5 transition-colors ${isSelected ? 'bg-[#88C9C4]/20 text-[#0C3B45]' : 'bg-[#F4F2EC] text-[#8CA0B2]'
                        }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0 pr-0 md:pr-4">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h3 className="font-bebas text-lg sm:text-xl text-[#364B5D] tracking-wide leading-tight">
                            {opt.title}
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#8CA0B2] leading-snug mb-1.5">
                          {opt.desc}
                        </p>
                        {opt.discountBadge && (
                          <span className="inline-block text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {opt.discountBadge}
                          </span>
                        )}
                        {opt.surchargeBadge && (
                          <span className="inline-block text-[9px] font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                            {opt.surchargeBadge}
                          </span>
                        )}
                        {opt.badge && (
                          <span className="inline-block text-[9px] font-medium text-[#546A7E] bg-[#F4F2EC] px-2 py-0.5 rounded-full">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ════════════ PASO 6: Confirmar ════════════ */}
          {step === 6 && (
            <motion.div
              key="s6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center w-full"
            >
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-1.5 border border-[#E1D9CC]/60">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Confirmación Directa
              </span>
              <h1 className="font-bebas text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#364B5D] leading-none mb-1 tracking-wide">
                CONFIRMAR PEDIDO
              </h1>
              <p className="text-xs text-[#546A7E] max-w-lg mb-3.5 leading-relaxed px-2">
                Revisá el resumen de tu orden. Al presionar finalizar, se abrirá WhatsApp con tu pedido ya redactado.
              </p>

              {/* 2-Column Desktop Grid / 1-Col Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 w-full max-w-4xl text-left items-start">

                {/* Left Col: Order Breakdown */}
                <div className="md:col-span-7 bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E1D9CC]/60">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#F4F2EC] mb-2.5">
                    <h3 className="font-bebas text-xl sm:text-2xl text-[#364B5D]">
                      Detalle de la Orden
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#88C9C4]/20 text-[#0C3B45]">
                      GM Kit Directo
                    </span>
                  </div>

                  <div className="space-y-2 mb-3 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[#8CA0B2]">Kit Seleccionado</span>
                      <span className="font-semibold text-[#364B5D]">Kit Odontológico Completo × {quantity} kits</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#8CA0B2]">Precio por Kit</span>
                      <span className="font-semibold text-[#364B5D]">${Math.round(unitPrice).toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#8CA0B2]">Descuento Volumen</span>
                      <span className={`font-semibold ${promo.discount > 0 ? 'text-emerald-700' : 'text-[#8CA0B2]'}`}>
                        {promo.discount > 0 ? `${(promo.discount * 100)}% OFF (${promo.label})` : 'Sin descuento'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#8CA0B2]">Forma de Envío</span>
                      <span className="font-semibold text-[#364B5D]">
                        {(() => {
                          const s = shippingOptions.find(o => o.id === selectedShipping);
                          return s ? `${s.title} (${s.badge})` : 'No seleccionado';
                        })()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#8CA0B2]">Método de Pago</span>
                      <span className="font-semibold text-[#364B5D]">
                        {paymentOptions.find(o => o.id === selectedPayment)?.title || 'No seleccionado'}
                      </span>
                    </div>
                  </div>

                  {/* Additional Cart items if any */}
                  {cartItems.length > 0 && (
                    <div className="pt-2.5 border-t border-[#F4F2EC]">
                      <p className="text-[10px] font-bold text-[#8CA0B2] uppercase tracking-wider mb-2">
                        Productos adicionales del carrito
                      </p>
                      <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                        {cartItems.map(item => (
                          <div key={item._id} className="flex justify-between items-center text-xs">
                            <span className="text-[#546A7E] truncate pr-2">{item.quantity}× {item.name}</span>
                            <span className="font-bold text-[#364B5D] shrink-0">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Col: Total & WhatsApp Direct Action Card */}
                <div className="md:col-span-5 bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#88C9C4]/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#F4F2EC] mb-2.5">
                      <span className="text-[10px] font-bold text-[#8CA0B2] uppercase tracking-wider">
                        Total a Abonar
                      </span>
                      {savings > 0 && (
                        <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                          Ahorras ${Math.round(savings).toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between mb-2.5">
                      <span className="font-bebas text-3xl sm:text-4xl text-[#0C3B45] leading-none">
                        ${Math.round(total).toLocaleString()}
                      </span>
                      <span className="text-[10px] font-semibold text-[#8CA0B2]">Cotización directa</span>
                    </div>

                    {/* WhatsApp Notice Inside Card */}
                    <div className="p-3 bg-[#88C9C4]/15 border border-[#88C9C4]/35 rounded-xl text-xs text-[#0C3B45] mb-3">
                      <div className="flex items-center gap-1.5 font-bold mb-0.5 text-xs">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>Coordinación directa vía WhatsApp</span>
                      </div>
                      <p className="text-[11px] text-[#0C3B45]/85 leading-snug">
                        Al presionar el botón inferior se abrirá WhatsApp con el pedido pre-redactado para confirmar pago y entrega.
                      </p>
                    </div>
                  </div>

                  {/* Micro trust guarantees row */}
                  <div className="flex items-center justify-between gap-1 text-[10px] text-[#546A7E] pt-2 border-t border-[#F4F2EC]">
                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#0C3B45]" /> 100% Estéril</span>
                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#0C3B45]" /> Factura A/B</span>
                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#0C3B45]" /> Entrega express</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── STICKY BOTTOM ACTION BAR (OPTIMIZED FOR MOBILE & DESKTOP) ── */}
      <footer className="fixed bottom-0 left-0 w-full z-40 bg-[#F4F2EC]/95 backdrop-blur-md border-t border-[#E1D9CC] px-3.5 sm:px-6 md:px-12 py-3 sm:py-3.5 shadow-[0_-4px_25px_rgba(0,0,0,0.08)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="shrink-0 px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-white text-[#364B5D] border border-[#D9D1C7] hover:bg-[#EBE7DF] active:scale-95 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">{step === 1 ? 'Catálogo' : 'Atrás'}</span>
          </button>

          {/* Mobile Price Peek (Steps 3-6) */}
          {step >= 3 && (
            <div className="sm:hidden text-right px-1">
              <span className="text-[9px] text-[#8CA0B2] uppercase font-bold block leading-none">Total</span>
              <span className="font-bebas text-lg text-[#0C3B45] leading-none">${Math.round(total).toLocaleString()}</span>
            </div>
          )}

          {/* Desktop Summary Pill (Steps 2-6) */}
          {step >= 2 && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#546A7E] bg-white/80 px-4 py-1.5 rounded-full border border-[#E1D9CC]/70 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#88C9C4]" />
              <span className="font-semibold text-[#364B5D]">Kit Odontológico Completo</span>
              <span>•</span>
              <span className="font-medium text-[#546A7E]">{quantity} {quantity === 1 ? 'kit' : 'kits'}</span>
              <span>•</span>
              <span className="font-bebas text-lg text-[#0C3B45] leading-none">${Math.round(total).toLocaleString()}</span>
            </div>
          )}

          {/* Next / WhatsApp Finalize Button */}
          <button
            onClick={step === TOTAL_STEPS ? handleFinalize : handleNext}
            disabled={!canAdvance()}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed active:scale-[0.98] ${step === TOTAL_STEPS
              ? 'bg-[#88C9C4] text-[#0C3B45] hover:bg-[#6EB8B2] shadow-[0_4px_15px_rgba(136,201,196,0.5)]'
              : 'bg-[#364B5D] text-white hover:bg-[#2A3A48]'
              }`}
          >
            {step === TOTAL_STEPS ? (
              <>
                <MessageCircle className="w-4 h-4" />
                <span>Enviar WhatsApp</span>
              </>
            ) : (
              <>
                <span>{nextLabel}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

        </div>
      </footer>

    </div>
  );
};

export default CargarProductos;
