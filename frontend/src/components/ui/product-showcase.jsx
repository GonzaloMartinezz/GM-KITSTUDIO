import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Syringe, Box, Crosshair, Droplet, User, PlusCircle, CheckCircle2 } from 'lucide-react';

const icons = [
  Shield,
  PlusCircle,
  Syringe,
  Box,
  User,
  Droplet,
  Crosshair
];

export function ProductShowcase({ products = [], onProductSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto min-h-145 xs:min-h-[640px] md:h-200 bg-[#0A0A0A] rounded-3xl sm:rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
      {/* Left Panel: Menu */}
      <div className="w-full md:w-[32%] lg:w-[35%] bg-brand-4 p-3.5 sm:p-6 md:p-12 flex flex-col justify-center gap-2 sm:gap-3 z-20 relative shrink-0">
        <h3 className="text-white/80 font-bebas text-base sm:text-2xl tracking-widest mb-1 sm:mb-4 md:mb-8 px-1 md:px-4 text-center md:text-left">
          SELECCIONAR PRODUCTO
        </h3>

        {/* 2 to 3 rows on mobile so all products in the kit are visible at a glance; column on desktop */}
        <div
          className="flex flex-wrap md:flex-col gap-1.5 sm:gap-2 justify-center md:justify-start"
        >
          {products.map((product, idx) => {
            const isActive = activeIndex === idx;
            const Icon = icons[idx % icons.length];

            return (
              <button
                key={product._id || idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-auto md:w-full flex items-center justify-center md:justify-start gap-1.5 sm:gap-3 px-3 py-1.5 sm:px-6 sm:py-3.5 md:py-4 rounded-full transition-all duration-200 cursor-pointer ${isActive
                    ? 'bg-brand-1 text-brand-5 shadow-lg font-bold scale-[1.02]'
                    : 'bg-white/10 text-white/80 border border-white/15 hover:bg-white/20 active:scale-95'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-1 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
                  />
                )}

                {isActive ? (
                  <CheckCircle2 size={13} className="text-brand-3 shrink-0" />
                ) : (
                  <Icon size={13} className="opacity-70 shrink-0" />
                )}

                <span className={`text-[11px] sm:text-sm md:text-[14px] font-medium tracking-wide flex-1 text-left leading-tight ${isActive ? 'font-bold' : ''}`}>
                  {product.name.toUpperCase()}
                </span>
                {product.qty >= 2 && (
                  <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full ml-2 shrink-0 ${isActive ? 'bg-[#364B5D] text-white shadow-xs' : 'bg-white/20 text-white'}`}>
                    {product.qty}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Stacked Cards (Expanded for larger mobile images) */}
      <div className="w-full md:w-[68%] lg:w-[65%] relative h-130 xs:h-[580px] sm:h-155 md:h-full flex items-center justify-center px-2 py-3 xs:p-4 sm:p-8 overflow-hidden">
        <div className="relative w-full max-w-85 xs:max-w-[380px] sm:max-w-125 h-117.5 xs:h-[520px] sm:h-140 md:h-full md:aspect-4/5 perspective-1000">
          <AnimatePresence mode="popLayout">
            {products.map((product, idx) => {
              const offset = idx - activeIndex;
              if (offset < 0 || offset > 3) return null;

              const isFront = offset === 0;

              return (
                <motion.div
                  key={product._id || idx}
                  initial={{ opacity: 0, x: 60, scale: 0.88 }}
                  animate={{
                    opacity: isFront ? 1 : Math.max(0.18, 1 - offset * 0.22),
                    scale: isFront ? 1 : 1 - offset * (isMobile ? 0.035 : 0.06),
                    x: offset * (isMobile ? 10 : 20),
                    zIndex: 10 - offset,
                  }}
                  exit={{ opacity: 0, x: -60, scale: 1.05, transition: { duration: 0.2, ease: "easeOut" } }}
                  transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
                  onClick={() => onProductSelect && onProductSelect(product)}
                  className="absolute inset-0 rounded-2xl sm:rounded-4xl overflow-hidden shadow-2xl bg-[#EBEAE5] cursor-pointer group"
                  style={{ transformOrigin: 'center center' }}
                >
                  <div className="relative w-full h-full">
                    {/* Stock badge */}
                    <div className="absolute top-3.5 left-3.5 sm:top-6 sm:left-6 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-brand-3 shadow-[0_0_10px_rgba(122,147,167,0.8)] animate-pulse"></span>
                      <span className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-1 uppercase">En Stock</span>
                    </div>

                    {/* Product Image - Larger, full visibility without dimming top */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center opacity-95 group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay focused only on bottom text area */}
                    <div className="absolute bottom-0 left-0 right-0 h-[45%] sm:h-[48%] bg-linear-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                    {/* Product Info at bottom */}
                    <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 flex flex-col gap-1.5 sm:gap-3 z-20">
                      <div className="bg-black/60 backdrop-blur-md w-fit px-2.5 sm:px-4 py-0.5 sm:py-1.5 rounded-full border border-white/10">
                        <span className="text-brand-1 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                          {idx + 1} • {product.name}
                        </span>
                      </div>
                      <h3 className="text-white text-lg sm:text-2xl md:text-3xl font-bebas leading-tight tracking-wide line-clamp-2">
                        {product.description}
                      </h3>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onProductSelect) onProductSelect(product);
                        }}
                        className="mt-0.5 sm:mt-2 text-brand-3 text-xs sm:text-sm font-medium tracking-widest uppercase cursor-pointer hover:text-brand-1 transition-colors flex items-center gap-1.5 sm:gap-2 w-fit pointer-events-auto group-hover:translate-x-1"
                      >
                        Ver Detalles <PlusCircle size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
