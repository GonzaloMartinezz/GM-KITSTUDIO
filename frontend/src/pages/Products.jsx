import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentShowcaseSlide, setCurrentShowcaseSlide] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          _id: '1',
          name: "Kit Básico",
          description: "Kit esterilizado descartable.",
          price: 6500,
          image: "/images/img1.png"
        },
        {
          _id: '2',
          name: "Bioseguridad",
          description: "Kit para dos personas.",
          price: 8900,
          image: "/images/img2.png"
        },
        {
          _id: '3',
          name: "Implante",
          description: "Máxima barrera bacteriológica.",
          price: 12500,
          image: "/images/img3.png"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="bg-brand-5 min-h-screen pt-24 pb-8 flex flex-col md:flex-row relative font-geist overflow-hidden px-4 md:px-8 gap-6 md:gap-8 text-brand-1">
      
      {/* LEFT INFO PANEL */}
      <div className="w-full md:w-[32%] flex flex-col justify-between relative z-20 py-4 md:py-12 md:pl-6 order-2 md:order-1">
        <div>
          <div className="w-4 h-4 bg-brand-3 rounded-full mb-6 md:mb-10 animate-pulse"></div>
          <h1 className="font-bebas text-5xl md:text-7xl lg:text-[5.5rem] text-brand-1 leading-[0.85] tracking-tight">
            SIENTE LA<br />SEGURIDAD<br />CON GM KIT -<br />BIOSEGURIDAD
          </h1>
          <p className="mt-8 text-brand-1/70 font-geist max-w-[280px] text-sm leading-relaxed">
            Una elección inteligente y amigable con el medio ambiente, diseñada para ofrecer máxima protección y bajo impacto.
          </p>
        </div>
        
        <div className="hidden md:flex justify-between items-center text-brand-1/30 font-bold tracking-widest text-xs mt-12 border-t border-brand-1/10 pt-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-3"></div> Premium</span>
          <span>✦ ✦ ✦</span>
        </div>
      </div>

      {/* RIGHT MAIN IMAGE AREA */}
      <div className="w-full md:w-[68%] h-[45vh] md:h-[calc(100vh-140px)] relative order-1 md:order-2">
        <div className="w-full h-full bg-brand-4 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden relative shadow-2xl">
          
          {loading ? (
            <div className="w-full h-full bg-brand-5/20 animate-pulse"></div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentShowcaseSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                src={products[currentShowcaseSlide]?.image} 
                alt="Product"
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          )}
          
          {/* Top Right Floating Pill */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/90 backdrop-blur-md text-brand-5 px-5 md:px-7 py-2.5 md:py-3.5 rounded-full flex items-center gap-3 font-bold shadow-xl z-20">
            <ShieldCheck className="w-5 h-5 text-brand-3" />
            <span className="text-sm md:text-base">MÁXIMA BARRERA</span>
          </div>

          {/* Bottom Right Glassmorphism Pills */}
          <div className="hidden md:flex absolute bottom-10 right-10 gap-3 z-20">
            {["Estéril", "Seguro", "Confiable"].map((tag, i) => (
              <div 
                key={i} 
                className="backdrop-blur-md bg-brand-5/30 border border-white/20 text-white px-6 py-2.5 rounded-full font-geist text-sm hover:bg-brand-5/60 transition-colors cursor-pointer"
              >
                {tag}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* OVERLAPPING CAROUSEL (The magic touch) */}
      <div className="relative md:absolute md:bottom-16 md:left-[22%] bg-brand-1 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-30 w-full md:w-[480px] lg:w-[540px] order-3 md:order-3">
         <div className="flex gap-4 md:gap-6 justify-center">
           {products.slice(0, 3).map((product, idx) => (
             <div 
               key={idx}
               onClick={() => setCurrentShowcaseSlide(idx)}
               className={`w-[22%] sm:w-24 md:w-32 aspect-square rounded-[1rem] md:rounded-[1.5rem] overflow-hidden relative cursor-pointer group transition-all duration-300 ${currentShowcaseSlide === idx ? 'ring-2 md:ring-4 ring-brand-3 shadow-xl scale-105 z-10' : 'scale-90 opacity-60 hover:scale-100 hover:opacity-100'}`}
             >
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-brand-5 px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold w-10/12 text-center truncate shadow-sm transition-transform group-hover:-translate-y-1">
                  {product.name}
                </div>
             </div>
           ))}
         </div>
         
         {/* Controls below cards */}
         <div className="flex justify-between items-center mt-6 md:mt-8 px-2 md:px-6 text-brand-5">
           <div className="font-bebas text-3xl md:text-4xl flex items-baseline gap-1">
             {currentShowcaseSlide + 1}
             <span className="text-xl md:text-2xl text-brand-5/40">/{products.length}</span>
           </div>
           
           <div className="flex gap-2 md:gap-3">
             <button 
               onClick={() => setCurrentShowcaseSlide(prev => (prev === 0 ? products.length - 1 : prev - 1))}
               className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-brand-5/20 flex items-center justify-center hover:bg-brand-5 hover:text-brand-1 transition-all active:scale-90"
             >
               <ArrowLeft size={18}/>
             </button>
             <button 
               onClick={() => setCurrentShowcaseSlide(prev => (prev === products.length - 1 ? 0 : prev + 1))}
               className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-brand-5/20 flex items-center justify-center hover:bg-brand-5 hover:text-brand-1 transition-all active:scale-90"
             >
               <ArrowRight size={18}/>
             </button>
           </div>
         </div>
      </div>

    </div>
  );
};

export default Products;
