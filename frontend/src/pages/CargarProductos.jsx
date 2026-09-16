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

/* ─── DATA ─────────────────────────────────────────── */
const kitItems = [
  { title: 'Cubrecalzados', desc: 'Protección descartable para calzado.', tag: 'Descartable' },
  { title: 'Cubremangueras', desc: 'Funda estéril para mangueras.', tag: 'Estéril' },
  { title: 'Capuchón', desc: 'Cobertura protectora para motor.', tag: 'Ajustable' },
  { title: 'Campo Quirúrgico', desc: 'Campo estéril de 100×100 cm.', tag: '100x100 cm' },
  { title: 'Camisolín', desc: 'Camisolín quirúrgico SMS 45gr.', tag: 'SMS 45g' },
  { title: 'Cofia', desc: 'Cofia quirúrgica con elástico.', tag: 'Elástica' },
  { title: 'Barbijo', desc: 'Barbijo tricapa con filtro y ajuste.', tag: 'Tricapa' },
];

const shippingOptions = [
  {
    id: 'domicilio',
    icon: Truck,
    title: 'ENVÍO A DOMICILIO',
    desc: 'Entrega puerta a puerta vía Andreani / Correo Argentino.',
    badge: 'Todo el país',
  },
  {
    id: 'sucursal',
    icon: MapPin,
    title: 'RETIRO EN SUCURSAL',
    desc: 'Retira tu pedido en la sucursal de correo más cercana.',
    badge: 'Económico',
  },
  {
    id: 'acordar',
    icon: User,
    title: 'ACORDAR CON VENDEDOR',
    desc: 'Coordinamos entrega en persona (Solo San Miguel de Tucumán).',
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

const getPromo = (qty) => {
  if (qty >= 20) return { label: '¡Descuento Mayorista!', sublabel: '30% OFF aplicado al total', discount: 0.3 };
  if (qty >= 10) return { label: '¡Gran Volumen!', sublabel: '20% OFF + Envío Gratis', discount: 0.2 };
  if (qty >= 5)  return { label: '¡Promo Pack!', sublabel: '10% OFF aplicado al total', discount: 0.1 };
  return { label: 'Precio Regular', sublabel: 'Comprando +5 unidades accedés a descuentos.', discount: 0 };
};

const TOTAL_STEPS = 6;
const stepLabels = ['Contenido', 'Tipo', 'Cantidad', 'Envío', 'Pago', 'Confirmar'];

/* ─── COMPONENT ─────────────────────────────────────── */
const CargarProductos = () => {
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen } = useCart();

  const [step, setStep] = useState(1);
  const [personalization, setPersonalization] = useState('Estandar');
  const [quantity, setQuantity] = useState(5);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const basePrice = personalization === 'Estandar' ? 12000 : 15000;
  const promo = getPromo(quantity);
  const unitPrice = basePrice * (1 - promo.discount);
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
    const shippingText = shippingOptions.find(o => o.id === selectedShipping)?.title;
    const paymentText  = paymentOptions.find(o => o.id === selectedPayment)?.title;
    let text = `¡Hola! Quiero hacer un pedido:%0A%0A`;
    text += `*TIPO:* Kit ${personalization}%0A`;
    text += `*CANTIDAD:* ${quantity} unidades%0A`;
    text += `*ENVÍO:* ${shippingText}%0A`;
    text += `*PAGO:* ${paymentText}%0A%0A`;
    text += `*TOTAL APROX:* $${total.toLocaleString()}%0A`;
    if (promo.discount > 0) text += `*(Descuento ${promo.label} aplicado)*%0A`;

    if (cartItems.length > 0) {
      text += `%0A*PRODUCTOS ADICIONALES DEL CARRITO:*%0A`;
      cartItems.forEach(item => {
        text += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString()})%0A`;
      });
    }

    window.open(`https://wa.me/5493816242482?text=${text}`, '_blank');
    navigate('/');
  };

  const nextLabel = step < TOTAL_STEPS ? 'Continuar' : 'Enviar por WhatsApp';

  return (
    <div className="min-h-screen bg-[#F4F2EC] text-[#364B5D] font-geist flex flex-col justify-between selection:bg-[#88C9C4] selection:text-[#0C3B45]">

      {/* ── TOP NAV HEADER ── */}
      <header className="w-full px-3.5 sm:px-6 md:px-12 pt-3.5 sm:pt-6 pb-2.5 z-30 relative bg-[#F4F2EC]/90 backdrop-blur-sm border-b border-[#E1D9CC]/50">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Exit/Catalog link */}
          <Link
            to="/productos"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBE7DF] hover:bg-white text-[#364B5D] text-xs font-semibold shadow-xs transition-colors shrink-0"
            title="Volver a productos"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Catálogo</span>
            <span className="xs:hidden">Salir</span>
          </Link>

          {/* Center Brand / Nav pills */}
          <div className="flex items-center gap-2">
            <Link to="/" className="font-bebas text-xl sm:text-2xl text-[#364B5D] tracking-wider flex items-center gap-1.5">
              GM KIT <span className="text-[9px] sm:text-[10px] font-geist font-bold bg-[#88C9C4]/20 text-[#0C3B45] px-1.5 py-0.5 rounded uppercase">STUDIO</span>
            </Link>

            {/* Desktop Navigation pills */}
            <div className="hidden lg:flex items-center bg-[#EBE7DF] rounded-full p-1 shadow-xs border border-[#E1D9CC]/50 ml-4 gap-1">
              {[['/', 'Inicio'], ['/productos', 'Productos'], ['/nosotros', 'Nosotros']].map(([to, label]) => (
                <Link key={to} to={to} className="px-3.5 py-1 rounded-full text-xs font-medium text-[#364B5D] hover:bg-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Step pill & Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Mini Stepper */}
            <div className="hidden md:flex items-center gap-1">
              {stepLabels.map((lbl, i) => (
                <React.Fragment key={lbl}>
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                      step === i + 1
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

        {/* ── MOBILE PROGRESS BAR & STEP TITLE ── */}
        <div className="max-w-5xl mx-auto pt-2.5 pb-0.5">
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
              className="h-full bg-gradient-to-r from-[#364B5D] via-[#546A7E] to-[#88C9C4] rounded-full"
              initial={false}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="flex-1 flex flex-col justify-start md:justify-center max-w-4xl mx-auto w-full px-3.5 sm:px-6 md:px-8 py-5 sm:py-8 z-10 relative pb-28 sm:pb-32">
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
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-2 border border-[#E1D9CC]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#88C9C4]" /> 7 Insumos Médicos Certificados
              </span>
              <h1 className="font-bebas text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#364B5D] leading-none mb-2 tracking-wide">
                ¿QUÉ INCLUYE EL KIT?
              </h1>
              <p className="text-xs sm:text-sm text-[#546A7E] max-w-lg mb-5 sm:mb-7 leading-relaxed px-2">
                Cada kit GM contiene los insumos de bioseguridad esenciales, envasados bajo normas de esterilidad y listos para su uso clínico.
              </p>

              {/* Responsive Grid for mobile: 2-column or clean responsive cards */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 w-full text-left">
                {kitItems.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center xs:items-start gap-3 shadow-xs border border-[#E1D9CC]/60 hover:border-[#88C9C4]/70 transition-all group"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F4F2EC] flex items-center justify-center shrink-0 group-hover:bg-[#88C9C4]/20 transition-colors">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#364B5D]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <p className="font-bebas text-base sm:text-lg text-[#364B5D] leading-tight truncate">
                          {item.title}
                        </p>
                        <span className="text-[9px] font-semibold text-[#8CA0B2] bg-[#F4F2EC] px-1.5 py-0.5 rounded shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#8CA0B2] leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ════════════ PASO 2: Personalización ════════════ */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center w-full"
            >
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-2 border border-[#E1D9CC]/60">
                <Sparkles className="w-3.5 h-3.5 text-[#88C9C4]" /> Configuración Quirúrgica
              </span>
              <h1 className="font-bebas text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#364B5D] leading-none mb-2 tracking-wide">
                TIPO DE KIT
              </h1>
              <p className="text-xs sm:text-sm text-[#546A7E] max-w-lg mb-5 sm:mb-7 leading-relaxed px-2">
                Seleccioná el nivel de gramaje y resistencia según la complejidad de tus intervenciones.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 w-full max-w-2xl text-left">
                {[
                  {
                    id: 'Estandar',
                    name: 'KIT ESTÁNDAR',
                    price: '$12.000',
                    per: 'por unidad',
                    badge: null,
                    features: ['Insumos SMS estándar 40g', 'Certificación ANMAT', 'Ideal para consultas y cirugías menores']
                  },
                  {
                    id: 'Premium',
                    name: 'KIT PREMIUM',
                    price: '$15.000',
                    per: 'por unidad',
                    badge: 'MÁS ELEGIDO',
                    features: ['Insumos SMS reforzados 50g', 'Mayor barrera bacteriológica', 'Recomendado para cirugías complejas']
                  },
                ].map(opt => {
                  const isSelected = personalization === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPersonalization(opt.id)}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-6 border-2 transition-all relative select-none ${
                        isSelected
                          ? 'border-[#88C9C4] bg-white shadow-md ring-2 ring-[#88C9C4]/20 scale-[1.01]'
                          : 'border-white/60 bg-white/80 hover:bg-white shadow-xs'
                      }`}
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#88C9C4] bg-[#88C9C4] text-[#0C3B45]' : 'border-[#D9D1C7]'}`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <h3 className="font-bebas text-2xl sm:text-3xl text-[#364B5D] leading-none">
                            {opt.name}
                          </h3>
                        </div>
                        {opt.badge && (
                          <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#0C3B45] text-[#88C9C4] uppercase">
                            {opt.badge}
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-1.5 mb-3.5">
                        <span className={`text-xl sm:text-2xl font-bebas ${isSelected ? 'text-[#0C3B45]' : 'text-[#546A7E]'}`}>
                          {opt.price}
                        </span>
                        <span className="text-xs text-[#8CA0B2]">{opt.per}</span>
                      </div>

                      {/* Feature items */}
                      <ul className="space-y-2 border-t border-[#F4F2EC] pt-3">
                        {opt.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-xs text-[#546A7E]">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-[#88C9C4]' : 'bg-[#D9D1C7]'}`} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
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
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-2 border border-[#E1D9CC]/60">
                <Package className="w-3.5 h-3.5 text-[#88C9C4]" /> Volumen y Descuentos
              </span>
              <h1 className="font-bebas text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#364B5D] leading-none mb-2 tracking-wide">
                CANTIDAD DE KITS
              </h1>
              <p className="text-xs sm:text-sm text-[#546A7E] max-w-lg mb-5 sm:mb-6 leading-relaxed px-2">
                A mayor volumen, mayor porcentaje de descuento directo en tu compra.
              </p>

              {/* Quantity Counter Control */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3 sm:mb-4">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-xs border border-[#E1D9CC]/60 flex items-center justify-center text-[#364B5D] hover:bg-[#EBE7DF] active:scale-95 transition-all cursor-pointer"
                  aria-label="Restar kit"
                >
                  <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <div className="w-24 sm:w-28 text-center select-none">
                  <span className="font-bebas text-6xl sm:text-7xl text-[#1e2f3e] leading-none block">
                    {quantity}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase text-[#8CA0B2] tracking-wider block -mt-1">
                    {quantity === 1 ? 'Unidad' : 'Unidades'}
                  </span>
                </div>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-xs border border-[#E1D9CC]/60 flex items-center justify-center text-[#364B5D] hover:bg-[#EBE7DF] active:scale-95 transition-all cursor-pointer"
                  aria-label="Sumar kit"
                >
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Quick Presets for Mobile */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4">
                {[
                  { q: 5, lbl: '5 kits' },
                  { q: 10, lbl: '10 kits' },
                  { q: 20, lbl: '20 kits' },
                  { q: 50, lbl: '50 kits' }
                ].map(preset => (
                  <button
                    key={preset.q}
                    onClick={() => setQuantity(preset.q)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      quantity === preset.q
                        ? 'bg-[#364B5D] text-white shadow-xs scale-105'
                        : 'bg-white/80 text-[#546A7E] hover:bg-white border border-[#E1D9CC]/60'
                    }`}
                  >
                    {preset.lbl}
                  </button>
                ))}
              </div>

              {/* Promo Banner */}
              <div className={`w-full max-w-md px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full mb-4 sm:mb-5 text-xs sm:text-sm font-medium transition-all ${
                promo.discount > 0
                  ? 'bg-[#88C9C4]/25 text-[#0C3B45] border border-[#88C9C4]/50'
                  : 'bg-[#EBE7DF] text-[#8CA0B2]'
              }`}>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  <span className={`w-2 h-2 rounded-full ${promo.discount > 0 ? 'bg-[#0C3B45]' : 'bg-[#D9D1C7]'}`} />
                  <span className="font-bold">{promo.label}</span>
                  <span>— {promo.sublabel}</span>
                </div>
              </div>

              {/* Discount Tiers */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md mb-5 sm:mb-6">
                {[
                  { qty: 5, label: '5+ kits', off: '10% OFF' },
                  { qty: 10, label: '10+ kits', off: '20% OFF' },
                  { qty: 20, label: '20+ kits', off: '30% OFF' }
                ].map(t => {
                  const isUnlocked = quantity >= t.qty;
                  return (
                    <div
                      key={t.qty}
                      onClick={() => setQuantity(t.qty)}
                      className={`cursor-pointer rounded-xl p-2.5 sm:p-3 text-center border transition-all ${
                        isUnlocked
                          ? 'border-[#88C9C4] bg-white shadow-xs ring-1 ring-[#88C9C4]/30'
                          : 'border-transparent bg-white/50 hover:bg-white/70'
                      }`}
                    >
                      <p className={`font-bebas text-lg sm:text-xl leading-tight ${isUnlocked ? 'text-[#0C3B45]' : 'text-[#546A7E]'}`}>
                        {t.off}
                      </p>
                      <p className="text-[10px] sm:text-xs text-[#8CA0B2]">
                        {t.label}
                      </p>
                      {isUnlocked && (
                        <span className="inline-block mt-1 text-[9px] font-bold text-[#0C3B45] bg-[#88C9C4]/30 px-1.5 py-0.2 rounded-full">
                          Activo
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Total Summary Preview Box */}
              <div className="bg-white rounded-2xl p-3.5 sm:px-8 sm:py-4 flex items-center justify-around gap-3 sm:gap-6 shadow-xs border border-[#E1D9CC]/60 w-full max-w-md text-left">
                <div>
                  <p className="text-[10px] sm:text-xs text-[#8CA0B2] uppercase tracking-wider font-semibold">Precio unitario</p>
                  <p className="font-bebas text-xl sm:text-2xl text-[#364B5D] leading-tight">
                    ${Math.round(unitPrice).toLocaleString()}
                  </p>
                  {promo.discount > 0 && (
                    <p className="text-[10px] text-emerald-700 font-semibold">
                      -{(promo.discount * 100)}% aplicado
                    </p>
                  )}
                </div>
                <div className="w-px h-9 bg-[#EBE7DF]" />
                <div>
                  <p className="text-[10px] sm:text-xs text-[#8CA0B2] uppercase tracking-wider font-semibold">Total estimado</p>
                  <p className="font-bebas text-2xl sm:text-3xl text-[#0C3B45] leading-tight">
                    ${Math.round(total).toLocaleString()}
                  </p>
                  {savings > 0 && (
                    <p className="text-[10px] text-emerald-700 font-bold">
                      Ahorras ${Math.round(savings).toLocaleString()}
                    </p>
                  )}
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
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-2 border border-[#E1D9CC]/60">
                <Truck className="w-3.5 h-3.5 text-[#88C9C4]" /> Logística y Despacho
              </span>
              <h1 className="font-bebas text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#364B5D] leading-none mb-2 tracking-wide">
                OPCIONES DE ENVÍO
              </h1>
              <p className="text-xs sm:text-sm text-[#546A7E] max-w-lg mb-5 sm:mb-7 leading-relaxed px-2">
                Seleccioná cómo deseas recibir tus insumos. Despachamos con embalaje estéril protegido.
              </p>

              {/* Mobile optimized list cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl text-left">
                {shippingOptions.map(opt => {
                  const isSelected = selectedShipping === opt.id;
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt.id)}
                      className={`cursor-pointer rounded-2xl p-3.5 sm:p-5 border-2 transition-all flex items-center md:block gap-3.5 select-none ${
                        isSelected
                          ? 'border-[#88C9C4] bg-white shadow-md ring-2 ring-[#88C9C4]/20 scale-[1.01]'
                          : 'border-white/60 bg-white/80 hover:bg-white shadow-xs'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 md:mb-3.5 transition-colors ${
                        isSelected ? 'bg-[#88C9C4]/20 text-[#0C3B45]' : 'bg-[#F4F2EC] text-[#8CA0B2]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h3 className="font-bebas text-lg sm:text-xl text-[#364B5D] tracking-wide leading-tight">
                            {opt.title}
                          </h3>
                          {opt.badge && (
                            <span className="text-[9px] font-bold text-[#546A7E] bg-[#F4F2EC] px-1.5 py-0.5 rounded shrink-0">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#8CA0B2] leading-snug">
                          {opt.desc}
                        </p>
                      </div>

                      {/* Radio checkmark */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 md:hidden ${
                        isSelected ? 'border-[#88C9C4] bg-[#88C9C4] text-[#0C3B45]' : 'border-[#D9D1C7]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
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
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-2 border border-[#E1D9CC]/60">
                <CreditCard className="w-3.5 h-3.5 text-[#88C9C4]" /> Métodos de Pago
              </span>
              <h1 className="font-bebas text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#364B5D] leading-none mb-2 tracking-wide">
                MÉTODO DE PAGO
              </h1>
              <p className="text-xs sm:text-sm text-[#546A7E] max-w-lg mb-5 sm:mb-7 leading-relaxed px-2">
                Elegí cómo abonar. Abonando con transferencia accedés a beneficios adicionales.
              </p>

              {/* Mobile optimized list cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl text-left">
                {paymentOptions.map(opt => {
                  const isSelected = selectedPayment === opt.id;
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedPayment(opt.id)}
                      className={`cursor-pointer rounded-2xl p-3.5 sm:p-5 border-2 transition-all flex items-center md:block gap-3.5 select-none ${
                        isSelected
                          ? 'border-[#88C9C4] bg-white shadow-md ring-2 ring-[#88C9C4]/20 scale-[1.01]'
                          : 'border-white/60 bg-white/80 hover:bg-white shadow-xs'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 md:mb-3.5 transition-colors ${
                        isSelected ? 'bg-[#88C9C4]/20 text-[#0C3B45]' : 'bg-[#F4F2EC] text-[#8CA0B2]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h3 className="font-bebas text-lg sm:text-xl text-[#364B5D] tracking-wide leading-tight">
                            {opt.title}
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#8CA0B2] leading-snug">
                          {opt.desc}
                        </p>
                        {opt.discountBadge && (
                          <span className="inline-block mt-1.5 text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {opt.discountBadge}
                          </span>
                        )}
                        {opt.surchargeBadge && (
                          <span className="inline-block mt-1.5 text-[9px] font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                            {opt.surchargeBadge}
                          </span>
                        )}
                        {opt.badge && (
                          <span className="inline-block mt-1.5 text-[9px] font-medium text-[#546A7E] bg-[#F4F2EC] px-2 py-0.5 rounded-full">
                            {opt.badge}
                          </span>
                        )}
                      </div>

                      {/* Radio checkmark */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 md:hidden ${
                        isSelected ? 'border-[#88C9C4] bg-[#88C9C4] text-[#0C3B45]' : 'border-[#D9D1C7]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
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
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-2 border border-[#E1D9CC]/60">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Confirmación Directa
              </span>
              <h1 className="font-bebas text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#364B5D] leading-none mb-2 tracking-wide">
                CONFIRMAR PEDIDO
              </h1>
              <p className="text-xs sm:text-sm text-[#546A7E] max-w-lg mb-4 sm:mb-6 leading-relaxed px-2">
                Revisá el resumen de tu orden. Al presionar finalizar, se abrirá WhatsApp con tu pedido ya redactado.
              </p>

              <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg shadow-sm border border-[#E1D9CC]/60 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-[#F4F2EC] mb-3">
                  <h3 className="font-bebas text-xl sm:text-2xl text-[#364B5D]">
                    Resumen de la Orden
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#88C9C4]/20 text-[#0C3B45]">
                    GM Kit Directo
                  </span>
                </div>

                <div className="space-y-2.5 mb-4 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#8CA0B2]">Kit Seleccionado</span>
                    <span className="font-semibold text-[#364B5D]">Kit {personalization} × {quantity} un.</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8CA0B2]">Precio Unitario</span>
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
                      {shippingOptions.find(o => o.id === selectedShipping)?.title || 'No seleccionado'}
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
                  <div className="mb-3 pt-3 border-t border-[#F4F2EC]">
                    <p className="text-[10px] font-bold text-[#8CA0B2] uppercase tracking-wider mb-2">
                      Productos adicionales del carrito
                    </p>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
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

                {/* Total box */}
                <div className="flex justify-between items-center pt-3.5 border-t border-[#F4F2EC]">
                  <div>
                    <span className="text-[10px] font-bold text-[#8CA0B2] uppercase tracking-wider block">
                      Total Estimado
                    </span>
                    {savings > 0 && (
                      <span className="text-[10px] text-emerald-700 font-semibold block">
                        Ahorro total: ${Math.round(savings).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="font-bebas text-3xl sm:text-4xl text-[#0C3B45] leading-none">
                    ${Math.round(total).toLocaleString()}
                  </span>
                </div>

                {/* WhatsApp Info Notice */}
                <div className="mt-4 p-3 bg-[#88C9C4]/15 border border-[#88C9C4]/40 rounded-xl flex items-start gap-2.5 text-left text-xs text-[#0C3B45]">
                  <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    Al confirmar, se abrirá WhatsApp con el mensaje ya redactado para coordinar pago y entrega directa con nuestro equipo.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── STICKY BOTTOM ACTION BAR (OPTIMIZED FOR MOBILE THUMB REACH) ── */}
      <footer className="fixed bottom-0 left-0 w-full z-40 bg-[#F4F2EC]/95 backdrop-blur-md border-t border-[#E1D9CC] px-3.5 sm:px-6 md:px-12 py-3 sm:py-4 shadow-[0_-4px_25px_rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="shrink-0 px-3.5 sm:px-6 py-3 rounded-xl sm:rounded-full bg-white text-[#364B5D] border border-[#D9D1C7] hover:bg-[#EBE7DF] active:scale-95 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
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

          {/* Next / WhatsApp Finalize Button */}
          <button
            onClick={step === TOTAL_STEPS ? handleFinalize : handleNext}
            disabled={!canAdvance()}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed active:scale-[0.98] ${
              step === TOTAL_STEPS
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
