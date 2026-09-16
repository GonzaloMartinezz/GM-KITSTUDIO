import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, ShieldCheck, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Simulando fetch de producto individual
    const mockProducts = [
      {
        _id: '1',
        name: "Kit de Cirugía Odontológica Completo",
        description: "Kit esterilizado y descartable con los 8 insumos de bioseguridad: 2 batas con puños, compresa 1x1m imper, compresa 50x50cm imper, 1 campo fenestrado para paciente, 2 cubre suctores, 2 gorros clásicos, 2 barbijos y 2 cubrecalzados elastizados. Garantiza máxima higiene y barrera bacteriológica.",
        price: 9500,
        images: [
          "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1584308666744-24d5e4a83e0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: [
          "2x Batas con puños elastizados",
          "1x Compresa impermeable 1x1 mt",
          "1x Compresa impermeable 50x50 cm",
          "1x Campo fenestrado para paciente",
          "2x Cubre suctores descartables",
          "2x Gorros clásicos descartables",
          "2x Barbijos con filtro bacteriano",
          "2x Cubrecalzados elastizados"
        ]
      },
      // ... otros pueden ser cargados si es necesario, simplificaremos con fallback
    ];

    // Si el ID es 1, usamos el primero, si no, usamos un fallback genérico para la demo
    const found = mockProducts.find(p => p._id === id) || {
      _id: id,
      name: "Kit de Cirugía Odontológica Completo",
      description: "Kit de alta resistencia para procedimientos complejos. Barrera bacteriológica premium aprobada por ANMAT.",
      price: 9500,
      images: [
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1584308666744-24d5e4a83e0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      ],
      features: ["Material SMS SMS 45gr", "Esterilizado por Óxido de Etileno", "Doble Envoltorio"]
    };

    setProduct(found);
  }, [id]);

  if (!product) return <div className="min-h-screen bg-brand-5 text-brand-1 p-20 text-center font-bebas text-4xl">Cargando...</div>;

  return (
    <div className="min-h-screen bg-brand-5 text-brand-1 pt-24 sm:pt-28 md:pt-36 pb-16 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-brand-4/20 blur-[150px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <Link to="/productos" className="inline-flex items-center gap-2 text-brand-3 hover:text-brand-2 mb-6 sm:mb-8 transition-colors font-changa text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-4 relative group"
            >
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-5/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${activeImage === idx ? 'border-brand-3 opacity-100' : 'border-brand-4 opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 bg-brand-4/50 text-brand-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-geist text-xs sm:text-sm mb-4 sm:mb-6 border border-brand-3/30 w-fit">
              <ShieldCheck className="w-4 h-4" /> Aprobado ANMAT
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bebas text-brand-1 mb-3 sm:mb-4 leading-none drop-shadow-md wrap-break-word">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              <span className="font-bebas text-3xl sm:text-4xl text-brand-2">${product.price.toLocaleString()}</span>
              <span className="text-xs sm:text-sm font-geist text-brand-1/70 bg-brand-4/50 px-3 py-1 rounded-full border border-brand-3/30">
                Precio por Kit Completo (8 insumos incluidos)
              </span>
            </div>

            <p className="font-geist text-base sm:text-lg text-brand-1/70 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Escala de Descuentos & Beneficios de Confianza */}
            <div className="bg-brand-5/50 border border-brand-4 p-4 rounded-2xl mb-8 text-xs font-geist space-y-3">
              <div className="flex items-center justify-between font-bold text-brand-2 uppercase text-[11px] tracking-wider">
                <span>Escala por Volumen (Fase Inicial)</span>
                <span className="text-emerald-400 font-semibold">Envío Gratis en 10+ kits</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="bg-brand-4/30 p-2 rounded-xl border border-brand-3/20">
                  <p className="font-bebas text-lg text-brand-1 leading-none mb-0.5">5% OFF</p>
                  <p className="text-brand-1/80">5 kits ($40.375)</p>
                  <p className="text-emerald-400 font-bold mt-0.5">Ahorro: $2.125</p>
                </div>
                <div className="bg-brand-4/60 p-2 rounded-xl border border-brand-3/50 ring-1 ring-[#88C9C4]/30">
                  <p className="font-bebas text-lg text-[#88C9C4] leading-none mb-0.5">10% OFF</p>
                  <p className="text-brand-1/90 font-semibold">10 kits ($76.500)</p>
                  <p className="text-emerald-300 font-bold mt-0.5">+ Envío Gratis</p>
                </div>
                <div className="bg-brand-4/30 p-2 rounded-xl border border-brand-3/20">
                  <p className="font-bebas text-lg text-brand-1 leading-none mb-0.5">15% OFF</p>
                  <p className="text-brand-1/80">20+ kits ($144.500)</p>
                  <p className="text-emerald-400 font-bold mt-0.5">Ahorro: $25.500</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-brand-4/60 text-[10px] text-brand-1/80">
                <span>🧪 <strong>Kit Trial:</strong> 1 kit a precio costo para evaluación</span>
                <span>🛡️ <strong>Garantía:</strong> Reposición 100% sin cargo</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-changa text-xl mb-4 border-b border-brand-4 pb-2">Contenido del Kit</h3>
              <ul className="space-y-3 font-geist">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-brand-1/80">
                    <CheckCircle className="w-5 h-5 text-brand-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart({ ...product, image: product.images[0] })}
              className="relative overflow-hidden bg-brand-4 border border-brand-3 w-full py-5 rounded-2xl group flex items-center justify-center gap-3"
            >
              <ShoppingCart className="w-6 h-6 text-brand-2 group-hover:text-brand-5 relative z-10 transition-colors" />
              <span className="font-bebas text-2xl text-brand-1 group-hover:text-brand-5 relative z-10 transition-colors">AGREGAR AL CARRITO</span>

              {/* Fill animation bg */}
              <div className="absolute inset-0 bg-brand-3 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out z-0"></div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
