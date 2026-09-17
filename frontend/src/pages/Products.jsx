import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Eye, Settings, Package, Truck, CreditCard, MessageCircle, X, Check, ShieldCheck, Sparkles, ArrowRight, Star } from 'lucide-react';
import { ProductShowcase } from '../components/ui/product-showcase';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeStepCard, setActiveStepCard] = useState(0);

  useEffect(() => {
    // Simulate fetching
    setTimeout(() => {
      setProducts([
        { _id: '1', name: "Batas con Puños", description: "Batas quirúrgicas con puños elastizados (Cant. 2).", image: "/images/camisolinkits.jpg" },
        { _id: '2', name: "Compresa 1x1 mt", description: "Compresa estéril impermeable de 1x1 mt (Cant. 1).", image: "/images/Campo Quirúrgico (100x100cm)kits.jpg" },
        { _id: '3', name: "Compresa 50x50 cm", description: "Compresa estéril impermeable de 50x50 cm (Cant. 1).", image: "/images/Campo Quirúrgico (100x100cm)kits.jpg" },
        { _id: '4', name: "Campo Fenestrado", description: "Campo fenestrado estéril para paciente (Cant. 1).", image: "/images/Capuchónkits.jpg" },
        { _id: '5', name: "Cubre Suctores", description: "Fundas protectoras para suctores (Cant. 2).", image: "/images/cubremangueraskits.jpg" },
        { _id: '6', name: "Gorros Clásicos", description: "Gorros clásicos descartables con ajuste elástico (Cant. 2).", image: "/images/cofiakits.png" },
        { _id: '7', name: "Barbijos", description: "Barbijos descartables con filtro bacteriano (Cant. 2).", image: "/images/barbijoskits.png" },
        { _id: '8', name: "Cubrecalzados Elastizados", description: "Cubrecalzados descartables elastizados (Cant. 2).", image: "/images/cubrecalzadoskit.jpg" }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="bg-[#0C1517] min-h-screen text-brand-1 font-geist selection:bg-brand-3 selection:text-white">
      {/* Top Padding for Navbar */}
      <div className="pt-24 sm:pt-28 md:pt-36 pb-16 px-4 sm:px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">

        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-24 mb-16 sm:mb-24 md:mb-32">
          {/* Left Text */}
          <div className="w-full md:w-1/2 flex flex-col items-start z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wider text-white leading-[0.9]"
            >
              RAÍCES DE<br />CALIDAD
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="mt-4 sm:mt-6 text-base sm:text-lg text-brand-1/70 max-w-md font-light leading-relaxed"
            >
              En GM KIT STUDIO, creemos que la seguridad médica comienza con el equilibrio perfecto entre protección absoluta y comodidad. Nuestra línea estéril combina materiales de primera calidad con tecnología moderna para restaurar la confianza.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 sm:mt-10 bg-[#42544F] hover:bg-[#526660] text-brand-1 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-medium transition-colors flex items-center gap-2 shadow-lg text-sm sm:text-base cursor-pointer"
            >
              <ShoppingCart size={20} />
              Comprar Kit Completo
            </motion.button>
          </div>

          {/* Right Hero Image */}
          <div className="w-full md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full h-76 xs:h-88 sm:h-96 md:h-112.5 lg:h-125 rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl bg-brand-5/20"
            >
              <video
                src="/video-muestra.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-1000 cursor-pointer"
              />
              {/* Subtle overlay gradient to blend bottom edge into background */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0C1517] via-transparent to-transparent opacity-90 pointer-events-none"></div>
            </motion.div>
          </div>
        </section>

        {/* CATALOG / BEST SELLERS SECTION */}
        <section id="catalog" className="scroll-mt-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white mb-2 sm:mb-4 tracking-wide"
          >
            ¿QUÉ INCLUYE EL KIT?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-1/60 font-geist mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base"
          >
            Todo lo necesario para garantizar la bioseguridad de un paciente y del profesional en una intervención odontológica.
          </motion.p>

          {loading ? (
            <div className="flex justify-center items-center h-80 sm:h-125">
              <div className="w-12 h-12 border-4 border-brand-3 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="w-full relative z-20 mt-8 sm:mt-12" style={{ contain: 'paint' }}>
              <ProductShowcase products={products} onProductSelect={setSelectedProduct} />
            </div>
          )}
        </section>

        {/* ── SECCIÓN DE BENEFICIOS Y CONFIANZA CLÍNICA ── */}
        <section className="mt-20 sm:mt-28 border-t border-white/10 pt-16 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#88C9C4] bg-[#88C9C4]/10 border border-[#88C9C4]/30 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#88C9C4]" /> Confianza Clínica Sin Riesgo
              </span>
              <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-wide leading-none mt-1">
                BENEFICIOS REALES PARA TU CONSULTORIO
              </h2>
              <p className="text-brand-1/70 font-geist max-w-2xl text-sm sm:text-base mt-2 leading-relaxed">
                Garantías y beneficios estratégicos diseñados para que compres con total tranquilidad, protegiendo tu presupuesto y la bioseguridad en cada cirugía.
              </p>
            </div>
            <div className="hidden lg:flex flex-col items-end text-right">
              <span className="text-xs text-[#88C9C4] font-semibold tracking-wider uppercase">
                Directo de Fábrica GM Studio
              </span>
              <span className="text-xs text-brand-1/50 font-geist mt-0.5">
                Valor percibido sin sacrificar calidad
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

            {/* 1. KIT DE MUESTRA */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-linear-to-b from-[#16272B] to-[#0E1A1D] border border-orange-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="bg-linear-to-r from-orange-500 to-amber-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-md shadow-orange-500/25 uppercase tracking-wide">
                    $6.500 (Precio Costo)
                  </span>
                </div>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mb-1">
                  KIT DE MUESTRA (TRIAL)
                </h3>
                <p className="text-xs text-orange-400 font-semibold mb-3">
                  Para nuevos consultorios y profesionales
                </p>
                <p className="text-xs sm:text-sm text-brand-1/80 font-geist leading-relaxed mb-5">
                  ¿Primera compra o dudas sobre la calidad? Llevate 1 solo kit a precio de costo para evaluar en tu quirófano la tela SMS 45g, el termosellado y la esterilidad ANMAT sin compromiso de volumen.
                </p>
                <div className="space-y-2 border-t border-white/10 pt-4 mb-6 text-xs text-brand-1/90">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 stroke-2.5" />
                    <span>1 Kit completo a precio de costo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 stroke-2.5" />
                    <span>Tela médica SMS 45g tricapa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 stroke-2.5" />
                    <span>Sin compra mínima requerida</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/cargarproductos')}
                className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer active:scale-[0.98]"
              >
                <span>Pedir Kit de Muestra</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* 2. ENVÍO BONIFICADO */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-linear-to-b from-[#16272B] to-[#0E1A1D] border border-[#88C9C4]/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-[#88C9C4] transition-all duration-300 shadow-xl hover:shadow-[#88C9C4]/10 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#88C9C4]/15 border border-[#88C9C4]/30 flex items-center justify-center text-[#88C9C4] group-hover:scale-105 transition-transform">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="bg-[#88C9C4] text-[#0C1517] font-black text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                    Desde 10 Kits
                  </span>
                </div>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mb-1">
                  ENVÍO BONIFICADO
                </h3>
                <p className="text-xs text-[#88C9C4] font-semibold mb-3">
                  Flete 100% bonificado a tu consultorio
                </p>
                <p className="text-xs sm:text-sm text-brand-1/80 font-geist leading-relaxed mb-5">
                  A partir de 10 unidades, el envío corre completamente por nuestra cuenta. Recibí tus insumos directamente en tu consultorio sin costos ocultos, reteniendo la máxima ganancia.
                </p>
                <div className="space-y-2 border-t border-white/10 pt-4 mb-6 text-xs text-brand-1/90">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#88C9C4] shrink-0 stroke-2.5" />
                    <span>Envío Gratis bonificado en 10+ kits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#88C9C4] shrink-0 stroke-2.5" />
                    <span>Ahorro escalonado de hasta $25.500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#88C9C4] shrink-0 stroke-2.5" />
                    <span>Entrega y despacho prioritario</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/cargarproductos')}
                className="w-full py-3 px-4 rounded-xl bg-[#42544F] hover:bg-[#526660] text-brand-1 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.98]"
              >
                <span>Ver Escala de Descuentos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* 3. GARANTÍA DE RECAMBIO */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative bg-linear-to-b from-[#16272B] to-[#0E1A1D] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-white/40 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Star className="w-6 h-6" />
                  </div>
                  <span className="bg-white/15 text-white border border-white/25 font-bold text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                    DESCUENTOS EXCLUSIVOS
                  </span>
                </div>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mb-1">
                  CLIENTE DE CONFIANZA
                </h3>
                <p className="text-xs text-white/70 font-semibold mb-3">
                  Beneficios de ser cliente de confianza con descuentos!
                </p>
                <p className="text-xs sm:text-sm text-brand-1/80 font-geist leading-relaxed mb-5">
                  Premiamos tu fidelidad. Al convertirte en un cliente habitual de GM Kit Studio, accederás de forma automática a descuentos preferenciales y ofertas exclusivas en tus próximos pedidos de kits y equipamiento.
                </p>
                <div className="space-y-2 border-t border-white/10 pt-4 mb-6 text-xs text-brand-1/90">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#88C9C4] shrink-0 stroke-2.5" />
                    <span>Descuentos fijos por compras recurrentes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#88C9C4] shrink-0 stroke-2.5" />
                    <span>Promociones especiales en nuevos lanzamientos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#88C9C4] shrink-0 stroke-2.5" />
                    <span>Atención prioritaria y soporte directo por WhatsApp</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/cargarproductos')}
                className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border border-white/20 cursor-pointer active:scale-[0.98]"
              >
                <span>Conocer Beneficios</span>
                <Check className="w-4 h-4 text-[#88C9C4]" />
              </button>
            </motion.div>

          </div>
        </section>

        {/* HOW TO BUY SECTION */}
        <section className="mt-20 sm:mt-32 border-t border-white/10 pt-16 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white mb-2 sm:mb-4 tracking-wide">
              PASOS PARA COMPRAR
            </h2>
            <p className="text-brand-1/60 font-geist max-w-2xl mx-auto text-sm sm:text-base">
              Sigue este proceso simple y rápido para adquirir tus kits quirúrgicos a medida.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { num: "1", title: "Visualizar kits", desc: "Explora nuestro catálogo y conoce en detalle cada componente de nuestros kits.", icon: <Eye className="w-5 h-5" /> },
              { num: "2", title: "Personalizar kits", desc: "Arma tu kit a medida según las necesidades específicas de tu cirugía.", icon: <Settings className="w-5 h-5" /> },
              { num: "3", title: "Elegir cantidad", desc: "Elige cuántos necesitas. ¡Consultando cantidad, hacemos descuentos!", icon: <Package className="w-5 h-5" /> },
              { num: "4", title: "Opción de envío", desc: "Selecciona la opción de envío que mejor se adapte a tu ubicación y urgencia.", icon: <Truck className="w-5 h-5" /> },
              { num: "5", title: "Método de pago", desc: "Elige el método de pago más conveniente y seguro para ti.", icon: <CreditCard className="w-5 h-5" /> },
              { num: "6", title: "Hacer el pedido", desc: "Envíanos un WhatsApp o Mail con tu pedido para confirmar y coordinar la entrega.", icon: <MessageCircle className="w-5 h-5" /> },
            ].map((step, idx) => {
              const isCardActive = activeStepCard === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveStepCard(prev => prev === idx ? null : idx)}
                  className={`rounded-2xl sm:rounded-[30px] p-6 sm:p-8 md:p-10 flex flex-col items-start relative group transition-all duration-300 shadow-xl cursor-pointer select-none active:scale-[0.98] ${isCardActive
                      ? 'bg-brand-4 -translate-y-1 shadow-2xl ring-2 ring-[#88C9C4]/50'
                      : 'bg-white hover:-translate-y-1 hover:bg-brand-4 active:bg-brand-4'
                    }`}
                >
                  <div
                    className={`absolute top-6 right-6 sm:top-8 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${isCardActive
                        ? 'bg-white text-brand-5 shadow-sm'
                        : 'bg-[#F3F3F3] text-brand-3 group-hover:bg-white group-hover:text-brand-5'
                      }`}
                  >
                    {step.icon}
                  </div>
                  <h3
                    className={`font-bebas text-6xl sm:text-7xl md:text-8xl leading-none mb-2 mt-2 sm:mt-4 transition-colors ${isCardActive ? 'text-brand-1' : 'text-brand-5 group-hover:text-brand-1'
                      }`}
                  >
                    {step.num}
                  </h3>
                  <h4
                    className={`font-geist text-lg sm:text-xl font-bold mb-2 transition-colors ${isCardActive ? 'text-white' : 'text-brand-5 group-hover:text-white'
                      }`}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`text-xs sm:text-sm font-geist leading-relaxed transition-colors ${isCardActive ? 'text-brand-1/90' : 'text-brand-5/70 group-hover:text-brand-1/90'
                      }`}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-[#0C1517]/80 backdrop-blur-md z-100"
            />
            {/* Mobile: slide up from bottom. Desktop: centered */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 md:inset-x-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-[#1E293B] rounded-t-3xl md:rounded-4xl z-101 overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[92vh] md:max-h-[88vh]"
            >
              {/* Drag handle — mobile only */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={18} />
              </button>

              {/* Image — horizontal strip on mobile, half panel on desktop */}
              <div className="w-full h-44 md:h-auto md:w-1/2 relative shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#1E293B] hidden md:block opacity-50" />
                <div className="absolute inset-0 bg-linear-to-t from-[#1E293B] to-transparent md:hidden opacity-80" />
              </div>

              {/* Content — scrollable on mobile */}
              <div className="w-full md:w-1/2 p-5 md:p-12 flex flex-col overflow-y-auto">
                <div className="inline-flex items-center gap-2 bg-brand-3/20 text-brand-3 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase w-fit mb-3">
                  <Check size={14} /> Especificaciones
                </div>

                <h2 className="font-bebas text-3xl md:text-5xl text-white tracking-wide mb-1.5">
                  {selectedProduct.name}
                </h2>

                <p className="text-white/70 font-geist text-sm md:text-base leading-relaxed mb-4">
                  {selectedProduct.description}
                </p>

                <div className="font-geist divide-y divide-white/10">
                  {[
                    ['Material', 'SMS Trilaminado / Spunbond', false],
                    ['Esterilidad', '100% Estéril (Óxido de Etileno)', true],
                    ['Uso', 'Descartable (Un solo uso)', false],
                    ['Hipoalergénico', 'Sí, libre de látex', false],
                  ].map(([label, value, highlight]) => (
                    <div key={label} className="flex justify-between items-center py-2.5 gap-4">
                      <span className="text-white/50 uppercase tracking-widest text-[10px] font-bold shrink-0">{label}</span>
                      <span className={`text-sm font-medium text-right ${highlight ? 'text-brand-3' : 'text-white'}`}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[#88C9C4] uppercase tracking-widest text-[10px] font-bold block mb-0.5">
                      Insumo Incluido en el Kit Completo
                    </span>
                    <span className="font-bebas text-2xl md:text-3xl text-white">
                      PRECIO DEL KIT: <span className="text-[#88C9C4]">$9.500</span>
                    </span>
                    <span className="text-[11px] text-white/50 block">Se comercializa exclusivamente por kit completo</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      navigate('/cargarproductos');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#88C9C4] hover:bg-[#6EB8B2] text-[#0C3B45] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer text-center shrink-0"
                  >
                    Comprar Kit ($9.500)
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
