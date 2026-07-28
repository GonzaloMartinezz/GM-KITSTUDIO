import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(1);

  const faqs = [
    { title: "Decisiones Basadas en Datos", color: "bg-[#CFF0EA]", text: "Utilizamos analíticas precisas para optimizar cada lote de esterilización, asegurando la máxima calidad." },
    { title: "Experiencia y Trayectoria", color: "bg-[#88C9C4]", text: "Nuestro equipo está conformado por expertos en bioseguridad y logística médica, garantizando un servicio integral desde el empaquetado hasta la puerta de tu clínica." },
    { title: "Dominio de Logística", color: "bg-[#F1E8D9]", text: "Garantizamos tiempos de entrega rápidos y seguros, con rastreo en tiempo real de tus insumos." },
    { title: "Soporte Excepcional", color: "bg-[#0C3B45]", text: "Atención 24/7 para cualquier urgencia en tu consultorio. Estamos siempre listos para responder.", isDark: true }
  ];

  return (
    <section className="bg-[#F8F8F8] text-[#1E293B] py-32 px-6 md:px-12 lg:px-24 font-geist relative z-30">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Side */}
        <div className="lg:w-5/12 flex flex-col justify-center">
          <div className="flex gap-1 mb-8">
            <div className="w-8 h-8 bg-[#0C0C0C] rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full -ml-3"></div>
          </div>
          <h2 className="text-6xl lg:text-7xl font-bebas leading-[0.9] mb-8 text-[#0C0C0C]">
            Preguntas y Respuestas para Mayor Seguridad
          </h2>
          <p className="text-[#1E293B]/70 text-lg mb-12 max-w-md">
            Elige el éxito con nuestra solución de bioseguridad, dedicada a entregar los mejores estándares e impulsar el cuidado en tu clínica.
          </p>
          <div className="flex items-center gap-4 mb-16">
            <button className="bg-[#0C0C0C] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform">
              Pruébalo Ahora <ArrowUpRight size={16} />
            </button>
            <button className="border border-[#1E293B]/20 px-6 py-3 rounded-full font-bold text-sm hover:bg-[#1E293B]/5 transition-colors">
              Explorar Más
            </button>
          </div>
          
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1E293B]/50 mb-6">Confiado por grandes clínicas</p>
            <div className="flex gap-8 text-xl font-bebas text-[#1E293B]/40">
              <span>NATUSKA</span>
              <span>EXEO</span>
              <span>UIN</span>
            </div>
          </div>
        </div>

        {/* Right Side Accordion */}
        <div className="lg:w-7/12 flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                layout
                transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className={`${faq.color} ${faq.isDark ? 'text-white' : 'text-[#0C0C0C]'} rounded-[2rem] overflow-hidden cursor-pointer shadow-sm`}
              >
                <div className="p-6 md:p-8 flex justify-between items-center">
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight pr-4">{faq.title}</h3>
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${faq.isDark ? 'bg-white text-black' : 'bg-white text-black'} shadow-sm`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
                      className="px-6 md:px-8 pb-8"
                    >
                      <p className={`${faq.isDark ? 'text-white/80' : 'text-black/70'} text-lg max-w-xl`}>
                        {faq.text}
                      </p>
                      <div className="mt-6 flex justify-end">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${faq.isDark ? 'border-white/20' : 'border-black/20'} hover:scale-110 transition-transform`}>
                           <ArrowUpRight size={18} />
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
