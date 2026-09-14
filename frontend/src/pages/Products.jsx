import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingCart, Eye, Settings, Package, Truck, CreditCard, MessageCircle, X, Check } from 'lucide-react';
import { ProductShowcase } from '../components/ui/product-showcase';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Simulate fetching
    setTimeout(() => {
      setProducts([
        { _id: '1', name: "Cubrecalzados", description: "Protección descartable para calzado.", price: 1500, image: "/images/cubrecalzadoskit.jpg" },
        { _id: '2', name: "Cubremangueras", description: "Funda estéril para mangueras.", price: 2000, image: "/images/cubremangueraskits.jpg" },
        { _id: '3', name: "Capuchón", description: "Cobertura protectora para motor.", price: 1800, image: "/images/Capuchónkits.jpg" },
        { _id: '4', name: "Campo Quirúrgico", description: "Campo estéril de 100x100cm.", price: 3500, image: "/images/Campo Quirúrgico (100x100cm)kits.jpg" },
        { _id: '5', name: "Camisolín", description: "Camisolín quirúrgico SMS.", price: 4500, image: "/images/camisolinkits.jpg" },
        { _id: '6', name: "Cofia", description: "Cofia quirúrgica ajustable.", price: 1200, image: "/images/cofiakits.png" },
        { _id: '7', name: "Barbijo", description: "Barbijo tricapa con ajuste.", price: 800, image: "/images/barbijoskits.png" }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="bg-[#0C1517] min-h-screen text-brand-1 font-geist selection:bg-brand-3 selection:text-white">
      {/* Top Padding for Navbar */}
      <div className="pt-28 md:pt-36 pb-16 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">

        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 mb-24 md:mb-32">
          {/* Left Text */}
          <div className="w-full md:w-1/2 flex flex-col items-start z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-bebas text-6xl md:text-8xl tracking-wider text-white leading-[0.9]"
            >
              RAÍCES DE<br />CALIDAD
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-lg text-brand-1/70 max-w-md font-light leading-relaxed"
            >
              En GM KIT STUDIO, creemos que la seguridad médica comienza con el equilibrio perfecto entre protección absoluta y comodidad. Nuestra línea estéril combina materiales de primera calidad con tecnología moderna para restaurar la confianza.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
              className="mt-10 bg-[#42544F] hover:bg-[#526660] text-brand-1 px-8 py-3.5 rounded-full font-medium transition-colors flex items-center gap-2 shadow-lg"
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
              className="relative w-full h-75 md:h-112.5 lg:h-125 rounded-4xl overflow-hidden shadow-2xl bg-brand-5/20"
            >
              <img
                src="/images/kitsodontologico.jpg"
                alt="Colección GM KIT"
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
            className="font-bebas text-4xl md:text-5xl text-white mb-4 tracking-wide"
          >
            ¿QUÉ INCLUYE EL KIT?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-1/60 font-geist mb-10 max-w-2xl"
          >
            Todo lo necesario para garantizar la bioseguridad de un paciente y del profesional en una intervención odontológica.
          </motion.p>

          {loading ? (
            <div className="flex justify-center items-center h-125">
              <div className="w-12 h-12 border-4 border-brand-3 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="w-full relative z-20 mt-12" style={{ contain: 'paint' }}>
              <ProductShowcase products={products} onProductSelect={setSelectedProduct} />
            </div>
          )}
        </section>

        {/* HOW TO BUY SECTION */}
        <section className="mt-32 border-t border-white/10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bebas text-4xl md:text-5xl text-white mb-4 tracking-wide">
              PASOS PARA COMPRAR
            </h2>
            <p className="text-brand-1/60 font-geist max-w-2xl mx-auto">
              Sigue este proceso simple y rápido para adquirir tus kits quirúrgicos a medida.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "1", title: "Visualizar kits", desc: "Explora nuestro catálogo y conoce en detalle cada componente de nuestros kits.", icon: <Eye className="w-5 h-5" /> },
              { num: "2", title: "Personalizar kits", desc: "Arma tu kit a medida según las necesidades específicas de tu cirugía.", icon: <Settings className="w-5 h-5" /> },
              { num: "3", title: "Elegir cantidad", desc: "Elige cuántos necesitas. ¡Consultando cantidad, hacemos descuentos!", icon: <Package className="w-5 h-5" /> },
              { num: "4", title: "Opción de envío", desc: "Selecciona la opción de envío que mejor se adapte a tu ubicación y urgencia.", icon: <Truck className="w-5 h-5" /> },
              { num: "5", title: "Método de pago", desc: "Elige el método de pago más conveniente y seguro para ti.", icon: <CreditCard className="w-5 h-5" /> },
              { num: "6", title: "Hacer el pedido", desc: "Envíanos un WhatsApp o Mail con tu pedido para confirmar y coordinar la entrega.", icon: <MessageCircle className="w-5 h-5" /> },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[30px] p-8 md:p-10 flex flex-col items-start relative group hover:-translate-y-1 hover:bg-brand-4 transition-all duration-300 shadow-xl"
              >
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[#F3F3F3] text-brand-3 flex items-center justify-center group-hover:bg-white group-hover:text-brand-5 transition-colors">
                  {step.icon}
                </div>
                <h3 className="font-bebas text-7xl md:text-8xl text-brand-5 group-hover:text-brand-1 transition-colors leading-none mb-2 mt-4">{step.num}</h3>
                <h4 className="font-geist text-xl font-bold text-brand-5 group-hover:text-white transition-colors mb-2">{step.title}</h4>
                <p className="text-sm font-geist text-brand-5/70 group-hover:text-brand-1/90 transition-colors leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-[#1E293B] rounded-4xl z-101 overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10 max-h-[90vh] md:max-h-none overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={20} />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#1E293B] hidden md:block opacity-50" />
                <div className="absolute inset-0 bg-linear-to-t from-[#1E293B] to-transparent md:hidden opacity-80" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-brand-3/20 text-brand-3 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase w-fit mb-4">
                  <Check size={14} /> Especificaciones
                </div>

                <h2 className="font-bebas text-4xl md:text-5xl text-white tracking-wide mb-2">
                  {selectedProduct.name}
                </h2>

                <p className="text-white/70 font-geist text-lg leading-relaxed mb-8">
                  {selectedProduct.description}
                </p>

                <div className="space-y-4 font-geist">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/50 uppercase tracking-widest text-xs font-bold">Material</span>
                    <span className="text-white font-medium">SMS Trilaminado / Spunbond</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/50 uppercase tracking-widest text-xs font-bold">Esterilidad</span>
                    <span className="text-brand-3 font-medium">100% Estéril (Óxido de Etileno)</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/50 uppercase tracking-widest text-xs font-bold">Uso</span>
                    <span className="text-white font-medium">Descartable (Un solo uso)</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/50 uppercase tracking-widest text-xs font-bold">Hipoalergénico</span>
                    <span className="text-white font-medium">Sí, libre de látex</span>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <div>
                    <span className="text-white/50 uppercase tracking-widest text-xs font-bold block mb-1">Precio x Unidad</span>
                    <span className="font-bebas text-4xl text-brand-3">${selectedProduct.price.toLocaleString()}</span>
                  </div>
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
