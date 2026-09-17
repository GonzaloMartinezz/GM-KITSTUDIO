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
  MessageCircle,
  LogOut,
  ChevronDown,
  Calendar,
  Clock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

/* ─── DATA ─────────────────────────────────────────── */
const kitItems = [
  { title: 'Compresas Impermeables 1x1 mt y 50x50 cm', desc: 'Compresas impermeables estériles de 1x1 mt y 50x50 cm.', tag: '1 DE C/U', qty: 2 },
  { title: 'Cubre Suctores', desc: 'Fundas descartables protectoras para suctor.', tag: 'CANTIDAD 2', qty: 2 },
  { title: 'Batas con Puños', desc: 'Batas quirúrgicas con puños elastizados.', tag: 'CANTIDAD 2', qty: 2 },
  { title: 'Gorros Clásicos', desc: 'Gorros quirúrgicos clásicos descartables con elástico.', tag: 'CANTIDAD 2', qty: 2 },
  { title: 'Barbijos', desc: 'Barbijos descartables con filtro bacteriano.', tag: 'CANTIDAD 2', qty: 2 },
  { title: 'Cubre Calzados Elastizados', desc: 'Protección descartable con ajuste anatómico.', tag: 'CANTIDAD 2', qty: 2 },
  { title: 'Campo Fenestrado por Paciente', desc: 'Campo fenestrado estéril por paciente.', tag: 'CANTIDAD 1', qty: 1 },
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
  },
  // {
  //   id: 'tarjeta',
  //   icon: CreditCard,
  //   title: 'TARJETA',
  //   desc: 'Débito o crédito a través de link de pago seguro.',
  // },
];

const getPromo = (qty) => {
  if (qty >= 10) {
    return {
      label: qty >= 20 ? '¡Pack Mayorista!' : '¡Pack Clínico Recomendado!',
      sublabel: 'Envío 100% Bonificado Gratis',
      discount: 0,
      unitPrice: 9500,
      freeShipping: true,
      tag: 'Envío Gratis'
    };
  }
  return {
    label: 'Precio Regular',
    sublabel: 'Kit Quirúrgico Descartable Completo.',
    discount: 0,
    unitPrice: 9500,
    freeShipping: false,
    tag: 'Base'
  };
};

const getNextBusinessDays = (numDays = 7) => {
  const days = [];
  let current = new Date();
  current.setDate(current.getDate() + 1); // Start from tomorrow minimum
  
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  
  while (days.length < numDays) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dateStr = current.toISOString().split('T')[0];
      let label = current.toLocaleDateString('es-AR', options);
      label = label.charAt(0).toUpperCase() + label.slice(1);
      days.push({ value: dateStr, label: label });
    }
    current.setDate(current.getDate() + 1);
  }
  return days;
};

const dateOptions = getNextBusinessDays(10);
const timeOptions = [
  { value: '09:00', label: '09:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '13:00 PM' },
  { value: '14:00', label: '14:00 PM' },
  { value: '15:00', label: '15:00 PM' },
  { value: '16:00', label: '16:00 PM' },
  { value: '17:00', label: '17:00 PM' },
];

/* ─── CUSTOM DROPDOWN ─── */
const CustomDropdown = ({ value, options, onChange, placeholder, icon: Icon }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(o => o.value === value)?.label;

  return (
    <div className="relative w-full" ref={ref}>
      <div 
        onClick={() => setOpen(!open)}
        className={`w-full p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer shadow-xs ${open ? 'border-[#88C9C4] bg-white ring-2 ring-[#88C9C4]/20' : 'border-[#E1D9CC]/80 bg-[#F4F2EC]/30 hover:bg-white hover:border-[#88C9C4]/60'}`}
      >
        <div className="flex items-center gap-2.5">
          {Icon && <Icon className={`w-4 h-4 ${value ? 'text-[#88C9C4]' : 'text-[#8CA0B2]'}`} />}
          <span className={`text-sm ${value ? "text-[#364B5D] font-bold" : "text-[#8CA0B2]"}`}>
            {value ? selectedLabel : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#8CA0B2] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </div>
      
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 w-full mt-2 bg-white border border-[#E1D9CC]/80 rounded-xl shadow-xl z-50 max-h-56 overflow-y-auto origin-top"
          >
            {options.map((opt) => (
              <div 
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`px-4 py-3 cursor-pointer text-sm transition-colors border-b border-[#F4F2EC] last:border-0 flex items-center justify-between ${value === opt.value ? 'bg-[#88C9C4]/10 text-[#0C3B45] font-bold' : 'text-[#546A7E] hover:bg-[#F4F2EC]'}`}
              >
                {opt.label}
                {value === opt.value && <Check className="w-3.5 h-3.5 text-[#88C9C4]" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── COMPONENT ─────────────────────────────────────── */
const CargarProductos = () => {
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const [step, setStep] = useState(1);
  const [personalization, setPersonalization] = useState('Completo');
  const [quantity, setQuantity] = useState(5);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const isPickup = selectedShipping === 'sucursal';
  const TOTAL_STEPS = isPickup ? 7 : 6;
  const stepLabels = isPickup 
    ? ['Contenido', 'El Kit', 'Cantidad', 'Envío', 'Retiro', 'Pago', 'Confirmar'] 
    : ['Contenido', 'El Kit', 'Cantidad', 'Envío', 'Pago', 'Confirmar'];

  const stepEnvio = 4;
  const stepRetiro = isPickup ? 5 : -1;
  const stepPago = isPickup ? 6 : 5;
  const stepConfirmar = isPickup ? 7 : 6;

  const basePrice = 9500;
  const promo = getPromo(quantity);
  const unitPrice = promo.unitPrice;
  const total = unitPrice * quantity;
  const savings = (basePrice - unitPrice) * quantity;

  const totalCartItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  const canAdvance = () => {
    if (step === stepEnvio) return !!selectedShipping;
    if (step === stepRetiro) return !!pickupDate && !!pickupTime;
    if (step === stepPago) {
      if (!selectedPayment) return false;
      if (selectedPayment === 'tarjeta') return false;
      return true;
    }
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
      tarjeta: 'Tarjeta (Débito / Crédito)',
      tarjeta_credito: 'Tarjeta (Crédito)',
      tarjeta_debito: 'Tarjeta (Débito)'
    };

    const shippingLabel = shippingMap[selectedShipping] || 'A coordinar';
    const paymentLabel = paymentMap[selectedPayment] || 'A coordinar';

    let msg = `¡Hola GM Kit Studio! 👋\nQuiero confirmar mi pedido desde la web:\n\n`;

    if (user) {
      msg += `👤 *Datos del Cliente:*\n`;
      msg += `• Nombre: ${user.name}\n`;
      msg += `• Email: ${user.email}\n\n`;
    }

    msg += `📦 *Detalle del Pedido:*\n`;
    msg += `• ${quantity}x Kit Odontológico Completo\n`;

    if (promo.freeShipping) {
      msg += `🎁 *Beneficio aplicado:* Envío 100% Bonificado Gratis\n`;
    }

    if (cartItems.length > 0) {
      msg += `\n🛒 *Insumos adicionales del carrito:*\n`;
      cartItems.forEach(item => {
        msg += `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString()})\n`;
      });
    }

    msg += `\n🚚 *Método de Envío:* ${shippingLabel}\n`;
    if (isPickup) {
      msg += `📅 *Día de Retiro:* ${pickupDate}\n`;
      msg += `⏰ *Horario:* ${pickupTime}\n`;
    }
    msg += `💳 *Método de Pago:* ${paymentLabel}\n`;

    msg += `\n💰 *TOTAL DE COMPRA:* $${Math.round(total).toLocaleString()}\n\n`;
    msg += `Quedo a la espera de su confirmación para coordinar la entrega. ¡Muchas gracias!`;

    window.open(`https://wa.me/5493816242482?text=${encodeURIComponent(msg)}`, '_blank');
    navigate('/');
  };

  const nextLabel = step < TOTAL_STEPS ? 'Continuar' : 'Enviar por WhatsApp';

  return (
    <div className="min-h-screen bg-[#F4F2EC] text-[#364B5D] font-geist flex flex-col justify-between overflow-x-hidden selection:bg-[#88C9C4] selection:text-[#0C3B45]">

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
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 sm:gap-2 bg-[#364B5D] text-white px-2 py-1.5 rounded-full shadow-xs group relative cursor-default">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#88C9C4] text-[#0C3B45] flex items-center justify-center font-bebas text-xs sm:text-sm shrink-0">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                
                {/* Hover Dropdown with user details */}
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#364B5D]/20 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 z-50 text-[#0C3B45] flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#364B5D]/50">Mi Cuenta</span>
                    <span className="font-bold truncate text-sm">{user?.name}</span>
                    <span className="text-xs truncate text-[#364B5D]/70">{user?.email}</span>
                  </div>
                  {user?.phone && (
                    <div className="text-xs truncate text-[#364B5D]/70 border-t border-[#364B5D]/10 pt-2">
                      Tel: {user?.phone}
                    </div>
                  )}
                  {user?.clinicName && (
                    <div className="text-xs truncate text-[#364B5D]/70">
                      {user?.clinicName}
                    </div>
                  )}
                </div>

                <button
                  onClick={logout}
                  className="ml-1 text-white/50 hover:text-red-400 transition-colors shrink-0 pr-1"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#364B5D] flex items-center justify-center text-white hover:bg-[#2A3A48] active:scale-95 transition-all shadow-xs cursor-pointer"
                title="Iniciar Sesión"
              >
                <UserCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            )}

            {/* Cart Drawer */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:flex w-9 h-9 rounded-full bg-[#364B5D] items-center justify-center text-white relative hover:bg-[#2A3A48] active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Ver Carrito"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
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
      <main className="flex-1 flex flex-col justify-start md:justify-center max-w-6xl mx-auto w-full px-3.5 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-2.5 md:py-3 z-10 relative pb-24 md:pb-28 lg:pb-32">
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

              {/* Grid for Desktop / Compact Vertical List for Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-lg lg:max-w-none mx-auto text-left mt-4 pb-2 sm:pb-6">
                {kitItems.map((item, i) => {
                  const isQty2 = item.qty === 2 || item.tag?.includes('2');
                  return (
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      key={i}
                      className={`rounded-xl sm:rounded-2xl p-2.5 sm:p-5 flex flex-row sm:flex-col items-center sm:items-stretch justify-between gap-2.5 sm:gap-4 shadow-sm border transition-colors overflow-hidden group relative ${item.isBadge
                        ? 'bg-linear-to-br from-[#88C9C4]/20 to-[#88C9C4]/5 border-[#88C9C4]/60 ring-1 ring-[#88C9C4]/30'
                        : isQty2
                          ? 'bg-white border-[#E1D9CC]/80 hover:border-[#88C9C4] hover:shadow-lg hover:shadow-[#88C9C4]/10'
                          : 'bg-[#F9F8F6] border-[#E1D9CC]/60 hover:border-[#88C9C4]/70 hover:shadow-md'
                        }`}
                    >
                      {/* Left/Top: Icon & Text */}
                      <div className="flex items-center sm:items-start gap-2.5 sm:gap-3.5 flex-1 min-w-0">
                        <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${item.isBadge
                          ? 'bg-[#88C9C4]/30 text-[#0C3B45]'
                          : isQty2
                            ? 'bg-[#F4F2EC] text-[#0C3B45] group-hover:bg-[#0C3B45] group-hover:text-white'
                            : 'bg-white text-[#546A7E] group-hover:bg-[#88C9C4]/20 group-hover:text-[#0C3B45]'
                          }`}>
                          {item.isBadge ? (
                            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                          ) : (
                            <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bebas text-[15px] sm:text-xl text-[#0C3B45] leading-none sm:leading-tight sm:mb-1 group-hover:text-[#124b57] transition-colors truncate sm:whitespace-normal">
                            {item.title}
                          </p>
                          <p className="hidden sm:block text-xs text-[#546A7E] leading-relaxed line-clamp-3">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Right/Bottom: Badge */}
                      <div className="shrink-0 flex sm:w-full sm:justify-end">
                        {isQty2 ? (
                          <span className="inline-flex items-center justify-center text-[9px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-[#0C3B45] text-[#88C9C4] shadow-sm tracking-widest uppercase">
                            CANT. 2
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center text-[9px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg text-[#546A7E] bg-white border border-[#E1D9CC] uppercase tracking-wider">
                            CANT. 1
                          </span>
                        )}
                      </div>
                    </motion.div>
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
              <div className="w-full max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#88C9C4]/60 shadow-lg ring-1 ring-[#88C9C4]/20 relative">

                {/* Card Top: Title & Price side-by-side */}
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 lg:gap-5 pb-3 lg:pb-4 mb-3 lg:mb-4 border-b border-[#F4F2EC] text-center sm:text-left">
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 lg:gap-2 mb-1 lg:mb-1.5">
                      <div className="w-5 h-5 lg:w-7 lg:h-7 rounded-full bg-[#88C9C4] text-[#0C3B45] flex items-center justify-center font-bold shrink-0">
                        <Check className="w-3 h-3 lg:w-3.5 lg:h-3.5 stroke-3" />
                      </div>
                      <h3 className="font-bebas text-xl sm:text-2xl lg:text-3xl text-[#364B5D] leading-none tracking-wide">
                        KIT CIRUGÍA ODONTOLÓGICA
                      </h3>
                    </div>
                    <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold tracking-wider px-2 py-0.5 lg:px-2.5 lg:py-0.5 rounded-full bg-[#0C3B45] text-[#88C9C4] uppercase inline-block">
                      100% ESTÉRIL • CERTIFICADO ANMAT
                    </span>
                  </div>

                  <div className="text-center sm:text-right shrink-0 bg-[#88C9C4]/10 px-4 py-2 lg:px-5 lg:py-3 rounded-xl border border-[#88C9C4]/30 w-full sm:w-auto mt-1 sm:mt-0">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bebas text-[#0C3B45] leading-none">
                      $9.500
                    </div>
                    <div className="text-[9px] lg:text-[11px] text-[#546A7E] font-semibold lg:mt-0.5">
                      por kit (8 insumos)
                    </div>
                  </div>
                </div>

                {/* Insumos List in compact 2-column grid */}
                <div className="bg-[#F8F9FA] rounded-xl p-3 lg:p-4 mb-3 lg:mb-4 border border-[#EBE7DF]/80">
                  <p className="text-[10px] lg:text-[11px] font-bold text-[#364B5D] uppercase tracking-wider mb-2 lg:mb-3 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 lg:w-3.5 lg:h-3.5 text-[#88C9C4]" /> Insumos incluidos en el kit:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 lg:gap-y-2 text-[#546A7E]">
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
                      <div key={idx} className="flex items-center gap-1.5 lg:gap-2">
                        <Check className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#0C3B45] shrink-0 stroke-2.5" />
                        <span className="font-medium text-[11px] lg:text-[12.5px] leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro-badges footer */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 lg:gap-3 text-[10px] lg:text-xs text-[#546A7E]">
                  <span className="px-2 py-0.5 lg:px-3 lg:py-1 rounded-md bg-[#F4F2EC] font-medium border border-[#E1D9CC]/50">SMS 45g Tricapa</span>
                  <span className="px-2 py-0.5 lg:px-3 lg:py-1 rounded-md bg-[#F4F2EC] font-medium border border-[#E1D9CC]/50">Óxido de Etileno</span>
                  <span className="px-2 py-0.5 lg:px-3 lg:py-1 rounded-md bg-[#F4F2EC] font-medium border border-[#E1D9CC]/50">Barrera &gt; 99%</span>
                  <span className="px-2 py-0.5 lg:px-3 lg:py-1 rounded-md bg-[#F4F2EC] font-medium border border-[#E1D9CC]/50">Libre de látex</span>
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
                        setQuantity(q => Math.max(1, q - 1));
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
                        {quantity === 1 ? 'Unidad' : 'Unidades'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setQuantity(q => q + 1);
                      }}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xs border border-[#E1D9CC]/60 flex items-center justify-center text-[#364B5D] hover:bg-[#EBE7DF] active:scale-95 transition-all cursor-pointer"
                      aria-label="Sumar kit"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Quick Presets */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3.5 w-full">
                    {[
                      { q: 5, lblDesktop: '5 kits', lblMobile: '5 kits' },
                      { q: 10, lblDesktop: '10 kits (Envío Gratis)', lblMobile: '10 kits' },
                      { q: 20, lblDesktop: '20+ kits (Envío Gratis)', lblMobile: '20+ kits' }
                    ].map(preset => (
                      <button
                        key={preset.q}
                        onClick={() => {
                          setQuantity(preset.q);
                        }}
                        className={`w-full py-1.5 px-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer leading-tight ${quantity === preset.q
                          ? 'bg-[#364B5D] text-white shadow-xs scale-[1.02]'
                          : 'bg-white/80 text-[#546A7E] hover:bg-white border border-[#E1D9CC]/60'
                          }`}
                      >
                        <span className="hidden sm:inline">{preset.lblDesktop}</span>
                        <span className="inline sm:hidden">{preset.lblMobile}</span>
                      </button>
                    ))}
                  </div>

                  {/* Discount Tiers (Escala Recomendada Fase Inicial) */}
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[10px] font-bold text-[#8CA0B2] uppercase tracking-wider text-left">
                        Escala de Descuentos
                      </p>
                      <span className="text-[9px] font-semibold text-[#0C3B45] bg-[#88C9C4]/25 px-2 py-0.5 rounded-full">
                        Incentivo Real
                      </span>
                    </div>
                    {/* flex-col on mobile, grid-cols-3 on sm and up */}
                    <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 w-full">
                      {[
                        { qty: 5, label: '5 KITS', total: '$47.500', bonus: '' },
                        { qty: 10, label: '10 KITS', total: '$95.000', bonus: '+ ENVÍO GRATIS' },
                        { qty: 20, label: '20+ KITS', total: '$190.000', bonus: '+ ENVÍO GRATIS' }
                      ].map((pkg) => {
                        const isUnlocked = quantity >= pkg.qty;
                        return (
                          <div
                            key={pkg.qty}
                            onClick={() => {
                              setQuantity(pkg.qty);
                            }}
                            className={`cursor-pointer rounded-xl p-2.5 sm:p-2.5 text-left sm:text-center border transition-all flex sm:block items-center justify-between group ${isUnlocked
                              ? 'border-[#88C9C4] bg-[#88C9C4]/15 shadow-xs ring-1 ring-[#88C9C4]/30'
                              : 'border-[#E1D9CC]/60 bg-white/50 hover:bg-white/70'
                              }`}
                          >
                            <div className="flex sm:block items-center gap-2">
                              <span className="font-bebas text-xl sm:text-lg md:text-xl text-[#0C3B45]">{pkg.label}</span>
                              <div className="hidden sm:block mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] md:text-xs text-[#546A7E] font-medium">{pkg.qty} x $9.500</span>
                              </div>
                            </div>

                            <div className="text-right sm:text-center flex flex-col items-end sm:items-center">
                              <span className="font-geist font-bold text-base sm:text-sm md:text-base text-[#1e2f3e] leading-none">{pkg.total}</span>
                              {pkg.bonus && <span className="text-[9px] md:text-[10px] font-bold text-[#88C9C4] uppercase tracking-wider mt-0.5">{pkg.bonus}</span>}
                              <span className="sm:hidden text-[9px] text-[#546A7E] font-medium mt-0.5">{pkg.qty} x $9.500</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Price & Summary Box */}
                <div className="md:col-span-5 flex flex-col gap-2.5">
                  {/* Promo Banner */}
                  <div className={`w-full px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${promo.freeShipping
                    ? 'bg-[#88C9C4]/25 text-[#0C3B45] border border-[#88C9C4]/50'
                    : 'bg-[#EBE7DF] text-[#8CA0B2]'
                    }`}>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`w-2 h-2 rounded-full ${promo.freeShipping ? 'bg-[#0C3B45]' : 'bg-[#D9D1C7]'}`} />
                      <span className="font-bold">{promo.label}</span>
                      <span>— {promo.sublabel}</span>
                    </div>
                  </div>

                  {/* Total Summary Preview Box */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#88C9C4]/50 shadow-sm text-left">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F4F2EC] mb-2.5">
                      <span className="font-bebas text-lg text-[#364B5D]">Resumen de Inversión</span>
                      <span className="text-[10px] font-bold text-[#0C3B45] bg-[#88C9C4]/20 px-2 py-0.5 rounded-full">
                        {`${quantity} ${quantity === 1 ? 'kit' : 'kits'}`}
                      </span>
                    </div>

                    <div className="space-y-1.5 mb-2.5 text-xs">
                      <div className="flex justify-between items-center text-[#546A7E]">
                        <span>Precio por kit</span>
                        <span className="font-semibold text-[#0C3B45]">${Math.round(unitPrice).toLocaleString()}</span>
                      </div>

                      {promo.freeShipping && (
                        <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mt-2">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-lg md:max-w-4xl mx-auto text-left">
                {shippingOptions.map(opt => {
                  const isSelected = selectedShipping === opt.id;
                  const isFree = promo.freeShipping && (opt.id === 'domicilio' || opt.id === 'sucursal');
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt.id)}
                      className={`relative cursor-pointer rounded-2xl p-5 sm:p-6 border-2 transition-all flex flex-col items-center text-center gap-3 select-none ${isSelected
                        ? 'border-[#88C9C4] bg-white shadow-lg ring-2 ring-[#88C9C4]/20 scale-[1.02]'
                        : 'border-[#E1D9CC]/60 bg-white/80 hover:bg-white shadow-sm hover:border-[#88C9C4]/60 hover:scale-[1.01]'
                        }`}
                    >
                      {/* Radio checkmark */}
                      <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-[#88C9C4] bg-[#88C9C4] text-[#0C3B45]' : 'border-[#D9D1C7]'
                        }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-3" />}
                      </div>

                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 mb-1 transition-colors ${isSelected ? 'bg-[#88C9C4]/20 text-[#0C3B45]' : 'bg-[#F4F2EC] text-[#8CA0B2]'
                        }`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      <div className="flex-1 w-full flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center gap-1.5 mb-2">
                          <h3 className="font-bebas text-xl sm:text-2xl text-[#364B5D] tracking-wide leading-none mt-1">
                            {opt.title}
                          </h3>
                          {opt.badge && (
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isFree
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-[#0C3B45] bg-[#88C9C4]/25 border border-[#88C9C4]/40'
                              }`}>
                              {isFree ? '¡BONIFICADO GRATIS!' : opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] sm:text-[13px] text-[#8CA0B2] leading-snug px-1">
                          {isFree ? 'Despacho bonificado sin cargo para tu consultorio.' : opt.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ════════════ PASO RETIRO (SI APLICA) ════════════ */}
          {step === stepRetiro && (
            <motion.div
              key="sRetiro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center w-full"
            >
              <span className="inline-flex items-center gap-1 text-[#546A7E] font-bold tracking-widest text-[10px] uppercase bg-white/60 px-3 py-1 rounded-full mb-1.5 border border-[#E1D9CC]/60">
                <MapPin className="w-3.5 h-3.5 text-[#88C9C4]" /> Retiro en Sucursal
              </span>
              <h1 className="font-bebas text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#364B5D] leading-none mb-1 tracking-wide">
                DÍA Y HORARIO
              </h1>
              <p className="text-xs text-[#546A7E] max-w-lg mb-4 sm:mb-6 leading-relaxed px-2">
                Seleccioná cuándo pasarás a retirar tu pedido por nuestra sucursal. Horario de atención: de 9:00 a 17:00hs.
              </p>

              <div className="w-full max-w-md mx-auto text-left bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-[#E1D9CC]/80 shadow-lg ring-1 ring-[#88C9C4]/10 flex flex-col gap-5">
                <div className="flex flex-col gap-2 relative z-20">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#364B5D] ml-1">Día de Retiro</label>
                  <CustomDropdown 
                    value={pickupDate}
                    onChange={setPickupDate}
                    options={dateOptions}
                    placeholder="Seleccioná un día..."
                    icon={Calendar}
                  />
                </div>
                <div className="flex flex-col gap-2 relative z-10">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#364B5D] ml-1">Horario Estimado</label>
                  <CustomDropdown 
                    value={pickupTime}
                    onChange={setPickupTime}
                    options={timeOptions}
                    placeholder="Seleccioná un horario..."
                    icon={Clock}
                  />
                  <span className="text-[10px] font-medium text-[#8CA0B2] bg-[#F4F2EC] px-2 py-1 rounded-md inline-block w-max mt-1">
                    Horario de corrido (9:00 a 17:00hs)
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════ PASO 5 (o 6): Pago ════════════ */}
          {step === stepPago && (
            <motion.div
              key="sPago"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 w-full max-w-lg md:max-w-4xl text-left mx-auto">
                {paymentOptions.map(opt => {
                  const isSelected = selectedPayment === opt.id || (opt.id === 'tarjeta' && selectedPayment?.startsWith('tarjeta'));
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedPayment(opt.id)}
                      className={`relative cursor-pointer rounded-2xl p-5 sm:p-6 border-2 transition-all flex flex-col items-center text-center gap-3 select-none ${isSelected
                        ? 'border-[#88C9C4] bg-white shadow-lg ring-2 ring-[#88C9C4]/20 scale-[1.02]'
                        : 'border-[#E1D9CC]/60 bg-white/80 hover:bg-white shadow-sm hover:border-[#88C9C4]/60 hover:scale-[1.01]'
                        }`}
                    >
                      {/* Radio checkmark */}
                      <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-[#88C9C4] bg-[#88C9C4] text-[#0C3B45]' : 'border-[#D9D1C7]'
                        }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-3" />}
                      </div>

                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 mb-1 transition-colors ${isSelected ? 'bg-[#88C9C4]/20 text-[#0C3B45]' : 'bg-[#F4F2EC] text-[#8CA0B2]'
                        }`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      <div className="flex-1 w-full flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center gap-1 mb-2">
                          <h3 className="font-bebas text-xl sm:text-2xl text-[#364B5D] tracking-wide leading-none mt-1">
                            {opt.title}
                          </h3>
                        </div>
                        <p className="text-[12px] sm:text-[13px] text-[#8CA0B2] leading-snug mb-2.5 px-1">
                          {opt.desc}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-1.5">
                          {opt.discountBadge && (
                            <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              {opt.discountBadge}
                            </span>
                          )}
                          {opt.surchargeBadge && (
                            <span className="inline-block text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                              {opt.surchargeBadge}
                            </span>
                          )}
                          {opt.badge && (
                            <span className="inline-block text-[10px] font-bold text-[#0C3B45] bg-[#88C9C4]/25 px-2.5 py-0.5 rounded-full border border-[#88C9C4]/40">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        {opt.id === 'tarjeta' && (
                          <div className="flex flex-col gap-2 mt-3 w-full">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedPayment('tarjeta_credito'); }}
                              className={`w-full text-xs font-bold py-2.5 rounded-lg cursor-pointer transition-all border ${selectedPayment === 'tarjeta_credito' ? 'bg-[#88C9C4] text-[#0C3B45] border-[#88C9C4] shadow-sm' : 'text-[#364B5D] bg-[#F4F2EC] border-[#E1D9CC]/60 hover:bg-white hover:border-[#88C9C4]/40 hover:shadow-xs'}`}
                            >
                              CRÉDITO
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedPayment('tarjeta_debito'); }}
                              className={`w-full text-xs font-bold py-2.5 rounded-lg cursor-pointer transition-all border ${selectedPayment === 'tarjeta_debito' ? 'bg-[#88C9C4] text-[#0C3B45] border-[#88C9C4] shadow-sm' : 'text-[#364B5D] bg-[#F4F2EC] border-[#E1D9CC]/60 hover:bg-white hover:border-[#88C9C4]/40 hover:shadow-xs'}`}
                            >
                              DÉBITO
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ════════════ PASO 6 (o 7): Confirmar ════════════ */}
          {step === stepConfirmar && (
            <motion.div
              key="sConfirmar"
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
