import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, ArrowRight, Activity, Plus } from 'lucide-react';
import ReviewsSection from '../components/ReviewsSection';

const About = () => {
  return (
    <div className="min-h-screen bg-[#F3F3F3] text-[#0C0C0C] font-geist pb-0 overflow-hidden">
      
      {/* 1. Hero Section (Mapping to "Hi, I'm Tayler...") */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto relative z-10 flex flex-col-reverse lg:flex-row items-center gap-16">
        
        {/* Left Side: Text */}
        <div className="w-full lg:w-[55%]">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-[7.5rem] font-bebas leading-[0.85] text-brand-5 uppercase tracking-tight mb-8"
          >
            HOLA, SOMOS <br/> GM KIT STUDIO.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 font-bebas text-lg md:text-xl text-brand-5/60 tracking-widest mb-10"
          >
             <span>BIOSEGURIDAD</span>
             <span className="text-brand-3">✦</span>
             <span>KITS DESCARTABLES</span>
             <span className="text-brand-3">✦</span>
             <span>IMPLANTES</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <button className="bg-brand-5 text-brand-1 px-8 py-4 rounded-full font-bebas text-xl tracking-wider hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
              CATÁLOGO <ArrowRight size={18} className="-rotate-45" />
            </button>
            <button className="border border-brand-5/20 text-brand-5 px-8 py-4 rounded-full font-bebas text-xl tracking-wider hover:bg-brand-5/5 transition-colors">
              HABLEMOS
            </button>
          </motion.div>
        </div>
        
        {/* Right Side: Circular Image with Graphic */}
        <div className="w-full lg:w-[45%] relative flex justify-center lg:justify-end">
          {/* Abstract Star Graphic Behind */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square z-0 opacity-20 text-brand-3"
          >
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M50 0L55 40L95 30L65 55L90 90L50 70L10 90L35 55L5 30L45 40Z" />
            </svg>
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-[400px] lg:max-w-[500px] aspect-square rounded-full overflow-hidden border-8 border-[#F3F3F3] shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Médico cirujano en quirófano" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* 2. Slanted Marquee Bar */}
      <div className="relative w-[110%] -left-[5%] bg-brand-5 text-brand-1 py-4 md:py-6 transform -rotate-2 shadow-xl z-20 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-8 font-bebas text-2xl md:text-3xl tracking-widest uppercase"
        >
          {Array(10).fill("✦ DISEÑO ✦ BIOSEGURIDAD ✦ PROTECCIÓN TOTAL ✦ LOGÍSTICA").map((text, i) => (
             <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* 3. Mid Section (About info) */}
      <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Col */}
        <div className="lg:w-1/2">
           <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-brand-5/60 mb-6">
              <span>GM KIT STUDIO</span> <span className="text-brand-3">✦</span> <span>SAN MIGUEL DE TUCUMÁN</span>
           </div>
           <h2 className="font-bebas text-5xl md:text-6xl text-brand-5 leading-none">
             NUESTRA MISIÓN: TRANSFORMAR Y AGILIZAR LA COMPRA DE KITS QUIRÚRGICOS.
           </h2>
        </div>
        
        {/* Right Col */}
        <div className="lg:w-1/2 flex flex-col justify-between">
           <p className="text-lg md:text-xl text-brand-5/80 leading-relaxed font-light mb-12">
             Queremos eliminar las demoras y complicaciones, brindando un e-commerce rápido, intuitivo y estético que entregue calidad certificada en tiempo récord. Sabemos que en el quirófano no hay margen de error. Por eso, todos nuestros productos están rigurosamente testeados, esterilizados bajo normas internacionales y cuentan con aprobación. Tu seguridad y la de tu paciente es nuestra prioridad.
           </p>
           
           <div className="flex gap-8 md:gap-16 border-t border-brand-5/10 pt-8">
              <div>
                <p className="text-[10px] text-brand-3 font-bold uppercase tracking-widest mb-1">UBICACIÓN</p>
                <p className="font-bebas text-xl text-brand-5">TUCUMÁN, ARG</p>
              </div>
              <div>
                <p className="text-[10px] text-brand-3 font-bold uppercase tracking-widest mb-1">ESPECIALIDAD</p>
                <p className="font-bebas text-xl text-brand-5">ODONTOLOGÍA</p>
              </div>
              <div>
                <p className="text-[10px] text-brand-3 font-bold uppercase tracking-widest mb-1">ENVÍOS</p>
                <p className="font-bebas text-xl text-brand-5">NACIONALES</p>
              </div>
           </div>
        </div>
      </section>

      {/* 4. Stat Blocks */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto relative z-10 mb-32">
        <div className="flex flex-col md:flex-row border-y border-brand-5/10 divide-y md:divide-y-0 md:divide-x divide-brand-5/10">
           <div className="flex-1 py-12 md:py-16 text-center group cursor-default bg-[#F3F3F3] hover:bg-white transition-colors">
              <h3 className="font-bebas text-7xl md:text-8xl text-brand-5 mb-2 group-hover:scale-110 transition-transform">5+</h3>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-5/60">AÑOS DE EXPERIENCIA</p>
           </div>
           <div className="flex-1 py-12 md:py-16 text-center bg-brand-5 text-brand-1 group cursor-default">
              <h3 className="font-bebas text-7xl md:text-8xl mb-2 group-hover:scale-110 transition-transform">50+</h3>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-1/60">CLÍNICAS ASOCIADAS</p>
           </div>
           <div className="flex-1 py-12 md:py-16 text-center group cursor-default bg-[#F3F3F3] hover:bg-white transition-colors">
              <h3 className="font-bebas text-7xl md:text-8xl text-brand-5 mb-2 group-hover:scale-110 transition-transform">100%</h3>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-5/60">APROBACIÓN ANMAT</p>
           </div>
        </div>
      </section>

      {/* 5. Values / Quality List (Mapping to "Awards" list) */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1000px] mx-auto relative z-10 mb-32">
        <div className="text-center mb-16">
          <Target className="w-10 h-10 text-brand-3 mx-auto mb-4" />
          <h2 className="font-bebas text-5xl text-brand-5 mb-2">COMPROMISO DE CALIDAD</h2>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-5/60">RECONOCIMIENTOS & ESTÁNDARES</p>
        </div>
        
        <div className="flex flex-col border-t border-brand-5/20">
           {[
             { num: "1", title: "Validación Estricta", subtitle: "Normas ISO - Aprobación ANMAT", category: "CALIDAD", year: "2026" },
             { num: "2", title: "Esterilización Total", subtitle: "Tecnología de Rayos Gamma", category: "BIOSEGURIDAD", year: "2026" },
             { num: "3", title: "Ensamblaje Preciso", subtitle: "Salas Blancas Certificadas", category: "PROCESOS", year: "2026" },
             { num: "4", title: "Cuidado Integral", subtitle: "Logística y Empaque", category: "DISTRIBUCIÓN", year: "2026" }
           ].map((award, i) => (
             <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 border-b border-brand-5/20 hover:bg-white transition-colors group cursor-default">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                   <div className="w-12 h-12 bg-brand-3 text-white flex items-center justify-center font-bebas text-2xl">
                     {award.num}
                   </div>
                   <div>
                     <h4 className="font-bebas text-2xl text-brand-5 mb-1 group-hover:text-brand-3 transition-colors">{award.title}</h4>
                     <p className="text-sm font-geist text-brand-5/60">{award.subtitle}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-brand-5/40 text-right md:text-left">
                   <span className="hidden md:inline">{award.category}</span>
                   <span className="md:w-12">{award.year}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 6. Existing Components */}
      <div className="bg-brand-5 pt-32 pb-20 rounded-t-[60px] relative z-20 mt-20">
         <div className="text-center mb-16">
           <ShieldCheck className="w-10 h-10 text-brand-2 mx-auto mb-4" />
           <h2 className="font-bebas text-5xl text-brand-1 mb-2">LO QUE DICEN NUESTROS CLIENTES</h2>
           <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-1/50">CONFIANZA CLÍNICA</p>
         </div>
         <ReviewsSection />
      </div>

    </div>
  );
};

export default About;
