import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, User, ChevronRight, UserCircle, ShoppingCart, Package, Plus, Minus, CreditCard, Wallet, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';

/* ─── DATA ─────────────────────────────────────────── */
const kitItems = [
  { title: 'Cubrecalzados', desc: 'Protección descartable para calzado.' },
  { title: 'Cubremangueras', desc: 'Funda estéril para mangueras.' },
  { title: 'Capuchón', desc: 'Cobertura protectora para motor.' },
  { title: 'Campo Quirúrgico', desc: 'Campo estéril de 100×100 cm.' },
  { title: 'Camisolín', desc: 'Camisolín quirúrgico SMS.' },
  { title: 'Cofia', desc: 'Cofia quirúrgica ajustable.' },
  { title: 'Barbijo', desc: 'Barbijo tricapa con ajuste.' },
];

const shippingOptions = [
  { id: 'domicilio', icon: Truck, title: 'ENVÍO A DOMICILIO', desc: 'Entrega puerta a puerta vía Andreani / Correo Argentino.' },
  { id: 'sucursal', icon: MapPin, title: 'RETIRO EN SUCURSAL', desc: 'Retira tu pedido en la sucursal del correo más cercana.' },
  { id: 'acordar', icon: User, title: 'ACORDAR CON EL VENDEDOR', desc: 'Coordinamos entrega en persona (Solo Tucumán).' },
];

const paymentOptions = [
  { id: 'efectivo', icon: Banknote, title: 'EFECTIVO', desc: 'Pago al momento de la entrega.' },
  { id: 'transferencia', icon: Wallet, title: 'TRANSFERENCIA', desc: 'Alias / CBU (10% Off extra).' },
  { id: 'tarjeta', icon: CreditCard, title: 'TARJETA', desc: 'Débito o crédito (Recargo del 15%).' },
];

const getPromo = (qty) => {
  if (qty >= 20) return { label: '¡Descuento Mayorista!', sublabel: '30% OFF aplicado al total', discount: 0.3 };
  if (qty >= 10) return { label: '¡Gran Volumen!', sublabel: '20% OFF + Envío Gratis', discount: 0.2 };
  if (qty >= 5)  return { label: '¡Promo Pack!', sublabel: '10% OFF aplicado al total', discount: 0.1 };
  return { label: 'Precio Regular', sublabel: 'Comprando +5 unidades accedés a descuentos.', discount: 0 };
};

/* ─── SHARED CLASSES ────────────────────────────────── */
const card = (active) =>
  `cursor-pointer bg-white rounded-2xl p-5 border-2 transition-all duration-300 ${
    active ? 'border-[#88C9C4] shadow-md scale-[1.02]' : 'border-transparent shadow-sm hover:shadow-md'
  }`;

const iconBox = (active) =>
  `w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
    active ? 'bg-[#88C9C4]/20 text-[#0C3B45]' : 'bg-[#F4F2EC] text-[#8CA0B2]'
  }`;

const TOTAL_STEPS = 6;

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

  const totalCartItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  const canAdvance = () => {
    if (step === 4) return !!selectedShipping;
    if (step === 5) return !!selectedPayment;
    return true;
  };

  const handleNext = () => { if (step < TOTAL_STEPS && canAdvance()) setStep(s => s + 1); };
  const handleBack = () => { if (step > 1) setStep(s => s - 1); else navigate('/productos'); };

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
    window.open(`https://wa.me/5493813028321?text=${text}`, '_blank');
    navigate('/');
  };

  const nextLabel = step < TOTAL_STEPS ? 'Continuar' : 'Enviar por WhatsApp';

  /* step labels for stepper pill */
  const stepLabels = ['Kit', 'Tipo', 'Cantidad', 'Envío', 'Pago', 'Confirmar'];

  return (
    <div className="h-screen bg-[#F4F2EC] text-[#364B5D] font-geist flex flex-col overflow-hidden">

      {/* ── TOP NAV ── */}
      <header className="w-full px-6 md:px-12 pt-7 pb-3 flex items-center justify-between z-20 relative">
        {/* Pills */}
        <div className="flex items-center bg-[#EBE7DF] rounded-full px-2 py-1.5 shadow-sm border border-[#E1D9CC]/50 gap-1">
          {[['/', 'Inicio'], ['/productos', 'Productos'], ['/nosotros', 'Nosotros']].map(([to, label]) => (
            <Link key={to} to={to} className="px-5 py-1.5 rounded-full text-sm font-medium text-[#364B5D] hover:bg-white/60 transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Stepper + icons */}
        <div className="flex items-center gap-5">
          {/* Mini stepper */}
          <div className="hidden sm:flex items-center gap-1">
            {stepLabels.map((lbl, i) => (
              <React.Fragment key={lbl}>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                  step === i + 1 ? 'bg-[#546A7E] text-white' : step > i + 1 ? 'bg-[#88C9C4]/30 text-[#0C3B45]' : 'bg-[#EBE7DF] text-[#8CA0B2]'
                }`}>
                  <span>{i + 1}</span>
                  {step === i + 1 && <span className="hidden md:inline">{lbl}</span>}
                </div>
                {i < TOTAL_STEPS - 1 && <div className={`w-4 h-px ${step > i + 1 ? 'bg-[#546A7E]' : 'bg-[#D9D1C7]'}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/login')} className="w-9 h-9 rounded-full bg-[#364B5D] flex items-center justify-center text-white hover:bg-[#2A3A48] transition-colors">
              <UserCircle className="w-4.5 h-4.5" />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="w-9 h-9 rounded-full bg-[#364B5D] flex items-center justify-center text-white relative hover:bg-[#2A3A48] transition-colors">
              <ShoppingCart className="w-4.5 h-4.5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#88C9C4] text-[#0C3B45] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#364B5D]">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-6 md:px-12 py-4 z-10 relative overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <AnimatePresence mode="wait">

          {/* ── PASO 1: Contenido del Kit ── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center text-center">
              <span className="text-[#546A7E] font-bold tracking-widest text-[10px] mb-1">PASO 01</span>
              <h1 className="font-bebas text-5xl md:text-6xl text-[#364B5D] mb-3">¿QUÉ INCLUYE EL KIT?</h1>
              <p className="text-[#546A7E] max-w-lg mb-10">Cada kit GM está compuesto por los siguientes insumos de bioseguridad, todos certificados y descartables.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
                {kitItems.map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 flex items-start gap-3 shadow-sm border border-transparent">
                    <div className="w-9 h-9 rounded-full bg-[#F4F2EC] flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-[#8CA0B2]" />
                    </div>
                    <div className="text-left">
                      <p className="font-bebas text-lg text-[#364B5D] leading-tight">{item.title}</p>
                      <p className="text-xs text-[#8CA0B2] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PASO 2: Personalización ── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center text-center">
              <span className="text-[#546A7E] font-bold tracking-widest text-[10px] mb-1">PASO 02</span>
              <h1 className="font-bebas text-5xl md:text-6xl text-[#364B5D] mb-3">TIPO DE KIT</h1>
              <p className="text-[#546A7E] max-w-lg mb-10">Seleccioná el nivel de kit según las necesidades de tu consultorio.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
                {[
                  { id: 'Estandar', name: 'KIT ESTÁNDAR', price: '$12.000 / unidad', features: ['Insumos SMS estándar', 'Certificación nacional', 'Ideal para uso cotidiano'] },
                  { id: 'Premium', name: 'KIT PREMIUM', price: '$15.000 / unidad', features: ['Insumos reforzados', 'Mayor resistencia', 'Ideal para cirugías complejas'] },
                ].map(opt => (
                  <div key={opt.id} onClick={() => setPersonalization(opt.id)} className={card(personalization === opt.id)}>
                    <p className="font-bebas text-3xl text-[#364B5D] mb-1">{opt.name}</p>
                    <p className={`text-sm font-bold mb-3 ${personalization === opt.id ? 'text-[#0C3B45]' : 'text-[#8CA0B2]'}`}>{opt.price}</p>
                    <ul className="space-y-1.5">
                      {opt.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-[#546A7E]">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${personalization === opt.id ? 'bg-[#88C9C4]' : 'bg-[#D9D1C7]'}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PASO 3: Cantidad ── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center text-center">
              <span className="text-[#546A7E] font-bold tracking-widest text-[10px] mb-1">PASO 03</span>
              <h1 className="font-bebas text-5xl md:text-6xl text-[#364B5D] mb-3">CANTIDAD DE KITS</h1>
              <p className="text-[#546A7E] max-w-lg mb-10">Elegí cuántos kits necesitás. A mayor volumen, mayor descuento.</p>

              {/* Qty selector */}
              <div className="flex items-center gap-6 mb-8">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#364B5D] hover:bg-[#EBE7DF] transition-colors">
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-bebas text-7xl text-[#1e2f3e] w-24 text-center leading-none">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#364B5D] hover:bg-[#EBE7DF] transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Promo badge */}
              <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 text-sm font-medium ${promo.discount > 0 ? 'bg-[#88C9C4]/20 text-[#0C3B45] border border-[#88C9C4]/40' : 'bg-[#EBE7DF] text-[#8CA0B2]'}`}>
                <span className={`w-2 h-2 rounded-full ${promo.discount > 0 ? 'bg-[#88C9C4]' : 'bg-[#D9D1C7]'}`} />
                <span className="font-bold">{promo.label}</span>
                <span>— {promo.sublabel}</span>
              </div>

              {/* Promo tiers */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-lg mb-8">
                {[{ qty: 5, label: '5+ kits', off: '10% OFF' }, { qty: 10, label: '10+ kits', off: '20% OFF' }, { qty: 20, label: '20+ kits', off: '30% OFF'}].map(t => (
                  <div key={t.qty} onClick={() => setQuantity(t.qty)} className={`cursor-pointer rounded-xl p-3 text-center border transition-all ${quantity >= t.qty ? 'border-[#88C9C4] bg-white shadow-sm' : 'border-transparent bg-white/50'}`}>
                    <p className="font-bebas text-xl text-[#364B5D]">{t.off}</p>
                    <p className="text-xs text-[#8CA0B2]">{t.label}</p>
                  </div>
                ))}
              </div>

              {/* Total preview */}
              <div className="bg-white rounded-2xl px-8 py-4 flex items-center gap-6 shadow-sm">
                <div className="text-left">
                  <p className="text-xs text-[#8CA0B2] uppercase tracking-wider">Precio unitario</p>
                  <p className="font-bebas text-2xl text-[#364B5D]">${unitPrice.toLocaleString()}</p>
                </div>
                <div className="w-px h-10 bg-[#EBE7DF]" />
                <div className="text-left">
                  <p className="text-xs text-[#8CA0B2] uppercase tracking-wider">Total estimado</p>
                  <p className="font-bebas text-3xl text-[#0C3B45]">${total.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PASO 4: Envío ── */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center text-center">
              <span className="text-[#546A7E] font-bold tracking-widest text-[10px] mb-1">PASO 04</span>
              <h1 className="font-bebas text-5xl md:text-6xl text-[#364B5D] mb-3">OPCIONES DE ENVÍO</h1>
              <p className="text-[#546A7E] max-w-lg mb-10">Seleccioná cómo deseas recibir tu pedido. Realizamos envíos rápidos a todo el país.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                {shippingOptions.map(opt => (
                  <div key={opt.id} onClick={() => setSelectedShipping(opt.id)} className={card(selectedShipping === opt.id)}>
                    <div className={`${iconBox(selectedShipping === opt.id)} mb-4`}>
                      <opt.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bebas text-xl text-[#364B5D] tracking-wide mb-1 text-left">{opt.title}</h3>
                    <p className="text-xs text-[#8CA0B2] leading-tight text-left">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PASO 5: Pago ── */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center text-center">
              <span className="text-[#546A7E] font-bold tracking-widest text-[10px] mb-1">PASO 05</span>
              <h1 className="font-bebas text-5xl md:text-6xl text-[#364B5D] mb-3">MÉTODO DE PAGO</h1>
              <p className="text-[#546A7E] max-w-lg mb-10">Seleccioná cómo vas a abonar. Los descuentos y recargos se aplican al total.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                {paymentOptions.map(opt => (
                  <div key={opt.id} onClick={() => setSelectedPayment(opt.id)} className={card(selectedPayment === opt.id)}>
                    <div className={`${iconBox(selectedPayment === opt.id)} mb-4`}>
                      <opt.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bebas text-xl text-[#364B5D] tracking-wide mb-1 text-left">{opt.title}</h3>
                    <p className="text-xs text-[#8CA0B2] leading-tight text-left">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PASO 6: Confirmar ── */}
          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center text-center">
              <span className="text-[#546A7E] font-bold tracking-widest text-[10px] mb-1">PASO 06</span>
              <h1 className="font-bebas text-5xl md:text-6xl text-[#364B5D] mb-3">CONFIRMAR PEDIDO</h1>
              <p className="text-[#546A7E] max-w-lg mb-10">Revisá el resumen de tu orden. Te redirigiremos a WhatsApp para finalizar.</p>

              <div className="bg-white rounded-2xl p-5 w-full max-w-lg shadow-sm text-left">
                <h3 className="font-bebas text-xl text-[#364B5D] mb-3 pb-2 border-b border-[#F4F2EC]">Resumen del Pedido</h3>

                <div className="space-y-2 mb-4">
                  {[
                    ['Kit', `${personalization} × ${quantity} unidades`],
                    ['Precio unitario', `$${unitPrice.toLocaleString()}`],
                    ['Descuento', promo.discount > 0 ? `${(promo.discount * 100).toFixed(0)}% (${promo.label})` : 'Sin descuento'],
                    ['Envío', shippingOptions.find(o => o.id === selectedShipping)?.title],
                    ['Pago', paymentOptions.find(o => o.id === selectedPayment)?.title],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center text-xs">
                      <span className="text-[#8CA0B2]">{label}</span>
                      <span className="font-semibold text-[#364B5D]">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Cart items if any */}
                {cartItems.length > 0 && (
                  <div className="mb-3 pt-3 border-t border-[#F4F2EC]">
                    <p className="text-[10px] font-bold text-[#8CA0B2] uppercase tracking-wider mb-2">Productos del carrito</p>
                    {cartItems.map(item => (
                      <div key={item._id} className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-[#546A7E]">{item.quantity}× {item.name}</span>
                        <span className="font-bold text-[#364B5D]">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-[#F4F2EC]">
                  <span className="text-[10px] font-bold text-[#8CA0B2] uppercase tracking-wider">Total Estimado</span>
                  <span className="font-bebas text-3xl text-[#0C3B45]">${total.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── BOTTOM BAR ── */}
      <footer className="w-full px-6 md:px-12 py-5 flex items-center justify-between z-20 relative">
        <button onClick={handleBack} className="px-7 py-3.5 rounded-full bg-[#1A2633] text-white font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors">
          {step === 1 ? 'VOLVER A PRODUCTOS' : '← Atrás'}
        </button>

        <button
          onClick={step === TOTAL_STEPS ? handleFinalize : handleNext}
          disabled={!canAdvance()}
          className={`flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
            step === TOTAL_STEPS
              ? 'bg-[#88C9C4] text-[#0C3B45] hover:bg-[#6EB8B2]'
              : 'bg-[#8CA0B2] text-white hover:bg-[#546A7E]'
          }`}
        >
          {step === TOTAL_STEPS ? 'ENVIAR POR WHATSAPP' : nextLabel}
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

    </div>
  );
};

export default CargarProductos;
