import React, { useState } from 'react';
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

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full max-w-350 mx-auto h-162.5 md:h-200 bg-[#0A0A0A] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
      {/* Left Panel: Menu */}
      <div className="w-full md:w-[35%] bg-brand-4 h-full p-6 md:p-12 flex flex-col justify-center gap-2 z-20 relative">
        <h3 className="text-white/80 font-bebas text-2xl tracking-widest mb-6 md:mb-8 px-4">SELECCIONAR PRODUCTO</h3>

        {products.map((product, idx) => {
          const isActive = activeIndex === idx;
          const Icon = icons[idx % icons.length];

          return (
            <button
              key={product._id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-full flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-200 ${isActive
                  ? 'bg-brand-1 text-brand-5 shadow-xl'
                  : 'bg-transparent text-white/60 border border-white/10 hover:bg-white/10'
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
                <CheckCircle2 size={18} className="text-brand-3" />
              ) : (
                <Icon size={18} className="opacity-70" />
              )}

              <span className={`text-sm md:text-[15px] font-medium tracking-wide ${isActive ? 'font-bold' : ''}`}>
                {product.name.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Panel: Stacked Cards */}
      <div className="w-full md:w-[65%] relative h-full flex items-center justify-center p-8 overflow-hidden">
        <div className="relative w-full max-w-125 aspect-4/5 perspective-1000">
          <AnimatePresence>
            {products.map((product, idx) => {
              const offset = idx - activeIndex;
              if (offset < 0 || offset > 3) return null;

              const isFront = offset === 0;

              return (
                <motion.div
                  key={product._id || idx}
                  initial={{ opacity: 0, x: 100, scale: 0.8 }}
                  animate={{
                    opacity: isFront ? 1 : 1 - offset * 0.25,
                    scale: isFront ? 1 : 1 - offset * 0.08,
                    x: offset * 40,
                    zIndex: 10 - offset,
                  }}
                  exit={{ opacity: 0, x: -100, scale: 1.1, transition: { duration: 0.2, ease: "easeOut" } }}
                  transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
                  className="absolute inset-0 rounded-4xl overflow-hidden shadow-2xl bg-[#EBEAE5]"
                  style={{ transformOrigin: 'center center' }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-3 shadow-[0_0_10px_rgba(122,147,167,0.8)] animate-pulse"></span>
                      <span className="text-xs font-bold tracking-widest text-brand-5 uppercase">En Stock</span>
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply opacity-90 p-0"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-3">
                      <div className="bg-black/60 backdrop-blur-md w-fit px-4 py-1.5 rounded-full border border-white/10">
                        <span className="text-brand-1 text-xs font-bold tracking-widest uppercase">
                          {idx + 1} • {product.name}
                        </span>
                      </div>
                      <h3 className="text-white text-2xl md:text-3xl font-bebas leading-tight tracking-wide">
                        {product.description}
                      </h3>
                      <div 
                        onClick={() => onProductSelect && onProductSelect(product)}
                        className="mt-2 text-brand-3 text-sm font-medium tracking-widest uppercase cursor-pointer hover:text-brand-1 transition-colors flex items-center gap-2 w-fit"
                      >
                        Ver Detalles <PlusCircle size={14} />
                      </div>
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
